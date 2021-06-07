import path from 'path';
import readFile from './readFile.js';
import yaml from 'js-yaml';

const parsingFile = (fileName) => {
  const format = path.extname(fileName);

  if (format === '.yml') {
    return yaml.load(readFile(fileName));
  }

  if (format === '.json') {
    return JSON.parse(readFile(fileName));
  }
  return JSON.parse(readFile(fileName));
};

export default parsingFile;
