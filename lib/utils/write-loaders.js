const fs = require('fs');

module.exports = (a) => {
  const m = require(a)
  m.module.loaders.push({hello: 'world'})
    const oki = fs.writeFile(a, JSON.stringify(m), (err) => {
      if(err) return console.error(err)
    });
}