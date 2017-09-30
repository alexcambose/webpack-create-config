const loaders = require('./loaders');
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
module.exports.getLoader = values => {
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

module.exports.appendPackagesToInstall = (rules, packagesToInstall) => {
    const newPackagesToInstall = [];
    for (let rulea of rules) {//get packages from rules
        let rule = {...rulea.rule};
        //if rule.use is an object {}
        if (typeof rule.use === 'object' && !Array.isArray(rule.use)) {

            if (newPackagesToInstall.indexOf(rule.use.loader) === -1)
                newPackagesToInstall.push(rule.use.loader.split('?')[0]);
        } else {
            console.log(rule, 'a');
            if (!Array.isArray(rule.use)) //if the rule is not an array
                rule.use = [rule.use];

            for (let thePackage of rule.use) {
                if (newPackagesToInstall.indexOf(thePackage) === -1) //if the package name doesn't exist
                    newPackagesToInstall.push(thePackage.split('?')[0]); //get only the package name from the query ex: ['css-loader?key=value'] -> css-loader
            }
        }
    }


    return [...packagesToInstall, ...newPackagesToInstall];
};