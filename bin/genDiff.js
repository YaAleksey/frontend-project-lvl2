#! /usr/bin/env node
import pkg from 'commander';
import genDiff from '../src/index.js';

const { program } = pkg;

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish', 'stylish')
  .arguments('<wayFirstFile> <waySecondFile>')

  .action((first, second) => {
    const diff = genDiff(first, second, program.format);
    console.log(diff);
  });

program.parse(process.argv);
