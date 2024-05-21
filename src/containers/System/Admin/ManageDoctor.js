import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'
import './ManageDoctor.scss';
import Select from 'react-select'
import { getDetailInforDoctor } from '../../../services/userService';

const options = [
    { value: 'chocolate', label: "Chocolate" },
    { value: 'Strawbery', label: "Strawbery" },
    { value: 'Orange', label: "Orange" },
];
const mdParser = new MarkdownIt();
class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //Save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,


            //Save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedPrivince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllRequiredDoctorInfor();
    }

    builDataInputSelect = (inputData, type) => {
        let resolve = []
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                resolve.push(object);
            })

        }
        return resolve;
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataselect = this.builDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataselect
            })
        }
        if (preProps.language !== this.props.language) {
            let dataselect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataselect
            })
        }
        if (preProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataselectPrice = this.builDataInputSelect(resPrice)
            let dataselectPayment = this.builDataInputSelect(resPayment)
            let dataselectProvince = this.builDataInputSelect(resProvince)
            //console.log("data new: ",dataselectPrice,dataselectPayment,dataselectProvince)
            this.setState({
                listPrice: dataselectPrice,
                listPayment: dataselectPayment,
                listProvince: dataselectProvince,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        console.log(this.state);
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption
        });
        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkDown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }

    }

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder='Chọn bác sĩ...'
                        />
                    </div>
                    <div className='content-right'>
                        <label> <FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnchangeDesc(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            //value={this.state.selectedOption}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder='Chọn giá...'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn Phương thức thanh toán</label>
                        <Select
                            //value={this.state.selectedOption}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder='Chọn phương thức thanh toán...'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            //value={this.state.selectedOption}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder='Chọn tỉnh thành...'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control' />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}

                >
                    {hasOldData === true ? <span><FormattedMessage id='admin.manage-doctor.save' /></span> : <span><FormattedMessage id='admin.manage-doctor.add' /></span>}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
