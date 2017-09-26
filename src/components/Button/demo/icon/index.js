import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '../../index';

import './index.less';

export default class BaseDemo extends Component {
  render() {
    return (
      <div>
      <Button iconType="uf uf-plus" shape="squared"></Button>
      <Button iconType="uf uf-plus">确定</Button>
    </div> )
  }
}
let root = document.getElementById('app');

render(<BaseDemo />, root);