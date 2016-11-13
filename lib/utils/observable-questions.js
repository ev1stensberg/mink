const Rx = require('rx');
const dir = __dirname;
const {inquirerList, inquirerInput, inquirerCheckList}
= require(`${dir}/inquirer-questions.js`);

module.exports = Rx.Observable.create( (obs) => {
  obs.next(inquirerCheckList('addonLogic',
  'Choose one or several libraries: \n',
  ['Redux', 'React-Router', 'None']));
  obs.next(inquirerInput('entryLogic',
  'What is the name of the entry point in your application?'
   ));
  obs.next(inquirerInput('outputLogic',
  'What is the name of the output directory in your application?'
  ));
  obs.next(inquirerInput('srcLogic',
  'What is the name of the directory containing your application logic?'
  ));
  obs.next(inquirerInput('assetsLogic',
  'What is the name of the directory containing your static files?'
  ));
  obs.next(inquirerList('renderLogic',
  'Choose prefered render type: ',
  ['Server', 'Universal', 'Client']));
  obs.onCompleted();
});