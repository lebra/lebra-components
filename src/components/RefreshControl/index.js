import React, {Component} from "react";
import PropTypes from "prop-types";
import {findDOMNode} from "react-dom";
import classnames from "classnames";
import TweenLite from "./TweenMax.min.js";
import NativeScroller from "./NativeScroller";
import TopRefresh from "./TopRefresh/index.js";
import BottomRefresh from "./BottomRefresh/index.js";

class RefreshControl extends Component {
		constructor(props) {
			super(props);
		}
    componentDidUpdate() {
        if (this.scroller) {
            this.scroller.topRefresher = this.refs.topRefresher;
            this.scroller.bottomRefresher = this.refs.bottomRefresher;
        }
        if (this.refs.bottomRefresher) {
            this.refs.bottomRefresher.scroller = this.scroller;
        }
    }
    componentDidMount() {
    if (this.scroller) {
        this.scroller.topRefresher = this.refs.topRefresher;
        this.scroller.bottomRefresher = this.refs.bottomRefresher;
    }
    if (this.refs.bottomRefresher) {
        this.refs.bottomRefresher.scroller = this.scroller;
    }

    }
		render() {

			let {className, topRefresh, bottomRefresh, children} = this.props;
			return (
				<div className={classnames(className, {"ws-scroller ": !(topRefresh || bottomRefresh)})}>
					{
						topRefresh &&
						<TopRefresh
							ref="topRefresher"
							refresh={(params) => {
								topRefresh(params)
							}}
						/>
					}
					{
						(topRefresh || bottomRefresh) ?
							<NativeScroller
								className="ws-abs-full-size ws-scroll-y"
								ref={n => this.scroller = n}>
								{children}
							</NativeScroller>
							:
							children
					}
					{
						bottomRefresh &&
						<BottomRefresh
							ref="bottomRefresher"
							refresh={(params) => {
								bottomRefresh(params)
							}}/>
					}
				</div>
			)
		}

}
;
RefreshControl.defaultProps = {
  className: "ws-abs-full-size"
};
RefreshControl.propTypes = {
  topRefresh: PropTypes.func,
  bottomRefresh: PropTypes.func,
  className: PropTypes.string,
}
export default RefreshControl;
