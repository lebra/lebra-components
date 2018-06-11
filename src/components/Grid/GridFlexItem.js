import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  style:PropTypes.object,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
}

const defaultProps = {
  prefixCls: 'lebra-flexbox',
}
export default class GridFlexItem extends React.Component{

  render() {
    let { children, className, prefixCls, style, ...restProps } = this.props;
    const wrapCls = classnames(`${prefixCls}-item`, className);
    return (
      <div className={wrapCls} style={style} {...restProps}>{children}</div>
    )
  }
}

GridFlexItem.propTypes = propTypes;
GridFlexItem.defaultProps = defaultProps;
