let structure = {
  libType: 'default',
  addons: null,
  renderLogic: null,
  entry: null,
  output: null,
  src: null,
  assets: null
};

module.exports = (data, callback) => {
const {name, answer} = data;
const fp = `${process.cwd()}/`;
const checkFilePath = require(`${__dirname}/check-file-path.js`);
const checkPath = require(`${__dirname}/check-path.js`);

  switch(name) {
    case 'addonLogic': structure.addons = answer;
    break;
    case 'renderLogic': structure.renderLogic = answer;
    break;
    case 'entryLogic': 
    checkFilePath(`${fp}${answer}`); 
    structure.entry = answer;
    break;
    case 'outputLogic': 
    checkPath(`${fp}${answer}`); 
    structure.output = answer;
    break;
    case 'srcLogic':
    structure.src = answer;
    checkPath(`${fp}${answer}`);
    break;
    case 'assetsLogic':
    structure.assets = answer;
    checkPath(`${fp}${answer}`);
    break;
    default: break;
  }
   return callback(structure);
};
