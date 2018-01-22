import React, { Component } from 'react';
import Switch from '../../index';
import Input from '../../../Input/index';
import { render } from 'react-dom';
import './index.less';
export default class SwitchDemo extends Component{

		constructor(){
			super();
			this.state = {
				classify:0,																			//试题的类型编号
				honorList: [],																	//荣耀的类型
				passline:90,																		//及格线
				typeData:[],																		//试题类型数据
				defaultType: "",																//默认试题类型
				typeFlag:false,																	//试题类型获取成功标记
				endTime:(Date.parse(new Date()) + 3600000),			//开始学习最晚时间预设为开启时间1小时后
				textvalue:"",																		//学习内容提示
				selected:false,																	//是否已经选择过荣耀
				yxGroupId: "",																	//友信一长串的Id
				memberNumber: 10,																//可发荣耀数量
				examTypeName: "",																//题库类型名称
				cover: false,																		//该试题库不允许覆盖
				transmit: true,																	//该题库不允许转发
				target: "", 																		//学习目标
				seen: false,																		//公司可见性
				questionNumber: 5, //发起题目数量
				answerVisble: false,//答题过程答案是否可见
				manyTimes: 1,//本次学一下是否可以多次答题
				rangeName:"",
				checked: true, //默认是否可以多次答题
				beanNeed:0,
			}
		};

		questionNumber=(e)=>{
			this.setState({
				questionNumber:e.target.value*1
			})
		}
		
		memberNumber=(e)=>{
			this.setState({
				memberNumber:e.target.value*1
			})
		}

    render(){
				let date = new Date(parseInt(this.state.endTime/1000)*1000);
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				let D = (date.getDate() < 10 ? '0'+ (date.getDate()) : date.getDate())+ 'T' ;
				let h = (date.getHours() < 10 ? '0'+ (date.getHours()) : date.getHours())+ ':' ;
				let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()): date.getMinutes());
				let s = ':' + (date.getSeconds() < 10 ? '0'+(date.getSeconds()):date.getSeconds()); 
				let defaultTime = Y + M + D + h + m ;
				return(
					<div>
						<label className="um-label um-box-justify cover">
							<div className="text">答案是否可见</div>
							<Switch defaultChecked={true} />
						</label>

						<div className="exam-item">
							<label>选择奖励荣耀总数</label>
							<Input
								type="money"
								value={this.state.memberNumber}
								placeholder="请输入数字"
								onChange={(e)=>{this.memberNumber(e)}}
								>
               
              </Input>
						</div>
						<div className="sumNumber">
							<div className="number-title">题库奖励荣耀</div>
							<Input
									pattern="textarea"
									placeholder="请输入描述">
									描述
							</Input>
						</div>

						<div className="exam-item-top">
							<label>选择发起题目数量</label>
							<Input
								type="money"
								value={this.state.questionNumber}
								placeholder="请输入数字"
								onChange={(e)=>{this.questionNumber(e)}}
								>
              </Input>
						</div>

						<div className="exam-item">
							<label>答题截止时间</label>
							<input className="date-picker-input" value={defaultTime} type="datetime-local" onChange={this.setTimeSelectStatus}/>
						</div>

						<label className="um-label um-box-justify cover">
							<div className="text">本次学一下是否可以多次答题</div>
							<Switch defaultChecked={true} />
						</label>

						<div className="target">
							<div className="text">学习目标</div>
							<Input
									pattern="textarea"
									placeholder="请输入描述">
									描述
							</Input>
						</div>

						<div>
							
							<div className="show">
								<span>共需要金豆：
									<strong className="num">12个</strong>
								</span>
							</div>
						</div>
						<p className="bottom-tips">
							* 消费金豆总数=（荣耀价值+金豆奖励）*颁发人数
						</p>
						<div class="submit-btn">发起</div>
					</div>
				)
		}
  }

let root = document.getElementById('app');

render(<SwitchDemo />, root);
