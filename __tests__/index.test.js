import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import readFile from '../src/readFile.js';

test('genDiff', () => {
  const file1VsFile2 = readFile('gendiffFile1With2.json').trim();
  const checkJson = readFile('transfInJson.json').trim();
  const checkPlain = readFile('testPlain.json').trim();

  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(checkPlain);
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(checkJson);

  expect(JSON.parse(genDiff('file1.json', 'file2.json', 'json'))).not.toBe(SyntaxError);

  expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(file1VsFile2);
  expect(genDiff('file1.yml', 'file2.yml', 'stylish')).toEqual(file1VsFile2);
  expect(genDiff('file1.yml', 'file2.json', 'stylish')).toEqual(file1VsFile2);
  expect(genDiff('file1.json', 'file2.yml', 'stylish')).toEqual(file1VsFile2);
});
