import React, { Component } from 'react'
import PropTypes from 'prop-types'

//import Swiper from 'react-id-swiper';
//import 'react-id-swiper/src/styles/css/swiper.css';

class customedSwiper extends Component{
   constructor(props) {
    super(props);
    this.state = {
    }
  }

  onSelectHonour =(e,id) =>{
    e.propagation;
    const {selectedSingleHonour } = this.props;
    let selectedDom;
    let dom = document.getElementsByClassName("is-select");
    for(var i in dom) {
      if(dom.length>0 ) {
        dom[i].className = "col-items";
      }
    }
    if(e.target.className == "col-items") {
      selectedDom = e.target;
      selectedDom.className = "col-items";
    }else {
      selectedDom = e.target.parentElement;
      if(selectedDom.className == "honor-detail") {
        selectedDom = selectedDom.parentElement;
      }
      if(selectedSingleHonour) {
        if(selectedDom.className == "col-items is-select") {
          selectedDom.className = "col-items";
        }else if(selectedDom.className == "col-items"){
          selectedDom.className = "col-items is-select";
        }
      }
    }

    selectedSingleHonour(id);
  }

  getListView =(honorList,index) =>{
    if(!honorList) return;
    let row = this.splitData().row;
    let columsArray = [];
    let self = this;
    honorList.map( (item,index) => {
      columsArray.push(
        <div key={`swiper-${index}`}
          onClick={(e) => self.onSelectHonour(e,item.id)}
          data-checked = {item.checked}
          className={item.checked?"col-items is-select":"col-items"}
          data-id={item.id}>
          <div className="honor-detail">
            <img src={item.url} alt="" />
            <div className="icon-select">
               <i className="icon iconfont icon-selected"></i>
            </div>
          </div>
        </div>
      )
    })
    return columsArray;
  }
 
  splitData =() =>{
    let honorList = this.props.honorList;
    let splitNum = 12;
    let row = Math.ceil(honorList.length/splitNum);
    let NewHonorList = {};
    let j = 0;
    for(var i=0;i<row;i++) {
      NewHonorList[i] = honorList.slice(j,j+splitNum);
      j = j+splitNum;
    }
    return {"NewHonorList":NewHonorList,"row":row};
  }

  getSwiperListView =() =>{
    let NewHonorList = this.splitData().NewHonorList;
    let columsArray = [];
    let self = this;
    for(var item in NewHonorList) {
      let contentList = self.getListView(NewHonorList[item],item);
      columsArray.push(
         <div key={item} className="colums">
           {contentList}
         </div>
      )
    }
    if(columsArray.length == 0){
      return (<div></div>)
    }else{
      return columsArray
    }
  }

  componentDidMount () {
    
  }

  render(){
    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    }   
    return(
    <div className="customed-icons-list">
      <label className="title">请选择荣耀项样式</label>
      {this.getSwiperListView()}
    </div>
    )
  }
  
}
export default customedSwiper;

