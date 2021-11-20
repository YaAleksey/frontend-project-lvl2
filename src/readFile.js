import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const readFile = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFile = path.resolve(__dirname, '..', '__fixtures__', fileName);
  return fs.readFileSync(getFile, 'utf-8');
};

export default readFile;
