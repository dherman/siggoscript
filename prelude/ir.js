function Plus(left, right) {
    return { tag: 'plus', left, right, type: 'number' };
}

function isStringish(elt) {
    return elt.type === 'string' || elt.type === 'object';
}

function Cat(elts) {
    if (!isStringish(elts[0]) && (elts.length < 2 || !isStringish(elts[1])))
        elts.splice(1, 0, Array());

    return { tag: 'cat', elts, type: 'string' };
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
    return { tag: 'unary', op, arg, type: unaryType(op) };
}

function Array(arg) {
    return { tag: 'array', elts: arg ? [arg] : [], type: 'object' };
}

function Call(fun, args) {
    return { tag: 'call', fun, args, type: 'any' };
}

function Lookup(obj, prop) {
    return { tag: 'lookup', obj, prop, type: 'any' };
}

exports.Plus = Plus;
exports.Cat = Cat;
exports.Unary = Unary;
exports.Array = Array;
exports.Call = Call;
exports.Call = Call;
exports.Lookup = Lookup;
