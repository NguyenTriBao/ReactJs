import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllHandbook } from '../../../services/userService';


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

    render() {
        let { dataHandbook } = this.state
        return (
            <div className='section-share section-hanbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section' >Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandbook && dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div className='section-customize handbook-child' key={index}
                                        // onClick={() => this.handleViewDetailClinic(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
