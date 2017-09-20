const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const open = require("open");
const webpackConfig = require('../webpack.config');
const gutil = require("gulp-util");
const fs = require('fs');


const argvs = process.argv;

let compName = argvs[2];
let compDirName = argvs[3];

let flag = fs.existsSync("./src/components/" + compName);

if(!flag){
    gutil.log('目录文件不存在', compName);
    process.exit(0);
}

let entry = "./src/components/" + compName + "/demo/basic/index.js";

if (compDirName) {
    let demoDirFlag = fs.existsSync("./src/components/" + compName + "/demo/" + compDirName);
    if(!demoDirFlag){
        gutil.log('目录文件不存在', "./src/components/" + compName + "/demo/" + compDirName);
        process.exit(0);
    }
    entry = "./src/components/" + compName + "/demo/" + compDirName + "/index.js";
}

webpackConfig.entry.app = entry;

let devCompiler = webpack(webpackConfig);

function webpackDevelopment(done) {
    devCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
            return;
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        done();
    });
}

function webpackDevelopmentServer() {
    new webpackDevServer(devCompiler, {
        contentBase: 'dist',
        lazy: false,
        inline: true,
        hot: true
    }).listen(8080, 'localhost', function (err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
        open("http://localhost:8080");
    });
}

webpackDevelopmentServer();


