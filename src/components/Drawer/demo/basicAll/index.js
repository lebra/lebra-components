import Drawer from '../../index';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.less';
/**
 * 基础drawer，各个方向上的
 */
class BaseDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           pos:'left'
        }
    }
    changePos = (pos) =>{
        console.log(pos)
        this.setState({
            pos
        })
    }
    render() {
        let drawerStyle = this.state.pos == 'left' || this.state.pos == 'right' ? {width:'200px'}:{height:'300px'}
        return (
            <div>
                <div className="navbar">这里是navbar</div>
                <div className="main">
                    <h1 className="">正文的内容</h1>
                    <div className="button" onClick={e=>this.changePos('left')}>left</div>
                    <div className="button" onClick={e=>this.changePos('right')}>right</div>
                    <div className="button" onClick={e=>this.changePos('top')}>top</div>
                    <div className="button" onClick={e=>this.changePos('bottom')}>bottom</div>
                    <h1>当前drawer的位置是{this.state.pos}</h1>
                </div>
                <Drawer placement={this.state.pos} >
                    <div style={drawerStyle}>
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