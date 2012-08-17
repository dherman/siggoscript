PRELUDE_COMPILER=build/parser.js build/ir.js build/env.js build/macro.js build/trans.js build/emit.js build/compile.js build/build.js

all: prelude.js

build/parser.js: build/grammar.jison
	jison -o build/parser.js build/grammar.jison

prelude.js: build/prelude.js.in $(PRELUDE_COMPILER)
	node build/build.js build/prelude.js.in > prelude.js
