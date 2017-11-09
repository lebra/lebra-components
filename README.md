# lebra-components


[![npm version](https://img.shields.io/npm/v/lebra-components.svg)](https://www.npmjs.com/package/lebra-components)
[![Build Status](https://img.shields.io/travis/lebra/lebra-components/master.svg)](https://travis-ci.org/lebra/lebra-components)
[![Coverage Status](https://coveralls.io/repos/github/lebra/lebra-components/badge.svg?branch=master)](https://coveralls.io/github/lebra/lebra-components?branch=master)
[![NPM downloads](http://img.shields.io/npm/dm/lebra-components.svg?style=flat)](https://npmjs.org/package/lebra-components)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/lebra/lebra-components.svg)](http://isitmaintained.com/project/lebra/lebra-components "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/lebra/lebra-components.svg)](http://isitmaintained.com/project/lebra/lebra-components "Percentage of issues still open")


lebra(天枰座)是一款针对移动端的react组件库。

### 兼容说明

安卓 >4.0.4
IOS > 


### 目录说明

```
│   
├── example                           示例工程
│   ├── index.html                    例子html文件
├── lib
│   └── lebra.js
├── src
│   ├── components                    组件目录
│   │   └── Input                     每个组件单独一个文件夹
│   │   	├── __test__              
│   │       │    └── index.js         测试用例
│   │   	├── demo                  例子文件夹
│   │   	│    └── basic            基础例子
│   │   	│        ├── index.js     例子组件
│   │   	│        └── index.less   例子样式
│   │   	├── index.less            组件样式
│   │   	├── index.zh-CN.md        组件中文文档
│   │   	└── index.js              组件
│   ├── style
│   │   ├── theme
│   │   │	└── default.less          默认的UI主题，含有通用变量及组件变量
│   │   ├── mixins.less               通用的mixin
│   │   └── index.less                样式入口文件
│   ├── utils
│   │   └── index.js                  通用工具函数
│   └── index.js                      入口文件
│   
└── test                              测试用例
```

### 开发调试

- 克隆仓库，下载依赖

```
git clone https://github.com/lebra/lebra-components.git

cd lebra-components

//如果是集团内部，使用ynpm下载会快一些
npm install -g ynpm-tool & ynpm install

//如果不是，使用npm下载依赖
npm install

```
- 开发调试

生成组件基本目录

```
npm run create Input(组件名称)
```

组件库提供开发调试的组件demo，查看组件示例和开发组件。

```
npm run server Input
```
如果组件有多个示例，如：`./src/components/Input/demo/search`,在组件名后面增加文件名

`npm run server 组件名 [文件名]`

```
npm run server Input search
```

- 打包构建

```
npm run build
```

- 发布npm

```
npm run pub
```
