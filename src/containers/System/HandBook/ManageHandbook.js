import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageHandbook.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { createNewHandbook } from '../../../services/userService';

const mdParser = new MarkdownIt();
class ManageHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            descriptionHTML: '',
            descriptionMarkdown: '',
            authorId: '',
            imageBase64: '',
        }
    }
    async componentDidMount() {
        if(this.props.userInfo){
            this.setState({
                authorId : this.props.userInfo.id
            })
        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        
    }
    handleOnChangeInput = (event) => {
        this.setState({
            title: event.target.value
        })
        
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleOnchageImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })

        }
    }
     handleSaveNewHandBook = async () => {
        let res = await createNewHandbook(this.state)
        if(res && res.errCode === 0){
            toast.success('Save new handbook succeed!')
        }else{
            toast.error("Save new handbook failed!")
        }
    }
    render() {      
        return (
            <div className='manage-handbook-container'>
            <div className='ms-title'>
            quản lý cẩm nang
            </div>
            <div className='add-new-handbook row'>
                <div className='col-6 form-group'>
                    <label>tiêu đề cẩm nang</label>
                    <input className='form-control' type='text'
                        value={this.state.name}
                        onChange={(event) => this.handleOnChangeInput(event, 'name')} 
                        />
                </div>
                <div className='col-6 form-group'>
                        <label>Thêm hình ảnh</label>
                        <input className='form-control-file' type='file'
                            onChange={(event => this.handleOnchageImage(event))} />
                    </div>
                <div className='col-12'>
                    <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div className='col-12'>
                    <button className='btn-save-handbook'
                    onClick={()=>this.handleSaveNewHandBook()}
                    >Luu</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
