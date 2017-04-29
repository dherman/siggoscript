var ir = require('./ir');
var Env = require('./env');
var Macro = require('./macro');

function Translator() {
    this._env = new Env();
}

Translator.prototype.stmt = function stmt(node) {
    return node.tag === 'let'
         ? this.decl(node)
         : this.expr(node, 'any');
};

Translator.prototype.decl = function decl(node) {
    node.decls.forEach(function(node) {
        this.bind(node);
    }, this);
};

Translator.prototype.expr = function expr(node, context) {
    switch (node.tag) {
      case 'plus':
        return this.plus(node.left, node.right);
      case 'cat':
        return this.cat(node.elts);
      case 'unary':
        return this.unary(node.op, node.arg, context);
      case 'get':
        return this.get(node.obj, node.prop);
      case 'lookup':
        return this.lookup(node.obj, node.prop);
      case 'call':
        return node.fun.tag === 'ident'
             ? this.callident(node.fun, node.args, context)
             : this.callexpr(node.fun, node.args);
      case 'array':
        if (node.elts.length)
            return ir.Array(this.expr(node.elts[0], 'any'));
        // FALL THROUGH
      case 'object':
        return node;
      case 'number':
        return this.number(node, context);
      case 'string':
        return this.string(node, context);
      case 'boolean':
      case 'ident':
        return this.expr(this._env.get(node), context);
    }
};

Translator.prototype.number = function number(node, context) {
    var n = node.value;
    if ((n >>> 0) !== n)
        throw new RangeError("cannot compile number " + n);
    if (n < 10)
        return this.expr(this._env.get(node), context);

    return this.asNumber(ir.Cat([].map.call(String(n), function(ch, i) {
        return this.expr({ tag: 'number', value: +ch }, 'string');
    }, this)), context);
};

Translator.prototype.string = function string(node, context) { 
    var s = node.value;
    if (s.length <= 1)
        return this.expr(this._env.get(node), context);

    var found = this._env.lookup(node);
    if (found)
        return this.expr(found, context);

    var split = [].slice.call(node.value);
    return this.cat([].slice.call(node.value).map(ch => ({
        tag: 'string',
        source: ch,
        value: ch
    })));
};

Translator.prototype.plus = function plus(left, right) {
    return ir.Plus(this.expr(left, 'number'), this.expr(right, 'number'));
};

Translator.prototype.cat = function cat(elts) {
    return ir.Cat(elts.map(function(elt) {
        return this.expr(elt, 'string'); //context);
    }, this));
};

Translator.prototype.unary = function unary(op, arg, context) {
    switch (op) {
      case '!':
        return ir.Unary('!', this.expr(arg, 'boolean'));
      case '+':
        return this.asNumber(this.expr(arg, 'number'), context);
    }
};

Translator.prototype.get = function get(obj, prop) {
    return this.lookup(obj, { tag: 'string', source: prop.value, value: prop.value });
};

Translator.prototype.lookup = function lookup(obj, prop) {
    return ir.Lookup(this.expr(obj, 'object'), this.expr(prop, 'string'));
};

Translator.prototype.asNumber = function asNumber(node, context) {
    return context === 'number' ? node : ir.Unary('+', node);
};

Translator.prototype.asString = function asString(node, context) {
    if (context === 'string')
        return node;
    return ir.Cat([node]);
};

Translator.prototype.callident = function callident(ident, args, context) {
    var name = ident.value;

    if (name === '_N') {
        if (args.length !== 1)
            throw new SyntaxError("string cast expects one argument, got " + args.length);
        return this.asNumber(this.expr(args[0], 'number'), context);
    }

    if (name === '_S') {
        if (args.length !== 1)
            throw new SyntaxError("number cast expects one argument, got " + args.length);
        return this.asString(this.expr(args[0], 'string'), context);
    }

    var binding = this._env.get(ident);

    if (binding instanceof Macro)
        return this.expr(binding.expand(args), context);

    return ir.Call(this.expr(binding, 'any'), args.map(function(arg) {
        return this.expr(arg, 'any');
    }, this));
};

Translator.prototype.callexpr = function callexpr(fun, args) {
    return ir.Call(this.expr(fun, 'any'), args.map(function(arg) {
        return this.expr(arg, 'any');
    }, this));
};


// (decl, Env) -> void
Translator.prototype.bind = function bind(node) {
    // decl = { decl: lval, params: [ident]?, val: expr }
    if (node.params)
        this._env.set(node.decl, new Macro(node.decl, node.params, node.val, this._env));
    else
        this._env.set(node.decl, node.val);
};

module.exports = Translator;
