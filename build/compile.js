var parser = require('./parser'),
    Translator = require('./trans'),
    emit = require('./emit');

function StatementWriter(out) {
    this._out = out;
    this._start = true;
    this._guarded = false;
}

StatementWriter.prototype.newline = function() {
    if (this._guarded)
        this._out.write(')');
    this._out.write('\n');
    this._start = true;
    this._guarded = false;
};

StatementWriter.prototype.write = function(str) {
    if (this._start) {
        if (str[0] !== '!') {
            this._guarded = true;
            this._out.write('!(');
        }
    }
    this._out.write(str);
    this._start = false;
};

function compile(source, out) {
    var ast = parser.parse(source);
    var translator = new Translator();

    out = new StatementWriter(out);

    ast.forEach(function(node) {
        try {
            node = translator.stmt(node);
        } catch (e) {
            throw new SyntaxError(node.loc.first_line + ": " + e.message);
        }
        if (node) {
            emit(node, out);
            out.newline();
        }
    });
}

module.exports = compile;
