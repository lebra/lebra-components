import React from 'react';
import PropTypes from 'prop-types';
import KeyCode from './KeyCode';
import TabPane from './TabPane';
import classnames from 'classnames';
import { getDataAttr } from './utils';

function noop() {
}

/**
 * 获取默认activekey 是props.children中的child的key
*/
function getDefaultActiveKey(props) {
  let activeKey;
  React.Children.forEach(props.children, (child) => {
    if (child && !activeKey && !child.props.disabled) {
      activeKey = child.key;
    }
  });
  return activeKey;
}

/**
 * key值是否是props.children中的child的key
*/
function activeKeyIsValid(props, key) {
  const keys = React.Children.map(props.children, child => child && child.key);
  return keys.indexOf(key) >= 0;
}

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    //activeKey的来源：1.props中传入的acactiveKey  2.props中传入的defdefaultActiveKey 3.取props.children中的child的key
    let activeKey;
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = getDefaultActiveKey(props);
    }
    this.state = {
      activeKey,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    } else if (!activeKeyIsValid(nextProps, this.state.activeKey)) {
      // https://github.com/ant-design/ant-design/issues/7093
      this.setState({
        activeKey: getDefaultActiveKey(nextProps),
      });
    }
  }

 /**
  *onTabClick是：传入的tabbar的onTabClick方法
  */
  onTabClick = (activeKey) => {
    if (this.tabBar.props.onTabClick) {
      this.tabBar.props.onTabClick(activeKey);
    }
    this.setActiveKey(activeKey);
  }
  
  /**
   * 设置acactiveKey值
   */
  setActiveKey = (activeKey) => {
    if (this.state.activeKey !== activeKey) {
      if (!('activeKey' in this.props)) {
        this.setState({
          activeKey,
        });
      }
      this.props.onChange(activeKey);
    }
  }
  
  /**
   *返回新的key值，3种可能 undefined，children[0].key，children[i+1].key
  */
  getNextActiveKey = (next) => {
    const activeKey = this.state.activeKey;
    const children = [];
    React.Children.forEach(this.props.children, (c) => {
      //props.children中的child存在并且不是disabled
      if (c && !c.props.disabled) {
        if (next) {
          //push，将一个或多个元素添加到数组的尾部，并返回新数组的长度。
          children.push(c);
        } else {
          //unshift,将一个或多个元素添加到数组的开头，并返回新数组的长度。
          children.unshift(c);
        }
      }
    });
    const length = children.length;
    let ret = length && children[0].key;
    children.forEach((child, i) => {
      //循环找到child.key 等于 activekey
      if (child.key === activeKey) {
        if (i === length - 1) {
          ret = children[0].key;
        } else {
          ret = children[i + 1].key;
        }
      }
    });
    return ret;
  }

  /**
   *找到keydown对应的操作，由此得到key值（getNextActiveKey）；然后点击key
   */
  onNavKeyDown = (e) => {
    const eventKeyCode = e.keyCode;
    if (eventKeyCode === KeyCode.RIGHT || eventKeyCode === KeyCode.DOWN) {
      e.preventDefault();
      const nextKey = this.getNextActiveKey(true);
      this.onTabClick(nextKey);
    } else if (eventKeyCode === KeyCode.LEFT || eventKeyCode === KeyCode.UP) {
      e.preventDefault();
      const previousKey = this.getNextActiveKey(false);
      this.onTabClick(previousKey);
    }
  }

  render() {
    const props = this.props;
    const {
      prefixCls,
      tabBarPosition, className,
      renderTabContent,
      renderTabBar,
      destroyInactiveTabPane,
      ...restProps,
    } = props;
    const cls = classnames({
      [prefixCls]: 1,
      [`${prefixCls}-${tabBarPosition}`]: 1,
      [className]: !!className,
    });

    this.tabBar = renderTabBar();
    //contents很关键，包含了tabBar和tabContent的内容
    const contents = [
      React.cloneElement(this.tabBar, {
        prefixCls,//lebra-tabs
        tabBarPosition,
        activeKey: this.state.activeKey,
        key: 'tabBar',//关键值
        panels: props.children,
        onKeyDown: this.onNavKeyDown,
        onTabClick: this.onTabClick,
      }),
      React.cloneElement(renderTabContent(), {
        prefixCls,//lebra-tabs
        tabBarPosition,
        activeKey: this.state.activeKey,
        key: 'tabContent',//关键值i
        children: props.children,
        destroyInactiveTabPane,
        onChange: this.setActiveKey,
      }),
    ];
    if (tabBarPosition === 'bottom') {
      //用于颠倒数组中元素的顺序。
      contents.reverse();
    }
    return (
      <div
        className={cls}
        style={props.style}
        {...getDataAttr(restProps)}
      >
        {contents}
      </div>
    );
  }
}

Tabs.propTypes = {
  destroyInactiveTabPane: PropTypes.bool,
  renderTabBar: PropTypes.func.isRequired,
  renderTabContent: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.any,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  tabBarPosition: PropTypes.string,
  style: PropTypes.object,
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
};

Tabs.defaultProps = {
  prefixCls: 'lebra-tabs',
  destroyInactiveTabPane: false,
  onChange: noop,
  tabBarPosition: 'top',
  style: {},
};

Tabs.TabPane = TabPane;
