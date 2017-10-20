import React from 'react';
import PropTypes from 'prop-types';
import Gesture, { IGestureStatus } from 'rc-gesture';
//import { Models } from './Models';
//import { TabBarPropsType } from './PropsType';
import { setPxStyle, getTransformPropValue, getPxStyle } from './util';

const propTypes = {
  /** call this function to switch tab */
  goToTab: PropTypes.func,                         //必须的
  /** tabs data */
  tabs: PropTypes.any,                         //必须的，key与title
  /** current active tab */
  activeTab: PropTypes.any,                    //必须的
  /** use animate | default: true */
  animated: PropTypes.any,                    //必须的
  /** render the tab of tabbar */
  renderTab:PropTypes.func,
  /** page size of tabbar's tab | default: 5 */
  page:PropTypes.number,
  /** on tab click */
  onTabClick: PropTypes.func,
  /** tabBar's position | defualt: top */
  tabBarPosition:PropTypes.oneOf(['top', 'bottom','left','right']),
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
    prefixCls: 'rmc-tabs-tab-bar',
    animated: true,
    tabs: [],
    goToTab: () => { },
    activeTab: 0,
    page: 5,
    tabBarUnderlineStyle: {},
    tabBarBackgroundColor: '#fff',
    tabBarActiveTextColor: '',
    tabBarInactiveTextColor: '',
    tabBarTextStyle: {}
}
 
const StateType = {
  transform: PropTypes.string,
  isMoving: PropTypes.boolean,
  showPrev: PropTypes.boolean,
  showNext: PropTypes.boolean,
}

const defaultStateType = {
  transform: '',
  isMoving: false,
  showPrev: false,
  showNext: false
}



export class DefaultTabBar extends React.PureComponent{
  //props: propsType
  constructor(props) {
    super(props);
    this.state = {
    transform: '',
    isMoving: false,
    showPrev: false,
    showNext: false,
    ...this.getTransformByIndex(props),
    };
    this.layout = null;
  }
  
  //props: propsType
  componentWillReceiveProps(nextProps) {
    if (this.props.activeTab !== nextProps.activeTab) {
      this.setState({
        ... this.getTransformByIndex(nextProps),
      });
    }
  }

  //layout: HTMLDivElement;

  onPan = (() => {
    let lastOffset: number | string = 0;
    let finalOffset = 0;

    const getLastOffset = (isVertical = this.isTabBarVertical()) => {
      let offset = +`${lastOffset}`.replace('%', '');
      if (`${lastOffset}`.indexOf('%') >= 0) {
        offset /= 100;
        offset *= isVertical ? this.layout.clientHeight : this.layout.clientWidth;
      }
      return offset;
    };

    return {
      onPanStart: () => {
        this.setState({ isMoving: true });
      },
      //status: IGestureStatus
      onPanMove: (status) => {
        if (!status.moveStatus || !this.layout) return;
        const isVertical = this.isTabBarVertical();
        let offset = getLastOffset() + (isVertical ? status.moveStatus.y : status.moveStatus.x);
        const canScrollOffset = isVertical ?
          -this.layout.scrollHeight + this.layout.clientHeight :
          -this.layout.scrollWidth + this.layout.clientWidth;
        offset = Math.min(offset, 0);
        offset = Math.max(offset, canScrollOffset);
        setPxStyle(this.layout, offset, 'px', isVertical);
        finalOffset = offset;

        this.setState({
          showPrev: -offset > 0,
          showNext: offset > canScrollOffset,
        });
      },

      onPanEnd: () => {
        const isVertical = this.isTabBarVertical();
        lastOffset = finalOffset;
        this.setState({
          isMoving: false,
          transform: getPxStyle(finalOffset, 'px', isVertical),
        });
      },
      //offset: number | string
      setCurrentOffset: (offset) => lastOffset = offset,
    };
  })();

  
  //props: propsType
  getTransformByIndex = (props) => {
    const { activeTab, tabs, page = 0 } = props;
    const isVertical = this.isTabBarVertical();

    const size = this.getTabSize(page, tabs.length);
    const center = page / 2;
    let pos = Math.min(activeTab, tabs.length - center - .5);
    const skipSize = Math.min(-(pos - center + .5) * size, 0);
    this.onPan.setCurrentOffset(`${skipSize}%`);
    return {
      transform: getPxStyle(skipSize, '%', isVertical),
      showPrev: activeTab > center - .5 && tabs.length > page,
      showNext: activeTab < tabs.length - center - .5 && tabs.length > page,
    };
  }
  
  //index: number
  onPress = (index) => {
    const { goToTab, onTabClick, tabs } = this.props;
    onTabClick && onTabClick(tabs[index], index);
    goToTab && goToTab(index);
  }

  isTabBarVertical = (position = this.props.tabBarPosition) => position === 'left' || position === 'right';
 
  //t: Models.TabData, i: number, size: number, isTabBarVertical: boolean
  renderTab = (t,i, size, isTabBarVertical) => {
    const {
      prefixCls, renderTab, activeTab,
      tabBarTextStyle,
      tabBarActiveTextColor,
      tabBarInactiveTextColor,
    } = this.props;
    
    //as是tsx的类型断言，及程序员肯定比TypeScript更了解某个值的详细信息，“相信我，我知道自己在干什么”
    //const textStyle = { ...tabBarTextStyle } as React.CSSProperties;
    const textStyle = { ...tabBarTextStyle } 
    let cls = `${prefixCls}-tab`;
    if (activeTab === i) {
      cls += ` ${cls}-active`;
      if (tabBarActiveTextColor) {
        textStyle.color = tabBarActiveTextColor;
      }
    } else if (tabBarInactiveTextColor) {
      textStyle.color = tabBarInactiveTextColor;
    }

    return <div key={`t_${i}`}
      style={{
        ...textStyle,
        ...isTabBarVertical ? { height: `${size}%` } : { width: `${size}%` },
      }}
      className={cls}
      onClick={() => this.onPress(i)}
    >
      {renderTab ? renderTab(t) : t.title}
    </div>;
  }
  
  //div: HTMLDivElement
  setContentLayout = (div) => {
    this.layout = div;
  }
  
  //page: number, tabLength: number
  getTabSize = (page, tabLength) => 100 / Math.min(page, tabLength);

  render() {
    const {
      prefixCls, animated, tabs = [], page = 0, activeTab = 0,
      tabBarBackgroundColor, tabBarUnderlineStyle, tabBarPosition
    } = this.props;
    const { isMoving, transform, showNext, showPrev } = this.state;
    const isTabBarVertical = this.isTabBarVertical();

    const needScroll = tabs.length > page;
    const size = this.getTabSize(page, tabs.length);

    const Tabs = tabs.map((t, i) => {
      return this.renderTab(t, i, size, isTabBarVertical);
    });

    let cls = prefixCls;
    if (animated && !isMoving) {
      cls += ` ${prefixCls}-animated`;
    }

    // let style = {
    //   backgroundColor: tabBarBackgroundColor || '',
    // } as React.CSSProperties;
    let style = {
      backgroundColor: tabBarBackgroundColor || '',
    } ;

    let transformStyle = needScroll ? {
      ...getTransformPropValue(transform),
    } : {};

    const { setCurrentOffset, ...onPan } = this.onPan;

    return <div className={`${cls} ${prefixCls}-${tabBarPosition}`} style={style}>
      {showPrev && <div className={`${prefixCls}-prevpage`}></div>}
      <Gesture {...onPan }
        direction={isTabBarVertical ? 'vertical' : 'horizontal'}
      >
        <div className={`${prefixCls}-content`} style={transformStyle} ref={this.setContentLayout}>
          {Tabs}
          <div style={{
            ...tabBarUnderlineStyle,
            ...isTabBarVertical ? { height: `${size}%` } : { width: `${size}%` },
            ...isTabBarVertical ? { top: `${size * activeTab}%` } : { left: `${size * activeTab}%` },
          }} className={`${prefixCls}-underline`}></div>
        </div>
      </Gesture>
      {showNext && <div className={`${prefixCls}-nextpage`}></div>}
    </div>;
  }
}

DefaultTabBar.propTypes = propTypes;
DefaultTabBar.defaultProps = defaultProps ;
// DefaultTabBar.StateType = StateType;
// DefaultTabBar.defaultStateType = defaultStateType;
// Button.propTypes = propTypes;
// Button.defaultProps = defaultProps;
// export default Button;

