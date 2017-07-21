'use strict';

// given the following node types, determine how to recurse down the AST tree
const ASTChildMapping = {
  Program: 'body',
  AssignmentExpression: 'right',
  VariableDeclaration: 'declarations',
  VariableDeclarator: 'init',
  ExpressionStatement: 'expression',
  ObjectExpression: 'properties',
  Property: 'value',
  ArrayExpression: 'elements',
  FunctionExpression: 'body',
  BlockStatement: 'body',
  MemberExpression: 'object',
  ArrowFunctionExpression: 'body',
  LogicalExpression: ['left', 'right'],
  BinaryExpression: ['left', 'right'],
  ClassExpression: ['body', 'superClass'],
  ClassDeclaration: ['body', 'superClass'],
  ClassBody: 'body',
  IfStatement: ['test', 'consequent', 'alternate'],
  ConditionalExpression: ['test', 'consequent', 'alternate'],
  FunctionDeclaration: 'body',
  TemplateLiteral: 'expressions',
  MethodDefinition: 'value',
  ReturnStatement: 'value',
  UnaryExpression: 'value',
  NewExpression: ['callee', 'arguments'],
  ThrowStatement: 'argument'
};


function traverse(node, requires) {

  requires = requires || [];

  if (!node) {
    return;
  }
  if (Array.isArray(node)) {
    return node.forEach(elm => traverse(elm, requires));
  }

  const children = ASTChildMapping[node.type];

  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => traverse(node[child], requires));
    } else {
      traverse(node[children], requires);
    }
  } else if (node.type === 'CallExpression') {
    if (node.callee.name === 'require') {
      requires.push(node.arguments[0].value);
    } else {
      traverse(node.callee, requires);
    }
  }

  return requires;

};

module.exports = opts => ast => {
  const requires = traverse(ast);
  return requires
    .filter(name => name[0] !== '.' && name[0] !== '/')
    .map(name => {
      return name[0] === '@' ? name.split('/').slice(0, 2).join('/') : name.split('/')[0];
    });
};
