import React, {Component} from 'react';
import Input from '../../index';
import {render} from 'react-dom';

import './index.less';

export default class InputDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }
    componentDidMount() {
        //获取inputDOM对象，并获得焦点
        this.refs.demo.inputRef.focus();
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <div className="input-demo">
                <h3>普通组件</h3>
                <Input
                    ref="demo"
                    placeholder="请输入汉字">
                    姓名
                </Input>
                <Input
                    defaultValue="北京"
                    placeholder="请输入城市">
                    城市
                </Input>
                <Input
                    type="money"
                    placeholder="请输入数字">
                    价格
                </Input>
                <h3>受控组件</h3>
                <Input
                    pattern="vertical"
                    value={ this.state.value}
                    onChange={ this.handleInputChange }
                    placeholder="请输入密码">
                    密码
                </Input>
                <Input
                    pattern="textarea"
                    placeholder="请输入描述">
                    描述
                </Input>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<InputDemo />, root);
