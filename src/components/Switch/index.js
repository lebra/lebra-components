import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool
};

const defaultProps = {
    className: "",
    defaultChecked: true,
    disabled: false,
};

class Switch extends Component {
    constructor(props, context){
       super(props, context);

    }

	render() {
        let {
            className,
            defaultChecked,
            disabled,
            ...props
        } = this.props;

        let classes = classNames({
            'lebra-switch' : true
        },className);

		return (
            <label className={classes}>
                <input type="checkbox"
                       disabled={disabled}
                       onChange={this.props.onChange}
                       defaultChecked={defaultChecked}
                />
                <div className="lebra-track">
                    <div className="lebra-handle"></div>
                </div>
            </label>
		);
	}
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
