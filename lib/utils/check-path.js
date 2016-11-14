const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = (a) => {
  a = a.toString()
  try {
    if (a === `${process.cwd()}/`) {
      return;
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
