import Pagination from '../../index';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.less';
/**
 * 点式pagiantion
 */
class BaseDemo extends Component {
    constructor(props){
        super(props);
        this.state={
            num:3,
        }
    }
    paginationClick = (num) =>{
        console.log(num)
        this.setState({
            num
        })
    }
    render() { 

        return (
            <Pagination mode={'dot'} current={this.state.num} total={10} paginationClick={this.paginationClick}/>
        ) 
    }
}
let root = document.getElementById('app');
render(<BaseDemo />, root);