import _ from 'lodash';
import readFile from './utils.js';

const genDiff = (fileNameOne, fileNameTwo) => {
  const objFromFileOne = JSON.parse(readFile(fileNameOne));
  const keysFileOne = Object.keys(objFromFileOne);

  const objFromFileTwo = JSON.parse(readFile(fileNameTwo));
  const keysFileTwo = Object.keys(objFromFileTwo);

  const uniqueKeysBothFiles = (_.union([...keysFileTwo, ...keysFileOne])).sort();

  let result = uniqueKeysBothFiles.reduce((acc, key) => {
    if (objFromFileOne[key] === objFromFileTwo[key]) {
      acc.push(`  ${key}: ${objFromFileTwo[key]}`);
      return acc;
    }

    if (!(_.has(objFromFileOne, key)) && _.has(objFromFileTwo, key)) {
      acc.push(`+ ${key}: ${objFromFileTwo[key]}`);
      return acc;
    }

    if (_.has(objFromFileOne, key) && !(_.has(objFromFileTwo, key))) {
      acc.push(`- ${key}: ${objFromFileOne[key]}`);
      return acc;
    }

    if (_.has(objFromFileOne, key) && _.has(objFromFileTwo, key)) {
      acc.push(`- ${key}: ${objFromFileOne[key]}`);
      acc.push(`+ ${key}: ${objFromFileTwo[key]}`);
      return acc;
    }
    return acc;
  }, []);

  result = `{\n  ${result.join('\n  ')}\n}`;
  return result;
};

export default genDiff;
