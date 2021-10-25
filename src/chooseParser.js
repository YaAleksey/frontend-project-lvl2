import path from 'path';
import yaml from 'js-yaml';
import readFile from './readFile.js';

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
