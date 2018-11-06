
---
category: Components
type: Navigation
title: Drawer
subtitle: 抽屉
---

用于在屏幕边缘显示应用导航等内容的面板。

### 规则

- 是 Android 推荐的导航方式，常见于该平台应用。

## API

|属性 | 说明 | 类型 | 默认值
----|-----|------|------
| className | 自定义class | String | - |
| style | 最外层样式 | Object | - |
| getContainer | 指定Drawer挂载的HTML节点，默认是body是drawer的父元素| String | 'body' |
| level | Drawer挂载的HTML节点下跟随drawer移动的dom| String | 'all' |
| placement | 方向 | String | [left,right,top,bottom] |
| duration | 动画时间 | String | '.3s' |
| ease | 动画效果 | String | 'cubic-bezier(0.78, 0.14, 0.15, 0.86)' |
| handler| 手柄 | ReactNode | <div className="drawer-handle"><i className="drawer-handle-icon" /></div> |
| width | 指定drawer的宽度 | Number| - |
| height | 指定drawer的高度 | Number| - |
| showMask | 是否展示遮罩层 | Boolean | true |
| maskStyle| 遮罩层的样式| Object | - |
| onChange |
| onMaskClick | 点击遮罩层 | Function | ()=>{} |
| onHandleClick| 点击handler | Function | ()=>{} |
