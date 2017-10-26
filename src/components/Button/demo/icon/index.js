import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '../../index';

import './index.less';

export default class BaseDemo extends Component {
  render() {
    return (
      <div>
      <Button iconType="iconfont icon-add" shape="squared"></Button>
      <Button iconType="iconfont icon-add">确定</Button>
    </div> )
  }
}
let root = document.getElementById('app');

render(<BaseDemo />, root);