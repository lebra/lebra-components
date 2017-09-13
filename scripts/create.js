var path = require('path');
var fse = require('fs-extra');
var fs = require('fs');


const argvs = process.argv;

console.log(argvs);

const componentName = argvs[2];

fse.mkdirsSync(path.resolve('src/components', componentName));
fse.mkdirsSync(path.resolve('src/components', componentName, 'demo'));
fse.mkdirsSync(path.resolve('src/components', componentName, '__test__'));

var srcComponentIndex =  [
    "import React, { Component, PropTypes } from 'react';",
    "const propTypes = {};",
    "const defaultProps = {};",
    "class " + componentName + " extends Component {",
    "render(){",
    "return(<h2>Welcome use tinper-bee</h2> )}",
    "};",
    componentName + ".propTypes = propTypes;",
    componentName + ".defaultProps = defaultProps;",
    "export default " + componentName + ";"
].join('\n');

var srcComponentIndexLess = [
    '@import "../../style/theme/default";',
    '@import "../../style/mixins";'
].join('\n');

var srcComponentContentDemo =  [
    "import " + componentName + " from '../index';",
    "import React, { Component } from 'react';",
    "class BaseDemo extends Component {",
    "render(){return( <" + componentName + "/> )}",
    "}",
    "export default BaseDemo;"
].join('\n');

var srcComponentContentTest = [

];

var srcComponentContentDoc = [

];

const mapFileContent = [
    {
        file: path.resolve('src/components', componentName,'index.js'),
        content: srcComponentIndex
    },
    {
        file: path.resolve('src/components', componentName,'index.less'),
        content: srcComponentIndexLess
    },
    {
        file: path.resolve('src/components', componentName, 'demo','basic.js'),
        content: srcComponentContentDemo
    },
    {
        file: path.resolve('src/components', componentName, '__test__','demo.test.js'),
        content: srcComponentContentTest
    },
    {
        file: path.resolve('src/components', componentName, 'index.zh-CN.md'),
        content: srcComponentContentDoc
    },
];

function writeFile(content, file){
    fse.outputFile(file, content, function (err) {
        if(err) throw err; // => null

    });
}
//写入文件
for(var i = 0, len = mapFileContent.length; i < len; i ++){
    var fileObject = mapFileContent[i];
    writeFile(fileObject.content, fileObject.file);
}


