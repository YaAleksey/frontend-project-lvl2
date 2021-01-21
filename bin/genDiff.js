#! /usr/bin/env node

import fs from 'fs';
import pkg from 'commander';
import path from 'path';
import _ from 'lodash';

//console.log(fs);

const { program } = pkg;

program
  .description('Compares two configuration files and shows a difference.')
  .program.version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

//  const test = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "testFile.json"), "utf-8"));

  const textFileOne = JSON.parse(fs.readFileSync('/home/aleksey/frontend-project-lvl2/src/file1.json'), "utf-8");
  const keysValuesFileOne = Object.entries(textFileOne);

  const textFileTwo = JSON.parse(fs.readFileSync('/home/aleksey/frontend-project-lvl2/src/file2.json'), "utf-8");
  const keysValuesFileTwo = Object.entries(textFileTwo);

  const result = {};

  const compairKeysFromFileOne = (keysValuesFileOne) => keysValuesFileOne.map(([keyFileOne, valueFileOne]) => {
//    const resultCompairFunction = {};
    if (!(_.has(textFileTwo, keyFileOne))) {
      return result[`- ${keyFileOne}`] = valueFileOne;
    }
    if (textFileTwo[keyFileOne] === valueFileOne) {
      return result[keyFileOne] === valueFileOne;
    }
    result[`- ${keyFileOne}`] = valueFileOne;
    result[`+ ${keyFileOne}`] = textFileTwo[keyFileOne];
    return result;
  });

  const compairKeysFromFileTwo = (keysValuesFileTwo) => keysValuesFileTwo.map(([keyFileTwo, valueFileTwo]) => {
    const objectForCompair = compairKeysFromFileOne(keysValuesFileOne);
//    console.log(objectForCompair);
    if (!(_.has(objectForCompair, keyFileTwo))) {
      return result[`+ ${keyFileTwo}`] = valueFileTwo;
    }
  });

  compairKeysFromFileTwo(keysValuesFileTwo);
  console.log(Object.entries(result).sort());

//  .command('start <arg>')

//  .action((arg) => {
//    console.log(arg);
//  });

program.parse(process.argv);

