---
category: Components
type: Feedback
title: Modal
subtitle: 对话框
---

用作显示系统的重要信息，并请求用户进行操作反馈，eg：删除某个重要内容时，弹出 Modal 进行二次确认。

### 规则
- 尽可能少用。Modal 会打断用户操作，只用在重要的时候。
- 标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
- 一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。


## API

适用平台：WEB

### Modal

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| show     | 对话框是否可见 | Boolean          | false           |
| title       | 标题 (only transparent)   | React.Element    | 无           |
| buttons     | 底部按钮组     |  Array     | [] |

