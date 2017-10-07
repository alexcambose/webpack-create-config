require('colors');
const log = message => console.log(message);

module.exports.success = message => log(message.black.bgGreen);
module.exports.error = message => log(message.white.bgRed);
module.exports.info = message => log(message.cyan);
module.exports.warning = message => log(message.black.bgYellow);

module.exports.progress = (currentValue, maxValue, label) => {
    const maxProgressLength = 20; //how many steps the progressbar has
    const progress = currentValue / maxValue * maxProgressLength;
    if (currentValue > maxValue) return;
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);

    process.stdout.write('[');
    //draw =
    for (let i = 0; i < progress; i++) {
        process.stdout.write('=');
    }
    //draw remaining spaces
    for (let i = progress; i < maxProgressLength; i++) {
        process.stdout.write(' ');
    }
    process.stdout.write('] ' + Math.floor(currentValue / maxValue * 100) + '% ' + label);

    if (currentValue === maxValue) process.stdout.write('\n'); //add new line when completed
};