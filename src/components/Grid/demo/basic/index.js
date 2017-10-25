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
					<div className="sub-title">方格</div>
					<Grid data={data} onClick={_el => console.log(_el)} />

					<div className="sub-title">自适应图片大小栅格</div>
					<Grid data={data} square={false} className="not-square-grid" onClick={_el => console.log(_el)}  />
				</div>

		 )
	}
}


let root = document.getElementById('app');
render(<BaseDemo />, root);