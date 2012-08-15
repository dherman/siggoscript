/* lexical grammar */

%lex
esc                                                              "\\"
slash                                                            "/"
nl                                                               "\n"

%%
\s+                                                              /* skip whitespace */
{slash}{slash}[^\n]*                                             /* skip comments */
(?:[0]|(?:[1-9][0-9]*("."[0-9]+)?))                              return 'NUMBER';
\"(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])*\"    yytext = yytext.substr(1,yyleng-2); return 'STRING';
"`"(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^`{esc}])*"`"  yytext = yytext.substr(1,yyleng-2); return 'TEMPLATE';
"false"                                                          return 'BOOLEAN';
"true"                                                           return 'BOOLEAN';
"null"                                                           return 'NULL';
"this"                                                           return 'THIS';
"return"                                                         return 'RETURN';
"let"                                                            return 'LET';
[a-zA-Z_]+                                                       return 'IDENT';
"+"                                                              return '+';
"!"                                                              return '!';
"="                                                              return '=';
\[                                                               return '[';
\]                                                               return ']';
"."                                                              return 'DOT';
","                                                              return ',';
"("                                                              return '(';
")"                                                              return ')';
"{"                                                              return '{';
"}"                                                              return '}';
";"                                                              return 'SEMI';
<<EOF>>                                                          return 'EOF';

/lex

%start program

%%

program
    : stmts EOF
          {return $1;}
    ;

ident
    : IDENT
          {$$ = { tag: 'ident', loc: @$, value: $1 };}
    ;

stmts
    : stmts stmt
          {$$ = $1; $$.push($2);}
    | 
          {$$ = [];}
    ;

stmt
    : LET decls SEMI
          {$$ = { tag: 'let', loc: @$, decls: $2 };}
    | expr SEMI
          {$$ = $1;}
    ;

decls
    : decls ',' decl
          {$$ = $1; $$.push($3);}
    | decl
          {$$ = [$1];}
    ;

decl
    : lval '=' expr
          {$$ = { decl: $1, loc: @$, val: $3 };}
    | ident '(' params ')' '=' expr
          {$$ = { decl: $1, loc: @$, params: $3, val: $6 };}
    ;

params
    : params ',' ident
          {$$ = $1; $$.push($3);}
    | ident
          {$$ = [$1];}
    ;

lval
    : BOOLEAN
          {$$ = { tag: 'boolean', loc: @$, source: $1, value: $1 === 'true' };}
    | NUMBER
          {$$ = { tag: 'number', loc: @$, source: $1, value: +$1 };}
    | STRING
          {$$ = { tag: 'string', loc: @$, source: $1, value: $1 };}
    | TEMPLATE
          {$$ = { tag: 'template', loc: @$, source: $1 };}
    | ident
          {$$ = $1;}
    ;

args
    : '(' ')'
          {$$ = [];}
    | '(' arglist ')'
          {$$ = $2;}
    ;

arglist
    : expr
          {$$ = [$1];}
    | arglist ',' expr
          {$$ = $1; $$.push($3);}
    ;

primexpr
    : lval
          {$$ = $1;}
    | '[' ']'
          {$$ = { tag: 'array', loc: @$, elts: [] };}
    | '[' expr ']'
          {$$ = { tag: 'array', loc: @$, elts: [$2] };}
    | '{' '}'
          {$$ = { tag: 'object', loc: @$ };}
    | '(' expr ')'
          {$$ = $2;}
    ;

memexpr
    : primexpr
          {$$ = $1;}
    | memexpr '[' expr ']'
          {$$ = { tag: 'lookup', loc: @$, obj: $1, prop: $3 };}
    | memexpr DOT ident
          {$$ = { tag: 'get', loc: @$, obj: $1, prop: $3 };}
    ;

callexpr
    : memexpr args
          {$$ = { tag: 'call', loc: @$, fun: $1, args: $2 };}
    | callexpr args
          {$$ = { tag: 'call', loc: @$, fun: $1, args: $2 };}
    | callexpr '[' expr ']'
          {$$ = { tag: 'lookup', loc: @$, obj: $1, prop: $3 };}
    | callexpr DOT ident
          {$$ = { tag: 'get', loc: @$, obj: $1, prop: $3 };}
    ;

lhsexpr
    : memexpr
          {$$ = $1;}
    | callexpr
          {$$ = $1;}
    ;

unexpr
    : lhsexpr
          {$$ = $1;}
    | '!' unexpr
          {$$ = { tag: 'unary', loc: @$, op: '!', arg: $2 };}
    ;

expr
    : unexpr
          {$$ = $1;}
    | expr '+' unexpr
          {$$ = { tag: 'plus', loc: @$, left: $1, right: $3 };}
    ;
