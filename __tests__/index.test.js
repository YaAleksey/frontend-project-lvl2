import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import readFile from '../src/readFile.js';

test('genDiff', () => {
  const file1VsFile2 = readFile('gendiffFile1With2.json').trim();
  const file1VsFile1 = readFile('gendiffFile1With1.json').trim();
  const file2VsFile2 = readFile('gendiffFile2With2.json').trim();
  const file2VsFile1 = readFile('gendiffFile2With1.json').trim();
  const checkJson = readFile('transfInJson.json').trim();
  const checkPlain = readFile('testPlain.json').trim();

  expect(genDiff('file1WithChld.json', 'file2WithChld.json', 'plain')).toEqual(checkPlain);
  expect(genDiff('file1WithChld.json', 'file2WithChld.json', 'json')).toEqual(checkJson);
  expect(genDiff('file1WithChld.json', 'file2WithChld.json', 'stylish')).toEqual(file1VsFile2);
  expect(genDiff('file1WithChld.yml', 'file2WithChld.yml', 'stylish')).toEqual(file1VsFile2);
  expect(genDiff('file1WithChld.json', 'file1WithChld.yml', 'stylish')).toEqual(file1VsFile1);
  expect(genDiff('file2WithChld.json', 'file2WithChld.yml', 'stylish')).toEqual(file2VsFile2);
  expect(genDiff('file2WithChld.json', 'file1WithChld.yml', 'stylish')).toEqual(file2VsFile1);
  expect(genDiff('file2WithChld.yml', 'file1WithChld.yml', 'stylish')).toEqual(file2VsFile1);
  expect(genDiff('file2WithChld.json', 'file1WithChld.json', 'stylish')).toEqual(file2VsFile1);
});
