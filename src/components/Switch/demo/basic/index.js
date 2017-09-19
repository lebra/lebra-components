import React, { Component } from 'react';
import Switch from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class SwitchDemo extends Component{
    render() {
        return (
            <div className="switch-demo">
                <Switch />
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<SwitchDemo />, root);
