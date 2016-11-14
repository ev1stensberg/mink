const {exec} = require('child_process');
const Lindir = require('lindir');
const chalk = require('chalk');
const spinner = new Lindir('Installing dependencies...').start();

const contextPath = process.cwd();
/* eslint-disable */
const deps = 
  `babel-core `+
  `babel-loader `+
  `babel-plugin-add-module-exports `+
  `babel-plugin-react-transform `+
  `babel-plugin-transform-decorators-legacy `+
  `babel-plugin-transform-react-display-name `+
  `babel-plugin-transform-runtime `+
  `babel-plugin-typecheck `+
  `babel-polyfill `+
  `babel-preset-react `+
  `babel-preset-stage-2 `+
  `better-npm-run `+
  `clean-webpack-plugin `+
  `compression `+
  `express `+
  `extract-text-webpack-plugin `+
  `html-webpack-plugin `+
  `http-proxy `+
  `pretty-error `+
  `react `+
  `react-dom `+
  `react-helmet `+
  `react-redux `+
  `react-router `+
  `react-router-redux `+
  `react-transform-catch-errors `+
  `redbox-react `+
  `redux `+
  `serialize-javascript `+
  `webpack `+
  `webpack-dev-middleware `+
  `webpack-hot-middleware `+
  `webpack-isomorphic-tools`
  /* eslint-enable */
const command = `npm --prefix ${contextPath} install --save ${deps}`
exec(command, (error, stdout, stderr) => {
  if(stderr) console.error('error: ', stderr);
    console.log(stdout);
    spinner.stop()
    console.log(chalk.yellow.underline('Dependencies has been installed.'));
    console.log(chalk.yellow.underline('Everything is ready.\n'));
    console.log(chalk.yellow.underline('Enjoy hacking!\n'));
    return;
});