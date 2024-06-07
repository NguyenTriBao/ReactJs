import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('api/login',{email: userEmail,password: userPassword});
}

const getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`);
}

const addNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
          id: userId
        }
      });
}
const editUserService = (user) => {
    return axios.put('/api/edit-user', user)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsService = () =>{
    return axios.get('/api/get-all-doctors');
}

const saveDetailDoctorService = (data) => {
    return axios.post('api/save-infor-doctor', data)
}
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}
const postPatientBookApointment = (data) => {
    return axios.post('/api/save-book-appointment', data)
}
const verifyPatientBookApointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) =>{
    return axios.post('/api/create-new-specialty',data)
}
const getAllSpecialtyService = () => {
    return axios.get('/api/get-all-specialty');
}

const getDetailSpecialtyService = (specialtyid, location) => {
    return axios.get(`/api/detail-specialty?id=${specialtyid}&location=${location}`);
}

const createNewClinic = (data) =>{
    return axios.post('/api/create-new-clinic',data)
}

const getAllClinicService = () => {
    return axios.get('/api/get-all-clinic');
}

const getDetailClinicService = (clinicid) => {
    return axios.get(`/api/detail-clinic?id=${clinicid}`);
}

const getListPatientForDoctor = (doctorId, date) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`);
}
const sendDataRemedy = (data) => {
    return axios.post('/api/send-remedy',data)
}
export { 
    handleLoginApi,
    getAllUsers,
    addNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookApointment,
    verifyPatientBookApointment,
    createNewSpecialty,
    getAllSpecialtyService,
    getDetailSpecialtyService, createNewClinic,
    getAllClinicService, getDetailClinicService,
    getListPatientForDoctor, sendDataRemedy,
}