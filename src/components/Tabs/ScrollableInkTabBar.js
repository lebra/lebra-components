import createReactClass from 'create-react-class';
import React, { Component } from 'react';
import TabBarMixin from './TabBarMixin';
import InkTabBarMixin from './InkTabBarMixin';
import ScrollableTabBarMixin from './ScrollableTabBarMixin';

const ScrollableInkTabBar = createReactClass({
  displayName: 'ScrollableInkTabBar',
  mixins: [TabBarMixin, InkTabBarMixin, ScrollableTabBarMixin],
  render() {
    const inkBarNode = this.getInkBarNode();//得到lebra-tabs-ink-bar
    const tabs = this.getTabs();//得到tabs数组
    const scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);//得到lebra-tabs-nav-container
    return this.getRootNode(scrollbarNode); //得到lebra-tabs-bar  role="tablist" ref="root"
  },
});

export default ScrollableInkTabBar;
