import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import {optionResultData} from './mock';
import {Tabs, DefaultTabBar } from '../../index';
import './index.less';
class GuessMemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:1,
           optionResult:{},
           tabsTitle:[],//tabs的名称
        };
    }

    componentDidMount() {
      this.getData();
    }
    getData = ()=>{
				let optionResult = optionResultData;
        let tabsTitle = [];
        for(let index in optionResult){
            tabsTitle.push({key:index, title:optionResult[index].optionDesc})
        }
        this.setState({
            optionResult:optionResult,
            tabsTitle:tabsTitle
        })
    }
    renderTabPane = (members) =>{
      let paneDom = [];
      members.map(function(item,index){
        //let formatTime = item.gmtCreate ? getLocalTime(item.gmtCreate) : '' ;
        paneDom.push(
          <div key={index} className="members-list-item">
            <div className="item">
              <img className="members-item-avatar" src={item.avatar} />
              <span className="members-item-name">{item.name}</span>
            </div>
            <div className="item">
              <span className="partipate-time">{`2018-01-09`}</span>
            </div>
          </div>
        )
      });
      return paneDom;
    }
    renderContent = () =>{
        let dom = [];
        let self = this;
        let optionResult = this.state.optionResult;
        for(let key in optionResult){
          dom.push(
          <div key={key}>
              <div className="members-list">
                  {self.renderTabPane(optionResult[key].members)}
              </div>
          </div>
          )
        }
        return dom
    }
    render() {
       return(
           <div className="con">
                <Tabs 
                  tabs={this.state.tabsTitle} 
                  onChange={(tab, index) => {
                    console.log('onChange', tab, index);
                    this.setState({ page: index });
                  }}
                  onTabClick={(tab, index) => {
                    console.log('onTabClick', tab, index);
                  }}
                >
                  {this.renderContent()}
                </Tabs>      
           </div>
       )
        
    }
    
}

let root = document.getElementById('app');

render(<GuessMemberList />, root);