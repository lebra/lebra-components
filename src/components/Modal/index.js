import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
//import Mark from 'mask.jsx'

class Mask extends Component {
    static propTypes = {
        transparent: PropTypes.bool
    };

    static defaultProps = {
        transparent: false
    };
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
            'lebra-mask-transparent': transparent
        }, className);

        return (
            <div className={classes}></div>
        );
    }
}


const propTypes = {
    buttons: PropTypes.array,
    show: PropTypes.bool,
    title: PropTypes.string,
};

const defaultProps = {
    buttons: [],
    show: false,
    title: '',
};

class Modal extends Component {
    constructor(props){
        super(props);
    }

    renderButtons() {
        return this.props.buttons.map((action, key) => {
            const {
                type,
                label,
                ...others
            } = action;
            const className = classNames({
                'lebra-dialog-btn': true,
                'lebra-dialog-btn-default': type === 'default',
                'lebra-dialog-btn-primary': type === 'primary'
            });

            return (
                <button key={key} {...others} className={className}>{label}</button>
            );
        });
    }

    render() {
        const {
            title,
            show,
            className,
            children,
            buttons,
            ...props
        } = this.props;

        //const styleType = type ? type : 'ios';
        const cls = classNames({
            'lebra-dialog' : true
        },className);

        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <Mask/>
                <div className={cls} {...props}>
                    { title ?
                        <div className="lebra-dialog-hd">
                            <strong className="lebra-dialog-title">{title}</strong>
                        </div> : false }
                    <div className="lebra-dialog-bd">
                        {children}
                    </div>
                    <div className="lebra-dialog-ft">
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        );
    }
}
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default Modal;
