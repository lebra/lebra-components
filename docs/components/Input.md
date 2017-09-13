# Input 输入框组件

Input组件包含了label和input元素。

### 使用

```
import { Input } from 'lebra';

class Example extends Component{
    render() {
        return (
          <Input>
            姓名
          </Input>  
        )
    }
}

```

### PROPS

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

传入的其他props会通过以下方式传递给input元素。

```
let {className, ...others} = this.props;

return (
    <input { ...others } />
)

```
