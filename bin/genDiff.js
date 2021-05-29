#! /usr/bin/env node
import pkg from 'commander';
import genDiff from '../src/index.js';

const { program } = pkg;

//console.log(program.opts());

program
//  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish');

//  .command('start <arg>')

//  .action((arg) => {
//    console.log(arg);
//  });

program.parse(process.argv);

console.log(genDiff(process.argv[2], process.argv[3]));
