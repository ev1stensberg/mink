const {exec} = require('child_process');
const Lindir = require('lindir');
const chalk = require('chalk');

const spinner = new Lindir().start();
spinner.type = 'peace';

exec('yarn add global create-react-app', (error, stdout, stderr) => {
  if(error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error('error: ', stderr);
    return;
  }
  console.log(stdout);
  spinner.stop();
  console.log(chalk.red('create-react-app has been installed, to know more about how to start:'));
  console.log(chalk.yellow.underline('https://github.com/facebookincubator/create-react-app', '\n'));
  process.exit(0);
});
