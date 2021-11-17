export default (level) => {
  const replacer = '  ';
  const spacesCount = 1;
  const indentSize = level * spacesCount;

  const indents = {
    openBracket: replacer.repeat(indentSize),
    closeBracket: replacer.repeat(indentSize - spacesCount),
  };

  return indents;
};
