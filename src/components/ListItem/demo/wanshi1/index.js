import React, { Component } from 'react';
import ListItem from '../../index';
import { render } from 'react-dom';
import { MockData } from "./mock.js";
import './index.less'

export default class ListDemo extends Component{
    onClick=()=>{
        alert('has clicked');
    }
    getDom = () =>{
        let domArr = [];
        MockData.data.map(function (item,index) {
            domArr.push(
								<ListItem 
								key={index}
								title={'荣耀想'}
                multipleLine={true}
                text={
								<div className="list-items">
										<div className="items">
											<span className="item-left">荣耀类型:&nbsp;&nbsp;</span>
											<span className="item-right">{item.honourTagName}</span>
										</div>
										<div className="items">
											<span className="item-left">荣耀价值:&nbsp;&nbsp;</span>
											<span className="item-right">{item.honourbValue}</span>
										</div>
										<div className="items">
											<span className="item-left">时间:&nbsp;&nbsp;</span>
											<span className="item-right">{item.time}</span>
										</div>
								</div>}
                imgSrc={item.logo}
                arrow={true}></ListItem>
            )
				});
				return domArr
    }
    render() {
        return (
            <ul className="list-demo ">
                {this.getDom()}
            </ul>
    )
    }
}


let root = document.getElementById('app');

render(<ListDemo />, root);
