import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import { postPatientBookApointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            doctorId: '',
            timeType: '',

            genderArr: [],
        }
    }
    async componentDidMount() {
        this.props.getGender();
    }

    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        if (preProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (this.props.dataTime !== preProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                this.setState({
                    doctorId: this.props.dataTime.doctorId,
                    timeType: this.props.dataTime.timeType
                })
            }
        }
    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCopy = this.state;
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
        console.log(this.state);
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = this.props.language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = this.props.language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
                return `${time} - ${date}`;
            
        }
        return ''
    }
    buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = this.props.language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` 
            : 
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            
            return name
        }
        return ''
    }
    handleConfirmBooking = async () => {
        console.log(this.state)
        let date = new Date(this.state.birthday).getTime();
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let res = await postPatientBookApointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason, 
            date: date,
            gender: this.state.gender,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString:timeString,
            doctorName: doctorName,
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed');
            this.props.closeBookingModal();
        }
        else {
            toast.error("Booking a new appointment erorr");
        }
    }

    render() {
        console.log(this.state)
        let { isOpenModal, closeBookingModal, dataTime, language } = this.props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        let genders = this.state.genderArr;
        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                size='lg' centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                        <span className='right'><i className='fas fa-times'
                            onClick={closeBookingModal}
                        ></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='price'>

                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker
                                    onChange={(date) => this.handleOnchangeDatePicker(date)}
                                    
                                    className='form-control'
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                <select className='form-control' onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                    value={this.state.gender}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}
                        ><FormattedMessage id='patient.booking-modal.btnCancel' /></button>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        ><FormattedMessage id='patient.booking-modal.btnConfirm' /></button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
