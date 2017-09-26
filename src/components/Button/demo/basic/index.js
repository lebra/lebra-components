import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from '../../index';

import './index.less';

export default class BaseDemo extends Component {
  render() {
    return (
      <div className="button-con">
    	<div className="left">
        <Button>确定</Button>
        <Button  disabled > 确定</Button>
        <Button shape='floating'> 确定</Button>
        <Button disabled>确定</Button>
        <Button size='md'>确定</Button>
        <Button size='md'>文字描述长长的</Button>
      </div>
      <div className="right">
        <Button colors="dark">确定</Button>
        <Button colors="dark" disabled>确定</Button>
        <Button colors="dark" shape='floating'> 确定</Button>
        <Button colors="dark" shape='floating' disabled> 确定</Button>
        <Button colors="dark" size="md">确定</Button>
      </div>
    </div> )
  }
}
let root = document.getElementById('app');

render(<BaseDemo />, root);