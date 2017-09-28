import React, { Component } from 'react';
import ListItem from '../../index';
import { render } from 'react-dom';

import './index.less'

export default class InputDemo extends Component{
    render() {
        return (
            <ul className="input-demo">
                <ListItem text={'你好'}></ListItem>
            </ul>
    )
    }
}


let root = document.getElementById('app');

render(<InputDemo />, root);
