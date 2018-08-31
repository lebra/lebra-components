import Drawer from '../../index';
import React, { Component } from 'react';
import {render} from 'react-dom';
import './index.less';
class BaseDemo extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
        }
    }
    change = () =>{
        this.setState({show:!this.state.show})
    }
    render(){
        let {show} = this.state;
        return(
        <div>

            <div className="button" type='button' onClick={this.change}>按钮</div>
            <Drawer placement="bottom" open={show}>
                hahah
            </Drawer>
        </div>)}
}
let root = document.getElementById('app');
render(<BaseDemo />, root);