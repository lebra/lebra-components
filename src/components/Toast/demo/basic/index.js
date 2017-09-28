import React, { Component } from 'react';
import Toast from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class ToastDemo extends Component{
    state = {
        showToast: false,
    };
    showToast = () => {
        this.setState({showToast: true});

        this.state.toastTimer = setTimeout(()=> {
            this.setState({showToast: false});
        }, 2000);
    }
    render() {
        return (
            <div className="nav-demo">
                <button onClick={this.showToast.bind(this)} type="default">Success Toast</button>
                <Toast show={this.state.showToast}>Done</Toast>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<ToastDemo />, root);
