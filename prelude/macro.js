function Macro(name, formals, body, env) {
    this._name = name;
    this._formals = formals.map(f => f.value);
    this._body = body;
    this._env = env;
}

Macro.prototype.expand = function(actuals) {
    if (this._formals.length !== actuals.length) {
        throw new SyntaxError("macro " + this._name +
                              " expects " + this._formals.length +
                              " arguments, got " + actuals.length);
    }

    return subst(this._body, this._formals, actuals);
};

function subst(node, formals, actuals) {
    if (Array.isArray(node)) {
        return node.map(subnode => subst(subnode, formals, actuals));
    }

    if (typeof node !== 'object' || node === null)
        return node;

    if (node.tag === 'ident') {
        var i = formals.indexOf(node.value);
        return i === -1 ? node : actuals[i];
    }

    var result = {};

    for (var key in node) {
        if (key === 'loc') {
            result.loc = node.loc;
            continue;
        }
        result[key] = subst(node[key], formals, actuals);
    }

    return result;
}

module.exports = Macro;
