use std::net::SocketAddr;

use dfir_rs::dfir_syntax;
use dfir_rs::util::{UdpSink, UdpStream};

use crate::Opts;
use crate::helpers::parse_command;
use crate::protocol::KvsResponse;

pub(crate) async fn run_client(
    outbound: UdpSink,
    inbound: UdpStream,
    server_addr: SocketAddr,
    opts: Opts,
) {
    println!("Client live!");

    let mut hf = dfir_syntax! {
        // set up channels
        outbound_chan = dest_sink_serde(outbound);
        inbound_chan = source_stream_serde(inbound) -> map(Result::unwrap);

        // read in commands from stdin and forward to server
        source_stdin()
            -> filter_map(|line| parse_command(line.unwrap()))
            -> map(|msg| { (msg, server_addr) })
            -> outbound_chan;

        // print inbound msgs
        inbound_chan -> for_each(|(response, _addr): (KvsResponse, _)| println!("Got a Response: {:?}", response));
    };

    #[cfg(feature = "debugging")]
    if let Some(graph) = opts.graph {
        let serde_graph = hf
            .meta_graph()
            .expect("No graph found, maybe failed to parse.");
        serde_graph.open_graph(graph, opts.write_config).unwrap();
    }
    let _ = opts;

    hf.run_async().await.unwrap();
}
