import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '../../index';

import './index.less';

export default class BaseDemo extends Component {
  render() {
    return (
      <div>
      <Button colors='priLine'>确定</Button>
    	<Button colors='darkLine'>确定</Button>
    	<Button colors='priLine' disabled> 确定</Button>
    	<Button colors='darkLine' disabled> 确定</Button>
    </div> )
  }
}
let root = document.getElementById('app');

render(<BaseDemo />, root);