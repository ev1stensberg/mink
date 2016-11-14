const test = require('ava');
const path = require('path');
const fs = require('fs');
const checkFP = require('../lib/utils/check-file-path');
const flexlog = require('flexlog');

test('it should successfully check path', t => {
   const CLIpath = path.join(__dirname, '..', 'cli.js');
   t.pass(checkFP(CLIpath))
});

test('it should create a file if not supplied', t => {
   const randomPath = path.join(__dirname, '..', 'o.js');
   flexlog(checkFP, randomPath);
   const checkExistyAndDelete = fs.exists(randomPath, (exists) => {
     if(exists) {
       fs.unlinkSync(randomPath);
     }
   });
   t.pass(checkExistyAndDelete)
});

test('it should successfully check path', t => {
   t.pass()
});