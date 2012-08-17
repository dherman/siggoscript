var Macro = require('./macro');

function Env(parent) {
    this._parent = parent;
    this._booleans   = parent ? parent._booleans   : Object.create(null); // boolean -> expr
    this._numbers    = parent ? parent._numbers    : Object.create(null); // number -> expr
    this._characters = parent ? parent._characters : Object.create(null); // string -> expr
    this._symbols    = parent ? parent._symbols    : Object.create(null); // string -> expr
    this._vars       = Object.create((parent && parent._vars) || null);   // string -> expr | Macro
}

Env.prototype._tableFor = function(node) {
    switch (node.tag) {
      case 'boolean':
        return this._booleans;
      case 'number':
        return this._numbers;
      case 'string':
        return node.value.length === 1
             ? this._characters
             : this._symbols;
      case 'ident':
        return this._vars;
      default:
        throw new SyntaxError("cannot bind node type '" + node.tag + "'");
    }
};

// (lval, expr) -> void
Env.prototype.set = function(node, expr) {
    this._tableFor(node)[node.value] = expr;
};

// (string, [ident], expr) -> void
Env.prototype.def = function(name, params, body) {
    this._vars[name] = new Macro(name, params, body);
};

Env.prototype.lookup = function(node) {
    return this._tableFor(node)[node.value];
};

Env.prototype.get = function(node) {
    var result = this.lookup(node);
    if (!result)
        throw new SyntaxError(node.tag + " " + unquote(node) + " is not bound");
    return result;
};

function unquote(lval) {
    switch (lval.tag) {
      case 'boolean':
      case 'number':
      case 'ident':
        return lval.value;
      case 'string':
        return "\"" + lval.value + "\"";
    }
}

module.exports = Env;
