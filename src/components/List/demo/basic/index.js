import React, { Component } from 'react';
import List from '../../index';
import ListItem from '../../../ListItem/index';
import { render } from 'react-dom';
import imgPath from './1.jpg'
import './index.less'

export default class ListDemo extends Component{
    onClick=()=>{
        alert('has clicked');
    }
    render() {
        return (
            <div>
                <List renderHeader={'展示'} className='mt'>
                    <ListItem imgSrc={imgPath}
                              text={'集团IT服务台'}
                              arrow={true} ></ListItem>
                </List>
                <List renderHeader={'展示2'} className='mt'>
                    <ListItem imgSrc={imgPath}
                              text={'集团IT服务台'}
                              arrow={true} ></ListItem>
                    <ListItem title={'集团IT服务台'}
                              multipleLine={true}
                              text={'因无线网络后台故障，暂停服务。'}
                              onClick={this.onClick}></ListItem>
                </List>
                <List renderHeader={'展示2'} headerDir={'center'} className='mt'>
                    <ListItem imgSrc={imgPath}
                              text={'集团IT服务台'}
                              arrow={true} ></ListItem>
                    <ListItem title={'集团IT服务台'}
                              multipleLine={true}
                              text={'因无线网络后台故障，暂停服务。'}
                              onClick={this.onClick}></ListItem>
                </List>
                <List renderHeader={'展示2'} headerDir={'right'} className='mt'>
                    <ListItem imgSrc={imgPath}
                              text={'集团IT服务台'}
                              arrow={true} ></ListItem>
                    <ListItem title={'集团IT服务台'}
                              multipleLine={true}
                              text={'因无线网络后台故障，暂停服务。'}
                              onClick={this.onClick}></ListItem>
                </List>
                <List renderHeader={'展示2'} headerDir={'right'} renderFooter={'底部文字'} className='mt'>
                    <ListItem text={'集团IT服务台'}></ListItem>
                    <ListItem imgSrc={imgPath}
                              text={'集团IT服务台'}
                              arrow={true} ></ListItem>
                    <ListItem title={'集团IT服务台'}
                              multipleLine={true}
                              text={'因无线网络后台故障，暂停服务。'}
                              onClick={this.onClick}></ListItem>
                    <ListItem title={'集团IT服务台'}
                              multipleLine={true}
                              text={'因无线网络后台故障，暂停服务。'}
                              imgSrc={imgPath}
                              arrow={true}></ListItem>
                    <ListItem title={'集团IT服务台'}
                              multipleLine={true}
                              text={'因无线网络后台故障，暂停服务。'}
                              imgSrc={imgPath}
                              arrow={true}
                              rightItem={'9月2号'}></ListItem>
                </List>
            </div>
    )
    }
}


let root = document.getElementById('app');

render(<ListDemo />, root);
