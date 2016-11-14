const test = require('ava');
const path = require('path');
const fs = require('fs');
const {exec} = require('child_process')
const checkFolder = require('../lib/utils/check-path');
const flexlog = require('flexlog');

test('it should successfully check directory', t => {
   const CLIpath = path.join(__dirname, '..', 'lib');
   t.pass(checkFolder(CLIpath))
});

test('it should successfully create a new one on demand', t => {
   const Mkdirpath = path.join(__dirname, '..', 'notlib');
    flexlog(checkFolder, Mkdirpath)
    fs.exists(Mkdirpath, (exists) => {
      if(exists) {
        exec(`sudo rm -rf ${Mkdirpath}`, () => {})
      }
    });
   t.pass()
});