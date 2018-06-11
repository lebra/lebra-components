import RefreshControl from '../../index';
import React, { Component } from 'react';
import {render} from 'react-dom';
import './index.less';
import { mockData } from './mock';
class BaseDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            num:1,
            data:[],
        }
    }
    componentDidMount() {
        this.init();
    }
    init =() =>{
        console.log('new start')
    }
    start(res){
        const that = this;
        this.setState({
            data:[],
            num:1,
        },()=>{
            that.init();
            res.onEnd();
        })
    }
    add(res){
        const that = this;
        this.setState({
            num:this.state.num+1,
        },()=>{
            that.init();
            res.onEnd();
        })
    }
    getList = () =>{
        let arr = [];
        let time = Date.parse(new Date());
        let msg;
        mockData.data.map(function (item, index) {
            const timeEnd = new Date(Date.parse(item.beginDate.replace(/-/g, "/"))).getTime();
            if (timeEnd > time) {
                msg = "正在进行中"
            } else {
                msg = "已结束"
            }
            const url = item.imgUrl;
            arr.push(
                <div key={index} className="box" onClick={() => { _this.goExam(item.id) }}>
                    <span className="hd">
                        <h4>{item.examName || item.name}</h4>
                        <b>{msg}</b>
                    </span>
                    <span className="cent">
                        <img src={url} />
                        <p>
                            剩余奖励：{item.honorName} {item.honorNumLeft}枚<br />
                            截止时间：{item.endTime}<br />
                            题目数：{item.questionNum}
                        </p>
                    </span>
                </div>
            )
        });
        return arr;
    }
    render() {
            
           return (
                <RefreshControl topRefresh={this.start.bind(this)}
                bottomRefresh={this.add.bind(this)}>
                 {this.getList()}
                </RefreshControl>
           )
       
        
    }
}
let root = document.getElementById('app');
render(<BaseDemo />, root);