import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        
    }
    handleOnchangeDatePicker = () => {

    }

    render() {      
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
                        <table style={{width: '100%'}}>
                            <tr>
                                <th>Name</th>
                                <th colSpan='2'>phone</th>
                            </tr>
                            <tr>
                                <td>bill gates</td>
                                <td>sadasdasasd</td>
                                <td>asdasdsadaaa</td>
                            </tr>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
