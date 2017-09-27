import React, { Component } from 'react';
import Modal from '../../index';
import { render } from 'react-dom';

import './index.less';

export default class ModalDemo extends Component{
    state = {
        show1: false,
        show2: false,
        style1: {
            buttons: [
                {
                    label: 'Ok',
                    onClick: this.hideDialog.bind(this)
                }
            ]
        },
        style2: {
            title: 'Heading',
            buttons: [
                {
                    type: 'default',
                    label: 'Cancel',
                    onClick: this.hideDialog.bind(this)
                },
                {
                    type: 'primary',
                    label: 'Ok',
                    onClick: this.confDialog.bind(this)
                }
            ]
        }
    };
    hideDialog() {
        alert(111);
        this.setState({
            show1 : false,
            show2: false
        });
    }
    confDialog() {
        alert(222);
        this.setState({
            show1 : false,
            show2: false
        });
    }
    render() {
        return (
            <div className="modal-demo">
                <button type="default" onClick={ e=> this.setState({ show1: true}) } >Style1</button>
                <button type="default" onClick={ e=> this.setState({ show2: true}) }>Style2</button>
                <Modal  buttons={this.state.style1.buttons} show={this.state.show1}>
                    This is iOS Style 1
                </Modal>
                <Modal title={this.state.style2.title} buttons={this.state.style2.buttons} show={this.state.show2}>
                    This is iOS Style 2
                </Modal>
            </div>
        )
    }
}


let root = document.getElementById('app');

render(<ModalDemo />, root);
