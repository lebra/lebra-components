import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TabbarItem from './tabbarItem'
const propTypes = {
    /**
     * @title 类名
     */
    className: PropTypes.string,
    /**
     * @title 背景颜色
     */
    tabberBg: PropTypes.string,
    /**
     * @title 选中的颜色
     */
    activeColor: PropTypes.string,

    /**
     *
     * @title:未选中的颜色
     */
    color: PropTypes.string,
    /**
     *
     * @title:添加的样式
     */
    style: PropTypes.object,
};

const defaultProps = {
    tabberBg:'#f8f8f8',
    color:'#666666',
    activeColor:'#C79644',
    activeTab:'',
};

class TabBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            activeTab:this.props.activeTab
        }
    }
    onClick=(activeTab)=>{
        this.setState({
            activeTab:activeTab
        })
    }
    renderChildren=(props)=> {
        //遍历所有子组件
        return React.Children.map(props.children, child => {

            if (child.type === TabBar.Item)
                return React.cloneElement(child, {
                    onClick:this.onClick,
                    activeColor: props.activeColor,
                    color:props.color,
                    activeTab:this.state.activeTab
                })
            else
                return child
        })
    }
    render() {
        let {
            style,
            className,
            tabberBg,
            activeColor,
            color,
            children,
            ...props
            } = this.props;

        let classes = classNames({
            'lebra-tabber': true
        }, className);

        return (
            <div className={classes} style={style ? style : null}>
                {this.renderChildren(this.props)}
            </div>
        );
    }
}

TabBar.propTypes = propTypes;
TabBar.defaultProps = defaultProps;
TabBar.Item=TabbarItem;
export default TabBar;
