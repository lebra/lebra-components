import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
};

const defaultProps = {

};

class Nav extends Component {
    constructor(props, context){
       super(props, context);

    }

	render() {
        let {
            style,
            className,
            backClass,
            backTxt,
            titleClass,
            navTitle,
            componentClass: Component,
            ...props
        } = this.props;

        let classes = classNames({
            'u-nav' : true
        },className);

        let backClassName = classNames({
            'u-nav-back' : true
        },backClass);

        let titleClassName = classNames({
            'u-nav-title' : true
        },titleClass);

		return (
            <div
                className={classes}
                style={ style ? style : null}>
                <a className={backClassName} onClick={this.props.onBack}>{backTxt}</a>
                <h3 className={titleClassName}>{navTitle}</h3>
            </div>
		);
	}
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
