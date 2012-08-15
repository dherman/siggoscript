/* Jison generated parser */
var pre = (function(){

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"program":3,"stmts":4,"EOF":5,"ident":6,"IDENT":7,"stmt":8,"LET":9,"decls":10,"SEMI":11,"expr":12,",":13,"decl":14,"lval":15,"=":16,"(":17,"params":18,")":19,"BOOLEAN":20,"NUMBER":21,"STRING":22,"TEMPLATE":23,"args":24,"arglist":25,"primexpr":26,"[":27,"]":28,"{":29,"}":30,"memexpr":31,"DOT":32,"callexpr":33,"lhsexpr":34,"unexpr":35,"!":36,"+":37,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"IDENT",9:"LET",11:"SEMI",13:",",16:"=",17:"(",19:")",20:"BOOLEAN",21:"NUMBER",22:"STRING",23:"TEMPLATE",27:"[",28:"]",29:"{",30:"}",32:"DOT",36:"!",37:"+"},
productions_: [0,[3,2],[6,1],[4,2],[4,0],[8,3],[8,2],[10,3],[10,1],[14,3],[14,6],[18,3],[18,1],[15,1],[15,1],[15,1],[15,1],[15,1],[24,2],[24,3],[25,1],[25,3],[26,1],[26,2],[26,3],[26,2],[26,3],[31,1],[31,4],[31,3],[33,2],[33,2],[33,4],[33,3],[34,1],[34,1],[35,1],[35,2],[12,1],[12,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:return $$[$0-1];
break;
case 2:this.$ = { tag: 'ident', loc: this._$, value: $$[$0] };
break;
case 3:this.$ = $$[$0-1]; this.$.push($$[$0]);
break;
case 4:this.$ = [];
break;
case 5:this.$ = { tag: 'let', loc: this._$, decls: $$[$0-1] };
break;
case 6:this.$ = $$[$0-1];
break;
case 7:this.$ = $$[$0-2]; this.$.push($$[$0]);
break;
case 8:this.$ = [$$[$0]];
break;
case 9:this.$ = { decl: $$[$0-2], loc: this._$, val: $$[$0] };
break;
case 10:this.$ = { decl: $$[$0-5], loc: this._$, params: $$[$0-3], val: $$[$0] };
break;
case 11:this.$ = $$[$0-2]; this.$.push($$[$0]);
break;
case 12:this.$ = [$$[$0]];
break;
case 13:this.$ = { tag: 'boolean', loc: this._$, source: $$[$0], value: $$[$0] === 'true' };
break;
case 14:this.$ = { tag: 'number', loc: this._$, source: $$[$0], value: +$$[$0] };
break;
case 15:this.$ = { tag: 'string', loc: this._$, source: $$[$0], value: $$[$0] };
break;
case 16:this.$ = { tag: 'template', loc: this._$, source: $$[$0] };
break;
case 17:this.$ = $$[$0];
break;
case 18:this.$ = [];
break;
case 19:this.$ = $$[$0-1];
break;
case 20:this.$ = [$$[$0]];
break;
case 21:this.$ = $$[$0-2]; this.$.push($$[$0]);
break;
case 22:this.$ = $$[$0];
break;
case 23:this.$ = { tag: 'array', loc: this._$, elts: [] };
break;
case 24:this.$ = { tag: 'array', loc: this._$, elts: [$$[$0-1]] };
break;
case 25:this.$ = { tag: 'object', loc: this._$ };
break;
case 26:this.$ = $$[$0-1];
break;
case 27:this.$ = $$[$0];
break;
case 28:this.$ = { tag: 'lookup', loc: this._$, obj: $$[$0-3], prop: $$[$0-1] };
break;
case 29:this.$ = { tag: 'get', loc: this._$, obj: $$[$0-2], prop: $$[$0] };
break;
case 30:this.$ = { tag: 'call', loc: this._$, fun: $$[$0-1], args: $$[$0] };
break;
case 31:this.$ = { tag: 'call', loc: this._$, fun: $$[$0-1], args: $$[$0] };
break;
case 32:this.$ = { tag: 'lookup', loc: this._$, obj: $$[$0-3], prop: $$[$0-1] };
break;
case 33:this.$ = { tag: 'get', loc: this._$, obj: $$[$0-2], prop: $$[$0] };
break;
case 34:this.$ = $$[$0];
break;
case 35:this.$ = $$[$0];
break;
case 36:this.$ = $$[$0];
break;
case 37:this.$ = { tag: 'unary', loc: this._$, op: '!', arg: $$[$0] };
break;
case 38:this.$ = $$[$0];
break;
case 39:this.$ = { tag: 'plus', loc: this._$, left: $$[$0-2], right: $$[$0] };
break;
}
},
table: [{3:1,4:2,5:[2,4],7:[2,4],9:[2,4],17:[2,4],20:[2,4],21:[2,4],22:[2,4],23:[2,4],27:[2,4],29:[2,4],36:[2,4]},{1:[3]},{5:[1,3],6:21,7:[1,22],8:4,9:[1,5],12:6,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{1:[2,1]},{5:[2,3],7:[2,3],9:[2,3],17:[2,3],20:[2,3],21:[2,3],22:[2,3],23:[2,3],27:[2,3],29:[2,3],36:[2,3]},{6:26,7:[1,22],10:23,14:24,15:25,20:[1,17],21:[1,18],22:[1,19],23:[1,20]},{11:[1,27],37:[1,28]},{11:[2,38],13:[2,38],19:[2,38],28:[2,38],37:[2,38]},{11:[2,36],13:[2,36],19:[2,36],28:[2,36],37:[2,36]},{6:21,7:[1,22],15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:29,36:[1,9]},{11:[2,34],13:[2,34],17:[1,33],19:[2,34],24:32,27:[1,30],28:[2,34],32:[1,31],37:[2,34]},{11:[2,35],13:[2,35],17:[1,33],19:[2,35],24:34,27:[1,35],28:[2,35],32:[1,36],37:[2,35]},{11:[2,27],13:[2,27],17:[2,27],19:[2,27],27:[2,27],28:[2,27],32:[2,27],37:[2,27]},{11:[2,22],13:[2,22],17:[2,22],19:[2,22],27:[2,22],28:[2,22],32:[2,22],37:[2,22]},{6:21,7:[1,22],12:38,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],28:[1,37],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{30:[1,39]},{6:21,7:[1,22],12:40,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{11:[2,13],13:[2,13],16:[2,13],17:[2,13],19:[2,13],27:[2,13],28:[2,13],32:[2,13],37:[2,13]},{11:[2,14],13:[2,14],16:[2,14],17:[2,14],19:[2,14],27:[2,14],28:[2,14],32:[2,14],37:[2,14]},{11:[2,15],13:[2,15],16:[2,15],17:[2,15],19:[2,15],27:[2,15],28:[2,15],32:[2,15],37:[2,15]},{11:[2,16],13:[2,16],16:[2,16],17:[2,16],19:[2,16],27:[2,16],28:[2,16],32:[2,16],37:[2,16]},{11:[2,17],13:[2,17],17:[2,17],19:[2,17],27:[2,17],28:[2,17],32:[2,17],37:[2,17]},{11:[2,2],13:[2,2],16:[2,2],17:[2,2],19:[2,2],27:[2,2],28:[2,2],32:[2,2],37:[2,2]},{11:[1,41],13:[1,42]},{11:[2,8],13:[2,8]},{16:[1,43]},{16:[2,17],17:[1,44]},{5:[2,6],7:[2,6],9:[2,6],17:[2,6],20:[2,6],21:[2,6],22:[2,6],23:[2,6],27:[2,6],29:[2,6],36:[2,6]},{6:21,7:[1,22],15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:45,36:[1,9]},{11:[2,37],13:[2,37],19:[2,37],28:[2,37],37:[2,37]},{6:21,7:[1,22],12:46,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{6:47,7:[1,22]},{11:[2,30],13:[2,30],17:[2,30],19:[2,30],27:[2,30],28:[2,30],32:[2,30],37:[2,30]},{6:21,7:[1,22],12:50,15:13,17:[1,16],19:[1,48],20:[1,17],21:[1,18],22:[1,19],23:[1,20],25:49,26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{11:[2,31],13:[2,31],17:[2,31],19:[2,31],27:[2,31],28:[2,31],32:[2,31],37:[2,31]},{6:21,7:[1,22],12:51,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{6:52,7:[1,22]},{11:[2,23],13:[2,23],17:[2,23],19:[2,23],27:[2,23],28:[2,23],32:[2,23],37:[2,23]},{28:[1,53],37:[1,28]},{11:[2,25],13:[2,25],17:[2,25],19:[2,25],27:[2,25],28:[2,25],32:[2,25],37:[2,25]},{19:[1,54],37:[1,28]},{5:[2,5],7:[2,5],9:[2,5],17:[2,5],20:[2,5],21:[2,5],22:[2,5],23:[2,5],27:[2,5],29:[2,5],36:[2,5]},{6:26,7:[1,22],14:55,15:25,20:[1,17],21:[1,18],22:[1,19],23:[1,20]},{6:21,7:[1,22],12:56,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{6:58,7:[1,22],18:57},{11:[2,39],13:[2,39],19:[2,39],28:[2,39],37:[2,39]},{28:[1,59],37:[1,28]},{11:[2,29],13:[2,29],17:[2,29],19:[2,29],27:[2,29],28:[2,29],32:[2,29],37:[2,29]},{11:[2,18],13:[2,18],17:[2,18],19:[2,18],27:[2,18],28:[2,18],32:[2,18],37:[2,18]},{13:[1,61],19:[1,60]},{13:[2,20],19:[2,20],37:[1,28]},{28:[1,62],37:[1,28]},{11:[2,33],13:[2,33],17:[2,33],19:[2,33],27:[2,33],28:[2,33],32:[2,33],37:[2,33]},{11:[2,24],13:[2,24],17:[2,24],19:[2,24],27:[2,24],28:[2,24],32:[2,24],37:[2,24]},{11:[2,26],13:[2,26],17:[2,26],19:[2,26],27:[2,26],28:[2,26],32:[2,26],37:[2,26]},{11:[2,7],13:[2,7]},{11:[2,9],13:[2,9],37:[1,28]},{13:[1,64],19:[1,63]},{13:[2,12],19:[2,12]},{11:[2,28],13:[2,28],17:[2,28],19:[2,28],27:[2,28],28:[2,28],32:[2,28],37:[2,28]},{11:[2,19],13:[2,19],17:[2,19],19:[2,19],27:[2,19],28:[2,19],32:[2,19],37:[2,19]},{6:21,7:[1,22],12:65,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{11:[2,32],13:[2,32],17:[2,32],19:[2,32],27:[2,32],28:[2,32],32:[2,32],37:[2,32]},{16:[1,66]},{6:67,7:[1,22]},{13:[2,21],19:[2,21],37:[1,28]},{6:21,7:[1,22],12:68,15:13,17:[1,16],20:[1,17],21:[1,18],22:[1,19],23:[1,20],26:12,27:[1,14],29:[1,15],31:10,33:11,34:8,35:7,36:[1,9]},{13:[2,11],19:[2,11]},{11:[2,10],13:[2,10],37:[1,28]}],
defaultActions: {3:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                var errStr = "";
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/* skip comments */
break;
case 2:return 21;
break;
case 3:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 22;
break;
case 4:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 23;
break;
case 5:return 20;
break;
case 6:return 20;
break;
case 7:return 'NULL';
break;
case 8:return 'THIS';
break;
case 9:return 'RETURN';
break;
case 10:return 9;
break;
case 11:return 7;
break;
case 12:return 37;
break;
case 13:return 36;
break;
case 14:return 16;
break;
case 15:return 27;
break;
case 16:return 28;
break;
case 17:return 32;
break;
case 18:return 13;
break;
case 19:return 17;
break;
case 20:return 19;
break;
case 21:return 29;
break;
case 22:return 30;
break;
case 23:return 11;
break;
case 24:return 5;
break;
}
};
lexer.rules = [/^\s+/,/^\/\/[^\n]*/,/^(?:[0]|(?:[1-9][0-9]*(\.[0-9]+)?))/,/^"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,/^`(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/,/^false\b/,/^true\b/,/^null\b/,/^this\b/,/^return\b/,/^let\b/,/^[a-zA-Z_]+/,/^\+/,/^!/,/^=/,/^\[/,/^\]/,/^\./,/^,/,/^\(/,/^\)/,/^\{/,/^\}/,/^;/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = pre;
exports.parse = function () { return pre.parse.apply(pre, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}