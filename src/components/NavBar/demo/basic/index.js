import React, { Component } from 'react';
import { render } from 'react-dom';

import './index.less';
import NavBar from '../../index';
import Icon from '../../../Icon/index'

export default class NavDemo extends Component {
    onLeftClick = () => {
        console.log('onLeftClick')
    }
    onRightClick = (name) => {
        return function () {
            console.log(name)
        }
    }

    render() {
        let _this = this;
        return (
            <div className="um-header">
                <NavBar
                    mode="light"
                    iconName={<Icon type="touxiang1" />}
                    onLeftClick={this.onLeftClick}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.onRightClick("a")} />,
                        <Icon key="1" type="quanzi" onClick={this.onRightClick("b")}/>
                    ]}
                >首页</NavBar>
            </div>
        );
    }
}

let root = document.getElementById('app');
render(<NavDemo />, root);
