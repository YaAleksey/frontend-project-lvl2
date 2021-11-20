import _ from 'lodash';

const createIndent = (level) => {
  const replacer = '  ';
  const spacesCount = 1;
  const indentSize = level * spacesCount;

  const indents = {
    openBracket: replacer.repeat(indentSize),
    closeBracket: replacer.repeat(indentSize - spacesCount),
  };

  return indents;
};

const extractValue = (val, depth) => {
  if (!_.isObject(val)) {
    return `${val}`;
  }

  const indents = createIndent(depth);
  const lines = Object
    .entries(val)
    .map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${indents.openBracket}  ${key}: ${value}`;
      }

      return `${indents.openBracket}  ${key}: ${extractValue(value, depth + 2)}`;
    });

  return ['{', ...lines, `${indents.closeBracket}}`].join('\n');
};

const makeStylishOutput = (nodes, depth = 1) => {
  const indents = createIndent(depth);

  const result = nodes.map((node) => {
    const makeValue = extractValue(node.value, depth + 2);

    switch (node.status) {
      case 'changed':
        return `${indents.openBracket}  ${node.key}: ${makeStylishOutput(node.children, depth + 2)}`;

      case 'added':
        return `${indents.openBracket}+ ${node.key}: ${makeValue}`;

      case 'deleted':
        return `${indents.openBracket}- ${node.key}: ${makeValue}`;

      case 'unchanged':
        return `${indents.openBracket}  ${node.key}: ${makeValue}`;

      case 'modified':
        return [
          `${indents.openBracket}- ${node.key}: ${extractValue(node.oldValue, depth + 2)}`,
          `${indents.openBracket}+ ${node.key}: ${extractValue(node.newValue, depth + 2)}`,
        ].join('\n');

      default:
        return 'Error: unexpected status!';
    }
  });

  return ['{', ...result, `${indents.closeBracket}}`].join('\n');
};

export default makeStylishOutput;
