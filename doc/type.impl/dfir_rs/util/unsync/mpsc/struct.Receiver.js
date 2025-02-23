(function() {
    var type_impls = Object.fromEntries([["dfir_rs",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Drop-for-Receiver%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#189-193\">Source</a><a href=\"#impl-Drop-for-Receiver%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/ops/drop/trait.Drop.html\" title=\"trait core::ops::drop::Drop\">Drop</a> for <a class=\"struct\" href=\"dfir_rs/util/unsync/mpsc/struct.Receiver.html\" title=\"struct dfir_rs::util::unsync::mpsc::Receiver\">Receiver</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.drop\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#190-192\">Source</a><a href=\"#method.drop\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/ops/drop/trait.Drop.html#tymethod.drop\" class=\"fn\">drop</a>(&amp;mut self)</h4></section></summary><div class='docblock'>Executes the destructor for this type. <a href=\"https://doc.rust-lang.org/nightly/core/ops/drop/trait.Drop.html#tymethod.drop\">Read more</a></div></details></div></details>","Drop","dfir_rs::util::tcp::TcpFramedStream"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Receiver%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#147-188\">Source</a><a href=\"#impl-Receiver%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"struct\" href=\"dfir_rs/util/unsync/mpsc/struct.Receiver.html\" title=\"struct dfir_rs::util::unsync::mpsc::Receiver\">Receiver</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.recv\" class=\"method\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#149-151\">Source</a><h4 class=\"code-header\">pub async fn <a href=\"dfir_rs/util/unsync/mpsc/struct.Receiver.html#tymethod.recv\" class=\"fn\">recv</a>(&amp;mut self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;T&gt;</h4></section></summary><div class=\"docblock\"><p>Receive a value asynchronously.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.poll_recv\" class=\"method\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#155-166\">Source</a><h4 class=\"code-header\">pub fn <a href=\"dfir_rs/util/unsync/mpsc/struct.Receiver.html#tymethod.poll_recv\" class=\"fn\">poll_recv</a>(&amp;mut self, ctx: &amp;<a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/task/wake/struct.Context.html\" title=\"struct core::task::wake::Context\">Context</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/task/poll/enum.Poll.html\" title=\"enum core::task::poll::Poll\">Poll</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;T&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Poll for a value.\nNOTE: takes <code>&amp;mut self</code> to prevent multiple concurrent receives.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.close\" class=\"method\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#169-187\">Source</a><h4 class=\"code-header\">pub fn <a href=\"dfir_rs/util/unsync/mpsc/struct.Receiver.html#tymethod.close\" class=\"fn\">close</a>(&amp;mut self)</h4></section></summary><div class=\"docblock\"><p>Closes this receiving end, not allowing more values to be sent while still allowing already-sent values to be consumed.</p>\n</div></details></div></details>",0,"dfir_rs::util::tcp::TcpFramedStream"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Stream-for-Receiver%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#194-200\">Source</a><a href=\"#impl-Stream-for-Receiver%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; Stream for <a class=\"struct\" href=\"dfir_rs/util/unsync/mpsc/struct.Receiver.html\" title=\"struct dfir_rs::util::unsync::mpsc::Receiver\">Receiver</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.Item\" class=\"associatedtype trait-impl\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#195\">Source</a><a href=\"#associatedtype.Item\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">Item</a> = T</h4></section></summary><div class='docblock'>Values yielded by the stream.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.poll_next\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/dfir_rs/util/unsync/mpsc.rs.html#197-199\">Source</a><a href=\"#method.poll_next\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">poll_next</a>(\n    self: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;&amp;mut Self&gt;,\n    ctx: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/task/wake/struct.Context.html\" title=\"struct core::task::wake::Context\">Context</a>&lt;'_&gt;,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/task/poll/enum.Poll.html\" title=\"enum core::task::poll::Poll\">Poll</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Self::Item&gt;&gt;</h4></section></summary><div class='docblock'>Attempt to pull out the next value of this stream, registering the\ncurrent task for wakeup if the value is not yet available, and returning\n<code>None</code> if the stream is exhausted. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.size_hint\" class=\"method trait-impl\"><a href=\"#method.size_hint\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">size_hint</a>(&amp;self) -&gt; (<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>, <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/std/primitive.usize.html\">usize</a>&gt;)</h4></section></summary><div class='docblock'>Returns the bounds on the remaining length of the stream. <a>Read more</a></div></details></div></details>","Stream","dfir_rs::util::tcp::TcpFramedStream"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[7012]}