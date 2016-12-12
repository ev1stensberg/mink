const Rx = require('rx');
const path = require('path')
const inqPath = path.join(__dirname, '..', 'utils');
const {inquirerList, inquirerInput, inquirerCheckList}
= require(`${inqPath}/inquirer-questions.js`);
const inquirer = require('inquirer');

const questionPath = path.join(__dirname, '..', 'refactor-actions')
const startQuiz = () => {
const entryQuestion = Rx.Observable.create( (obs) => {
  obs.next(inquirerList('loaderAction',
  'Choose desired action: \n',
  ['Add loaders 📦\n', 'Remove loaders 📤\n', 'List loaders 📝']));
  obs.onCompleted();
});
let action;
inquirer.prompt(entryQuestion).ui.process.subscribe(
    (ans) => {
      const { answer } = ans;
      if(answer === 'Add loaders 📦\n') {
        action = 'add'
      }
      if(answer === 'Remove loaders 📤\n') {
        action = 'remove'
      }
      if(answer === 'List loaders 📝') {
        action = 'list'
      }
    },
    (err) => {
      console.error(err)
    },
    () => {
      switch(action) {
        case 'add': {
          require(`${questionPath}/add-loader.js`)
          break;
        }
        case 'remove': console.log(action) 
        break;
        case 'list': console.log(action) 
        break;
        default:
        return (console.error('Found no action, file an issue!') && process.exit(0))
      }
    }
  )
}
setTimeout(startQuiz, 0)