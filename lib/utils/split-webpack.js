const path = require('path');
const fs = require('fs');

  let endp = [];
  let arr = [];
  let startp;
  let once = false;
module.exports = config => {
  const devPath = path.join(__dirname, '..', 'refactor-configuration', 'dev.config.js');
  
  const inka = () => {
  require('./write-loaders.js')(devPath)
}
setTimeout(() => inka(), 1000)
}