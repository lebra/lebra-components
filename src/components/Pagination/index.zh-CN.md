---
category: Components
type: Navigation
title: Pagination
subtitle: 分页
---

分页


## API

适用平台：WEB

|参数|说明|类型|默认值|
|:--|:---|:--|:---|
|current|当前页数|number|1|
|total|总页数|number|10|
|className|pagination class名|string|''|
|prePagination|前一页按钮的dom|reactelement|<span className="prePagination">前一页</span>|
|afterPagination|下一页按钮的dom|reactelement| <span className="prePagination">下一页</span>|
|mode|分页样式|['button','dot','number']|'button'|
|paginationClick|点击按钮调用，返回页数参数|func|()=>{}|

```
let {className, ...others} = this.props;

return (
    <Pagination { ...others } />
)

```
