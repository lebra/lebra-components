import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridFlex from './GridFlex';
import GridFlexItem from './GridFlexItem';
//import TouchFeedback from 'rmc-feedback';
import './index.less';

const propTypes = {
  data:  PropTypes.array,
  hasLine: PropTypes.bool,
  columnNum: PropTypes.number,
  isCarousel: PropTypes.bool,
  carouselMaxRow: PropTypes.number,
  onClick: PropTypes.func,
  renderItem: PropTypes.func,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  square: PropTypes.bool,
  //activeClassName: PropTypes.string,
  //activeStyle:PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
 //activeStyle:PropTypes.object,
  
}

const defaultProps = {
  data: [],
  hasLine: true,
  isCarousel: false,
  columnNum: 4,
  carouselMaxRow: 2,
  prefixCls: 'lebra-grid',
  square: true,
};


class Grid extends React.Component{
  constructor(props){
  	super(props);
  	this.state = {
      initialSlideWidth: 0, // only used in carousel model
  	}
  }
 

  componentDidMount() {
    this.setState({
      initialSlideWidth: document.documentElement.clientWidth,
    });
  }
  
  renderItem = (dataItem, index, columnNum, renderItem) => {
    const { prefixCls } = this.props;
    let itemEl = null;
    if (renderItem) {
      itemEl = renderItem(dataItem, index);
    } else {
      if (dataItem) {
        const { icon, text } = dataItem;
        itemEl = (
          <div className={`${prefixCls}-item-inner-content column-num-${columnNum}`}>
            {
              React.isValidElement(icon) ? icon : (
                <img className={`${prefixCls}-icon`} src={icon} />
              )
            }
            <div className={`${prefixCls}-text`}>{text}</div>
          </div>
        );
      }
    }
    return (
      <div
        className={`${prefixCls}-item-content`}
      >
        {itemEl}
      </div>
    );
  }

  getRows = (rowCount, dataLength) => {
    let { columnNum, data, renderItem, prefixCls, onClick, activeStyle, activeClassName } = this.props;
    const rowsArr = [];

    columnNum = columnNum==undefined ? 1 : columnNum;

    const rowWidth = `${100 / columnNum}%`;
    const colStyle = {
      width: rowWidth,
    };

    for (let i = 0; i < rowCount; i++) {
      const rowArr = [];
      for (let j = 0; j < columnNum; j++) {
        const dataIndex = i * columnNum + j;
        let itemEl;
        if (dataIndex < dataLength) {
          const el = data && data[dataIndex];
          itemEl = (
              <GridFlexItem
                key={`griditem-${dataIndex}`}
                className={`${prefixCls}-item`}
                onClick={() => onClick && onClick(el, dataIndex)}
                style={colStyle}
              >
                {this.renderItem(el, dataIndex, columnNum, renderItem)}
              </GridFlexItem>
          );
        } else {
          itemEl = (
            <GridFlexItem
              key={`griditem-${dataIndex}`}
              className={`${prefixCls}-item ${prefixCls}-null-item`}
              style={colStyle}
            />
          );
        }
        rowArr.push(itemEl);
      }
      rowsArr.push(<GridFlex key={`${prefixCls}-row-${i}`} justify="center" align="stretch" >{rowArr}</GridFlex>);
    }
    return rowsArr;
  }

  render() {
    const { prefixCls, className, data, hasLine,
      square, activeStyle, activeClassName, ...restProps,
    } = this.props;
    let { columnNum, carouselMaxRow, onClick, renderItem } = restProps;

    const { initialSlideWidth } = this.state;

    columnNum = columnNum== undefined ? 1 : columnNum;

    const dataLength = data && data.length || 0;

    let rowCount = Math.ceil(dataLength / columnNum);

    let rowsArr  = this.getRows(rowCount, dataLength);
    let renderEl = rowsArr;
    //console.log(rowsArr)
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-square`]: square,
      [`${prefixCls}-line`]: hasLine
    });
    return (
      <div
        className={cls}
      >
        {renderEl}
      </div>
    );
  }
}


Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;
export default Grid;