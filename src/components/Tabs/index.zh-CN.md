---
category: Components
type: Tabs
title: Tabs
subtitle: 页签
---

页签组件，是否可以左右滑动。


## API

适用平台：WEB


#Tabs
### API
|参数|说明|类型|默认值|,|:--|:---|:--|:---|
|tabs|页签标题TabBar的信息|{[key:string,title:string]}或者{[title:string]}|---|
|initialPage|设定一个起始页，没有该参数的时候默认是第一个页签被选中。可以是tabs的key，或者对应的index|string或者number|---|
|swipable|是否可以左右滑动|boolean|true|
|animated|左右滑动的时候是否有过渡效果|boolean|true|
|onTabClick(tab,index)|点击页签|func|---|
|onChange(tab,index)|左右滑动Tabpane|func|---|
|tabBarPosition|tabBar的位置|[top,left,right,bottom]|top|
|tabDirection|tab内容切换时滑动的方向，vertical不可滑动切换内容|["horizontal","vertical"]|horizontal|
|renderTabBar|渲染TabBar的方法，不设置该参数时组件自动使用<DefaultTabBar/>}|func|null|
|tabBarUnderlineStyle|tabBar下划线样式|object|---|
|tabBarBackgroundColor|tabBar背景色|string|---|
|tabBarActiveTextColor|tabBar激活Tab文字颜色|string|---|
|tabBarInactiveTextColor|tabBar非激活Tab文字颜色|string|---|
|tabBarTextStyle|tabBar文字样式|object|---|

#TabBar
### API
|参数|说明|类型|默认值|,|:--|:---|:--|:---|
|page|tabBar一页显示页签个数|nubmber|5|

