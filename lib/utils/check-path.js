const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = (a) => {
  a = a.toString()
  try {
    if (!a) {
      console.error('Cannot find the directory, as this is the root path.')
      process.exit(0)
    }
    fs.statSync(a);
  } catch (err) {
      console.log(a, ' does not exist');
      console.log('We\'ve created it for you!');
      mkdirp(a, (err) => {
        if (err) return;
      });
  }
};
