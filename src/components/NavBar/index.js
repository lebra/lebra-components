/* tslint:disable:jsx-no-multiline-js */
import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../icon/index'

const defaultProps = {
  prefixCls: 'lebra-navbar',
  mode: 'dark',
  iconName: 'back',
  onLeftClick() {
  },
};

const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  mode: PropTypes.string,
  iconName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  onLeftClick: PropTypes.func
}

class NavBar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      prefixCls, className, children, mode, iconName, leftContent, rightContent, onLeftClick
      } = this.props;

    const wrapCls = classnames(prefixCls, `${prefixCls}-${mode}`, className);

    return (
      <div className={wrapCls}>
        <div className={`${prefixCls}-left`} role="button" onClick={onLeftClick}>
          <span className={`${prefixCls}-left-icon`} aria-hidden="true">
            {typeof iconName === 'string' ? <Icon type={iconName}/> : iconName}
          </span>
          <span className={`${prefixCls}-left-content`}>{leftContent}</span>
        </div>
        <div className={`${prefixCls}-title`}>{children}</div>
        <div className={`${prefixCls}-right`}>
          {rightContent}
        </div>
      </div>
    );
  }
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
