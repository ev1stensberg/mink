module.exports = (data) => {
  switch(data.renderLogic) {
    case 'Universal': require('./default-write.js')(data);
    break;
    case 'Server': require('./default-write.js')(data);
    break;
    case 'Client': require('./default-write.js')(data);
    break;
    default: return;
  }
};