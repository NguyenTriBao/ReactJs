import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


 
class HomeFooter extends Component {


    render() {
        return (
            <div className='home-footer'>
               <p>&copy; 2024 BookingCare's webiste <a target='_blank' href='https://github.com/NguyenTriBao'>My github</a></p>
            </div>
        );
    }
ƒ
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
