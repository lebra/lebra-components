import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
const propTypes = {
    /**
     * @title 类名
     */
    className: PropTypes.string,
    /**
     * @duration  持续时间默认为5
     */
    duration: PropTypes.number,

    /**
     * @position 位置bottom ，center ，top 默认bottom
     */
    position: PropTypes.string,

    /**
     *
     * @callback:完成后的回调
     */
    callback: PropTypes.func,
    /**
     *
     * @title:添加的样式
     */
    style: PropTypes.object,
    /**
     *
     * @title:是否显示遮罩层
     */
    mask: PropTypes.bool,
    /**
     *
     * @title:是否显示toast
     */
    show: PropTypes.bool,
};

const defaultProps = {
    duration:5,
    position:'bottom',
    mask:true,
};

class Toast extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        let self=this;
        self.refs.toast.style.marginLeft=-(this.refs.toast.offsetWidth/2)+'px';
        self.refs.toastOverlay.style.display='block';
        let timer=self.props.duration ? self.props.duration*1000 : 5000;
       setTimeout(()=>{
           self.refs.toastOverlay.style.display='none';
           if(this.props.callback){
               this.props.callback();
           }
       },timer)
     }
    render() {
        let {
            style,
            className,
            position,
            callback,
            show,
            mask,
            children,
            ...props
            } = this.props;

       let classes=classNames({
           'lebra-toast':true
       },{
           'lebra-toast-bottom':position==='bottom'
       },{
           'lebra-toast-center':position==='center'
       },{
           'lebra-toast-top':position==='top'
       },className);
       let maskClass=classNames({
           'lebra-toast-overlay':true
       },{
           'lebra-toast-overlay-show':mask
       },{
           'lebra-toast-overlay-hide':!show
       })
        return (
            <div className={maskClass} ref='toastOverlay'>
                <div className={classes} style={style ? style : null} ref='toast'>
                    <div className="lebra-toast-child">
                        {children}

                    </div>
                </div>
            </div>
        );
    }
}
Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;
export default Toast;
