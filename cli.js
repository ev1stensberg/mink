#!/usr/bin/env node

const commander = require('commander');
const debug = require('debug')('commander');
const pkg = require(`${__dirname}/package.json`);
const inquirer = require('inquirer');
commander.version(pkg.version);
commander.usage('[options] <source>');
commander.option('-u  --universial-render', 'Builds an application');
commander.option('-r  --refactor-application', 'Refactors an application');
commander.parse(process.argv);
// integrate with time require later, has to have env vars
if (debug.enabled) {
  require('time-require');
}
if(commander.refactorApplication) {
  console.log('Implemented soon!');
}
if(commander.universialRender) {
  const questions = require(`${__dirname}/lib/utils/observable-questions.js`);
  const validate = require(`${__dirname}/lib/utils/validate-input.js`);
   inquirer.prompt(questions).ui.process.subscribe(
     (ans) => { 
       validate(ans, require(`${__dirname}/lib/utils/print-files.js`)); 
     },
     (err) => { 
       console.log('Error: ', err); 
     },
     () => {
       require(`${__dirname}/lib/utils/npm-install.js`);
       require(`${__dirname}/lib/utils/clear-folders.js`);
     }
   );
}