const path = require('path');
const loaders = require('./../loaders');
const log = require('./log');

module.exports.log = log;
module.exports.validDevTool = value => {
    return ['eval',
            'cheap-eval-source-map',
            'cheap-module-eval-source-map',
            'eval-source-map',
            'cheap-source-map',
            'cheap-module-source-map',
            'inline-cheap-source-map',
            'inline-cheap-module-source-map',
            'source-map',
            'inline-source-map',
            'hidden-source-map',
            'nosources-source-map'].indexOf(value) !== -1;
};

module.exports.getLoaders = values => {
    //if the provided loader is not an array convert it into one so we can loop
    if (!Array.isArray(values)) values = [values];

    const array = [];

    for (let loader of values)
        if (loaders.hasOwnProperty(loader))
            array.push(loaders[loader]);
        else
            return false;

    return array;
};
const pushIfUnique = (array, value) => {
    if (array.indexOf(value) === -1)
        array.push(value);
};
module.exports.appendPackagesToInstall = (loaders, packagesToInstall) => {
    const newPackagesToInstall = [];
    for (let loader of loaders) {
        let rule = Object.assign({}, loader.rule);

        const additionalDependencies = loader.additionalDependencies || [];
        //if rule.use is an object {}
        if (typeof rule.use === 'object' && !Array.isArray(rule.use)) {
            pushIfUnique(newPackagesToInstall, rule.use.loader.split('?')[0]);
            //if rule.use is an array or string
        } else {
            if (!Array.isArray(rule.use)) //if the rule is not an array
                rule.use = [rule.use]; //convert it into n array

            for (let thePackage of rule.use) {
                pushIfUnique(newPackagesToInstall, thePackage.split('?')[0]);//get only the package name from the query ex: ['css-loader?key=value'] -> css-loader
            }
        }
        for (let additionalDependency of additionalDependencies)
            pushIfUnique(newPackagesToInstall, additionalDependency);
    }


    return [...packagesToInstall, ...newPackagesToInstall];
};

const resolveDotSlash = path => { //add ./ to a path
    if (!(path[0] === '.' && path[1] === '/'))
        return './' + path;
    return path;
};

module.exports.resolveEntry = entries => {
    let obj = {};
    if (Array.isArray(entries) && entries.length > 1) {
        for (let entry of entries) {
            entry = resolveDotSlash(entry);
            obj[path.parse(entry).name] = entry;
        }
        return obj;
    } else {
        return resolveDotSlash(entries[0]);
    }
};