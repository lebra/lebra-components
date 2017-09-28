import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    /**
     * @title 尺寸
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    /**
     * @title:颜色
     */
    color: PropTypes.oneOf(['primary', 'dark','priLine','darkLine']),
    /**
     * @title 形状
     */
    shape: PropTypes.oneOf(['floating', 'square']),
    ghost: PropTypes.bool,
    /**
     * @title 是否禁用
     * @veIgnore
     */
    disabled: PropTypes.bool,
    /**
     * @title 类名
     * @veIgnore
     */
    className: PropTypes.string,
    /**
     * @title 样式
     */
    style: PropTypes.object,
    iconType: PropTypes.string,
};

const defaultProps = {
    clsPrefix: 'lebra-btn',
    size: 'lg',
    color: 'primary',
    ghost: false,
    disabled: false,
    iconType:''
};

const sizeMap = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
};

const colorsMap = {
    primary: 'primary',
    dark: 'dark',
    priLine:'priLine',
    darkLine:'darkLine'
};

const shapeMap = {
    floating: 'floating',
    squared: 'squared',
};

class Button extends Component {
  render() {
    let {color, shape, disabled, className, size, ghost, children, clsPrefix,iconType, ...others} = this.props;
    let clsObj = {};


    if (sizeMap[size]) {
        clsObj[`${clsPrefix}-${sizeMap[size]}`] = true;
    }

    if (shapeMap[shape]) {
        clsObj[`${clsPrefix}-${shapeMap[shape]}`] = true;
    }
    if (colorsMap[color]) {
        clsObj[`${clsPrefix}-${colorsMap[color]}`] = true;
    }

    if (className) {
        clsObj[className] = true;
    }

    let otherCls = classNames(clsObj, {
      [`${clsPrefix}-ghost`]: ghost,
      [`${clsPrefix}-disabled`]: disabled,
      [`${clsPrefix}-icon`]: iconType
    });

    let classes = classNames(clsPrefix, otherCls);
    return (
      <a
        className={classes}
        disabled={disabled}
        aria-disabled={`${disabled}`}
        {...others}>
        {this.props.iconType !== '' && (<i className={this.props.iconType}></i>)}
        {this.props.children}
      </a>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
