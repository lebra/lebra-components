import Pagination from '../../index';
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.less';
/**
 * 基础的pagiantion,自定义button
 */
class BaseDemo extends Component {
    constructor(props){
        super(props);
        this.state={
            num:1,
        }
    }
    paginationClick = (num) =>{
        this.setState({
            num
        })
    }
    render() { 
        let prePagination = <div>哈哈前一页</div>
        let afterPagination = <div>哈哈下一页</div>
        return (
            <Pagination 
            current={this.state.num} 
            paginationClick={this.paginationClick} 
            prePagination={prePagination}
            afterPagination={afterPagination}/>
        ) 
    }
}
let root = document.getElementById('app');
render(<BaseDemo />, root);