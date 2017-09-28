import React, { Component } from 'react';
import ListItem from '../../index';
import { render } from 'react-dom';

import './index.less'

export default class ListDemo extends Component{
    onClick=()=>{
        alert('has clicked');
    }
    render() {
        return (
            <ul className="list-demo">
                <ListItem text={'集团IT服务台'}></ListItem>
                <ListItem imgSrc={'../1.jpg'}
                          text={'集团IT服务台'}
                          arrow={true} ></ListItem>
                <ListItem title={'集团IT服务台'}
                          multipleLine={true}
                           text={'因无线网络后台故障，暂停服务。'}
                    onClick={this.onClick}></ListItem>
                <ListItem title={'集团IT服务台'}
                          multipleLine={true}
                          text={'因无线网络后台故障，暂停服务。'}
                           imgSrc={'1.jpg'}
                          arrow={true}></ListItem>
                <ListItem title={'集团IT服务台'}
                          multipleLine={true}
                          text={'因无线网络后台故障，暂停服务。'}
                          imgSrc={'1.jpg'}
                          arrow={true}
                    rightItem={'9月2号'}></ListItem>
            </ul>
    )
    }
}


let root = document.getElementById('app');

render(<ListDemo />, root);
