import React, { Component } from 'react';
import TabBar from '../../index';
import { render } from 'react-dom';
import './index.less'
import tabber_cultrue from './tabber_cultrue.png'
import tabber_cultrue_active from './tabber_cultrue_active.png'
import tabber_fun from './tabber_fun.png'
import tabber_fun_active from './tabber_fun_active.png'

export default class TabBarDemo extends Component {
    onClick = (type)=> {
        alert(type+'页被点击');
    }

    render() {
        return (
            <div className="lebra-tabber-box">
                <TabBar color='#cccccc'
                        activeColor='red'
                        activeTab='message'>
                    <TabBar.Item barKey='message'
                                 badge='1'
                                 type='image'
                                 image={tabber_fun}
                                 activeImg={tabber_fun_active}
                                  onClick={this.onClick}>
                        消息
                    </TabBar.Item>
                    <TabBar.Item barKey='culture'
                                 badge='new'
                                 type='image'
                                 image={tabber_cultrue}
                                 activeImg={tabber_cultrue_active}
                                 onClick={this.onClick}>
                        文化
                    </TabBar.Item>
                    <TabBar.Item barKey='application'
                                 badge='990'
                                 onClick={this.onClick}>
                        应用
                    </TabBar.Item>
                    <TabBar.Item barKey='contact'
                                 onClick={this.onClick}>
                        联系人
                    </TabBar.Item>
                    <TabBar.Item barKey='user'
                                 type='image'
                                 image={tabber_cultrue}
                                 activeImg={tabber_cultrue_active}
                                 dot={true}
                                 onClick={this.onClick}>
                        我的
                    </TabBar.Item>
                </TabBar>
            </div>

        )
    }
}


let root = document.getElementById('app');

render(<TabBarDemo />, root);
