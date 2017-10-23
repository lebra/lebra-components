import React from 'react';
import PropTypes from 'prop-types';
import { StaticContainer } from './StaticContainer';
import { getPxStyle, getTransformPropValue } from './util';

const propTypes = {
 // key?: PropTypes.string,
  className: PropTypes.string,
  shouldUpdate: PropTypes.bool,
  active: PropTypes.bool,
  fixX: PropTypes.bool,
  fixY: PropTypes.bool
}

const defaultProps ={
  fixX: true,
  fixY: true
}


export class TabPane extends React.PureComponent{
  constructor(props) {
    super(props);
    //node
    this.layout=null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.emptyContent = false;
  }
 
  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      if (nextProps.active) {
        this.offsetX = 0;
        this.offsetY = 0;
      } else {
        this.offsetX = this.layout.scrollLeft;
        this.offsetY = this.layout.scrollTop;
      }
    }
    this.emptyContent = !(this.props.children && nextProps.children);
  }

  setLayout = (div) => {
    this.layout = div;
  }

  render() {
    const { shouldUpdate, active, fixX, fixY, ...props } = this.props;
    let style = {
      ...fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {},
      ...fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {},
    };

    return <div {...props} style={style} ref={this.setLayout}>
      <StaticContainer shouldUpdate={this.emptyContent || shouldUpdate}>
        {props.children}
      </StaticContainer>
    </div>;
  }
}


TabPane.propTypes = propTypes ;
TabPane.defaultProps = defaultProps;