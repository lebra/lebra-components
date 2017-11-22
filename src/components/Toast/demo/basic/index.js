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
    }
    render() {
        return (
            <div className="nav-demo">
                <button onClick={this.showToast} type="default">show toast</button>
                <Toast show={this.state.showToast} position='center'>Donsdafskjfksdfjlksdjfkldsjalkfjsdlf;jdsla;fjsdaljflsdajflkasdjflksdajflkasdjflkasdjfklasdjfklsadjfklsdjfklsadjfklajsdflkje</Toast>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<ToastDemo />, root);
