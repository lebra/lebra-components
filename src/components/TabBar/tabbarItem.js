import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
const propTypes = {
    /**
     * @title 类名
     */
    className: PropTypes.string,
    /**
     * @title 上部分显示的为图片还是字体图标，'text' 'image' 'iconfont',默认是'text'不显示上部分
     */
    type: PropTypes.string,
    /**
     *
     * @badge:显示徽标
     */
    badge: PropTypes.string,
    /**
     * @dot 是否显示红点，在badge设置的情况下失效
     */
    dot: PropTypes.bool,
    /**
     * @icon 需要显示的字体图标
     *
     *
     */
    icon: PropTypes.string,
    /**
     * @icon 显示的图片
     *
     */
    image: PropTypes.string,
    /**
     * @activeTab 被设置的项
     *
     */
    activeTab: PropTypes.string,
    /**
     * @activeColor 选中的颜色
     *
     */
    activeColor: PropTypes.string,
    /**
     * @activeColor 未选中的颜色
     *
     */
    color: PropTypes.string,
    /**
     * @activeImg 被选中的图片
     *
     */
    activeImg: PropTypes.string,
    /**
     * @title 样式
     */
    style: PropTypes.object,
    /**
     * @title 触发的点击事件
     */
    onClick: PropTypes.func,
    /**
     * @title 唯一标识
     */
    barKey: PropTypes.string,
};

const defaultProps = {
    type:'text',

};

class TabBar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onPress=(key,e)=>{
       e.preventDefault();
        e.stopPropagation();
        this.props.changeTab(key);
        this.props.onClick(key);
    }
    render() {
        let {
            className,
            type,
            badge,
            dot,
            image,
            activeTab,
            activeColor,
            color,
            onClick,
            children,
            barKey,
            activeImg,
            ...props
            } = this.props;

        let classes = classNames({
            'lebra-tabber-item': true
        }, className);
       let iconContent=null,
           badgeContent=null,
           curColor=null;
        if(type=='text'){

        }else if(type=='image'){
            if(activeTab==barKey){

                iconContent= <img src={activeImg} alt="" className="lebra-tabber-item-img"/>
            }else {

                iconContent=<img src={image} alt="" className="lebra-tabber-item-img"/>
            }

        }else if(type=='iconfont'){
            if(activeTab==barKey){

                iconContent=<i className="lebra-tabber-item-icon" ></i>
            }else {
                iconContent=<i className="lebra-tabber-item-icon" ></i>
            }
        }
        /*标徽*/
         if(badge){
             if(isNaN(badge)){
                 badgeContent=<p className="lebra-tabber-item-badge">{badge}</p>
             }else {
                 if(parseInt(badge)>99){
                     badgeContent=<p className="lebra-tabber-item-badge">99+</p>
                 }else if(parseInt(badge)>0 && parseInt(badge)<=99){
                     badgeContent=<p className="lebra-tabber-item-badge">{parseInt(badge)}</p>
                 }
             }
         }else {
             if(dot){
                 badgeContent=<p className="lebra-tabber-item-dot">{badge}</p>
             }
         }
         /*颜色*/
        if(activeTab==barKey){
            curColor={
                color:activeColor
            }
        }else {
            curColor={
                color:color
            }
        }
        return (
            <div className={classes} style={curColor} onClick={(e)=>this.onPress(barKey,e)}>
                <div className="lebra-tabbar-icon-box">
                    {iconContent}
                    {badgeContent}
                </div>

                <div className="lebra-tabbar-item-text">
                    {children}
                </div>
            </div>
        );
    }
}

TabBar.propTypes = propTypes;
TabBar.defaultProps = defaultProps;

export default TabBar;
