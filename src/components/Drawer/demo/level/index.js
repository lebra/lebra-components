import Drawer from '../../index';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.less';
/**
 * drawer，部分内容跟随drawer进行移动
 */
class BaseDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           level:['.main']
        }
    }
    changeLevel = () =>{
        this.setState({
            level:!this.state.level?['.main']:null
        })
    }
    render() {
        
        return (
            <div>
                <div className="navbar">这里是navbar</div>
                <div className="main">
                    <h1 className="">正文的内容</h1>
                    <div className="button" onClick={this.changeLevel}>点击修改level</div>
                    <h1>{!this.state.level?'都不移动':'正文移动'}</h1>
                </div>
                <Drawer width="200px" level={this.state.level}>
                    <div
                        style={{ height: '100%' }}
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