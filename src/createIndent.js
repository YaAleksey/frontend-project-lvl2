export default (level) => {
  const result = [];
  const replacer = '  ';
  const spacesCount = 1;
  const indentSize = level * spacesCount;

  result.push(replacer.repeat(indentSize));
  result.push(replacer.repeat(indentSize - spacesCount));

  return result;
};
