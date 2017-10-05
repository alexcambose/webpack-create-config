const { exec } = require('child_process');

const fs = require('fs');
const path = require('path');
const ops = require('object-plain-string');
const utils = require('./utils');
const colors = require('colors');

module.exports = ({entry, output, context, devtool, loaders, devserver, watch, autoinstall}) => {
    let packagesToInstall = [];
    const obj = {
        ent4ry: utils.resolveEntry(entry),
        output: {
            filename: path.parse(output).base,
            path: '~!~path.resolve(__dirname, \'' + path.parse(output).dir + '\')',
        }
    };
    if(context){
        obj.context = '~!~path.resolve(__dirname, \''+ context +'\')';
    }
    if(devtool) obj.devtool = devtool;



    if(loaders){
        const allLoaders = utils.getLoaders(loaders);
        obj.module = {};
        packagesToInstall = utils.appendPackagesToInstall(allLoaders, packagesToInstall);

        obj.module.rules = allLoaders.map(e => e.rule);
    }
    
    if(devserver){
        obj.devServer = {
            contentBase: '~!~path.join(__dirname, \''+path.parse(output).dir+'\')',
            compress: true,
            port: 9000
        };
        packagesToInstall.push('webpack-dev-server');
    }

    if(watch){
        obj.watch = true;
        obj.watchOptions = {
            ignored: /node_modules/
        };
    }



    const config = `/* 
* This file was generated with ${require('./../package.json').name} version ${require('./../package.json').version} 
* please run the following command to install dependencies
* npm install --save-dev webpack ${packagesToInstall.join(' ')}
* or
* yarn add webpack ${packagesToInstall.join(' ')}
*/
const path = require('path');
module.exports = ${ops(obj)};`;

    fs.writeFileSync('./webpack.config.js', config);
    console.log('Config created in '.green + path.resolve('./').green.bold + '/webpack.config.js'.green.bold);

    //install required dependencies
    if(autoinstall){
        console.log('Installing dependencies with '.cyan + colors.cyan.bold('npm install') + '...'.cyan);
        exec('npm install', (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                return;
            }

            // the *entire* stdout and stderr (buffered)
            console.log('stdout: ' + `${stdout}`.green.bold);
            console.log('stderr: ' + `${stderr}`.red);
        });
    }
};