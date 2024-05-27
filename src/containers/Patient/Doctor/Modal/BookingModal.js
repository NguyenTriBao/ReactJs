import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        
    }


    render() {    
       // toggle={}
       
       let {isOpenModal, closeBookingModal, dataTime } = this.props
       let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <Modal isOpen={isOpenModal}  className={'booking-modal-container'}
            size='lg' centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right'><i className='fas fa-times'
                        onClick={closeBookingModal}
                        ></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                            doctorId  = { doctorId }
                            isShowDescriptionDoctor = {false}
                            dataTime = {dataTime}
                            />
                        </div>
                        <div className='price'>
                            
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                    <label>Ho ten</label>
                                    <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                    <label>so dien thoai</label>
                                    <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                    <label>dia chi email</label>
                                    <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                    <label>dia chi lien he</label>
                                    <input className='form-control'/>
                            </div>
                            <div className='col-12 form-group'>
                                    <label>ly do kham</label>
                                    <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                    <label>dat cho ai</label>
                                    <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                    <label>gioi tinh</label>
                                    <input className='form-control'/>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-cancel'
                        onClick={closeBookingModal}
                        >Huỷ</button>
                        <button className='btn-booking-confirm'>Xác nhận</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
