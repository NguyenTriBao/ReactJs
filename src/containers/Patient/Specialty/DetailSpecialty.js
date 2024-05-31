import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {

        }
        
    }


    render() {      
        return (
            <div>Hello world from detail specialty</div>
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
