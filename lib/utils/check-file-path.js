const fs = require('fs');

module.exports = (a) => {
  a = a.toString()
  try {
    if (a === `${process.cwd()}/`) {
      return;
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
