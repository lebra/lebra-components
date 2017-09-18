
const spawn = require('cross-spawn');
const exec = require('child_process').exec;


const argvs = process.argv;

const component = argvs[2];

console.log('server on', component);

let result = spawn(
    'cross-env',
    ['DEV_PATH=' + component, 'NODE_ENV=development', 'webpack-dev-server','--progress', '--open'],
    { stdio: 'inherit' }
    );

console.log(result);

result.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});

