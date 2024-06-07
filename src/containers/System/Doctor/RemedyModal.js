import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import moment from 'moment';
import {CommonUtils} from '../../../utils';
class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64:'',
        }
    }
    async componentDidMount() {
        if(this.props.dataRemedyModal){
            this.setState({
                email: this.props.dataRemedyModal.email
            })
        }
    }

    async componentDidUpdate(preProps, preState, snapshot) {
        if(preProps.dataRemedyModal !== this.props.dataRemedyModal){
            this.setState({
                email: this.props.dataRemedyModal.email
            })
        }
    }
    sendDataRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    handleOnchageImage = async(event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64 : base64
            })
        }
    }

    render() {
        let { isOpenRemedyModal, dataRemedyModal, closeRemedyModal, sendRemedy } = this.props
        let {email} = this.state
        return (
            <Modal isOpen={isOpenRemedyModal} className={'booking-modal-container'}
                size='lg' centered>
                <div className='modal-header'>
                    <h5 className='modal-title'>Gửi hoá đơn khám bệnh thành công</h5>
                    <button type='button' className='close' aria-label='close'
                    onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' disabled value={email} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file' type='file'
                            onChange={(e) => this.handleOnchageImage(e)}/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button color='primary' onClick={() => this.sendDataRemedy()}
                    >Send</button>
                    <button color='secondary' onClick={closeRemedyModal}>cancel</button>
                </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
