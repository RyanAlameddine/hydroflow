use dfir_rs::util::demux_enum::DemuxEnum;
use dfir_rs::dfir_syntax;

fn main() {
    #[derive(DemuxEnum)]
    enum Shape {
        Square(f64),
        Rectangle { w: f64, h: f64 },
        Circle { r: f64 },
    }

    let mut df = dfir_syntax! {
        my_demux = source_iter(0..5) -> demux_enum::<Shape>();
        my_demux[Rectangle] -> for_each(std::mem::drop);
        my_demux[Circle] -> for_each(std::mem::drop);
        my_demux[Square] -> for_each(std::mem::drop);
    };
    df.run_available();
}
