const Rx = require('rx');
const path = require('path')
const inqPath = path.join(__dirname, '..', 'utils');
const loaders = require('webpack-loaders-json')
const {inquirerList, inquirerInput, inquirerCheckList}
= require(`${inqPath}/inquirer-questions.js`);
const inquirer = require('inquirer');
let basicArray = []

for(let n in loaders.webpackLoaders.basic) {
  let k = n
  let pa = ('\n' + loaders.webpackLoaders.basic[k].description + '\n').toString()
  basicArray.push(n)
}
for(let o in loaders.webpackLoaders.packaging) {
  basicArray.push(o)
}
for(let o in loaders.webpackLoaders.dialects) {
  basicArray.push(o)
}
for(let b in loaders.webpackLoaders.templating) {
  basicArray.push(b)
}
for(let y in loaders.webpackLoaders.styling) {
  basicArray.push(y)
}
for(let n in loaders.webpackLoaders.translation) {
  basicArray.push(n)
}
for(let i in loaders.webpackLoaders.support) {
  basicArray.push(i)
}
const startQuiz = () => {
const entryQuestion = Rx.Observable.create( (obs) => {
  obs.next(inquirerCheckList('pickAction',
  'Choose desired loaders: \n',
  basicArray));
  obs.onCompleted();
});

inquirer.prompt(entryQuestion).ui.process.subscribe(
    (ans) => { 
      require(`${inqPath}/write-webpack.js`)(ans.answer, 'add')
    },
    (err) => {
      console.error(err)
    },
    () => {}
  )
}
setTimeout(startQuiz, 0)