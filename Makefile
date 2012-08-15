all: prelude.js

build/pre.parser.js: build/pre.jison
	jison -o build/pre.parser.js build/pre.jison

prelude.js: build/pre.parser.js build/build.js build/pre.js build/prelude.pre
	node build/build.js build/prelude.pre > prelude.js
