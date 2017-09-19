# lebra-components

lebra(天枰座)是一款针对移动端的react组件库。


### 目录说明

```
│   
├── example                       示例工程
│   ├── components								
│   │   └── Input                 每个组件对应一个单独的例子文件
│   │   	├── index.less        Input组件例子样式
│   │   	└── index.js          Input组件例子
│   ├── containers
│   │   └── main
│   │   	├── index.less        例子主页面样式
│   │   	└── index.js          例子主页面
│   ├── index.html                例子html文件
│   ├── index.less                例子公用样式
│   └── index.js                  例子入口
├── lib
│   └── lebra.js
├── src
│   ├── components                组件目录
│   │   └── Input                 每个组件单独一个文件夹
│   │   	├── index.less        组件样式
│   │   	└── index.js          组件
│   ├── style
│   │   ├── theme
│   │   │	└── default.less      默认的UI主题，含有通用变量及组件变量
│   │   ├── mixins.less           通用的mixin
│   │   └── index.less            样式入口文件
│   ├── utils
│   │   └── index.js              通用工具函数
│   └── index.js                  入口文件
│   
└── test                          测试用例
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

- 打包构建

```
npm run build
```

- 发布npm

```
npm run pub
```
