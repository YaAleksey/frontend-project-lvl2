import _ from 'lodash';
import compareFiles from './logic/logicForCompare.js';
import parsingFile from './chooseParser.js';

const genDiff = (file1, file2) => {
  const objFromFileOne = parsingFile(file1);
  const objFromFileTwo = parsingFile(file2);

  const keysFileOne = Object.keys(objFromFileOne);
  const keysFileTwo = Object.keys(objFromFileTwo);

  const uniqueKeys = (_.union([...keysFileTwo, ...keysFileOne])).sort();

  const genResult = compareFiles(objFromFileOne, objFromFileTwo, uniqueKeys);

  return `{\n  ${genResult.join('\n  ')}\n}`;
};

export default genDiff;
