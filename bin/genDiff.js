#! /usr/bin/env node
import pkg from 'commander';
import { byExport } from '../src/index.js';

const { program } = pkg;

program
  .description('Compares two configuration files and shows a difference.')
  .program.version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');


//  .command('start <arg>')

//  .action((arg) => {
//    console.log(arg);
//  });

program.parse(process.argv);

console.log(byExport());
