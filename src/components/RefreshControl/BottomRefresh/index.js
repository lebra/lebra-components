
import React, {Component} from "react";
import PropTypes from "prop-types";
import {TweenLite , TweenMax } from "../TweenMax.min.js";
import {findDOMNode} from "react-dom";

import "./index.less";
import loadingImg from "./loading.png";
import loadedImg from "./arrow.png";

function getTracer(enabled) {
  return function () {
    if (enabled) {
      console.log.apply(console, arguments);
    }
  }
}

const MIN_LOADING_TIME = 1500;
const trace = getTracer(true);

function currentTime() {
  return new Date().getTime();
}

class BottomRefresh extends Component {
  constructor(props, context) {
    super(props, context);
    this.getInitialState = () => {
      return {
        stage: "hidden", // hidden -> visible -> loading -> hiding -> hidden
        distance: 0,
        arrowDirection: "up"
      }
    }
    this.state = this.getInitialState()
  }

  getStage = () => {
    return this.state.stage;
  }

  start = () => {
    if (this.getStage() != "hidden") {
      console.warn("BottomRefresher.start called at state:", Object.assign({}, this.state));
      return;
    }

    trace("BottomRefresher start");
    this.setState({
      stage: "visible",
      distance: 0
    });
  }

  setDistance = (distance) => {
    if (this.getStage() != "visible") {
      console.warn("BottomRefresher.setDistance called at state:", Object.assign({}, this.state));
      return;
    }

    trace("BottomRefresher setDistance", distance);

    if (distance <= 0) {
      this._hide();
    } else if (distance >= this._height) {
      this._setDistance(this._height);
    } else {
      this._setDistance(distance);
    }
  }

  release = () => {
    if (this.getStage() != "visible") {
      console.warn("BottomRefresher.release called at state:", Object.assign({}, this.state));
      return;
    }

    trace("BottomRefresher.released at state:", Object.assign({}, this.state));

    if (this.state.distance < this._height) {
      this.hide();
    } else {
      this._refresh();
    }
  }

  hide = (preservePosistion) => {
    trace("BottomRefresher._hide", preservePosistion);

    if (!preservePosistion) {
      this.setState({
        stage: "hidding",
        distance: 0
      }, () => {
        TweenLite.to(this._containerElem, 0.4, {
          y: 0, onComplete: () => {
            trace("BottomRefresher hidden");
            this.setState(this.getInitialState());
          }
        });
      });
    } else {
      trace("preservePosistion", this._height);
      this.setState(this.getInitialState(), () => {
        TweenLite.set(this._containerElem, {y: 0});
        this.scroller.scroll(this._height);

      });
    }
  }

  _refresh = () => {
    trace("BottomRefresher._refresh");

    let startTime = currentTime();
    this.setState({stage: "loading"}, () => {
      TweenMax.to(this._imgElem, 0.5, {rotation: 360, repeat: -1, ease: Linear.easeNone});
      if (this.props.refresh) {
        this.props.refresh({
          onEnd: (preservePosistion) => {
            this.hide(preservePosistion);
          }
        });
      }else {
        this.hideTimer = setTimeout(() => {
          if (this.state.stage != "hidden") {
            this.hide(false)
          }
        }, 3000)
      }

    });
  }

  _setDistance = (distance) => {
    trace("BottomRefresher._setDistance", distance);

    let arrowDirection = (distance >= this._height ? "down" : "up");
    this.setState({distance: distance, arrowDirection});
  }

  componentDidUpdate(prevProps, prevState) {
    let stage = this.getStage();
    console.log(11111)
    if (stage == "visible") {
      TweenLite.set(this._containerElem, {y: -this.state.distance});
      let degree = (this.state.arrowDirection == "down" ? 180 : 0);
      TweenLite.to(this._imgElem, 0.2, {rotation: degree});
    }
  }

  render() {
    let stage = this.getStage();
    let imgSrc = null;
    if (stage == "loading") {
      imgSrc = loadingImg;
    } else if (stage != "hidden") {
      imgSrc = loadedImg;
    }

    return (
      <div className="ucul-bottom-refresher">
        <img className={stage == "loading" ? "loading" : ""}
             key={stage}
             src={imgSrc}
             ref={n => this._imgElem = n}/>
      </div>
    );
  }

  componentDidMount() {
    this._height = findDOMNode(this).offsetHeight;
    this._imgHeight = this._imgElem.offsetHeight;
    this._imgTop = this._imgElem.offsetTop;
    this._containerElem = findDOMNode(this).parentNode;
  }
};

export default BottomRefresh;
