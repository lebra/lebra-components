import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};
const defaultProps = {
    className: '',
    type: ''
};

function Icon(props) {
    let {type, className, ...ret} = props;
    return (
        <i
            className={`iconfont icon-${type} ${className}`}
            {...ret}
        />
    )
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
export default Icon;
