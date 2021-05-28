import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const readYamlFile = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFile = path.join(__dirname, '..', '__tests__', '__fixtures__', fileName);

  return yaml.load(fs.readFileSync(getFile, 'utf-8'));
};

export default readYamlFile;
