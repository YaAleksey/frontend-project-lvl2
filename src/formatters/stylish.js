import isObject from '../objectOrNot.js';
import createIndent from '../createIndent.js';

const valProcessing = (val, depth) => {
  if (!isObject(val)) {
    return `${val}`;
  }

  const indents = createIndent(depth);
  const lines = Object
    .entries(val)
    .map(([key, value]) => {
      if (!isObject(value)) {
        return `${indents.openBracket}  ${key}: ${value}`;
      }

      return `${indents.openBracket}  ${key}: ${valProcessing(value, depth + 2)}`;
    });

  return ['{', ...lines, `${indents.closeBracket}}`].join('\n');
};

const treeInStr = (nodes, depth = 1) => {
  const indents = createIndent(depth);

  const result = nodes.map((node) => {
    const makeValue = valProcessing(node.value, depth + 2);

    switch (node.status) {
      case 'changed':
        return `${indents.openBracket}  ${node.key}: ${treeInStr(node.children, depth + 2)}`;

      case 'added':
        return `${indents.openBracket}+ ${node.key}: ${makeValue}`;

      case 'deleted':
        return `${indents.openBracket}- ${node.key}: ${makeValue}`;

      case 'unchanged':
        return `${indents.openBracket}  ${node.key}: ${makeValue}`;

      case 'modified':
        return [
          `${indents.openBracket}- ${node.key}: ${valProcessing(node.oldValue, depth + 2)}`,
          `${indents.openBracket}+ ${node.key}: ${valProcessing(node.newValue, depth + 2)}`,
        ].join('\n');

      default:
        return 'Error: unexpected status!';
    }
  });

  return ['{', ...result, `${indents.closeBracket}}`].join('\n');
};

export default treeInStr;
