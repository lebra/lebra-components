/* tslint:disable:no-console */
import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import {Tabs, DefaultTabBar } from '../../index';
import './index.less';

const tabData = [
  { title: 't1' },
  { title: 't2' },
  { title: 't3' },
  { title: 't4' },
  { title: 't5' },
];

class BasicDemo extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      scData:"",
    };
  }

  renderContent = (tab, index) =>
    <div>
      <p>single content</p>
      <p>{JSON.stringify( index + Math.random())}</p>
    </div>
  
  renderContent2() {
    const pStyle = { margin: 0, padding: 10 };
    let dom = [] ;
    ["1",'2','3'].map(function(val,index){
      dom.push(
        <div key={index} style={{ background: '#ADFFD7' }}>
          <p style={pStyle}>tab 1 1</p>
          <p style={pStyle}>tab 1 2</p>
          <p style={pStyle}>tab 1 3</p>
          <p style={pStyle}>tab 1 4</p>
        </div>,
      )
    });
    return dom;
  }
  render() {
    const baseStyle = {
      display: 'flex', flexDirection: 'column', marginTop: 10, marginBottom: 10, fontSize: 14
    } ;
    return (
      <div style={baseStyle}>
        <div className="example-item">
          <h2>single content</h2>
          <Tabs tabs={tabData} onChange={(tab, index) => {
            this.setState({
              scData: JSON.stringify(index + Math.random())
            });
          }}
          >
            <div>
              <p>single content</p>
              <p>{this.state.scData}</p>
            </div>
          </Tabs>
        </div>
        <div  className="example-item">
          <h2>single content function</h2>
          <Tabs tabs={tabData}>
            {this.renderContent}
          </Tabs>
        </div>

        <div  className="example-item">
          <h2>single content function2</h2>
          <Tabs tabs={tabData}>
            {this.renderContent2()}
          </Tabs>
        </div>
      </div>
    );
  }
}


let root = document.getElementById('app');

render(<BasicDemo />, root);

