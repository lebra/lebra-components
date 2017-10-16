import React, { Component } from 'react';
import Switch from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class SwitchDemo extends Component{
    handleChange = (e) => {
        alert("切换")
    }
    render() {
        return (
            <div className="switch-demo">
                <div className="lebra-cells__title">Switch Demo</div>
                <div className="lebra-cells lebra-cells_form">
                    <div className="lebra-cell lebra-cell_switch">
                        <div className="lebra-cell__bd">默认选中状态，可切换</div>
                        <div className="lebra-cell__ft">
                            <Switch defaultChecked={true} />
                        </div>
                    </div>
                    <div className="lebra-cell lebra-cell_switch">
                        <div className="lebra-cell__bd">默认未选中状态，可切换</div>
                        <div className="lebra-cell__ft">
                            <Switch defaultChecked={false} handleChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="lebra-cell lebra-cell_switch">
                        <div className="lebra-cell__bd">默认未选中状态，不可切换</div>
                        <div className="lebra-cell__ft">
                            <Switch defaultChecked={false} disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<SwitchDemo />, root);
