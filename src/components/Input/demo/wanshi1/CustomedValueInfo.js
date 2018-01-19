import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Input from '../../index';
const CustomedValueInfo = (props) =>{
  function setClassify(e){
  	//清除选中的样式
  	for(let i of document.getElementsByClassName('recommend-item')){i.className="recommend-item"};
  	e.target.className="recommend-item active"
  	props.changeClassify(e.target.innerHTML)
  }
	return(
		<div className="customed-value-list">
			<div className="honor-value">
				<label className="title">荣耀奖励</label>
				<div className="right">
					<Input
							type="money"
							className="input-jindou"
							onChange={(e) =>props.changeHonorAward(e)}
							value={props.honorAward}
							placeholder='0'
							>
					</Input>
					{/* <input type="text" className="input-jindou" value={props.honorAward} placeholder='0' onChange={(e) =>props.changeHonorAward(e)}/> */}
				  <label className="per">金豆</label>
				</div>
			</div>
			<div className="honor-value">
				<label className="title">荣耀价值</label>
				<div className="right">
				<Input
							type="money"
							className="input-jindou"
							onChange={(e) =>props.changeHonorValue(e)}
							value={props.honorValue} 
							placeholder='0'
							>
					</Input>
					{/* <input type="text" className="input-hobor-value"  value={props.honorValue}  placeholder='0' onChange={(e) => props.changeHonorValue(e)}/> */}
				  <label className="per">荣耀币</label>
				</div>
			</div>
			<div className="honor-classify honor-value">
				<label className="title">荣耀分类</label>
				<div className="right">
					<input type="text" className="input-hobor-value" id="input-classify" placeholder={props.honorClassify} onBlur={(e) => props.changeClassify(e.target.value)}/>
				</div>
			</div>
			<label className="honor-classify">
				<span className="recommend">推荐分类</span>
				<div className="recommend-con">
					<span className="recommend-item" onClick={(e)=>setClassify(e)}>态度</span>
					<span className="recommend-item" onClick={(e)=>setClassify(e)}>能力</span>
					<span className="recommend-item" onClick={(e)=>setClassify(e)}>格局</span>
					<span className="recommend-item" onClick={(e)=>setClassify(e)}>娱乐</span>
					<span className="recommend-item" onClick={(e)=>setClassify(e)}>结果</span>
					<span className="recommend-item active" onClick={(e)=>setClassify(e)}>生活</span>
					<span className="recommend-item" onClick={(e)=>setClassify(e)}>家庭</span>
					<span className="recommend-item" onClick={(e)=>setClassify(e)}>培训</span>
				</div>
			</label>
			{/* <textarea 
				className="honor-desc" 
				defaultValue={''} 
				placeholder={'颁奖词'} 
				onBlur={(e) =>props.changeHonorDesc(e)}
			/> */}
			 <Input
				pattern="textarea"
				onBlur={(e) =>props.changeHonorDesc(e)}
				placeholder="颁奖词">
				颁奖词
			</Input>
		</div>
	)
}
export default CustomedValueInfo;