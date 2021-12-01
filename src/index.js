import genTree from './genTree.js';
import parsingFile from './chooseParser.js';
import formats from './formatters/formattersList.js';
import readFile from './readFile.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const readFirst = readFile(file1);
  const readSecond = readFile(file2);

  const firstFile = parsingFile(file1, readFirst);
  const secondFile = parsingFile(file2, readSecond);

  const diff = genTree(firstFile, secondFile);
  const chooseFormat = formats(formatName);

  return chooseFormat(diff);
};

export default genDiff;
