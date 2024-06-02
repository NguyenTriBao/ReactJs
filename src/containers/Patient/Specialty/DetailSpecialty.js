import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyService, getAllCodeService } from '../../../services/userService';
import _ from 'lodash'
class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            detailSpecialty: {},
            listProvince: [],
            currentSpecialtyId: '',
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentSpecialtyId: id
            })
            //let provinceId = this.state.provinceId
            let res = await getDetailSpecialtyService(id, 'All')
            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }

                }
                let listProvince = resProvince.data
                if (listProvince && listProvince.length > 0) {
                    listProvince.unshift({
                        keyMap: "All",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn Quốc"
                    })
                }
                this.setState({
                    detailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: listProvince,
                })
            }

        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }

    }
    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value
            this.setState({
                currentSpecialtyId: id
            })
            let res = await getDetailSpecialtyService(id, location)
            
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }

                }
                this.setState({
                    detailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
        //console.log(this.state);

    }

    render() {
        let { arrDoctorId, detailSpecialty, listProvince } = this.state
        let { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {detailSpecialty && detailSpecialty.descriptionHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}>

                            </div>
                        }
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index}

                                            value={item.keyMap}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>

                                    )
                                })}


                        </select>
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&

                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowPrice={false}
                                                isShowLinkDetail={true}
                                                isShowDescriptionDoctor={true}
                                            //dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
