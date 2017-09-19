import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
};

const defaultProps = {

};

class Switch extends Component {
    constructor(props, context){
       super(props, context);

    }

	render() {
        let {
            className,
            componentClass: Component,
            ...props
        } = this.props;

        let classes = classNames({
            'u-switch' : true
        },className);

		return (
            <div>
                <label>
                    <input className={classes} type="checkbox" />
                </label>
            </div>
		);
	}
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Switch;
