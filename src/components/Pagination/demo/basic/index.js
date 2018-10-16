import Pagination from '../../index';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.less';
/**
 * 基础的pagiantion
 */
class BaseDemo extends Component {
    constructor(props){
        super(props);
        this.state={
            num:1,
        }
    }
    paginationClick = (num) =>{
        console.log(num);
        this.setState({
            num
        })
    }
    render() { 

        return (
            <Pagination current={this.state.num} total={10} paginationClick={this.paginationClick}/>
        ) 
    }
}
let root = document.getElementById('app');
render(<BaseDemo />, root);