import path from 'path';
import yaml from 'js-yaml';

const parsingFile = (fileName, contentFile) => {
  const format = path.extname(fileName);

  if (format === '.yml' || format === '.yaml') {
    return yaml.load(contentFile);
  }

  return JSON.parse(contentFile);
};

export default parsingFile;
