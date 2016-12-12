const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const splitPath = require(`${__dirname}/split-webpack.js`)

module.exports = (loaders, opt) => {
  const location = path.join(process.cwd(), global.webpackLocation)
  const file = require(location)
  if(opt === 'add') {
    let refactorConfigPath = path.join(__dirname, '..', 'refactor-configuration');
    fs.emptyDirSync(refactorConfigPath, (err) => {
      if(err) console.log(err)
    });
    let pathName = global.webpackLocation.toString().split("/").pop();
    let writePath = refactorConfigPath + '/' +  pathName + '.js';
    fs.copy(location + '.js', writePath, (err) => {
      if(err) console.log(err)
    });
    splitPath(file)
}
  if(opt === 'remove') {
    console.log('remove')
  }
}