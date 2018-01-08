import * as types from './actionTypes';
import axios from 'axios';

export function registerUserSuccess(userRegistrationDetails){
  return { type: types.REGISTER_USER_SUCCESS, userRegistrationDetails};
}

export function loginUserSuccess(userLoginDetails){
  return {type: types.LOGIN_USER_SUCCESS, userLoginDetails};
}

// export function registerUserFailure(error){
//   return { type: types.REGISTER_USER_FAILURE, error};
// }



export function registerUser(registrationDetails){
  return function (dispatch, getState) {
    return axios.post('http://127.0.0.1:5000/auth/register', registrationDetails).then(userDetails =>{
      dispatch(registerUserSuccess(userDetails.data.message));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
        // dispatch(registerUserFailure(error.response.data));
      }
    });
  };
}

export function loginUsers(loginDetails){
  return function(dispatch, getState){
    return axios.post('http://127.0.0.1:5000/auth/login', loginDetails).then(userDetails =>{
      dispatch(loginUserSuccess(userDetails.data.message));
      localStorage.setItem('token', userDetails.data.token);
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}
