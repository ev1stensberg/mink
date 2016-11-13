const path = require('path');
const fs = require('fs-extra');
const {exec} = require('child_process');

module.exports = (shouldServer) => {
  const utils = process.cwd();
  const libPath = path.join(__dirname, '../..', 'lib');
  const webpackPath = path.join(libPath, 'webpack');
  const outPathWebpack = path.join(utils, 'webpack');
  
  const babelPath = path.join(libPath,'template', '.babelrc');
  const outPathBabel = path.join(utils, '/')
  const command = `cp ${babelPath} ${outPathBabel}`
  
  exec(command, (error, stdout, stderr) => {
    if(stderr) console.error('error: ', stderr);
      console.log(stdout);
      return;
  });

  fs.copy(webpackPath, outPathWebpack, (err) => {
    if (err) return console.error(err);
  });
  
  if (shouldServer !== null) {
    const serverPath = path.join(libPath, 'server');
    const outPathServer = path.join(utils, 'server');

    fs.copy(serverPath, outPathServer, (err) => {
      if (err) return console.error(err);
    });
    if(shouldServer === 'react-router-run-universal.js') {
      const htmlPath = path.join(libPath, 'template', 'Html.js');
      const command_1 = `cp ${htmlPath} ${outPathBabel}`
      exec(command_1, (error, stdout, stderr) => {
        if(stderr) console.error('error: ', stderr);
          console.log(stdout);
          return;
      });
    }
  }
};
