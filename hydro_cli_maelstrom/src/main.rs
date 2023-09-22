use core::panic;
use std::collections::HashMap;
use std::io::Result;
use std::net::SocketAddr;
use std::process::Stdio;
use bytes::Bytes;
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use tokio::io::{
    stdin, AsyncBufReadExt, AsyncWriteExt, BufReader, AsyncRead, AsyncWrite, stderr,
};
use tokio::net::{TcpStream, TcpListener};
use tokio::process::{Command, ChildStdin, ChildStdout};
use tokio_util::codec::{FramedWrite, LengthDelimitedCodec, FramedRead};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum ServerPort {
    TcpPort(SocketAddr)
}

#[derive(PartialEq, Eq, Serialize, Deserialize)]
pub enum Direction {
    Source,
    Sink
}

#[derive(Serialize, Deserialize)]
pub struct PortDefn {
    pub maelstrom_type: String,
    pub port_name: String,
    /// If the port is a sink/source from the perspective of the hydroflow program
    pub direction: Direction,
}

impl PortDefn {
    pub fn new(maelstrom_type: String, port_name: String, direction: Direction) -> PortDefn {
        return PortDefn {
            maelstrom_type,
            port_name,
            direction,
        };
    }
}

///forwards an in_stream into an out_stream, prefixed by `debug_message`.
async fn debug_link<R: AsyncRead + Unpin, W: AsyncWrite + Unpin>(
    in_stream: R,
    mut out_stream: W,
    debug_message: String,
) -> Result<()> {
    let mut lines = BufReader::new(in_stream).lines();
    while let Ok(Some(line)) = lines.next_line().await {
        let text = format!("{debug_message}: {line}\n");
        out_stream.write_all(text.as_bytes()).await?;
    }
    Ok(())
}

///Accepts the init payload from maelstrom and responds with an init_ok, returning the node_id of this node
async fn maelstrom_init() -> Result<String> {
    let mut init_msg = String::new();
    BufReader::new(stdin()).read_line(&mut init_msg).await?; 

    let v: Value = serde_json::from_str(&init_msg)?;
    let src = &v["src"];

    let body = &v["body"];
    let msg_id = &body["msg_id"];
    let node_id = body["node_id"].as_str().unwrap();

    let response = json!({
        "src": node_id,
        "dest": src,
        "body": {
            "type": "init_ok",
            "in_reply_to": msg_id
        }
    });

    println!("{}", response.to_string());
    
    Ok(node_id.to_string())
}

///Sends setup string which sets up all source ports.
async fn send_setup_string(source_port_names: &Vec<String>, child_stdin: &mut ChildStdin) -> Result<()> {
    let localhost = HashMap::from([("TcpPort", "127.0.0.1")]);
    let source_setup_pairs = source_port_names.iter()
        .map(|p| (p, localhost.clone()))
        .collect::<HashMap<_, _>>();
    let source_setup_string = serde_json::to_string(&source_setup_pairs)? + "\n";
    child_stdin.write_all(source_setup_string.as_bytes()).await?; //e.g. {"echo_in": {"TcpPort": "127.0.0.1"}}
    Ok(())
}

///Reads "ready" message which contains tcp port for all source ports.
async fn recieve_ready(child_stdout: &mut ChildStdout) -> Result<HashMap<String, ServerPort>>{
    let mut child_stdout = BufReader::new(child_stdout);

    let mut line_buf = String::new();
    child_stdout.read_line(&mut line_buf).await?;
    assert!(line_buf.starts_with("ready: "));
    let body = line_buf.trim_start_matches("ready: ");
    let source_ports: HashMap<String, ServerPort> = serde_json::from_str(body).unwrap();

    Ok(source_ports)
}

/// From a set of source_ports, creates a map from port name to writer which writes to that port's tcp stream
async fn source_demux(source_ports: HashMap<String, ServerPort>) -> Result<HashMap<String, FramedWrite<TcpStream, LengthDelimitedCodec>>> {
    let mut source_port_demux = HashMap::new();
    for (port_name, port) in source_ports {
        let socket = match port { ServerPort::TcpPort(socket) => socket };
        let stream = TcpStream::connect(socket).await?;
        let writer = FramedWrite::new(stream, LengthDelimitedCodec::new());
        source_port_demux.insert(port_name, writer);
    }
    Ok(source_port_demux)
}

/// Creats a TcpListener bound on localhost for each sink port
async fn setup_sink_ports(sink_port_names: Vec<String>) -> Result<HashMap<String, TcpListener>>{
    let mut sink_name_to_listener: HashMap<String, TcpListener> = HashMap::new();
    for port_name in sink_port_names {
        let listener = TcpListener::bind("127.0.0.1:0").await?;
        sink_name_to_listener.insert(port_name, listener);
    }
    Ok(sink_name_to_listener)
}

/// Creates the "start: " string and sends it to the child with the connection definitions
async fn send_start_string(sink_name_to_listener: &HashMap<String, TcpListener>, child_stdin: &mut ChildStdin) -> Result<()> {
    let mut connection_defs: HashMap<String, ServerPort> = HashMap::new();
    for (port_name, listener) in sink_name_to_listener {
        let addr = listener.local_addr().unwrap();
        connection_defs.insert(port_name.clone(), ServerPort::TcpPort(addr));
    }
    // send "start: {}" message
    let connection_defs_str = serde_json::to_string(&connection_defs)?;
    let formatted_defns = format!("start: {connection_defs_str}\n");
    child_stdin.write_all(formatted_defns.as_bytes()).await?;
    #[cfg(debug_assertions)]
    println!("sent {}", formatted_defns);
    Ok(())
}

/// Demux from stdin to all source ports
/// type_to_port_name is a map from payload type to port name
async fn input_handler(source_ports: HashMap<String, ServerPort>, type_to_port_name: HashMap<String, String>) -> Result<()> {
    let mut source_demux = source_demux(source_ports).await?;

    let mut lines = BufReader::new(stdin()).lines();
    while let Ok(Some(line)) = lines.next_line().await {
        // Read the line as a json value (maelstrom payload)
        let mut v: Value = serde_json::from_str(&line)?;

        let msg_id = Value::Array(vec![v["src"].clone(), v["body"]["msg_id"].clone()]);

        // Get the body of the payload
        let body = v["body"].as_object_mut().unwrap();
        
        // Update the msg_id to be the pair [src, msg_id]
        body.insert("msg_id".into(), msg_id);

        // Get the payload type (like echo, echo_ok, etc)
        let body_type = body.remove("type").unwrap();
        let body_type = body_type.as_str().unwrap();

        // Get the target port for that payload type
        let target_port_name = type_to_port_name.get(body_type).unwrap();
        let target_port = source_demux.get_mut(target_port_name).unwrap();

        // Send the body string to the target port
        let body_string = serde_json::to_string(body)?;
        #[cfg(debug_assertions)]
        println!("Sending line {}", body_string);
        target_port.send(Bytes::from(body_string)).await?;
    }
    Ok(())
}

/// Accept a connection on each sink port which wraps outputs in maelstrom payload of specified type
async fn output_handler(listener: TcpListener, maelstrom_type: String, node_id: String) -> Result<()> {
    let in_stream = listener.accept().await?.0;

    let mut lines = FramedRead::new(in_stream, LengthDelimitedCodec::new());
    #[cfg(debug_assertions)]
    println!("accepted connection");
    while let Some(Ok(line)) = lines.next().await {
        // Transforms output into maelstrom payload
        // For example: 
        // {"echo":"hello world!","msg_id":0,"in_reply_to":["n1", 1]}
        // ->
        // {"src":"n1","dest":"c1","body":{"echo":"hello world!","msg_id":0,"in_reply_to":1,"type":"echo_ok"}}

        //parse line to string
        let raw_line: String = bincode::deserialize(&line).unwrap();

        //parse raw string to json value
        let mut v: Value = serde_json::from_str(&raw_line)?;
        let body = v.as_object_mut().unwrap();
        body.insert("type".to_string(), maelstrom_type.clone().into());

        // in_reply_to is actually [src, msg_id]
        let in_reply_to = v["in_reply_to"].as_array_mut().unwrap();
        assert_eq!(in_reply_to.len(), 2, "in_reply_to was not a pair of [src, msg_id]");
        let dest = in_reply_to.remove(0);
        let msg_id = in_reply_to.remove(0);

        //set in_reply_to to real value
        v["in_reply_to"] = msg_id;

        //wrap v in maelstrom header
        let response = json!({
            "src": node_id.clone(),
            "dest": dest,
            "body": v
        });

        //send it to stdout
        println!("{}", response.to_string());
    }
    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    let mut child = Command::new(r"C:\Users\rhala\Code\hydroflow\target\debug\examples\echo.exe")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()?;

    let mut child_stdin = child.stdin.take().unwrap();
    let mut child_stdout = child.stdout.take().unwrap();
    let child_stderr = child.stderr.take().unwrap();

    // this is supposed to be an input to the program
    /* vec![
        PortDefn::new("echo".into(), "echo_in".into(), Direction::Source),
        PortDefn::new("echo_ok".into(), "echo_out".into(), Direction::Sink),
    ]; */
    let port_input_str = r#"[{"maelstrom_type":"echo","port_name":"echo_in","direction":"Source"},{"maelstrom_type":"echo_ok","port_name":"echo_out","direction":"Sink"}]"#;

    let all_ports: Vec<PortDefn> = serde_json::from_str(port_input_str)?;

    // Create some useful representations of all_ports:

    let (source_ports, sink_ports): (Vec<_>, Vec<_>) = all_ports.iter().partition(|port| port.direction == Direction::Source);

    // port names for all sources (from the perspective of the hydro code)
    let source_port_names: Vec<_> = source_ports.iter().map(|port| port.port_name.clone()).collect();
    // maelstrom payload type to source port name
    let type_to_source_name: HashMap<_,_> = source_ports.iter().map(|port| (port.maelstrom_type.clone(), port.port_name.clone())).collect();

    // port names for all sinks (from the perspective of the hydro code)
    let sink_port_names: Vec<_> = sink_ports.iter().map(|port| port.port_name.clone()).collect();
    // sink port name to maelstrom payload type
    let sink_name_to_type: HashMap<_,_> = sink_ports.iter().map(|port| (port.port_name.clone(), port.maelstrom_type.clone())).collect();


    //setup source ports
    send_setup_string(&source_port_names, &mut child_stdin).await?;
    let source_ports = recieve_ready(&mut child_stdout).await?;
    #[cfg(debug_assertions)]
    println!("Parsed ready: {}", serde_json::to_string(&source_ports)?);

    //accept the maelstrom initialize payload
    let node_id = maelstrom_init().await?;

    //handle input (demux from stdin to tcp)
    tokio::task::spawn(input_handler(source_ports, type_to_source_name));

    //setup all sink ports
    let sink_name_to_listener = setup_sink_ports(sink_port_names).await?;

    //start the crate
    send_start_string(&sink_name_to_listener, &mut child_stdin).await?;

    //handle each output port individually (merge from tcp to stdout)
    for (port_name, listener) in sink_name_to_listener {
        let maelstrom_type = sink_name_to_type.get(&port_name).unwrap().clone();
        tokio::task::spawn(output_handler(listener, maelstrom_type, node_id.clone()));
    }

    //forward child's stderr to our stderr
    tokio::task::spawn(debug_link(child_stderr, stderr(), "child-stderr".into()));
    #[cfg(debug_assertions)]
    tokio::task::spawn(debug_link(child_stdout, stderr(), "child-stdout".into()));

    // wait to finish
    child.wait().await?;

    Ok(())
}
//Example inputs (in order):
//{"src": "c1", "dest": "n1","body": {"msg_id": 0,"type": "init", "node_id": "n1"}}
//{"src": "c1", "dest": "n1","body": {"msg_id": 1,"type": "echo", "echo": "hello world!"}}
