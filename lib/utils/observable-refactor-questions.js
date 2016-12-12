const Rx = require('rx');
const dir = __dirname;
const {inquirerList, inquirerInput, inquirerCheckList, inquirerRawList}
= require(`${dir}/inquirer-questions.js`);

module.exports = Rx.Observable.create( (obs) => {
  obs.next(inquirerInput('ConfigLogic',
  'Where is your webpack configuration located? \n'
  ));
  obs.next(inquirerList('ChoicesLogic',
  'What do you want to do? \n',
  ['⌛️  Configure Loaders ⌛️', 
  '✍️  Configure Entry ✍️', 
  '⛩  Configure Output ⛩', 
  '🔰  Configure Plugins 🔰',
  '📊  Configure Source-Maps 📊', 
  '⚒  Configure Hot-Reloading ⚒', 
  '🌐  Configure Polyfill 🌐', 
  '💈  Configure Extensions 💈',
  '✂️  Configure Isomorphic tools ✂️', 
  '♻️  Configure Dev Server ♻️'
  ]
  ));
  obs.onCompleted();
});