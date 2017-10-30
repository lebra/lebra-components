import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
	className:   PropTypes.string,
    leftBtn :    PropTypes.bool,
    backClass:   PropTypes.string,
    backTxt:     PropTypes.string,
    titleClass:  PropTypes.string,
    navTitle:    PropTypes.string,
    rightBtn:    PropTypes.bool,
    rightClass:  PropTypes.string,
    rightTxt:    PropTypes.string,
};

const defaultProps = {
    backTxt: "返回"
};

class Nav extends Component {
    constructor(props, context){
       super(props, context);
    }

	render() {
        let {
            style,
            className,
            leftBtn,
            backClass,
            backTxt,
            rightBtn,
            rightClass,
            rightTxt,
            titleClass,
            navTitle,
            ...props
        } = this.props;

        let classes = classNames({
            'lebra-nav' : true
        },className);

        let backClassName = classNames({
            'lebra-nav-back' : true
        },backClass);

        let titleClassName = classNames({
            'lebra-nav-title' : true
        },titleClass);

        let rightClassName = classNames({
            'lebra-nav-right' : true
        },rightClass);

		return (
            <div
                className={classes}
                style={ style ? style : null}>
                { leftBtn
                    ? (<a className={backClassName} onClick={this.props.onBack}>{backTxt}</a>)
                    : null
                }
                <h3 className={titleClassName}>{navTitle}</h3>
                { rightBtn
                    ? (<a className={rightClassName} onClick={this.props.onRight}>{rightTxt}</a>)
                    : null
                }
            </div>
		);
	}
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
