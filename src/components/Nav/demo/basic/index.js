import React, { Component } from 'react';
import Nav from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class NavDemo extends Component{
    render() {
        return (
            <div className="nav-demo">
                <Nav backTxt="返回" backTitle="导航栏"/>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<NavDemo />, root);
