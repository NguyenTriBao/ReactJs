import {
    getAllCodeService, addNewUserService, getAllUsers, deleteUserService, editUserService,
    getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService, getAllSpecialtyService,
    getAllClinicService
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart error', e)
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleStart error', e)
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await addNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed error', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("All");

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }
            else {
                toast.success("Fetch all users error!")
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            toast.success("Fetch all users error!")
            dispatch(fetchAllUserFailed())
            console.log('fetchAllUserFailed error', e)
        }
    }

}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Delete the user error!")
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error("Delete the user error!")
            dispatch(deleteUserFailed())
            console.log('deleteUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the user succeed!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error("Edit the user error!")
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error("Edit the user error!")
            dispatch(editUserFailed())
            console.log('deleteUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(10);

            if (res && res.response.errCode === 0) {
                dispatch(getTopDoctorSuccess(res.response.data));
            }
            else {
                dispatch(getTopDoctorFailed)
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTOR_FAILDED: ", e)
            dispatch(getTopDoctorFailed)
        }
    }
}

export const getTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data,
})

export const getTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,

})

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.response.errCode === 0) {
                dispatch(getAllDoctorSuccess(res.response.data))
            }
            else {
                dispatch(getALlDoctorFailed);
            }
        } catch (e) {
            console.log("FETCH_TOP_DOCTOR_FAILDED: ", e)
            dispatch(getALlDoctorFailed);
        }
    }
}

export const getAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    dataDr: data,
})

export const getALlDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,

})

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.response.errCode === 0) {
                toast.success("Save infor Detail Doctor Succeed!")
                dispatch(saveDetailDoctorSuccess)
            }
            else {
                toast.error("Save infor Detail Doctor Error!")
                dispatch(saveDetailDoctorFailed);
            }
        } catch (e) {
            toast.error("Save infor Detail Doctor Error!")
            console.log("SAVE_DETAIL_DOCTOR_FAILDED: ", e)
            dispatch(saveDetailDoctorFailed);
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
})

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,

})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');

            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleHourSuccess(res.data))
            }
            else {
                dispatch(fetchAllScheduleHourFailed);
            }
        } catch (e) {
            console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILDED: ", e)
            dispatch(fetchAllScheduleHourFailed);
        }
    }
}

export const fetchAllScheduleHourSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data,
})

export const fetchAllScheduleHourFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,

})

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialtyService();
            let resClinic = await getAllClinicService();
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,

                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorInforFailed())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed())
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    allRequiredData: data
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED
})

//start doing end


