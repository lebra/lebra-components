import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from '../../index';
import {responseData} from './mock';
import CustomedSwiper from './CustomedSwiper';
import CustomedValueInfo from './CustomedValueInfo';
class App extends Component{
	 constructor(props, context) {
    super(props, context);
    this.state = {
    	honorTitle:'',//自定义荣耀的名称
    	honorId:'',//自定义荣耀图标的id
    	honorValue:"",//荣耀价值，（单位荣耀币）
    	honorAward:"",//荣耀奖励，（单位金豆）
    	honorDesc:'',//自定荣耀描述
      iconsList:[],//icon的数组
      honorClassify:"生活",//分类的
    }
  }
  
  
  init = () =>{
    let self = this;
    let res = responseData;
    self.setState({iconsList:res.data},function() {
      self.updateSwiperWidth(res.data);
    });
  }
  
  updateSwiperWidth = (checkedHonorList) => {
    let dom =  document.getElementById("CustomedHonor") && document.getElementById("CustomedHonor").getElementsByClassName('swiper-wrapper');
    let fullWidth = document.getElementById("CustomedHonor") && document.getElementById("CustomedHonor").offsetWidth;;
    let splitNum =  12 ;
    let row = Math.ceil(checkedHonorList.length/splitNum);
    if(dom.length > 0) {
      dom[0].style.width = 100 * Number(row) + "%";
    }
  }
 
  changeInput = (e) =>{
    let getValue = e.target.value;
    let len = getValue.length;
    console.log(len)
    if(len > 7){
      document.getElementById('form-control').value = getValue.substr(0,7);
      alert( "最多输入7字")
      this.setState({
        honorTitle:getValue.substr(0,7),
      })
    }else{
      this.setState({
        honorTitle:getValue,
      })
    }
  }
  
  changeClassify = (value) =>{
    let getValue = value;
    let len = getValue.length;
    this.setState({
      honorClassify:getValue.substr(0,7),
    })
    // if(len > 7){
    //   document.getElementById('form-control').value = getValue.substr(0,7);
    //   alert( "最多输入7字")
    //   this.setState({
    //     honorClassify:getValue.substr(0,7),
    //   })
    // }else{
    //   document.getElementById('form-control').value = getValue;
    //   this.setState({
    //     honorClassify:getValue,
    //   })
    // }
  }

  changeHonorValue = (val) =>{
    let value = val.target.value, _value = value*1;
    if(value === "") {
     this.setState({honorValue:""});
     return;
    }
    if (typeof _value === "number" && !isNaN(_value)) {
      if(value.indexOf('.')!== -1){
        this.setState({honorValue: (value.substr(0,value.indexOf(".")+3))*1});
      }else{
        this.setState({honorValue: _value});
      }
    }
  }

  changeHonorAward = (val) =>{
    let value = val.target.value, _value = value*1;
    if(value === "") {
     this.setState({honorAward:""});
     return;
    }
    if (typeof _value === "number" && !isNaN(_value)) {
      if(value.indexOf('.')!== -1){
        this.setState({honorAward: (value.substr(0,value.indexOf(".")+3))*1});
      }else{
        this.setState({honorAward: _value});
      }
    }
  }

  changeHonorDesc = (val) =>{
    console.log(val.target.value)
    this.setState({
      honorDesc:val.target.value
    })
  }

  selectedSingleHonour = (id) =>{
    console.log("选中的id="+id);
    this.setState({honorId:id})
  }
  
  submit = () =>{
    let self = this;
    console.log(this.state.honorTitle)
    console.log(this.state.honorDesc)
    if(this.state.honorTitle == '' || this.state.honorDesc == ''){
      // summer.toast({
      //   msg:'名称和描述不能为空!'
      // });
      alert('名称和描述不能为空!')
      return;
    }
    let param = {
      "name":this.state.honorTitle,
      "message":this.state.honorDesc,
      "award":this.state.honorAward == '' ? 0 : this.state.honorAward,
      "value":this.state.honorValue == '' ? 0 : this.state.honorValue,
      "logo":this.state.honorId,
      "cateName":this.state.honorClassify
    }
    //console.log('param='+param)
    
  }
  
  componentDidMount(){
    this.init();
	}

	render(){
		return(
			<div className="customed-honor-main" id="CustomedHonor">
        <Input type="text" className="customed-honor-title" id="form-control" placeholder="请输入荣耀名称(不超过7个字)" maxLength={7} onBlur={this.changeInput} />
        <CustomedSwiper honorList={this.state.iconsList} selectedSingleHonour={this.selectedSingleHonour}/>
        <CustomedValueInfo 
        honorValue={this.state.honorValue}
        honorAward={this.state.honorAward}
        honorClassify={this.state.honorClassify}
        changeHonorDesc={this.changeHonorDesc} 
        changeHonorAward={this.changeHonorAward} 
        changeHonorValue={this.changeHonorValue}
        changeClassify={this.changeClassify}
         />
        <div className="customed-footer" onClick={this.submit}>提交审核</div>
      </div>
		)
	}
}

export default App;
