export default (level) => {
  const indents = [];
  const replacer = '  ';
  const spacesCount = 1;
  const indentSize = level * spacesCount;

  indents[0] = replacer.repeat(indentSize);
  indents[1] = replacer.repeat(indentSize - spacesCount);

  return indents;
};
