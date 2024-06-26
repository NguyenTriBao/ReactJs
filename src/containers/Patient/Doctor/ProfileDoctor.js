import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash'
import moment from 'moment';
import { Link } from 'react-router-dom';
class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileDoctor: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            profileDoctor: data
        })

    }
    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        if (this.props.doctorId !== preProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }

    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = this.props.language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = this.props.language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.priceBooking' /></div>
                </>
            )
        }

    }


    render() {
        // console.log("check state: ", this.state)
        let { profileDoctor } = this.state;
        let { language, isShowDescriptionDoctor, dataTime, isShowPrice, isShowLinkDetail,doctorId } = this.props;
        //console.log(dataTime)
        let nameVi = '', nameEn = '';
        if (profileDoctor && profileDoctor.positionData) {
            nameVi = `${profileDoctor.positionData.valueVi}, ${profileDoctor.lastName} ${profileDoctor.firstName}`;
            nameEn = `${profileDoctor.positionData.valueEn}, ${profileDoctor.firstName} ${profileDoctor.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${profileDoctor && profileDoctor.image ? profileDoctor.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {profileDoctor && profileDoctor.Markdown && profileDoctor.Markdown.description &&
                                        <span>
                                            {profileDoctor.Markdown.description}
                                        </span>
                                    }
                                </>
                                :

                                this.renderTimeBooking(dataTime)


                            }
                        </div>

                    </div>
                </div> {isShowLinkDetail === true && 
                <div className='view-detail-doctor'><Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
                     </div>}
                {isShowPrice === true &&
                    <div className='price'>
                        <FormattedMessage id='patient.booking-modal.price' />:
                        {profileDoctor && profileDoctor.Doctor_Infor && language === LANGUAGES.VI &&
                            <NumberFormat
                                className='currency'
                                value={profileDoctor.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        }
                        {profileDoctor && profileDoctor.Doctor_Infor && language === LANGUAGES.EN &&

                            <NumberFormat
                                className='currency'
                                value={profileDoctor.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
                        }
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
