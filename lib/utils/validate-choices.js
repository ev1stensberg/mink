const path = require('path');

module.exports = a => {
  const { ChoicesLogic } = a;
  const questionPath = path.join(__dirname, '..', 'refactor-questions')
  switch(ChoicesLogic) {
    // Loaders
    case '⌛️': require(`${questionPath}/loader.js`);
    break;
    // Entry
    case '✍️': require(`${questionPath}/entry.js`)
    break;
    // Output
    case '⛩ ': require(`${questionPath}/output.js`)
    break;
    // Plugins
    case '🔰': require(`${questionPath}/plugins.js`)
    break;
    // Source Maps
    case '📊': require(`${questionPath}/source-maps.js`)
    break;
    // Hot reloading
    case '⚒ ': require(`${questionPath}/hot-reloading.js`)
    break;
    // Polyfill
    case '🌐': require(`${questionPath}/polyfill.js`)
    break;
    // Extensions
    case '💈': require(`${questionPath}/extensions.js`)
    break;
    // Isomorphic tools
    case '✂️': require(`${questionPath}/iso-tools.js`)
    break;
    // Dev Server
    case '♻️': require(`${questionPath}/webpack-server.js`)
    break;
    default: 
    return (console.error('Unexpected Error, Please File an issue!') && process.cwd(0))
  }
}