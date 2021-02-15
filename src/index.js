import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (fileName) => path.join(__dirname, '..', 'src', fileName);
  const readFile = (fileName) => JSON.parse(fs.readFileSync(getFixturePath(fileName), 'utf-8'));

  const textFileOne = readFile('file1.json');
  const textFileTwo = readFile('file2.json');  

  const keysFileOne = Object.keys(textFileOne);
  const keysFileTwo = Object.keys(textFileTwo);
  const uniqueKeysBothFiles = (_.union([...keysFileTwo, ...keysFileOne])).sort();

  const genDiff = (uniqueKeysBothFiles) => uniqueKeysBothFiles
    .reduce((acc, key) => {
    if (textFileOne[key] === textFileTwo[key]) {
      acc.push(`  ${key}: ${textFileTwo[key]}`);
        return acc;
    }

    if (!(_.has(textFileOne, key)) && _.has(textFileTwo, key)) {
      acc.push(`+ ${key}: ${textFileTwo[key]}`);
        return acc;
    }

    if (_.has(textFileOne, key) && !(_.has(textFileTwo, key))) {
      acc.push(`- ${key}: ${textFileOne[key]}`);
        return acc;
    }
    
    if (_.has(textFileOne, key) && _.has(textFileTwo, key)) {
      acc.push(`- ${key}: ${textFileOne[key]}`);
      acc.push(`+ ${key}: ${textFileTwo[key]}`);
        return acc;
    }

    return acc;
  }, []);

  export const byExport = () => {
    console.log((genDiff(uniqueKeysBothFiles)).join());
  };
