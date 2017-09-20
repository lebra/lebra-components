import React, { Component } from 'react';
import Nav from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class NavDemo extends Component{
    onBack = () => {
        alert("返回逻辑");
    }
    render() {
        return (
            <div className="nav-demo">
                <Nav backTxt="返回" navTitle="导航栏" onBack={this.onBack}/>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<NavDemo />, root);
