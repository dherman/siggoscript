var parser = require('./pre.parser'),
    fs = require('fs');

function SyntacticClosure(expr, env) {
    this.expr = expr;
    this.env = env;
}

function Macro(name, formals, body, env) {
    this._name = name;
    this._formals = formals;
    this._body = body;
    this._env = env;
}

Macro.prototype.call = function(actuals) {
    if (this._formals.length !== actuals.length) {
        throw new SyntaxError("macro " + this._name +
                              " expects " + this._formals.length +
                              " arguments, got " + actuals.length);
    }

    var env = new Env(this._env);

    this._formals.forEach(function(formal, i) {
        env._vars[formal.value] = actuals[i];
    });

    return new SyntacticClosure(this._body, env);
};

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

function Plus(left, right) {
    return { tag: 'plus', left: left, right: right, type: 'number' };
}

function Cat(elts) {
    return { tag: 'cat', elts: elts, type: 'string' };
}

function unaryType(op) {
    switch (op) {
      case '+':
        return 'number';
      case '!':
        return 'boolean';
      default:
        throw new Error("unexpected unary operator: " + op);
    }
}

function Unary(op, arg) {
    return { tag: 'unary', op: op, arg: arg, type: unaryType(op) };
}

function Array(arg) {
    return { tag: 'array', elts: arg ? [arg] : [], type: 'object' };
}

function Call(fun, args) {
    return { tag: 'call', fun: fun, args: args, type: 'any' };
}

function Lookup(obj, prop) {
    return { tag: 'lookup', obj: obj, prop: prop, type: 'any' };
}

function Compiler(env) {
    this._env = env || new Env();
}

Compiler.prototype.stmt = function stmt(node) {
    return node.tag === 'let'
         ? this.decl(node)
         : this.expr(node, 'any');
};

Compiler.prototype.decl = function decl(node) {
    node.decls.forEach(function(node) {
        this.bind(node);
    }, this);
};

Compiler.prototype.expr = function expr(node, context) {
    if (node instanceof SyntacticClosure)
        return (new Compiler(node.env)).expr(node.expr, context);

    switch (node.tag) {
      case 'plus':
        return this.plus(node.left, node.right);
      case 'cat':
        return this.cat(node.elts, context);
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
            return Array(this.expr(node.elts[0], 'any'));
        // FALL THROUGH
      case 'object':
        return node;
      case 'number':
        return this.number(node, context);
      case 'string':
        return this.string(node, context);
      case 'template':
        return this.template(node, context);
      case 'boolean':
      case 'ident':
        return this.expr(this._env.get(node), context);
    }
};

Compiler.prototype.number = function number(node, context) {
    var n = node.value;
    if ((n >>> 0) !== n)
        throw new RangeError("cannot compile number " + n);
    if (n < 10)
        return this.expr(this._env.get(node), context);

    var digits = [].slice.call(n + "").map(function(ch, i) {
        return i === 0
             ? this.expr({ tag: 'string', source: ch, value: ch }, 'number')
             : this.expr({ tag: 'number', value: +ch }, 'string');
    }, this);

    return this.asNumber(Cat(digits), context);
};

Compiler.prototype.string = function string(node, context) { 
    var s = node.value;
    if (s.length <= 1)
        return this.expr(this._env.get(node), context);

    var found = this._env.lookup(node);
    if (found)
        return this.expr(found, context);

    var split = [].slice.call(node.value);
    return this.cat([].slice.call(node.value).map(function(ch) {
        return { tag: 'string', source: ch, value: ch };
    }), context);
};

Compiler.prototype.template = function template(node, context) {
    return this.cat(node.source.split(/(\$\{[a-zA-Z_]+\})/)
                               .filter(function(x) { return x })
                               .map(function(segment) {
                                   var match = /^\$\{([a-zA-Z_]+)\}$/.exec(segment);
                                   if (!match)
                                       return { tag: 'string', source: segment, value: segment };
                                   return { tag: 'ident', value: match[1] };
                               }),
                    context);
};

Compiler.prototype.plus = function plus(left, right) {
    return Plus(this.expr(left, 'number'), this.expr(right, 'number'));
};

Compiler.prototype.cat = function cat(elts, context) {
    return Cat(elts.map(function(elt) {
        return this.expr(elt, 'string'); //context);
    }, this));
};

Compiler.prototype.unary = function unary(op, arg, context) {
    switch (op) {
      case '!':
        return Unary('!', this.expr(arg, 'boolean'));
      case '+':
        return this.asNumber(this.expr(arg, 'number'), context);
    }
};

Compiler.prototype.get = function get(obj, prop) {
    return this.lookup(obj, { tag: 'string', source: prop.value, value: prop.value });
};

Compiler.prototype.lookup = function lookup(obj, prop) {
    return Lookup(this.expr(obj, 'object'), this.expr(prop, 'string'));
};

Compiler.prototype.asNumber = function asNumber(node, context) {
    return context === 'number' ? node : Unary('+', node);
};

Compiler.prototype.asString = function asString(node, context) {
    if (context === 'string')
        return node;
    if (node.tag === 'cat') {
        console.log("CAT: " + node.elts.map(function(elt) { return elt.type }).join(", "));
        if (!node.elts.some(function(elt) { return elt.type === 'string' || elt.type === 'object' }) &&
            !node.elts.every(function(elt) { return elt.type === 'boolean' })) {
            node.elts.push(Array());
        }
        return node;
    }
    return Cat([node, Array()]);
};

Compiler.prototype.callident = function callident(ident, args, context) {
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
        return this.expr(binding.call(args), context);

    return Call(this.expr(binding, 'any'), args.map(function(arg) {
        return this.expr(arg, 'any');
    }, this));
};

Compiler.prototype.callexpr = function callexpr(fun, args) {
    return Call(this.expr(fun, 'any'), args.map(function(arg) {
        return this.expr(arg, 'any');
    }, this));
};


// (decl, Env) -> void
Compiler.prototype.bind = function bind(node) {
    // decl = { decl: lval, params: [ident]?, val: expr }
    if (node.params)
        this._env.set(node.decl, new Macro(node.decl, node.params, node.val, this._env));
    else
        this._env.set(node.decl, node.val);
};

function emit(node, out) {
    var parens;

    switch (node.tag) {
      case 'plus':
        emit(node.left, out);
        out.write('+');
        parens = (node.right.tag === 'unary' && node.right.op === '+') || node.right.tag === 'cat';
        if (parens) out.write('(');
        emit(node.right, out);
        if (parens) out.write(')');
        break;

      case 'cat':
        emit(node.elts[0], out);
        for (var i = 1, n = node.elts.length; i < n; i++) {
            var elt = node.elts[i];
            parens = (elt.tag === 'unary' && elt.op === '+') || elt.tag === 'plus';
            out.write('+');
            if (parens) out.write('(');
            emit(elt, out);
            if (parens) out.write(')');
        }
        break;

      case 'unary':
        parens = node.arg.tag === 'plus' || node.arg.tag === 'cat';
        out.write(node.op);
        if (parens) out.write('(');
        emit(node.arg, out);
        if (parens) out.write(')');
        break;

      case 'lookup':
        parens = node.obj.tag === 'unary' || node.obj.tag === 'plus' || node.obj.tag === 'cat';
        if (parens) out.write('(');
        emit(node.obj, out);
        if (parens) out.write(')');
        out.write('[');
        emit(node.prop, out);
        out.write(']');
        break;

      case 'call':
        parens = node.fun.tag === 'plus' || node.fun.tag === 'cat';
        if (parens) out.write('(');
        emit(node.fun, out);
        if (parens) out.write(')');
        out.write('(');
        if (node.args.length)
            emit(node.args[0], out);
        out.write(')');
        break;

      case 'array':
        out.write('[');
        if (node.elts.length)
            emit(node.elts[0], out);
        out.write(']');
        break;

      case 'object':
        out.write('{}');
        break;
    }
}

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

function pre(source, out) {
    var ast = parser.parse(source);
    var compiler = new Compiler();

    out = new StatementWriter(out);

    ast.forEach(function(node) {
        try {
            node = compiler.stmt(node);
        } catch (e) {
            throw new SyntaxError(node.loc.first_line + ": " + e.message);
        }
        if (node) {
            emit(node, out);
            out.newline();
        }
    });
}

module.exports = pre;
