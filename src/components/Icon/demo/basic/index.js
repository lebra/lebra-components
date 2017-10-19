import Icon from '../../index';
import React, {Component} from 'react';
import {render} from 'react-dom';

import './index.less';

class BaseDemo extends Component {
    render() {
        return (
            <Icon type="xiaoxi" />
        )
    }
}

let root = document.getElementById('app');

render(<BaseDemo />, root);
