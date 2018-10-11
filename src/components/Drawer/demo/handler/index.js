import Drawer from '../../index';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.less';
/**
 * 基础drawer，不带有handler
 */
class BaseDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    changeShow = () => {
        this.setState({ open: !this.state.open })
    }
    onTouchEnd = () => {
        this.setState({
            open: false,
        });
    }

    render() {

        return (
            <div>
                <div className="navbar">这里是navbar</div>
                <div className="main">
                    <h1 className="">正文的内容</h1>
                    <div className="button" onClick={this.changeShow}>
                        {this.state.open ? '关闭' : '打开'}
                    </div>
                </div>
                <Drawer
                    onMaskClick={this.onTouchEnd}
                    handler={null}
                    open={this.state.open}>
                    <div
                        style={{ width:"200px", height: '100%' }}
                    >
                        这里是drawer内容哈哈哈
                        这里是drawer内容哈哈哈

                    </div>
                </Drawer>
            </div>
        )
    }
}
let root = document.getElementById('app');
render(<BaseDemo />, root);