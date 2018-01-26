import React, {Component} from "react"
import {findDOMNode} from "react-dom";
import TweenLite from "../TweenMax.min.js";
import "./index.less";
import loadingImg from "./loadingPost.gif";
import loadLogp from "./loading.gif"

function getTracer(enabled) {
  return function () {
    if (enabled) {
      console.log.apply(console, arguments);
    }
  }
}

const MIN_LOADING_TIME = 2000;
const trace = getTracer(true);

function currentTime() {
  return new Date().getTime();
}

class TopRefresh extends Component {
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
      console.warn("TopRefresher.start called at state:", Object.assign({}, this.state));
      return;
    }

    trace("TopRefresher start");
    this.setState({
      stage: "visible",
      distance: 0
    });
    if(this.props.hideHeader) {
      this.props.hideHeader(true);
    }
  }

  setDistance = (distance) => {
    if (this.getStage() != "visible") {
      console.warn("TopRefresher.setDistance called at state:", Object.assign({}, this.state));
      return;
    }

    trace("TopRefresher setDistance", distance);

    if (distance <= 0) {
      this._hide();
    } else if (distance >= this._height) {
      let  overH = distance - this._height;
      let _distance = this._height + (overH - overH/1.5)
      this.setState({distance: _distance, text: "放手就给您刷新"});
    } else {
      this.setState({distance});
    }
  }

  release = () =>  {
    if (this.getStage() != "visible") {
      console.warn("TopRefresher.release called at state:", Object.assign({}, this.state));
      return;
    }

    trace("TopRefresher.released at state:", Object.assign({}, this.state));

    if (this.state.distance < this._height) {
      this._hide();
    } else {
      this._refresh();
    }
  }

  _hide = () =>  {
    trace("TopRefresher._hide");

    this.setState({
      stage: "hidding",
      distance: 0,
      text: "下拉刷新"
    }, () => {
      TweenLite.to(this._containerElem, 0.4, {
        y: 0, onComplete: () => {
          trace("TopRefresher hidden");
          this.setState(this.getInitialState());
          if(this.props.hideHeader) {
            this.props.hideHeader(false);
          }
        }
      });
    });
  }

  _refresh = () =>  {
    trace("TopRefresher._refresh");

    let startTime = currentTime();

    this.setState({stage: "loading",text: "刷新中···"}, () => {
      if (this.props.refresh) {
        this.props.refresh({
          // delay: MIN_LOADING_TIME,
          onEnd: () => {
            this._hide();
          }
        });
      }else {
        this.hideTimer = setTimeout(() => {
          this._hide()
        }, MIN_LOADING_TIME)
      }
    });
  }

  _setDistance = (distance) => {
    trace("TopRefresher._setDistance", distance);

    this.setState({distance: distance});
  }

  componentDidUpdate(prevProps, prevState) {
    let stage = this.getStage();
    if (stage == "visible") {
      let distance = this.state.distance;

      trace("TweenLite set", {y: distance});
      TweenLite.set(this._containerElem, {y: this.state.distance});

    } else if (stage == "loading") {
      TweenLite.set(this._containerElem, {y: this._height});
    }
  }

  render() {
    let stage = this.getStage();
    let {distance, text} = this.state;
    let reachMaxDistance = (distance >= this._height);
    let h = {}
    return (
      <div className="ucl-top-refresher">
        <div className="refresher-con">
          {
            stage == "loading" ?
              <img src={loadLogp} className="loading" alt=""/> :
              <img src={loadingImg} className="mascot" alt=""/>
          }
          <div className="text">
            <p>玩工作，玩事业</p>
            <p>{text}</p>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._height = findDOMNode(this).offsetHeight;
    this._containerElem = findDOMNode(this).parentNode;

  }
}

export default TopRefresh;
