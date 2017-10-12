---
category: Components
type: Data Entry
title: List
subtitle: 列表
---

## API

适用平台：WEB

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|style|给ul元素设置样式|object|{}|
|classNames|给最外层的div元素设置class|string|''|
|renderHeader|设置列表头部内容|string|''|
|headerDir|列表头部内容位置|string|'center'|
|renderFooter|设置列表底部内容|string|''|
|footerDir|列表底部内容位置|string|'center'|


传入的其他props会通过以下方式传递给list元素。

```
let {className, ...others} = this.props;

return (
    <List { ...others } />
)

```
