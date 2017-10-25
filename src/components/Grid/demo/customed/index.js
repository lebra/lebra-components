
import Grid from '../../index';
import React, { Component } from 'react';
import {render} from 'react-dom';
import './index.less';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));


class BaseDemo extends Component {
	render(){
		return( 
				<div>
					<div className="sub-title">Custom content</div>
					<Grid data={data1}
					columnNum={3}
					renderItem={dataItem => (
					<div>
					  <img src={dataItem.icon} style={{ width: '65px', height: '65px' }} alt="" />
					  <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
					    <span>I am title..</span>
					  </div>
					</div>
					)}
					/>
				</div>

		 )
	}
}


let root = document.getElementById('app');
render(<BaseDemo />, root);