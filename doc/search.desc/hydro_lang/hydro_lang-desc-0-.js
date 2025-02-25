searchState.loadedDescShard("hydro_lang", 0, "Creates a quoted expression for Hydro.\nMarks the stream as being bounded, which means that it is …\nMarks the stream as being unbounded, which means that it …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nRepresents a forward reference in the graph that will be …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nType of ID used to switch between different subgraphs at …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nAn leaf in a Hydro graph, which is an pipeline that doesn…\nAn intermediate node in a Hydro graph, which consumes data …\nA source in a Hydro graph, where data enters the graph.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nGenerates a stream with values emitted at a fixed …\nGenerates a stream with values emitted at a fixed interval …\nGiven the ordering guarantees of the input, determines the …\nA free variable representing the cluster’s own ID. When …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nMarks the stream as being inside the single global clock …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns an optional value corresponding to the latest …\nGiven a tick, returns a optional value corresponding to a …\nTransforms the optional value by applying a function <code>f</code> to …\nEagerly samples the optional as fast as possible, …\nGiven a time interval, returns a stream corresponding to …\nReturns (op_id, count)\nLimitations: Cannot decouple across a cycle. Can only …\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nDon’t expose partition members to the cluster\nReplace CLUSTER_SELF_ID with the ID of the original node …\nFields that could be used for partitioning\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nLimitations: Can only partition sends to clusters (not …\nStructure for tracking expressions known to have …\nTags the expression as commutative.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nGiven a tick, returns a singleton value corresponding to a …\nReturns a singleton value corresponding to the latest …\nEagerly samples the singleton as fast as possible, …\nGiven a time interval, returns a stream corresponding to …\nThe weaker of the two orderings.\nHelper trait for determining the weakest of two orderings.\nMarks the stream as having no order, which means that the …\nAn ordered sequence stream of elements of type <code>T</code>.\nMarks the stream as being totally ordered, which means …\nGiven a stream of pairs <code>(K, V1)</code> and a bounded stream of …\nExplicitly “casts” the stream to a type with a …\nProduces a new stream that first emits the elements of the …\nClone each element of the stream; akin to …\nAllow this stream through if the argument (a Bounded …\nAllow this stream through if the argument (a Bounded …\nComputes the number of elements in the stream as a …\nForms the cross-product (Cartesian product, cross-join) of …\nGenerates a stream that maps each input element <code>i</code> to a …\nReturns a stream with the current count tupled with each …\nCreates a stream containing only the elements of the input …\nAn operator that both filters and maps. It yields only the …\nOutputs everything in this stream that is <em>not</em> contained in …\nComputes the first element in the stream as an <code>Optional</code>, …\nFor each item <code>i</code> in the input stream, transform <code>i</code> using <code>f</code> …\nLike <code>Stream::flat_map_ordered</code>, but allows the …\nFor each item <code>i</code> in the input stream, treat <code>i</code> as an <code>Iterator</code>…\nLike <code>Stream::flatten_ordered</code>, but allows the …\nCombines elements of the stream into a <code>Singleton</code>, by …\nCombines elements of the stream into a <code>Singleton</code>, by …\nA special case of <code>Stream::fold</code>, in the spirit of SQL’s …\nA special case of <code>Stream::fold_commutative</code>, in the spirit …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nAn operator which allows you to “inspect” each element …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGiven two streams of pairs <code>(K, V1)</code> and <code>(K, V2)</code>, produces a …\nGiven a stream of pairs <code>(K, V)</code>, produces a new stream of …\nComputes the last element in the stream as an <code>Optional</code>, …\nProduces a stream based on invoking <code>f</code> on each element in …\nComputes the maximum element in the stream as an <code>Optional</code>, …\nComputes the maximum element in the stream as an <code>Optional</code>, …\nComputes the minimum element in the stream as an <code>Optional</code>, …\nCombines elements of the stream into an <code>Optional</code>, by …\nCombines elements of the stream into a <code>Optional</code>, by …\nA special case of <code>Stream::reduce</code>, in the spirit of SQL’s …\nA special case of <code>Stream::reduce_commutative</code>, in the …\nConsumes a stream of <code>Future&lt;T&gt;</code>, produces a new stream of …\nConsumes a stream of <code>Future&lt;T&gt;</code>, produces a new stream of …\nGiven a time interval, returns a stream corresponding to …\nProduces a new stream that emits the input elements in …\nReturns a stream corresponding to the latest batch of …\nGiven a tick, returns a stream corresponding to a batch of …\nGiven a timeout duration, returns an <code>Optional</code>  which will …\nProduces a new stream that interleaves the elements of the …\nTakes one stream as input and filters out any duplicate …")