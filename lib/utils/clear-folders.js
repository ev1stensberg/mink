const fs = require('fs');
const path = require('path');

const truncatePath = (path) => fs.truncate(path, 0, () => {});

setTimeout(() => {
  const serverPath = path.join(__dirname, '..', 'server');
  const serverFile = path.join(serverPath, 'server.js');
  truncatePath(serverFile);
  const webpackPath = path.join(__dirname, '..', 'webpack');
  
  const devConfigPath = path.join(webpackPath, 'dev.config.js');
  truncatePath(devConfigPath);
  const prodConfigPath = path.join(webpackPath, 'prod.config.js');
  truncatePath(prodConfigPath);
  const devServerPath = path.join(webpackPath, 'webpack-dev-server.js');
  truncatePath(devServerPath)
}, 1000)