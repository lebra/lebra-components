/* tslint:disable:no-console */
import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import {Tabs, DefaultTabBar } from '../../index';
import './index.less';

class BasicDemo extends React.Component{

 constructor(props: any) {
    super(props);

    this.state = {
      page: 0
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
      </div>,
      <div key="t5" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 5 1</p>
      </div>,
       <div key="t6" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 1 1</p>
        <p style={pStyle}>tab 1 2</p>
        <p style={pStyle}>tab 1 3</p>
        <p style={pStyle}>tab 1 4</p>
      </div>,
      <div key="t7" style={{ background: '#ADFFD7' }}>
         <p style={pStyle}>tab 1 1</p>
        <p style={pStyle}>tab 1 2</p>
        <p style={pStyle}>tab 1 3</p>
        <p style={pStyle}>tab 1 4</p>
      </div>,
      <div key="t8" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 3 1</p>
        <p style={pStyle}>tab 3 2</p>
        <p style={pStyle}>{JSON.stringify(data)}</p>
      </div>,
      <div key="t9" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 4 1</p>
      </div>,
      <div key="t10" style={{ background: '#ADFFD7' }}>
        <p style={pStyle}>tab 5 1</p>
      </div>,
    ];
  }

  render() {
    const baseStyle = {
      display: 'flex', flexDirection: 'column', marginTop: 10, marginBottom: 10, fontSize: 14
    };

    return (
      <div>
        <div style={baseStyle}>
          <div style={{ ...baseStyle }}>
            <Tabs tabs={[
            { key: 't1', title: 't1' },
            { key: 't2', title: 't2' },
            { key: 't3', title: 't3' },
          ]} page={this.state.page}
            onChange={(tab, index) => {
              console.log('onChange', tab, index);
              this.setState({ page: index });
            }}
            onTabClick={(tab, index) => {
              console.log('onTabClick', tab, index);
            }}
            renderTabBar={(props) => <DefaultTabBar
              {...props}
              renderTab={(tab: Models.TabData) => {
                if (tab.key === 't2') {
                  return <div style={{ position: 'relative' }}>
                    {tab.title}
                    <div style={{
                      position: 'absolute',
                      right: -3,
                      top: -1,
                      width: 6, height: 6,
                      background: 'red',
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                      borderTopRightRadius: 6,
                    }}></div>
                  </div>;
                }
                return <div>{tab.title}</div>;
              }}
            />}
          >
            {this.renderContent(this.state.data)}
          </Tabs>
          </div>
        </div> 
      </div>
    )
  }
}

let root = document.getElementById('app');

render(<BasicDemo />, root);

