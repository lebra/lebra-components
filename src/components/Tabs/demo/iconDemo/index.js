
import React, { Component } from 'react';
import { render } from 'react-dom';
import Tabs from '../../index';
import { TabPane } from '../../index';
import TabContent from '../../SwipeableTabContent';
import ScrollableInkTabBar from '../../ScrollableInkTabBar';
import './index.less';

const PanelContent = ({ id }) => (
  <div>{[1, 2, 3, 4].map(item => <p key={item}>{id}</p>)}</div>
);

class BaseDemo extends Component {
  state = {
    activeKey: '',
    start: 0,
  };

  onChange = (activeKey) => {
    console.log(`onChange ${activeKey}`);
    this.setState({
      activeKey,
    });
  }

  onTabClick = (key) => {
    console.log(`onTabClick ${key}`);
    if (key === this.state.activeKey) {
      this.setState({
        activeKey: '',
      });
    }
  }

  render() {
    const start = this.state.start;
    return (
      <div style={{ margin: 20 }}>
        <h1>Icon Tabs</h1>
        <Tabs
          renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick} />}
          renderTabContent={() => <TabContent animatedWithMargin />}
          activeKey={this.state.activeKey}
          onChange={this.onChange}
        >
          <TabPane tab={<span><i class="icon cl cl-kttx"></i>tab {start}</span>} key="1">
            <PanelContent id={start} />
          </TabPane>
          <TabPane tab={`tab ${start + 1}`} key="2" disabled>
            <PanelContent id={start + 1} />
          </TabPane>
          <TabPane tab={`tab ${start + 2}`} key="3">
            <PanelContent id={start + 2} />
          </TabPane>
          <TabPane tab={<span><i class="icon cl cl-notice-p"></i>tab {start + 3}</span>} key="4">
            <PanelContent id={start + 3} />
          </TabPane>
          <TabPane tab={`tab ${start + 4}`} key="5">
            <PanelContent id={start + 4} />
          </TabPane>
          <TabPane tab={`tab ${start + 5}`} key="6">
            <PanelContent id={start + 5} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

let root = document.getElementById('app');

render(<BaseDemo />, root);