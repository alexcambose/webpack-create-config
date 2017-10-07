#!/usr/bin/env node

const program = require('commander');
require('colors');

const utils = require('./src/utils/');
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
    utils.log.error('Entry cannot be empty');
    process.exit(0);
} else if (!program.output) {
    utils.log.error('Output path cannot be empty');
    process.exit(0);
} else if (program.devtool && !utils.validDevTool(program.devtool)) {
    utils.log.error(`Devtool "${program.devtool}" does not exist!`);
    process.exit(0);
} else if (program.loaders) {
    //loop through each provided loader to display which loader is missing
    for (let loader of program.loaders) {
        if (!utils.getLoaders(loader)) { //if the loader is not available
            utils.log.error(`Loader "${loader}" does not exist!`);
            process.exit(0);
        }
    }
}


create(program);