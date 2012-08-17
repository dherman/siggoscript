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

module.exports = emit;
