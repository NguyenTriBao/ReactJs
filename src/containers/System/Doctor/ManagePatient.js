import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }
    async componentDidMount() {
        let doctorId = this.props.userInfo.id;
        let date = this.state.currentDate
        this.getDataPatient(doctorId, date)
    }
    getDataPatient = async (doctorId, date) => {
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
            let doctorId = this.props.userInfo.id;
            let date = this.state.currentDate
            this.getDataPatient(doctorId, date);
        })
    }
    handleBtnConfirm = () => {

    }
    handleBtnRemedy = () => {

    }
    render() {
        let { dataPatient } = this.state
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quan ly benh nhan kham benh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chon ngay kham</label>
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
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.timeTypePatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className='mp-btn-confirm'
                                                    onClick={()=> this.handleBtnConfirm()}>
                                                        Xác Nhận</button>
                                                    <button className='mp-btn-remedy'
                                                       onClick={()=> this.handleBtnRemedy()}>
                                                        Gửi hoá đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                        <tr>
                                            No data
                                        </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
