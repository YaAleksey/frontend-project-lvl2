import genTree from './genTree.js';
import parsingFile from './chooseParser.js';
import formats from './formatters/formattersList.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const firstObj = parsingFile(file1);
  const secondObj = parsingFile(file2);
  const diff = genTree(firstObj, secondObj);
  const chooseFormat = formats(formatName);

  return chooseFormat(diff);
};

export default genDiff;
