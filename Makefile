PRELUDE_COMPILER=prelude/parser.js prelude/ir.js prelude/env.js prelude/macro.js prelude/trans.js prelude/emit.js prelude/compile.js prelude/build.js

all: prelude.js

prelude/parser.js: prelude/grammar.jison
	jison -o prelude/parser.js prelude/grammar.jison

prelude.js: prelude/prelude.js.in $(PRELUDE_COMPILER)
	node prelude/build.js prelude/prelude.js.in > prelude.js
