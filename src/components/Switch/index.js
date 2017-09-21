import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
    defaultChecked: PropTypes.bool
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
            defaultChecked,
            ...props
        } = this.props;

        let classes = classNames({
            'u-switch' : true
        },className);

		return (
            <label className={classes}>
                <input type="checkbox"
                       onChange={this.props.onChange}
                       defaultChecked={defaultChecked}
                />
                <div className="u-track">
                    <div className="u-handle"></div>
                </div>
            </label>
		);
	}
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Switch;
