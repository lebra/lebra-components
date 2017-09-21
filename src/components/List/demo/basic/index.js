import React, { Component } from 'react';
import Input from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class InputDemo extends Component{
    render() {
        return (
            <div className="input-demo">
            <Input >姓名</Input>
            </div>
    )
    }
}


let root = document.getElementById('app');

render(<InputDemo />, root);
