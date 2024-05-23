import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'

import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(preProps, preState, snapshot) {

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor : status
        })
    } 

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>địa chỉ</div>
                    <div className='name-clinic'> cl tên phòng khắm</div>
                    <div className='detail-address'> địa chỉ </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            askld;jkljdslkfjadklsfjdskfdkls
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>Giá khám: </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>giá khám</span>
                                    <span className='right'>250000</span>
                                </div>
                                <div className='note'>
                                adadadada
                                </div>
                            </div>
                            <div className='payment'>adadadada</div>
                            <div className='hide-price'>
                            <span onClick={() => this.showHideDetailInfor(false)}>
                                Ẩn bảng giá</span>
                                </div>
                        </>
                    }



                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
