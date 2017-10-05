#!/usr/bin/env node

const program = require('commander');
require('colors');

const utils = require('./src/utils');
const create = require('./src/create');

program
    .version(require('./package.json').version)
    .option('-e, --entry <filename>', 'Entry point/points to build your project', value => value.split(','))
    .option('-o, --output <filename>', 'The output filename path')
    .option('-c, --context [directory]', 'The base directory')
    .option('-d, --devtool [style]', 'Enhance the debugging process by adding source maps')
    .option('-l, --loaders [loaders]', 'Add loaders', value => value.split(','))
    .option('-s, --devserver', 'Add webpack-dev-server')
    .option('-w, --watch', 'Watch files and recompile whenever they change')
    .option('-a, --autoinstall', 'Automatically install required dependencies')
    .parse(process.argv);

if (!program.entry) {
    console.log('Entry cannot be empty'.red);
    process.exit(0);
} else if (!program.output) {
    console.log('Output path cannot be empty'.red);
    process.exit(0);
} else if (program.devtool && !utils.validDevTool(program.devtool)){
    console.log(`Devtool "${program.devtool}" does not exist!`.red);
    process.exit(0);
} else if(program.loaders){
    //loop through each provided loader to display which loader is missing
    for(let loader of program.loaders){
        if(!utils.getLoaders(loader)) { //if the loader is not available
            console.log(`Loader "${loader}" does not exist!`.red);
            process.exit(0);
        }
    }
}


create(program);

