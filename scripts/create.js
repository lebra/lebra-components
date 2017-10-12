var path = require('path');
var fse = require('fs-extra');
var fs = require('fs');


const argvs = process.argv;

console.log(argvs);

const componentName = argvs[2];

fse.mkdirsSync(path.resolve('src/components', componentName));
fse.mkdirsSync(path.resolve('src/components', componentName, 'demo'));
fse.mkdirsSync(path.resolve('src/components', componentName, '__tests__'));

var srcComponentIndex =  [
    "import React, { Component } from 'react';",
    "import PropTypes from 'prop-types;'",
    "const propTypes = {};",
    "const defaultProps = {};",
    "class " + componentName + " extends Component {",
    "render(){",
    "return(<h2>lebra is best</h2> )}",
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
    "import './index.less;",
    "class BaseDemo extends Component {",
    "render(){return( <" + componentName + "/> )}",
    "}",
    "export default BaseDemo;"
].join('\n');

var srcComponentContentDemoLess = [
    '@import "../../../../style/index";'
].join('\n');

var srcComponentContentTest = [
"import React from 'react';",
"import "+componentName+" from '../index';",
"import renderer from 'react-test-renderer';",
"test('"+componentName+" should be exsit', () => {",
"});"
];

var srcComponentContentDoc = [
    '#' + componentName,
    '### API',
    '|参数|说明|类型|默认值|',
    '|:--|:---|:--|:---|'
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
        file: path.resolve('src/components', componentName, 'demo', 'basic','index.js'),
        content: srcComponentContentDemo
    },
    {
        file: path.resolve('src/components', componentName, 'demo', 'basic','index.less'),
        content: srcComponentContentDemoLess
    },
    {
        file: path.resolve('src/components', componentName, '__tests__','demo.test.js'),
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


