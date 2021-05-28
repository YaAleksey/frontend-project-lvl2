import { test, expect } from '@jest/globals';
import genDiff from '../../src/index.js';
import readJsonFile from '../../src/jsonParser.js';

test('genDiff', () => {
  const file1VsFile2 = readJsonFile('genDiffFile1With2.json').trim();
  const file1VsFile1 = readJsonFile('gendiffFile1With1.json').trim();
  const file2VsFile2 = readJsonFile('gendiffFile2With2.json').trim();
  const file2VsFile1 = readJsonFile('gendiffFile2With1.json').trim();

  expect(genDiff('file1WithChld.json', 'file2WithChld.json')).toEqual(file1VsFile2);
  expect(genDiff('file1WithChld.yml', 'file2WithChld.yml')).toEqual(file1VsFile2);
  expect(genDiff('file1WithChld.json', 'file1WithChld.yml')).toEqual(file1VsFile1);
  expect(genDiff('file2WithChld.json', 'file2WithChld.yml')).toEqual(file2VsFile2);
  expect(genDiff('file2WithChld.json', 'file1WithChld.yml')).toEqual(file2VsFile1);
  expect(genDiff('file2WithChld.yml', 'file1WithChld.yml')).toEqual(file2VsFile1);
  expect(genDiff('file2WithChld.json', 'file1WithChld.json')).toEqual(file2VsFile1);
});
