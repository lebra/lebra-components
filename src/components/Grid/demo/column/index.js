
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
					<div className="sub-title">ColumnNum=3 </div>
					<Grid data={data} columnNum={3} />

					<div className="sub-title">ColumnNum=3 </div>
					<Grid data={data1} columnNum={4} />
				</div>

		 )
	}
}


let root = document.getElementById('app');
render(<BaseDemo />, root);