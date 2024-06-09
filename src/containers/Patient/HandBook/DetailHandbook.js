import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailHandbookService,  } from '../../../services/userService';
import './DetailHandbook.scss'
import _ from 'lodash'

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentHandbookId: '',
            dataHandbook: [],
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let data = await getDetailHandbookService(id);
            this.setState({
                currentHandbookId: id,
                dataHandbook: data.data
            })
            
        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }

    }
  
    render() {
        let  {dataHandbook} = this.state
        console.log(dataHandbook)
        return (
            <div className='detail-handbook-container'>
                <HomeHeader />
                <div className='detail-handbook-body'>
                    <div className='description-handbook'>
                        {dataHandbook && dataHandbook.descriptionHTML &&
                            <div dangerouslySetInnerHTML={{ __html: dataHandbook.descriptionHTML }}>
                            </div>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
