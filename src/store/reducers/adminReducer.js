import actionTypes from '../actions/actionTypes';
import { getAllCodeService } from '../../services/userService';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('nguyen tri bao: gender start',action)
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state};
            copyState.genders = action.data
            console.log('nguyen tri bao : fetch gender success',copyState)
            return {
                ...copyState
            }

        case actionTypes.FETCH_GENDER_FAILED:
            console.log('nguyen tri bao: gender faild',action)
            return {
                ...state,
            }
            
        default:
            return state;
    }
}

export default adminReducer;