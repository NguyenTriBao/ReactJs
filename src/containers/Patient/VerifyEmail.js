import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { verifyPatientBookApointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader'
import './VerifyEmail.scss'

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVefiry: false,
            errCode:''
        }
    }
    async componentDidMount() {
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await verifyPatientBookApointment({
                token: token,
                doctorId: doctorId
            })
            if(res && res.errCode === 0){
                this.setState({
                    statusVefiry: true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusVefiry: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        } 
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        
    }


    render() {      
        let {statusVefiry, errCode} = this.state
        return (
            <>
            <HomeHeader/>
            <div className='verify-email-container'>
            {statusVefiry === false ? 
            <div><FormattedMessage id="patient.verify-email.loading"/></div>
            :
            <div>
                {errCode === 0 ?
                <div className='infor-booking'><FormattedMessage id="patient.verify-email.success"/></div>
                :
                <div className='infor-booking'><FormattedMessage id="patient.verify-email.failed"/></div>}
            </div>
            }
            </div>
          
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
