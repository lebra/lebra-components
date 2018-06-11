
import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import classNames from 'classnames';
import './index.css';
//import imgsrc from './detailhonor.jpeg';

const propType = {
  honorname: PropTypes.string.isRequired,    //荣耀名字：精益求精
  honorform: PropTypes.string.isRequired,    //荣耀是谁颁发的
  honormsg: PropTypes.string.isRequired,     //荣耀内容描述
  logo: PropTypes.string.isRequired,     //荣耀对应的logo
}

class HonorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  getYMD =(nS)=> {
    /*
    * nS:为传进来的时间戳,并且24小时制显示
    */
    //年月日时分秒
    let Y,M,D,W,H,I,S;
    //月日时分秒为单位时前面补零
    function fillZero(v){
    if(v<10){v='0'+v;}
      return v;
    }
    let d=new Date(parseInt(nS/1000) * 1000);
    Y=d.getFullYear();
    M=fillZero(d.getMonth()+1);
    D=fillZero(d.getDate());
    H=fillZero(d.getHours());
    I=fillZero(d.getMinutes());
    S=fillZero(d.getSeconds());
    let localTime = Y+'年'+M+'月'+D+'日';
    return localTime;
  }
  render () {
    const {honorname,logo,honormsg,honorform,cultureName,createTime} = this.props
    return (
        <div className="honor-top">
          <section className="lucky-result">
            <div className="honour-text-container">
              <div className="honor-text-footer">
                <span>授予人：{honorform}</span>
                <span>{this.getYMD(createTime)}</span>
              </div>
            </div>
          </section>
        </div>
    )
  }
}

HonorDetail.defaultProps = {
  honorname: "",
  honorform:'',
  honormsg: '',
  logo: ""
}

HonorDetail.propType = propType

export default HonorDetail;
