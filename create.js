const path = require('path');
const ops = require('object-plain-string');
const utils = require('./utils');

module.exports = ({entry, output, devtool, loaders, devserver, watch}) => {
    let packagesToInstall = [];
    const obj = {
        entry,
        output: {
            filename: path.parse(output).base,
            path: '~!~path.resolve(__dirname, \'' + path.parse(output).dir + '\')',
        }
    };

    if(devtool) obj.devtool = devtool;
    if(loaders){
        const allLoaders = utils.getLoaders(loaders);
        obj.module = {};
        packagesToInstall = utils.appendPackagesToInstall(allLoaders, packagesToInstall);

        obj.module.rules = allLoaders.map(e => e.rule);
    }

    if(devserver){
        obj.devserver = {
            contentBase: '~!~path.join(__dirname, \''+path.parse(output).dir+'\')',
            compress: true,
            port: 9000
        };
    }
    if(watch){
        obj.watch = true;
    }
    return `/* 
* This file was generated with ${require('./package.json').name} version ${require('./package.json').version} 
* please run the following command to install requried packages
* npm install --save-dev webpack ${packagesToInstall.join(' ')}
* or
* yarn add ${packagesToInstall.join(' ')}
*/ 
const path = require('path');
module.exports = ${ops(obj)};`;
};