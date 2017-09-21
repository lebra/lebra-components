import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import List from './index'
import './list.css';
import WithoutData from "../../../components/WithoutData/index"

class ContentList extends List{
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }
    componentWillReceiveProps(nextProps) {

    }
    componentDidMount() {

    }

    openWin = (e) =>{
       e.stopPropagation();
        e.preventDefault();
        this.props.listClick(e)
    }
    renderTabContent = () => {
        let _this = this;
        let data = this.props.data;
        let flag = this.props.flagData;
        if(!data.length && flag) {
            return(
                <div>
                    <WithoutData />
                </div>
            )
        }
        let tabContentArray = [];
        data.map(function(item,index) {
            let showCompany=null;
            if(item.companyName){
                showCompany=<dt className="company-name">{item.companyName}</dt>
            }
            tabContentArray.push(

                <div key={index} onClick={_this.openWin(item)} className="list-item">
                    <div className="list-item-inner">
                        <div className="ibox">
                            <img src={item.avatar} alt="" />
                        </div>
                        <div className="cbox">
                            <dl>
                                <dt>{item.userName}</dt>
                                {showCompany}
                            </dl>
                        </div>
                    </div>
                </div>
            );
        });
        return tabContentArray;
    }

    render() {
        return (
            <div className="list">{this.renderTabContent()}</div>
        )
    }
}

ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default ContentList;
