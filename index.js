#!/usr/bin/env node

const program = require('commander');
require('colors');

const fs = require('fs');
const utils = require('./utils');
const create = require('./create');

program
    .version(require('./package.json').version)
    .option('-e, --entry <filename>', 'A filename which acts as the entry point to build your project')
    .option('-o, --output <filename>', 'The output directory as an absolute path')
    .option('-t, --devtool [style]', 'Enhance the debugging process by adding source maps')
    .option('-l, --loaders [loaders]', 'Add loaders', value => value.split(','))
    .option('-d, --dev-server', 'Add webpack-dev-server')
    .option('-w, --watch', 'Watch files and recompile whenever they change')
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



const config = create(program);
fs.writeFile('./webpack.config.js', config, () => {
    console.log('Config created!'.green);
});
