import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllHandbook } from '../../../services/userService';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './HandBook.scss'

class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
        }
    }
    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }

    }
    handleViewDetailHandbook = (item) =>{
        this.props.history.push(`/detail-handbook/${item.id}`);
    }
    render() {
        let { dataHandbook } = this.state
        return (
            <div className='section-share section-hanbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.handbook"/></span>
                        <button className='btn-section' ><FormattedMessage id="homepage.more-infor"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandbook && dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div className='section-customize handbook-child' key={index}
                                        onClick={() => this.handleViewDetailHandbook(item)}
                                        >
                                            <div className='bg-image section-handbook'
                                            style={{ backgroundImage: `url(${item.image})` }} />
                                            <div className='handbook-title'>{item.title}</div>
                                        </div>
                                    )
                            })}
                </Slider>
            </div>

                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
