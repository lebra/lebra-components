import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Pagination extends Component {
    static propTypes = {
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        prePagination: PropTypes.node,
        afterPagination: PropTypes.node,
        paginationClick: PropTypes.func,
        mode: PropTypes.oneOf(['button', 'dot', 'number'])
    };
    static defaultProps = {
        className: '',
        prefixCls: 'lebra-pagination',
        current: 1,
        total: 10,
        prePagination: <span className="prePagination">前一页</span>,
        afterPagination: <span className="prePagination">下一页</span>,
        paginationClick: () => { },
        mode: 'button',
    };
    constructor(props) {
        super(props)
        this.state = {
            current: props.current,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.state.current) {
            this.setState({
                current: nextProps.current,
            });
        }
    }

    btnClick = (num) => {
        if(num < 1 || num > this.props.total) return;
        this.setState({
            current: num,
        });
        if (this.props.paginationClick) {
        this.props.paginationClick(num);
        }
    }
    
    renderDom = () => {
        let { mode, total, prePagination, afterPagination, prefixCls } = this.props;
        let {current} = this.state;
        if (mode === 'button') {
            return (
                <div className={`${prefixCls}-btnWrap`}>
                    <div className={classnames(`${prefixCls}-preBtn`, { [`disabled`]: current <=1, })} role="button" onClick={e => this.btnClick(current-1)}>{prePagination}</div>
                    <div className={`${prefixCls}-content`}><span className="active contentItem">{current}</span>/<span className=" contentItem">{total}</span></div>
                    <div className={classnames(`${prefixCls}-preBtn`, { [`disabled`]: current >= total, })} role="button" onClick={e => this.btnClick(current+1)} >{afterPagination}</div>
                </div>
            )
        } else if (mode === 'dot') {
            const arr = [];
            for (let i = 0; i < total; i++) {
                arr.push(
                    <a
                        key={`dot-${i}`}
                        className={classnames(`${prefixCls}-dotWrap-dot`, { [`${prefixCls}-dotWrap-dot-active`]: i + 1 === current, })}
                        onClick={e=> this.btnClick(i+1) }
                    >
                        <span />
                    </a>,
                );
            }
            return <div className={`${prefixCls}-dotWrap`}>{arr}</div>;
        } else if (mode === 'number') {
            return (
                <div className={`${prefixCls}-numberWrap`}>
                    <span className="active">{current}</span>/<span>{total}</span>
                </div>
            )
        }

    }
    render() {
        let { className, prefixCls, mode } = this.props;
        const rootCls = {
            [className]: !!className,
            [prefixCls]: true,
            [`${prefixCls}-paginationBtnShow`]: mode === 'button',
            [`${prefixCls}-dotsShow`]: mode === 'dot',
        }

        return (
            <div className={classnames(rootCls)}>
                {this.renderDom()}
            </div>
        )
    }
};

export default Pagination;