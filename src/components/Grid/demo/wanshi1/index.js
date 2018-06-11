import Grid from '../../index';
import React, { Component } from 'react';
import {render} from 'react-dom';
import './index.less';

let sectionName = ['事儿','玩儿','荣耀','拍砖','充值','企业',"兑换记录",'挑战','消息','定义荣耀','二维码','设置'];
let icon=[ 'icon-mubiao-','icon-wanwode', 'icon-myhonor', 'icon-mycricis','icon-chongzhi','icon-myenterprise',"icon-duiyixia-","icon-lightning-b-shandian", 'icon-my_mes','icon-zidingyirongyaoxiang', 'icon-erweima','icon-settings'];
const data2 = Array.from(icon).map((item, i) => ({
  icon: <span className="grid-iconfont"><i className={`iconfont ${item}`}></i></span>,
  text: <span className="text">{sectionName[i]}</span>,
}));

class BaseDemo extends Component {
	render(){
		return( 
				<div className="wanshi-con">
					<Grid data={data2} columnNum={4} className="not-square-grid" onClick={_el => console.log(_el)}  />
				</div>

		 )
	}
}


let root = document.getElementById('app');
render(<BaseDemo />, root);