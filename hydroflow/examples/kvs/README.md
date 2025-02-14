Simple single-node key-value store example based on a join of PUTs and GETs.

Current semantics are:
 - PUTs are appended: we remember them all forever
 - GETs are only remembered for the current tick, which may not be monotone depending on how they
   are consumed.
 - GETs for empty keys get no acknowledgement.

 Clients accept commands on stdin. Command syntax is as follows:
 - `PUT <key>, <value>`
 - `GET <key>`
 Commands are case-insensitive. All keys and values are treated as `String`s.

## Running the example

To run the example, open 2 terminals.

In one terminal run the server like so:
```
cargo run -p hydroflow --example kvs -- --role server --addr localhost:12346
```

In another terminal run a client:
```
cargo run -p hydroflow --example kvs -- --role client --addr localhost:9090 --server-addr localhost:12346
```

Adding the `--graph <graph_type>` flag to the end of the command lines above will print out a node-and-edge diagram of the program. Supported values for `<graph_type>` include [mermaid](https://mermaid-js.github.io/) and [dot](https://graphviz.org/doc/info/lang.html).
