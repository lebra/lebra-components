import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
};

const defaultProps = {
	labelStyle: {},
	style: {},
	inputStyle: {},
    type: 'text'
};

class Input extends Component {
    constructor(props, context){
       super(props, context);

    }

	render() {
		let {
			style,
			className,
			children,
			labelStyle,
			labelClass,
			InputClass,
			inputStyle,
			type,
			required,
			...props
		} = this.props;

		let classes = classNames({
			'u-input': true
		}, className);

		let inputClassName = classNames({
			'u-input-item': true
		}, InputClass);

		let labelClassName = classNames({
			'u-input-label': true
		}, labelClass);


		return (
			<div
				className={classes}
				style={ style ? style : null}
			>
				{ children
					? (<label className={ labelClassName } style={ labelStyle }>{children}</label>)
					: null
				}
				<input
					type={type}
					style={ inputStyle }
					className={ inputClassName }
					required={required ? required : null}
					{...props}
				/>

			</div>
		);
	}
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;

