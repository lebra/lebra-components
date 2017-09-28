import React, {Component} from 'react';
import Input from '../../index';
import {render} from 'react-dom';

import './index.less';

export default class InputDemo extends Component {
    render() {
        return (
            <div className="input-demo">
                <Input placeholder="请输入汉字">姓名</Input>
                <Input pattern="vertical" placeholder="请输入密码">密码</Input>
                <Input pattern="textarea" placeholder="请输入描述">描述</Input>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<InputDemo />, root);
