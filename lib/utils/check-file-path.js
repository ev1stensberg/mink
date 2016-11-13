const fs = require('fs');

module.exports = (a) => {
  try {
    if (a === `${process.cwd()}/`) {
      return;
    }
    if(a.toString().substr(a.length - 2, a.length) !== 'js') {
      a = a.toString() + '.js';
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
      fs.writeFile(path, '// Webpack Entry Point', (err) => {
        console.error('Error Creating File: ', path);
      });
  }
};
