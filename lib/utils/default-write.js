const fs = require('fs');
const path = require('path');

module.exports = function(data) {
  const {renderLogic, entry, output, src, assets, addons} = data;
  const dir = __dirname;
  const runConfig = (serverOrUniversalPath) => {
    if(serverOrUniversalPath) {
    const serverSideRender = require(`${path.join(dir, '..', 'template', serverOrUniversalPath)}`);
    const serverSideRenderConfig = fs.createWriteStream(`${path.join(dir, '..', 'server', 'server.js')}`, {
          flags: 'w+',
          defaultEncoding: 'utf8',
          mode: 0o666,
    });
     serverSideRenderConfig.write(serverSideRender());
     serverSideRenderConfig.end();
     return require(`${__dirname}/move-folders.js`)(serverOrUniversalPath);
   }
   return require(`${__dirname}/move-folders.js`)(serverOrUniversalPath);
 };
  let prodPath = (renderLogic === 'Server' || renderLogic === 'Universal') ? 'react-prod-template.js' : 'prod-template.js';
  let devPath = (renderLogic === 'Server' || renderLogic === 'Universal') ? 'react-dev-template.js' : 'dev-template.js';
    const prodTemplate = require(`${path.join(dir, '..', 'template', prodPath)}`);
    const prodConfig = fs.createWriteStream(`${path.join(dir, '..', 'webpack', 'prod.config.js')}`, {
      flags: 'w+',
      defaultEncoding: 'utf8',
      mode: 0o666,
    });
    prodConfig.write(prodTemplate(assets, entry, output, src));
    prodConfig.end();
    const devTemplate = require(`${path.join(dir, '..', 'template', devPath)}`);
    const devConfig = fs.createWriteStream(`${path.join(dir, '..', 'webpack', 'dev.config.js')}`, {
          flags: 'w+',
          defaultEncoding: 'utf8',
          mode: 0o666,
    });
    devConfig.write(devTemplate(assets, entry, output, src));
    devConfig.end();
    const devServer = require(`${path.join(dir, '..', 'template', 'dev-server.js')}`);
    const serverConfig = fs.createWriteStream(`${path.join(dir, '..', 'webpack', 'webpack-dev-server.js')}`, {
          flags: 'w+',
          defaultEncoding: 'utf8',
          mode: 0o666,
    });
    serverConfig.write(devServer(output));
    serverConfig.end();
    let serverOrUniversalPath;
    if (renderLogic === 'Server') {
      if (addons.includes('Redux') && addons.includes('React-Router')) {
        serverOrUniversalPath =  'react-redux-router-run-server.js';
        runConfig(serverOrUniversalPath);
        return;
      }
      if (addons.includes('React-Router') && (addons.length === 1)) {
        serverOrUniversalPath = 'react-router-run-server.js';
        runConfig(serverOrUniversalPath);
        return;
      }
      if (addons.includes('None')) {
        serverOrUniversalPath = 'run-server.js';
        runConfig(serverOrUniversalPath);
        return;
      }
    }
    if (renderLogic === 'Client') {
      if (addons.includes('React-Router')) {
        serverOrUniversalPath = 'react-router-run-client.js';
        runConfig(serverOrUniversalPath);
        return;
      }
      if (addons.includes('None')) {
        serverOrUniversalPath = null;
        runConfig(serverOrUniversalPath);
        return;
      }
    }
    if (renderLogic === 'Universal') {
      if (addons.includes('React-Router')) {
        serverOrUniversalPath = 'react-router-run-universal.js';
        runConfig(serverOrUniversalPath);
        return;
      }
      if (addons.includes('None')) {
        serverOrUniversalPath = null;
        runConfig(serverOrUniversalPath);
        return;
      }
    }
};
