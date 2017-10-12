import React, { Component } from 'react';
import { render } from 'react-dom';

import './index.less';

class App extends Component{
    constructor(props) {
        super(props);

    }
    handleClick = () => {

    }

    render() {
        return (
            <div>
                <header className="header">
                    Lebra Component
                </header>
                <div className="container">
                    <ul className="menu">
                        <li>Input</li>
                        <li>Switch</li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className="content">

                    </div>
                </div>


            </div>
        )
    }
}

let root = document.getElementById('app');

render(<App/>, root);

