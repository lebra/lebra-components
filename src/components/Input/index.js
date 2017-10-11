import React, {Component} from 'react';
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
    componentClass: 'input',
    pattern: 'inline' //inline,textarea,vertical
};

class Input extends Component {
    constructor(props, context){
       super(props, context);
       this.state = {
           value: ''
       }

    }

    handleChange = (e) => {
        let { onChange } = this.props;
        this.setState({
            value: e.target.value
        });
        onChange && onChange(e)
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
			pattern,
			...props
		} = this.props;

		let classes = classNames({
			'lebra-input': true,
            [`lebra-input-${pattern}`]: true
		}, className);

		let inputClassName = classNames({
			'lebra-input-item': true
		}, InputClass);

		let labelClassName = classNames({
			'lebra-input-label': true
		}, labelClass);

		if(pattern === 'textarea'){
            Component = pattern;
            props.maxLength = '140'
        }


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
                    value={ this.state.value}
                    onChange={ this.handleChange }
					required={required ? required : null}
					{...props}
                />
                {
                    pattern === 'textarea' ? (
                        <div className="lebra-input-font-length">
                            {this.state.value.length}/
                            <span className="total-length">140</span>
                        </div>
                    ) : null
                }
			</div>
		);
	}
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
