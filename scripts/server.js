const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const spawn = require('cross-spawn');
const exec = require('child_process').exec;


const argvs = process.argv;

const component = argvs[2];

console.log('server on', component);

let COMMOND = 'cross-env NODE_ENV=' + component;

spawn.sync('cross-env',['ENV_LIB=' + component, 'npm', 'run', 'dev'], { stdio: 'inherit' });

//spawn('npm',['run', 'dev'], { stdio: 'inherit' });
