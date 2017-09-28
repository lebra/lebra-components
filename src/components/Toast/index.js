import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 *  pop out indicator to inform users
 *
 */
class Toast extends Component {
    static propTypes = {
        /**
         * Icon Value
         *
         */
        /**
         * Icon Size
         *
         */
        /**
         * display toast
         *
         */
        show: PropTypes.bool
    };

    static defaultProps = {
        show: false,
    };

    render() {
        const {className, show, children, ...others} = this.props;
        const cls = classNames('lebra-toast', {
            [className]: className
        });
        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <div className={cls} {...others}>
                    <p className="lebra-toast-content">{children}</p>
                </div>
            </div>
        );
    }
}

export default Toast;
