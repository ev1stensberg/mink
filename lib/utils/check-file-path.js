const fs = require('fs');
const path = require('path')
module.exports = (a) => {
  a = a.toString()
  
  try {
    if (!a) {
      console.error('Cannot find the file, as this is the root path.')
      process.exit(0)
    }
    if(a.substr(a.length - 2, a.length) !== 'js') {
      a += '.js';
    }
    fs.statSync(a);
  } catch (err) {
      console.log(a, ' does not exist');
      console.log('We\'ve created the file for you');
      let path;
      if (a.toString().substr(a.length - 2, a.length) === 'js') {
        path = a;
      } else {
         path = a + '.js';
      }
      path = path.toString()
      fs.writeFile(path, '// Webpack Entry Point', (err) => {
        console.error('Error Creating File: ', path);
        console.error('Reason: ', err);
      });
  }
};
