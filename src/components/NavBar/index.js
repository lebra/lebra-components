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
    rightBtn:    PropTypes.array,
    rightClass:  PropTypes.string,
    rightTxt:    PropTypes.string,
};

const defaultProps = {

};

class Nav extends Component {
    constructor(props, context){
       super(props, context);
    }

    renderList = () => {
        let rightItem = this.props.rightItem;
        let tabList = [];
        for(let i = 0;i<rightItem.length;i++){

        }
        return tabList;
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

        let rightBtnClassName = classNames({
            'lebra-nav-rightBtn' : true
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
                    ? (<a className={rightBtnClassName} onClick={this.props.onRight}>{rightTxt}</a>)
                    : null
                }
            </div>
		);
	}
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
