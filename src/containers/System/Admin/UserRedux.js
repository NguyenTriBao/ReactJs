import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if(res && res.errCode === 0){
                this.setState({
                    genderArr: res.data
                }) 
            }
        } catch (e) {
            
        }
    }


    render() {
        console.log('check state: ',this.state)
        let genders = this.state.genderArr;
        let language = this.props.language;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Use React-Redux with Bảo Nguyễn
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row '>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add"/> </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.email"/> </Label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.password"/></Label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.first-name"/></Label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.last-name"/></Label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.phone-number"/></Label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <Label><FormattedMessage id="manage-user.address"/></Label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.gender"/></Label>
                                <select className='form-control'>
                                {genders && genders.length > 0 &&
                                genders.map((item, index) => {
                                    return(
                                        <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )  
                                })
                                }
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.position"/></Label>
                                <select className='form-control'>
                                    <option selected>Choose...
                                    </option>
                                    <option>... 
                                    </option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.role"/></Label>
                                <select className='form-control'>
                                    <option selected>Choose...
                                    </option>
                                    <option>... 
                                    </option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <Label><FormattedMessage id="manage-user.image"/></Label>
                                <input className='form-control' type='text'/>
                            </div>
                            <div className='col-12 mt-3'>
                            <button className='btn btn-primary'><FormattedMessage id="manage-user.save"/></button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
