import {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * @title 类名
     */
    className: PropTypes.string,
    /**
     * @title 样式
     */
    style: PropTypes.object,
    /**
     * @title 头部文字
     */
    renderHeader: PropTypes.string,
    /**
     * @title 底部文字
     */
    renderFooter: PropTypes.string,

    /**
     *
     * @title:头部文字的位置
     */
    headerDir: PropTypes.string,
    /**
     * @title 底部文字的位置
     */
    footerDir: PropTypes.string,
};

const defaultProps = {
    headerDir: 'left',
    footerDir: 'left',
};

class List extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {
            className,
            renderHeader,
            renderFooter,
            headerDir,
            footerDir,
            children,
            style,
            clsPrefix,
            required,
            ...props
            } = this.props;

        let classes = classNames({
            'lebra-list-box': true
        }, className);
        let headerClass=classNames({
            'lebra-list-header':true
        },{
            'lebra-list-header-center': headerDir=='center' ? true :false
        },{
            'lebra-list-header-right': headerDir=='right' ? true :false
        });

        let footerClass=classNames({
            'lebra-list-footer':true
        },{
            'lebra-list-footer-center' : footerDir=='center' ? true :false
        },{
            'lebra-list-footer-right' : footerDir=='right' ? true :false
        })
        let headerDom=null,
            footerDom=null;


        if(renderHeader ){
            headerDom= <p className={headerClass}>{renderHeader}</p>
        }
        if(renderFooter){
            footerDom=<p className={footerClass}>{renderFooter}</p>
        }
        return (
           <div className={classes}>
               {headerDom}
                <ul className="lebra-list" style={ style ? style :null}>
                    {children}
                </ul>
               {footerDom}
           </div>
        );
    }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
