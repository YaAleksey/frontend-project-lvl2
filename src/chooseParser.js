import path from 'path';
import readYamlFile from './ymlParser.js';
import readJsonFile from './jsonParser.js';

const parsingFile = (fileName) => {
  const format = path.extname(fileName);

  if (format === '.yml') {
    return readYamlFile(fileName);
  }

  if (format === '.json') {
    return JSON.parse(readJsonFile(fileName));
  }
  return JSON.parse(readJsonFile(fileName));
};

export default parsingFile;
