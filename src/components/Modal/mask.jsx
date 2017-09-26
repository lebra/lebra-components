import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
    transparent: PropTypes.bool
}

const defaultProps = {
    transparent: false
}
class Mask extends Component {
    constructor(props, context){
        super(props, context);
    }
    render() {
        const {
            transparent,
            className,
            ...props
        } = this.props;

        const classes = classNames({
            'lebra-mask': !transparent,
            'lebra-mask_transparent': transparent
        }, className);

        return (
            <div className={classes}></div>
        );
    }
}

export default Mask;
