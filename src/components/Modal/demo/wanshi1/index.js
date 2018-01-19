import React, { Component } from 'react';
import HonorDetail from './components/HonorDetail';
import goldMainStyleBorder from './images/honorDetailBorder.png';
import goldMainStyleBg from './images/honorDetailBg.png';
import goldMainConTitle from './images/honorDetailTitle@2x.png';
import honorDetailName from './images/honorDetailName@2x.png';
import { shareCustomStyles } from "./components/util";
import Modal from '../../index';
import {mockData} from './mock.js';
import { render } from 'react-dom';
import './index.less';
import './detail.less';

class DetailGroup extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        honorList: [],
        modalIsOpen:false,
        memberModalIsOpen:false,//人员列表
        showPageFlag: false,
        style1:{
          buttons: [
              {
                  label: '我知道了',
                  onClick: this.closeModal.bind(this)
              }
          ]
        }
      };

      
    }

    componentDidMount () {
        this.getList();
    }

    getList = () => {
      let self = this;
      self.setState({honorDetail:mockData.data,showPageFlag:true});
     
    }
    
    getMemberArrary = (toMemberList) =>{
      let memberArrary = [];
      if(!toMemberList || !toMemberList.length) return [];
      toMemberList.map(function(item,index) {
        {!index ? memberArrary.push(`${item.name}`) : memberArrary.push(`、${item.name}`)}
      });
      return memberArrary;
    }
    
    renderLimitUser = (memberArrary) =>{
        let userArray = [];
        let innerWidth =  window.innerWidth * 0.64;
        //let ruler =document.getElementById('ruler'); 
        let $ruler = $("#ruler");
        $("#ruler").removeClass('hidden');
        $("#ruler").html('');
        //ruler.style.display='inline';//隐藏起来
        //ruler.innerHTML = "";//为了还原
        for(let i = 0 ;i < memberArrary.length ; i++){
           //ruler.append(memberArrary[i]); 
           $ruler.append(ruler,memberArrary[i]);
          if(ruler.offsetWidth <innerWidth){
              userArray.push(memberArrary[i])
          }
          if(ruler.offsetWidth > innerWidth){
             userArray.push(`等${memberArrary.length}人`);
             break;
          } 
        }
        $("#ruler").addClass('hidden');
        //ruler.style.display='none';//隐藏起来
        return userArray;
      }
  

    renderHonorUserList = (honourMsg,memberArrary,honourValue,honourAward) => {
      if(!memberArrary.length) return;
      return(
        <div className="cmt-body">
          <div className="con-name">{this.renderLimitUser(memberArrary)}</div>
          <div className="con-line"></div>
          <div className="con-desc">{honourMsg}&nbsp;&nbsp;
            {honourAward !== '0' && (<span>特奖励{memberArrary.length>1 && `每人`}金豆<span className="award-num">{honourAward}</span>个</span>)}
            {honourValue !== '0' && (<span>+荣耀币<span className="award-num">{honourValue}</span>枚</span>)}
          </div>
          {/*<div className="con-award"></div>*/}
        </div>
      )
    }
    
    renderHonorFooter = (memberArrary) =>{
      return(
        <div className="footer">
          <span className="see-more" onClick={this.openMemberListModal}>点击查看更多</span>
        </div>
      )
    }

    closeModal = () => {
       this.setState({modalIsOpen:false,memberModalIsOpen:false});
    }

    openMemberListModal = () =>{
      let self = this;
      this.setState({memberModalIsOpen:true},function() {
        self.centerDialog();
      });
    }

    centerDialog = () => {
      let screenWidth;
      let screenHeight;
      let dialogObj = document.getElementsByClassName("exchange-modal")[0];
      if(!dialogObj) return;
      if (window.innerWidth)
        screenWidth = window.innerWidth;
      else if ((document.body) && (document.body.clientWidth))
          screenWidth = document.body.clientWidth;
       // 获取窗口高度
      if (window.innerHeight)
        screenHeight = window.innerHeight;
      else if ((document.body) && (document.body.clientHeight))
        screenHeight = document.body.clientHeight;
        // 通过深入 Document 内部对 body 进行检测，获取窗口大小
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
        screenHeight = document.documentElement.clientHeight;
        screenWidth = document.documentElement.clientWidth;
      }
      //let screenWidth = window.width(), screenHeight = window.height(); //当前浏览器窗口的 宽高   
      var scrolltop = document.body.scrollTop; //获取当前窗口距离页面顶部高度   
      var objLeft = (screenWidth - dialogObj.clientWidth)/2 ;   
      var objTop = (screenHeight - dialogObj.clientHeight)/2 + scrolltop;  
      dialogObj.style.left =  objLeft + 'px';
      dialogObj.style.top =  objTop + 'px'; 
    }
    
   

    render() {
      let goldMainStyle = {
        backgroundImage:`url(${goldMainStyleBg})`
      };
      let goldConStyle = {
        backgroundImage:`url(${goldMainStyleBorder})`
      };
      if(this.state.showPageFlag && !this.state.honorDetail) return <WithoutData></WithoutData>;
      //let canShow = this.state.honorDetail && this.state.honorDetail.canShow;
      let honorname = this.state.honorDetail && this.state.honorDetail.tagName;
      let logo = this.state.honorDetail && this.state.honorDetail.logo;
      let honorform = this.state.honorDetail && this.state.honorDetail.fromMember && this.state.honorDetail.fromMember.name;
      let honormsg = this.state.honorDetail && this.state.honorDetail.comment;
      let honourAward = this.state.honorDetail && this.state.honorDetail.honourAward;
      let honourValue = this.state.honorDetail && this.state.honorDetail.honourValue;
      let toMemberList = this.state.honorDetail && this.state.honorDetail.toMemberList;
      let memberArrary = this.getMemberArrary(toMemberList);
      let createTime = this.state.honorDetail && this.state.honorDetail.createTime;
      let cultureName = this.state.honorDetail && this.state.honorDetail.cultureName;
      let givenScore = this.state.honorDetail && this.state.honorDetail.givenScore;
      let companyLogo = this.state.honorDetail && this.state.honorDetail.companyLogo;
      //let companyLogo =  "https://hongbao-cdn.yonyoucloud.com/uculture/app/company-avator/logo@2x.png";
      return (
        <div className="react-full-height">
          <div className={this.state.showPageFlag?"gold main":"hide gold main"} style={goldMainStyle}>
            <div className="honour-detail-con" style={goldConStyle}>
                <div className="header-company-logo" style={{backgroundImage:`url(${companyLogo})`}}></div>
                <img className="honour-detail-title" src={ goldMainConTitle} />
                <div className="honor-logo">
                  <img className="honour-detail-logo" src={ logo} />
                  <span className="logo-name" style={{backgroundImage:`url(${honorDetailName})`}}>{honorname}</span>
                </div>
                <div className="cmt--content">
                  <span id="ruler"></span>
                  {this.renderHonorUserList(honormsg,memberArrary,honourValue,honourAward)}
                </div>
                <HonorDetail honorname={honorname} logo={logo} honormsg={honormsg} honorform={honorform} cultureName={cultureName} createTime={createTime}></HonorDetail>
                {this.renderHonorFooter(memberArrary)}
            </div>
            <Modal
              show={this.state.memberModalIsOpen}
              buttons={this.state.style1.buttons}
            >
              <div className="modal-body">
                {memberArrary}
              </div>
             
            </Modal>
          </div>
        </div>
      )
    }
}
let root = document.getElementById('app');

render(<DetailGroup />, root);

