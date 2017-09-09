import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


export default class Input extends Component {
	static propTypes = {

	}
	static defaultProps = {
		labelStyle: {},
		style: {},
		inputStyle: {},

	}
	render() {
		let {
			style,
			className,
			children,
			labelStyle,
			inputStyle,
			type = 'text',
			required,
			defaultValue,
			...props
		} = this.props;

		let classes = classNames({
			'u-input': true
		});

		let inputClass = classNames({
			'u-input-item': true
		}, className);

		let labelClass = classNames({
			'u-input-label': true
		});


		return (
			<div
				className={classes}
				style={ style ? style : null}
			>
				{ children
					? (<label className={ labelClass } style={ labelStyle }>{children}</label>)
					: null
				}
				<input
					type={type}
					style={ inputStyle }
					className={ inputClass }
					required={required ? required : null}
					{...props}
				/>

			</div>
		)
	}
}
