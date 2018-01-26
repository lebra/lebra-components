import React, {Component} from "react";
import PropTypes from "prop-types";
import {findDOMNode} from "react-dom";
import TweenLite from "./TweenMax.min.js";
const DEFAULT_SCROLLING_TIME = 0.4;

function getTracer(enabled) {
  return function () {
    if (enabled) {
      console.log.apply(console, arguments);
    }
  }
}

const trace = getTracer(false);

class NativeScroller extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this._contentNode = findDOMNode(this);
    this._tickActions = {};
    this.refresh();
    this.mounted = true
  }

  componentDidUpdate() {
    this.refresh();
  }

  getChildContext = () => {
    return {
      addOnScrollEventListener: this._addOnScrollEventListener,
      removeOnScrollEventListener: this._removeOnScrollEventListener
    };
  }

  _addOnScrollEventListener = (listener) => {
    if (!this._onScrollEventListeners) {
      this._onScrollEventListeners = [];
    }
    this._onScrollEventListeners = this._onScrollEventListeners.push(listener);
  }

  _removeOnScrollEventListener = (listener) => {
    if (this._onScrollEventListeners) {
      this._onScrollEventListeners = this._onScrollEventListeners.filter(x => x !== listener);
    }
  }

  requestTick = (key, fn) => {
    let isTicking = !(JSON.stringify(this._tickActions) === "{}");
    this._tickActions[key] = fn;
    if (!isTicking) {
      requestAnimationFrame(this._runTickActions);
    }
  }
  _runTickActions = () => {

    if (this.mounted) {
      let tickActions = this._tickActions;
      for (var key in tickActions) {
        let fn = tickActions[key];
        if (fn && typeof fn === "function") fn()
      }

    }
    this._tickActions = {};
  }

  refresh = () => {
    this.lastScrollTop = this.scrollTop = this._contentNode.scrollTop;
    this.scrollHeight = this._contentNode.scrollHeight;
    this.offsetHeight = this._contentNode.offsetHeight;
    this.maxScrollY = this.scrollHeight - this.offsetHeight;
    this.isScrollHeight = this.props.getIsScrollHeight ? this.props.getIsScrollHeight() : null;

    console.log("refresh NativeScroll", {
      scrollHeight: this.scrollHeight,
      offsetHeight: this.offsetHeight,
      scrollTop: this.scrollTop,
      maxScrollY: this.maxScrollY,
      isScrollHeight: this.isScrollHeight
    });
  }

  scroll = (distance) => {
    console.log("scroll", distance);
    this._contentNode.scrollTop += distance;
    this.refresh();
  }

  scrollTo = (position) => {
    TweenLite.to(this._contentNode, DEFAULT_SCROLLING_TIME, {
      scrollTo: position
    });
  }

  _onScroll = (event) => {
    let scrollTop = this._contentNode.scrollTop;
    this.scrollTop = scrollTop;

    trace("onscroll", scrollTop);

    if (this.props.onScrollImmediately) {
      this.props.onScrollImmediately({scrollTop, event});
    }

    this.requestTick("scroll", () => {
      this._onScrollUpdate(scrollTop);
    });
  }

  _setIsScroll = () => {
    if (this.props.setIsScroll) {
      trace("setIsScroll");
      this.props.setIsScroll(true);
    }
  }

  _unsetIsScroll = () => {
    if (this.props.setIsScroll) {
      trace("unsetIsScroll");
      this.props.setIsScroll(false);
    }
  }

  _setIsScrollShow = () => {
    if (this.props.setIsScrollShow) {
      trace("setIsScrollShow");
      this.props.setIsScrollShow(true);
    }
  }

  _unsetIsScrollShow = () => {
    if (this.props.setIsScrollShow) {
      trace("unsetIsScrollShow");
      this.props.setIsScrollShow(false);
    }
  }

  _onScrollUpdate = (scrollTop) => {
    let direction;

    if (scrollTop > this.lastScrollTop) {
      direction = "up";
    } else if (scrollTop < this.lastScrollTop) {
      direction = "down";
    } else {
      direction = "none";
    }

    this.lastScrollTop = scrollTop;

    trace("_onScrollUpdate", {
      direction,
      top: this.lastScrollTop,
      maxScrollY: this.maxScrollY,
      isScrollHeight: this.isScrollHeight
    });

    if (this.props.onScroll) {
      this.props.onScroll({direction, scrollTop: this.scrollTop});
    }

    if (this._onScrollEventListeners) {
      this._onScrollEventListeners.forEach(fn => fn(direction, this.scrollTop));
    }

    if (this.isScrollHeight != null) {
      if (direction == "up" && this.scrollTop >= this.isScrollHeight) {
        this._setIsScroll();
        this._setIsScrollShow();
      } else if (direction == "down" && this.scrollTop < this.isScrollHeight) {
        this._unsetIsScroll();
        this._unsetIsScrollShow();
      }
    }

    if (direction == "up" && this.props.isScroll && this.props.isScroll()) {
      this._setIsScrollShow();
    }

    if (this.backTop) {
      if (this.scrollTop >= this.offsetHeight) {
        this.backTop.show();
      } else {
        this.backTop.hide();
      }
    }
  }

  _onTouchStart = (event) => {
    let clientY = event.touches[0].clientY;
    this.touchStartClientY = clientY;
    this.touchStartScrollTop = this.scrollTop;

    if (this.props.onTouchStart) {
      this.props.onTouchStart({clientY, event});
    }
  }

  _onTouchMove = (event) => {
    let scrollTop = this._contentNode.scrollTop;
    this.scrollTop = scrollTop;

    let clientY = event.changedTouches[0].clientY;
    this.touchMoveClientY = clientY;

    let startY = this.touchStartClientY;
    let isAtTop = (startY <= clientY && scrollTop === 0);
    let isAtBottom = (startY >= clientY && scrollTop === this.maxScrollY);

    if (window.scrollY != 0) {
      console.log("_onTouchMove window.scrollY:", window.scrollY);
      event.preventDefault();
    } else if (isAtTop) {
      console.log("_onTouchMove isAtTop");
      event.preventDefault();
    } else if (isAtBottom) {
      console.log("_onTouchMove isAtBottom");
      event.preventDefault();
    }

    trace("_onTouchMove", {clientY});

    if (this.props.onTouchMoveImmediately &&
      this.props.onTouchMoveImmediately({clientY, event}) === false) {
      return;
    }
    if (this.topRefresher && this.topRefresher.getStage() != "hidden") {
      trace("_onTouchMove preventDefault, topRefresher.stage:", this.topRefresher.getStage());
      event.preventDefault();
    } else if (this.bottomRefresher && this.bottomRefresher.getStage() != "hidden") {
      trace("_onTouchMove preventDefault, bottomRefresher.stage:", this.bottomRefresher.getStage());
      event.preventDefault();
    }

    this.requestTick("touchmove", () => {
      this._onTouchMoveUpdate(clientY, scrollTop);
    });
  }

  _onTouchMoveUpdate = (clientY, scrollTop) => {
    let direction;

    if (this.touchStartClientY > clientY) {
      direction = "up";
    } else if (this.touchStartClientY < clientY) {
      direction = "down";
    } else {
      direction = "none";
    }

    trace("_onTouchMoveUpdate", {direction, clientY});

    if (this.props.onTouchMove) {
      this.props.onTouchMove({direction, scrollTop, clientY});
    }


    if (this.topRefresher) {
      let stage = this.topRefresher.getStage();

      if (stage == "hidden") {
        if (direction == "down" && this.scrollTop == 0) {
          this.topRefresherStartClientY = clientY;
          this.topRefresher.start();
        }
      } else if (stage == "visible") {
        let distance = clientY - this.topRefresherStartClientY;
        this.topRefresher.setDistance(distance);
      }
    }

    if (this.bottomRefresher) {
      let stage = this.bottomRefresher.getStage();
      console.log(stage);
      if (stage == "hidden") {
        console.log(this.scrollTop, this.maxScrollY);
        if (direction == "up" && this.scrollTop >= this.maxScrollY - 2) {
          this.bottomRefresherStartClientY = clientY;
          this.bottomRefresher.start();
        }
      } else if (stage == "visible") {
        let distance = this.bottomRefresherStartClientY - clientY;
        this.bottomRefresher.setDistance(distance);
      }
    }
  }

  _onTouchEnd = (event) => {
    trace("_onTouchEnd");
    if (this.props.onTouchEnd) {
      trace("onTouchEnd");
      this.props.onTouchEnd();
    }

    if (this.topRefresher && this.topRefresher.getStage() == "visible") {
      this.topRefresher.release();
    }

    if (this.bottomRefresher && this.bottomRefresher.getStage() == "visible") {
      this.bottomRefresher.release();
    }
  }
  
  render() {
    let {component = "div"} = this.props;

    let props = Object.assign({}, this.props, {
      onScroll: this._onScroll,
      onTouchStart: this._onTouchStart,
      onTouchMove: this._onTouchMove,
      onTouchEnd: this._onTouchEnd
    });

    delete props.component;
    delete props.getIsScrollHeight;
    delete props.onScrollToBottom;
    delete props.isScroll;
    delete props.setIsScroll;
    delete props.setIsScrollShow;
    delete props.onTouchMoveImmediately;
    delete props.onScrollImmediately;
    delete props.getTopRefresher;
    delete props.getBottomRefresher;

    return React.createElement(
      component,
      props,
      props.children
    );
  }

  
  
};

NativeScroller.getElementTop = function (element) {
  return (element.offsetTop + parseInt(window.getComputedStyle(element).marginTop))
};

NativeScroller.childContextTypes = {
  addOnScrollEventListener: PropTypes.func,
  removeOnScrollEventListener: PropTypes.func
};

export default NativeScroller;
