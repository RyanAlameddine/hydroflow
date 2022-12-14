use std::net::{Ipv4Addr, SocketAddr};

use hydroflow::hydroflow_syntax;
use hydroflow::util::bind_udp_bytes;

#[tokio::main]
async fn main() {
    let socket_addr: SocketAddr = (Ipv4Addr::LOCALHOST, 0).into();
    let (outbound, _inbound, _) = bind_udp_bytes(socket_addr).await;

    let mut df = hydroflow_syntax! {
        source_iter(0..10)
            -> map(|i| bytes::Bytes::from_static(&b"hello world!"[i..(i + 2)]))
            -> dest_sink(outbound);
    };
    df.run_available();
}
