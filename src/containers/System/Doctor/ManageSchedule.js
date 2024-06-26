import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss';
import Select from 'react-select'
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (preProps.language !== this.props.language) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (preProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data.map(item => {
                    item.isSelected = false
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    builDataInputSelect = (inputData) => {
        let resolve = []
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                resolve.push(object);
            })

        }
        return resolve;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        });
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;

            })
            this.setState({
                rangeTime: rangeTime
            })
        } 
    }
    handleSaveSchedule = async () => {
       let {rangeTime , selectedDoctor, currentDate} = this.state;
       let result = []
        if(!currentDate){
            toast.error("Invalid date! ")
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid selected doctor! ")
            return;
        }
        //let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        //let formattedDate = moment(currentDate).unix();
        let formattedDate = new Date(currentDate).getTime();
       
        if(rangeTime.length > 0 && rangeTime){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date  = formattedDate;
                    object.timeType = schedule.keyMap
                    result.push(object);
                })     
            }
            else{
                toast.error("Invalid selected time! ")
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
             arrSchedule : result,
             doctorId: selectedDoctor.value,
             date: formattedDate
        })
        if(res && res.errCode === 0){
            toast.success("Save Infor succeed")
        }else{
            toast.error("Error saveBulkScheduleDoctor ")
            console.log('saveBulkScheduleDoctor >>>> res: ',res)
        }
    }
    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
       // console.log(rangeTime)
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>

                        <div className='col-md-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate[0]}
                                minDate={yesterday}
                                className='form-control'
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                            onClick={() => this.handleClickBtnTime(item)}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button
                            onClick={() =>this.handleSaveSchedule()}
                            className='btn btn-primary btn-save-schedule'><FormattedMessage id='manage-schedule.save'
                            /></button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
