import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const readJsonFile = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFile = path.join(__dirname, '..', '__tests__', '__fixtures__', fileName);
  return fs.readFileSync(getFile, 'utf-8');
};

export default readJsonFile;
