import { test, expect } from '@jest/globals';
import genDiff from '../../src/index.js';
import readJsonFile from '../../src/jsonParser.js';

test('genDiff', () => {
  const file1VsFile2 = readJsonFile('genDiffFilesWithChld.json').trim();
  //  const file1VsFile1 = readJsonFile('compareFile1File1.json').trim();
  //  const file2VsFile2 = readJsonFile('compareFile2File2.json').trim();

  expect(genDiff('file1WithChld.json', 'file2WithChld.json')).toEqual(file1VsFile2);
  //  expect(genDiff('file1.yml', 'file2.yml')).toEqual(file1VsFile2);
  //  expect(genDiff('file1.yml', 'file2.json')).toEqual(file1VsFile2);
  //  expect(genDiff('file1.json', 'file2.yml')).toEqual(file1VsFile2);

  //  expect(genDiff('file1.json', 'file1.json')).toEqual(file1VsFile1);
  //  expect(genDiff('file1.yml', 'file1.json')).toEqual(file1VsFile1);
  //  expect(genDiff('file1.json', 'file1.yml')).toEqual(file1VsFile1);

//  expect(genDiff('file2.json', 'file2.json')).toEqual(file2VsFile2);
//  expect(genDiff('file2.yml', 'file2.json')).toEqual(file2VsFile2);
//  expect(genDiff('file2.json', 'file2.yml')).toEqual(file2VsFile2);
});
