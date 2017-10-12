---
category: Components
type: Button
title: Button
subtitle: 按钮
---

按钮组件，包含大小（小，中，大），背景色按钮（'primary', 'dark'），边框按钮（priLine','darkLine'），幽灵按钮以及圆角按钮。


## API

适用平台：WEB

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|size|按钮大小|['sm', 'md', 'lg']，默认大按钮|'lg'|
|color|按钮颜色分类，背景色按钮和边框按钮，默认带有背景色红色按钮|['primary', 'dark','priLine','darkLine']|'primary'|
|ghost|幽灵按钮，背景透明且没有边框，默认不是幽灵按钮|boolean|false|
|shape|按钮形状，矩形或者正反形或者圆角，默认矩形|['floating', 'square'，'']|''|
|disabled|按钮是否可用|boolean|true|
|className|按钮自定义类名|string|''|
|iconType|带有iconfont的按钮|string|''|


传入的其他props会通过以下方式传递给Button元素。

```
let {className, ...others} = this.props;

return (
    <Button { ...others } />
)

```
