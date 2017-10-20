import React from 'react';
import PropTypes from 'prop-types';
import Gesture, { IGestureStatus } from 'rc-gesture';
//import { PropsType as BasePropsType} from './PropsType';
//import { TabBarPropsType } from './PropsType';
import { TabPane } from './TabPane';
import { DefaultTabBar } from './DefaultTabBar';
import { getTransformPropValue, setTransform, setPxStyle } from './util';
import { Tabs as Component} from './Tabs.base';
//import { StateType as BaseStateType } from './Tabs.base';

const propTypes = {
  /** tabs data */
  tabs: PropTypes.any,                                      //必须的
  /** TabBar's position | default: top */
  tabBarPosition:PropTypes.oneOf(['top', 'bottom','left','right']),     
  /** render for TabBar */
  renderTabBar: PropTypes.oneOfType([PropTypes.func,PropTypes.boolean]),
  /** initial Tab, index or key */
  initialPage: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  /** current tab, index or key */
  page: PropTypes.oneOfType([ PropTypes.number,PropTypes.string]),
  /** whether to switch tabs with swipe gestrue in the content | default: true */
  swipeable: PropTypes.any,
  /** use scroll follow pan | default: true */
  useOnPan: PropTypes.any,
  /** pre-render nearby # sibling, Infinity: render all the siblings, 0: render current page | default: 1 */
  prerenderingSiblingsNumber: PropTypes.number,
  /** whether to change tabs with animation | default: true */
  animated: PropTypes.any,
  /** callback when tab is switched */
  onChange: PropTypes.func,
  /** on tab click */
  onTabClick: PropTypes.func,
  /** destroy inactive tab | default: false */
  destroyInactiveTab: PropTypes.any,
  /** distance to change tab, width ratio | default: 0.3 */
  distanceToChangeTab: PropTypes.number,
  /** use paged | default: true */
  usePaged: PropTypes.any,
  /** tab paging direction | default: horizontal */
  tabDirection: PropTypes.oneOfType([ "horizontal", "vertical"]),
  /** tabBar underline style */
  tabBarUnderlineStyle:PropTypes.object,
  /** tabBar background color */
  tabBarBackgroundColor:PropTypes.string,
  /** tabBar active text color */
  tabBarActiveTextColor:PropTypes.string,
  /** tabBar inactive text color */
  tabBarInactiveTextColor:PropTypes.string,
  /** tabBar text style */
  tabBarTextStyle:PropTypes.object,
  /** default: rmc-tabs-tab-bar */
  prefixCls:PropTypes.string
}

const defaultProps = {
    tabBarPosition: 'top',
    initialPage: 0,
    swipeable: true,
    animated: true,
    prerenderingSiblingsNumber: 1,
    tabs: [],
    destroyInactiveTab: false,
    usePaged: true,
    tabDirection: 'horizontal',
    distanceToChangeTab: .3,
    prefixCls: 'rmc-tabs',
    useOnPan: true,
} 

export class Tabs extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      currentTab:0,
      minRenderIndex:0,
      maxRenderIndex:0,
      transform:"",
      isMoving:false,
      transform: this.getTransformByIndex(this.getTabIndex(props), this.isTabVertical(props.tabDirection)),
    };
    //node
    this.layout = null;
    const DefaultTabBar = DefaultTabBar;
  }
  

  onPan = (() => {
    let lastOffset= 0;
    let finalOffset = 0;
    /**
     * this.isTabVertical()方法是在Tabs.base.js中，通过this.props.tabDirection === 'vertical'
     */
    const getLastOffset = (isVertical = this.isTabVertical()) => {
      let offset = +`${lastOffset}`.replace('%', '');
      if (`${lastOffset}`.indexOf('%') >= 0) {
        offset /= 100;
        offset *= isVertical ? this.layout.clientHeight : this.layout.clientWidth;
      }
      return offset;
    };

    return {
       /**
       * 不可滑动除外
       */
      onPanStart: () => {
        if (!this.props.swipeable) return;
        this.setState({
          isMoving: true,
        });
      },

      /**
       * 滑动，动画等都可以
       * this.isTabVertical()是Tabbase的方法
       */
      onPanMove: (status) => {
        const { swipeable, animated } = this.props;
        if (!status.moveStatus || !this.layout || !swipeable || !animated) return;
        const isVertical = this.isTabVertical();
        let offset = getLastOffset() + (isVertical ? status.moveStatus.y : status.moveStatus.x);
        const canScrollOffset = isVertical ?
          -this.layout.scrollHeight + this.layout.clientHeight :
          -this.layout.scrollWidth + this.layout.clientWidth;
        offset = Math.min(offset, 0);
        offset = Math.max(offset, canScrollOffset);
        setPxStyle(this.layout, offset, 'px', isVertical);
        finalOffset = offset;
      },
      
      /**
       * 不可滑动除外
       * this.getOffsetIndex是TabsBase.js
       */
      onPanEnd: () => {
        if (!this.props.swipeable) return;
        lastOffset = finalOffset;
        const offsetIndex = this.getOffsetIndex(finalOffset, this.layout.clientWidth);
        this.setState({
          isMoving: false,
        });
        if (offsetIndex === this.state.currentTab) {
          if (this.props.usePaged) {
            setTransform(this.layout.style, this.getTransformByIndex(offsetIndex, this.isTabVertical()));
          }
        } else {
          this.goToTab(offsetIndex);
        }
      },

      setCurrentOffset: (offset) => lastOffset = offset,
    };
  })();
  
  //super.goToTab
  goToTab = (index, force = false, usePaged = this.props.usePaged)=> {
    const { tabDirection } = this.props;
    let newState = {};
    if (usePaged) {
      newState = {
        transform: this.getTransformByIndex(index, this.isTabVertical(tabDirection)),
      };
    }
    return super.goToTab(index, force, newState);
  }
  

  tabClickGoToTab =(index)=> {
    this.goToTab(index, false, true);
  }

  getTransformByIndex =(index, isVertical = false)=> {
    this.onPan.setCurrentOffset(`${-index * 100}%`);
    const translate = isVertical ? `0px, ${-index * 100}%` : `${-index * 100}%, 0px`;
    return `translate3d(${translate}, 0px)`;
  }

  onSwipe = (status) => {
    const { tabBarPosition, swipeable, usePaged } = this.props;
    if (!swipeable || !usePaged || this.isTabVertical()) return;
    // DIRECTION_NONE	1
    // DIRECTION_LEFT	2
    // DIRECTION_RIGHT	4
    // DIRECTION_UP	8
    // DIRECTION_DOWN	16
    // DIRECTION_HORIZONTAL	6
    // DIRECTION_VERTICAL	24
    // DIRECTION_ALL	30
    switch (tabBarPosition) {
      case 'top':
      case 'bottom':
        switch (status.direction) {
          case 2:
          case 8:
            this.goToTab(this.prevCurrentTab + 1);
            break;
          case 4:
          case 16:
            this.goToTab(this.prevCurrentTab - 1);
            break;
        }
        break;
    }
  }

  setContentLayout = (div) => {
    this.layout = div;
  }

  renderContent =(getSubElements = this.getSubElements())=> {
    const { prefixCls, tabs, animated } = this.props;
    const { currentTab, isMoving, transform } = this.state;
    const isTabVertical = this.isTabVertical();

    let contentCls = `${prefixCls}-content-wrap`;
    if (animated && !isMoving) {
      contentCls += ` ${contentCls}-animated`;
    }
    const contentStyle = getTransformPropValue(transform);

    return <div className={contentCls} style={contentStyle} ref={this.setContentLayout}>
      {
        tabs.map((tab, index) => {
          let cls = `${prefixCls}-pane-wrap`;
          if (this.state.currentTab === index) {
            cls += ` ${cls}-active`;
          } else {
            cls += ` ${cls}-inactive`;
          }

          const key = tab.key || `tab_${index}`;
          return <TabPane key={key} className={cls}
            shouldUpdate={this.shouldUpdateTab(index)}
            active={currentTab === index}
            fixX={isTabVertical} fixY={!isTabVertical}
          >
            {this.shouldRenderTab(index) && this.getSubElement(tab, index, getSubElements)}
          </TabPane>;
        })
      }
    </div>;
  }

  render() {
    const { prefixCls, tabBarPosition, tabDirection, useOnPan } = this.props;
    const isTabVertical = this.isTabVertical(tabDirection);
    //const tabBarProps: TabBarPropsType
    const tabBarProps = {
      ...this.getTabBarBaseProps(),
    };

    const onPan = !isTabVertical && useOnPan ? this.onPan : {};

    const content = [
      <div key="tabBar" className={`${prefixCls}-tab-bar-wrap`}>
        {this.renderTabBar(tabBarProps, DefaultTabBar)}
      </div>,
      <Gesture key="$content"
        direction={isTabVertical ? 'vertical' : 'horizontal'}
        onSwipe={this.onSwipe}
        {...onPan}
      >
        {this.renderContent()}
      </Gesture>,
    ];

    return <div className={`${prefixCls} ${prefixCls}-${tabDirection} ${prefixCls}-${tabBarPosition}`}>
      {
        tabBarPosition === 'top' || tabBarPosition === 'left' ? content : content.reverse()
      }
    </div>;
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
// Tabs.StateType = StateType;
// Tabs.defaultStateType = defaultStateType;