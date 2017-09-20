import React, { Component } from 'react';
import Switch from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class SwitchDemo extends Component{
    onChange = (e) => {

    }
    render() {
        return (
            <div className="switch-demo">
                <Switch defaultChecked={false}/>
                <Switch onChange={this.onChange} defaultChecked={true}/>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<SwitchDemo />, root);
