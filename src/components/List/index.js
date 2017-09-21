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
    type: 'text',
    componentClass: 'input'
};

class List extends Component {
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
            componentClass: Component,
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
				style={ style ? style : null}>
				{ children
					? (<label className={ labelClassName } style={ labelStyle }>{children}</label>)
					: null
				}
				<Component
					type={type}
					style={ inputStyle }
					className={ inputClassName }
					required={required ? required : null}
					{...props} />
			</div>
		);
	}
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
