---
category: Components
type: Data Entry
title: Input
subtitle: 输入框
---

输入框组件，包含了label和input元素。自定义标题和输入样式，完成输入数据校验，支持自定义校验扩展。


## API

适用平台：WEB

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|style|给最外层元素设置样式|object|{}|
|classNames|给最外层元素设置class|string|''|
|labelStyle|给label元素设置style|object|{}|
|inputStyle|给input元素设置style|object|{}|
|labelClass|给label元素设置class|string|''|
|inputClass|给input元素设置class|string|''|
|type|给input元素设置type|string|'text'|
|required|给input元素设置required|boolean|-|
|componentClass|给input元素设置required|input/textarea|input|

传入的其他props会通过以下方式传递给input元素。

```
let {className, ...others} = this.props;

return (
    <input { ...others } />
)

```
