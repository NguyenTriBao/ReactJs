import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor, sendDataRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataRemedyModal: {},
            isShowloading: false
        }
    }
    async componentDidMount() {
        this.getDataPatient()
    }
    getDataPatient = async () => {
        let doctorId = this.props.userInfo.id;
        let date = this.state.currentDate
        let res = await getListPatientForDoctor(doctorId, date)
        this.setState({
            dataPatient: res.data
        })
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }

    }
    handleOnchangeDatePicker = (date) => {

        this.setState({
            currentDate: new Date(date[0]).getTime()
        }, async () => {
            this.getDataPatient();
        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType
        }
        this.setState({
            isOpenRemedyModal: true,
            dataRemedyModal: data
        })
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataRemedyModal: {}
        })
    }
    sendRemedy = async (data) => {
        this.setState({
            isShowloading: true
        })
        let res = await sendDataRemedy({
            doctorId: this.state.dataRemedyModal.doctorId,
            patientId: this.state.dataRemedyModal.patientId,
            timeType: this.state.dataRemedyModal.timeType,
            language: this.props.language,
            patientName: this.state.dataPatient[0].patientData.firstName,
            email: data.email,
            imgBase64: data.imgBase64
        });
        if (res && res.errCode === 0) {
            await this.getDataPatient();
            this.closeRemedyModal();
            toast.success('Send remedy email succeed!');
            this.setState({
                isShowloading: false
            })
        }
        else {
            toast.error('Send remedy email failed!');
            this.setState({
                isShowloading: false
            })
        }
    }
    render() {
        let { isShowloading, dataPatient, isOpenRemedyModal, dataRemedyModal } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={isShowloading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            <FormattedMessage id='manage-patient-doctor.title' />
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label> <FormattedMessage id='manage-patient-doctor.choose-date' /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    value={this.state.currentDate[0]}

                                    className='form-control'
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id='manage-patient-doctor.stt'/></th>
                                            <th><FormattedMessage id='manage-patient-doctor.time'/></th>
                                            <th><FormattedMessage id='manage-patient-doctor.name'/></th>
                                            <th><FormattedMessage id='manage-patient-doctor.address'/></th>
                                            <th><FormattedMessage id='manage-patient-doctor.gender'/></th>
                                            <th><FormattedMessage id='manage-patient-doctor.action'/></th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypePatient.valueVi : item.timeTypePatient.valueEn
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className='mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}>
                                                                Xác Nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan='6'>No data</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenRemedyModal={isOpenRemedyModal}
                        dataRemedyModal={dataRemedyModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
