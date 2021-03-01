import { test, expect } from '@jest/globals';
import genDiff from '../../src/index.js';
import readFile from '../../src/utils.js';

test('genDiff', () => {
  const compaireFiles = genDiff('file1.json', 'file2.json');
  const expectResult = readFile('rightOutput.json').trim();

  expect(compaireFiles).toEqual(expectResult);
});
