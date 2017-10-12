---
category: Components
type: Data Entry
title: ListItem
subtitle: 列表项
---

列表项组件分为三个部分，左边图片区，中间内容区和右边次要信息区。


## API

适用平台：WEB

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|style|给最外层元素设置样式|object|{}|
|classNames|给li标签中的a元素设置class|string|''|
|imgSrc|左边区域图片的路径|string|''|
|imgStlye|左边区域图片为形状|string|'circle'|
|title|中间文字区域标题|string|''|
|text|中间文字区域内容|string|''|
|multipleLine|是否多行显示|boolean|false|
|wordBreak|文字是否折行显示|boolean|true|
|arrow|是否显示右边箭头|bollean|false|
|rightItem|是否显示右边内容|string|''|
|onClick|列表的点击事件|function|null|

传入的其他props会通过以下方式传递给list元素。

```
let {className, ...others} = this.props;

return (
    <ListItem { ...others } />
)

```
