/* tslint:disable:no-console */
import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import {Tabs, DefaultTabBar } from '../../index';
import './index.less';

const tabData = [
  { title: 'title 1' },
  { title: 'title 2' },
  { title: 'title 3' },
  { title: 'title 4' },
  { title: 'title 5' },
  { title: 'title 6' },
  { title: 'title 7' },
  { title: 'title 8' },
  { title: 'title 9' },
];

class BasicDemo extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      scData:'',
      scData2:'',
      dynamicTabs: [],
    };
  }

  render() {
    const baseStyle = {
      display: 'flex', flexDirection: 'column', marginTop: 10, marginBottom: 10, fontSize: 14
    } ;

    return (
      <div>
        <div style={{ ...baseStyle }}>
          <div className="example-item">
            <h2>基本的srollTab</h2>
            <Tabs 
              tabs={tabData} 
              onChange={(tab, index) => {
                this.setState({
                  scData: JSON.stringify(index + Math.random())
                });
              }} 
              renderTabBar={(props) => <DefaultTabBar {...props} />}
            >
              <div style={{ padding: 10, background: '#ADFFD7' }}>
                <p>single content</p>
                <p>single content</p>
                <p>{this.state.scData}</p>
                <p>single content</p>
                <p>single content</p>
              </div>
            </Tabs>
          </div>
          
          
          <div className="example-item">
            <h2>srollTab，带有page=3参数</h2>
            <Tabs 
              tabs={tabData} 
              onChange={(tab, index) => {
                this.setState({
                  scData2: JSON.stringify(index + Math.random())
                });
              }} 
              renderTabBar={(props) => <DefaultTabBar {...props} page={3} />}
            >
              <div style={{ padding: 10, background: '#ADFFD7' }}>
                <p>single content</p>
                <p>single content</p>
                <p>single content</p>
                <p>single content</p>
                <p>{this.state.scData2}</p>
              </div>
            </Tabs>
          </div>
          
          {/*<div className="example-item">
            <h2>add page</h2>
            <div style={{ background: '#eee', boxShadow: '0 0 0 5px #eee', margin: 10, padding: 10 }}
              onClick={() => {
                this.setState({
                  dynamicTabs: [
                    ...this.state.dynamicTabs,
                    { title: 'title-' + this.state.dynamicTabs.length + 1 }
                  ],
                });
              }}
            >
              add page
            </div>
            <Tabs 
              tabs={this.state.dynamicTabs} 
              onChange={(tab, index) => {
                this.setState({
                  scData2: JSON.stringify(index + Math.random())
                });
              }} 
              renderTabBar={(props) => <DefaultTabBar {...props} page={3} />}
            >
              <div style={{ padding: 10, background: '#ADFFD7' }}>
                <p>single content</p>
                <p>{this.state.scData2}</p>
                <p>single content</p>
                <p>single content</p>
                <p>single content</p>
              </div>
            </Tabs>
          </div>*/}
          
        </div>
      </div>
    );
  }
}

let root = document.getElementById('app');

render(<BasicDemo />, root);

