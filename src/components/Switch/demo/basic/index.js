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
                <Switch defaultChecked={false} disabled={true}/>
                <Switch onChange={this.onChange} defaultChecked={true} disabled={true}/>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<SwitchDemo />, root);
