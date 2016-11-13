module.exports = {
inquirerList: (name, message, choices) => {
  return ({
    type: 'list',
    name: name,
    message: message,
    choices: choices
  });
},
inquirerCheckList: (name, message, choices) => {
  return ({
    type: 'checkbox',
    name: name,
    message: message,
    choices: choices
  });
},
inquirerInput: (name, message) => {
  return ({
  type: 'input',
  name: name,
  message: message
});
}
};
