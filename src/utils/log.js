require('colors');
const log = message => console.log(message);
const success = message => {
    return log(message.green);
};
module.exports.success = success;
const logError = message => {
    return log(message.red);
};
module.exports.error = logError;
const logInfo = message => {
    return log(message.cyan);
};
module.exports.info = logInfo;
