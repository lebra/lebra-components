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
           level:"all"
        }
    }
    changeLevel = (type) =>{
        this.setState({
            level:type
        })
    }
    render() {
        
        return (
            <div>
                <div className="navbar">这里是navbar</div>
                <div className="main">
                    <h1 className="">正文的内容</h1>
                    <div className="button" onClick={e=>this.changeLevel('all')}>level是all</div>
                    <div className="button" onClick={e=>this.changeLevel('.main')}>level是main</div>
                    <div className="button" onClick={e=>this.changeLevel(null)}>level是null</div>
                    {this.state.level === 'all' && <h2>level是all，正文和nav随drawer移动</h2>}
                    {this.state.level === '.main' && <h2>level是.main，正文随drawer移动</h2>}
                    {this.state.level ===  null && <h2>level是null，都不随drawer移动</h2>}

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