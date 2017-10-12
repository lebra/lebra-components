import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';

function toThousands(value) {
    return value.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

const propTypes = {
	className: PropTypes.string,
    labelStyle: PropTypes.object,
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    componentClass: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.node
    ]),
    pattern: PropTypes.oneOf([
        'inline',
        'vertical',
        'textarea'
    ]),
    border: PropTypes.oneOf([
        'double',
        'bottom',
        'bordered'
    ]),
    onChange: PropTypes.func,
    clear: PropTypes.bool,

};

const defaultProps = {
	labelStyle: {},
	style: {},
	inputStyle: {},
    type: 'text',
    componentClass: 'input',
    pattern: 'inline', //inline,textarea,vertical
    border: 'double', //double bottom bordered
    editable: true,
    clear: true
};

class Input extends Component {
    constructor(props, context){
       super(props, context);
       this.state = {
           value: ''
       }
       this.inputRef = {};

    }

    componentWillMount() {
        let { defaultValue } = this.props;
        if(defaultValue){
            this.setState({
                value: this.formatValue(defaultValue)
            })
        }
    }

    formatValue = (value) => {
        let valueLen = value.length;
        let { type } = this.props;
        switch (type) {
            case 'text':
                break;
            case 'bankCard':
                value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                break;
            case 'phone':
                value = value.replace(/\D/g, '').substring(0, 11);

                if (valueLen > 3 && valueLen < 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3)}`;
                } else if (valueLen >= 8) {
                    value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
                }
                break;
            case 'number':
                value = value.replace(/\D/g, '');
                break;
            case 'password':
                break;
            case 'money':
                value = value.replace(/\D/g, '');
                value = toThousands(value);
                break;
            default:
                break;
        }
        return value;
    }

    handleChange = (e) => {
        let { onChange, editable } = this.props;
        let value = e.target.value;

        if(editable){
            value = this.formatValue(value);
            this.setState({
                value
            });
            onChange && onChange(value, e)
        }
    }

    handleClear = () => {
        this.setState({
            value: ''
        });
        this.focus();
    }

    focus = () => {
        this.inputRef.focus();
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
			border,
            editable,
            defaultValue,
			clear,
			...props
		} = this.props;

		let classes = classNames({
			'lebra-input': true,
            [`lebra-input-${pattern}`]: true,
            [`lebra-input-${border}`]: true
		}, className);

		let inputClassName = classNames({
			'lebra-input-item': true
		}, InputClass);

		let labelClassName = classNames({
			'lebra-input-label': true
		}, labelClass);

		if(pattern === 'textarea'){
            Component = pattern;
            if(!props.hasOwnProperty('maxLength')){
                props.maxLength = '140'
            }
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
                    ref={el => this.inputRef = el}
                />
                {
                    clear && this.state.value !== '' ? (
                        <Icon
                            className="lebra-input-clear"
                            type="backspace"
                            onClick={ this.handleClear }
                        />
                    ) : null
                }
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
