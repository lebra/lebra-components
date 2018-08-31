import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
const propTypes = {
    open:PropTypes.bool,
    placement: PropTypes.string,
    width: PropTypes.number,
    height:PropTypes.number,
    maskStyle: PropTypes.object,
};
const defaultProps = {
    open:false,
    placement:'left',
    width:256,
    height:256,
    maskStyle:{},

};
class Drawer extends Component {

    maskClick = () =>{
    alert(1)
}
customeStyle = (drawerClass='lebra-drawer',placement,open,width,height) =>{
    let contentStyle={};
    if(placement == 'left'){
        drawerClass = classNames(drawerClass,'lebra-drawer-left');
        contentStyle['width'] = width
        contentStyle['transform']= 'translateX(-100%)'
    }
    if(placement == 'right'){
        drawerClass = classNames(drawerClass,'lebra-drawer-right');
        contentStyle['width'] = width;
        contentStyle['transform']= 'translateX(100%)'
    }
    if(placement == 'top'){
        drawerClass = classNames(drawerClass,'lebra-drawer-top');
        contentStyle['height'] = height;
        contentStyle['transform']= 'translateY(-100%)'
    }
    if(placement == 'bottom'){
        drawerClass = classNames(drawerClass,'lebra-drawer-bottom');
        contentStyle['height'] = height;
        contentStyle['transform']= 'translateY(100%)'
    }
    if(open){
        drawerClass = classNames(drawerClass,'lebra-drawer-open');
        document.body.style.overflow = 'hidden';
        contentStyle['transform']= ''
    }
    return {drawerClass,contentStyle}
}
render(){
    let {open,placement,width,height,maskStyle} = this.props;
    let {drawerClass , contentStyle} = this.customeStyle('lebra-drawer',placement,open,width,height,)
    return(
        
            <div className={drawerClass}>
                <div className="lebra-drawer-mask" style={maskStyle}></div>
                <div className="lebra-drawer-content" style={contentStyle}>
                    <div className="lebra-drawer-header" onClick={this.maskClick}></div>
                    <div className="lebra-drawer-body">
                        {this.props.children}
                    </div>
                </div>
            </div>   
    )}
};
Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;
export default Drawer;