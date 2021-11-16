export default (level) => {
  const indents = [];
  const replacer = '  ';
  const spacesCount = 1;
  const indentSize = level * spacesCount;

  indents.push(replacer.repeat(indentSize));
  indents.push(replacer.repeat(indentSize - spacesCount));

  return indents;
};
