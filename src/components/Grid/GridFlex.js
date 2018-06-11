import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const propsTypes = {
  direction: PropTypes.oneOf(['row','row-reverse','column','column-reverse']),
  wrap: PropTypes.oneOf(['nowrap','wrap','wrap-reverse']),
  justify: PropTypes.oneOf(['start','end','center','between','around']),
  align: PropTypes.oneOf(['start','center','end','baseline','stretch']),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  alignContent: PropTypes.oneOf(['start','end','center','between','around','stretch']),
  onClick:PropTypes.func,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
}

const defaultProps = {
  prefixCls: 'lebra-flexbox',
  align: 'center',
}

export default class GridFlex extends React.Component{
  constructor(props){
    super(props);
    this.Item;
  }

  render() {
    let {
      direction, wrap, justify, align, alignContent, className, children, prefixCls, style, ...restProps,
    } = this.props;

    const wrapCls = classnames(prefixCls, className, {
      [`${prefixCls}-dir-row`]: direction === 'row',
      [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
      [`${prefixCls}-dir-column`]: direction === 'column',
      [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',

      [`${prefixCls}-nowrap`]: wrap === 'nowrap',
      [`${prefixCls}-wrap`]: wrap === 'wrap',
      [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',

      [`${prefixCls}-justify-start`]: justify === 'start',
      [`${prefixCls}-justify-end`]: justify === 'end',
      [`${prefixCls}-justify-center`]: justify === 'center',
      [`${prefixCls}-justify-between`]: justify === 'between',
      [`${prefixCls}-justify-around`]: justify === 'around',

      [`${prefixCls}-align-start`]: align === 'start',
      [`${prefixCls}-align-center`]: align === 'center',
      [`${prefixCls}-align-end`]: align === 'end',
      [`${prefixCls}-align-baseline`]: align === 'baseline',
      [`${prefixCls}-align-stretch`]: align === 'stretch',

      [`${prefixCls}-align-content-start`]: alignContent === 'start',
      [`${prefixCls}-align-content-end`]: alignContent === 'end',
      [`${prefixCls}-align-content-center`]: alignContent === 'center',
      [`${prefixCls}-align-content-between`]: alignContent === 'between',
      [`${prefixCls}-align-content-around`]: alignContent === 'around',
      [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch',

    });

    return (
      <div className={wrapCls} style={style} {...restProps}>
        {children}
      </div>
    );
  }
}

GridFlex.propsTypes = propsTypes;
GridFlex.defaultProps = defaultProps;
