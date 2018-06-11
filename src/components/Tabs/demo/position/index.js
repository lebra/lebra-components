/* tslint:disable:no-console */
import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import {Tabs, DefaultTabBar } from '../../index';
import './index.less';

class BasicDemo extends React.Component{

 constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }

  renderContent(data) {
    const pStyle = { margin: 0, padding: 10 };
    return [
      <div key="t1" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 1 1</p>
        <p style={pStyle}>tab 1 2</p>
        <p style={pStyle}>tab 1 3</p>
        <p style={pStyle}>tab 1 4</p>
      </div>,
      <div key="t2" style={{ background: '#ADFFD7' }}>
         <p style={pStyle}>tab 2 1</p>
        <p style={pStyle}>tab 2 2</p>
        <p style={pStyle}>tab 2 3</p>
        <p style={pStyle}>tab 2 4</p>
      </div>,
      <div key="t3" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 3 1</p>
        <p style={pStyle}>tab 3 2</p>
        <p style={pStyle}>{JSON.stringify(data)}</p>
      </div>,
      <div key="t4" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 4 1</p>
      </div>
    ];
  }

  render() {
    const baseStyle = {
      display: 'flex', flexDirection: 'column', marginTop: 10, marginBottom: 10, fontSize: 14
    };

    return (
      <div>
        <div style={baseStyle}>
          
            <div className="example-item">
              <h2>bottom</h2>
                <Tabs tabs={[
                  { key: 't1', title: 't1' },
                  { key: 't2', title: 't2' },
                  { key: 't3', title: 't3' },
                  { key: 't4', title: 't4' },
                ]} 
                initialPage={'t2'} 
                tabBarPosition="bottom"
                tabBarUnderlineStyle={{border:"1px solid black"}}
                tabBarBackgroundColor={'red'}
                tabBarActiveTextColor={"yellow"}
                tabBarInactiveTextColor={'green'}
                tabBarTextStyle={{fontSize:".2rem",padding:".5rem 0"}}
                >
                {this.renderContent()}
                </Tabs>
            </div>


            <div className="example-item">
              <h2>left</h2>
                <Tabs tabs={[
                  { key: 't1', title: 't1' },
                  { key: 't2', title: 't2' },
                  { key: 't3', title: 't3' },
                  { key: 't4', title: 't4' },
                ]} 
                tabBarPosition="left"
                >
                {this.renderContent()}
                </Tabs>
            </div>

            <div className="example-item">
              <h2>right</h2>
                <Tabs tabs={[
                  { key: 't1', title: 't1' },
                  { key: 't2', title: 't2' },
                  { key: 't3', title: 't3' },
                  { key: 't4', title: 't4' },
                ]} 
                initialPage={'t2'} 
                tabBarPosition="right"
                >
                {this.renderContent()}
                </Tabs>
            </div>

            <div className="example-item">
              <h2>top</h2>
                <Tabs tabs={[
                  { key: 't1', title: 't1' },
                  { key: 't2', title: 't2' },
                  { key: 't3', title: 't3' },
                  { key: 't4', title: 't4' },
                ]} 
                initialPage={'t2'} 
                tabBarPosition="top"
                >
                {this.renderContent()}
                </Tabs>
            </div>
        </div> 
      </div>
    )
  }
}

let root = document.getElementById('app');

render(<BasicDemo />, root);

