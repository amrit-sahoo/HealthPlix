import { actionTypes, apiUrls } from '../constants';
import axios from 'axios';

export const sendOtp = (params) => (dispatch) => {
  dispatch({ type: actionTypes.sendOtpRequest, params })
  axios.post(apiUrls.sendOtp, {
    mobile_number: params.mobileNumber
  }).then((response) => {
    if (response.data.error_code) {
      dispatch({
        type: actionTypes.sendOtpFailed,
        error: {
          errorCode: response.data.error_code,
          errorMessage: response.data.api_error
        }
      })
    } else {
      dispatch({ type: actionTypes.sendOtpSucess, data: response.data })
    }
  }).catch((error) => {
    console.log('error', error);
    dispatch({ type: actionTypes.sendOtpFailed, error })
  })
}

export const verifyOtp = (params) => (dispatch) => {
  console.log('verifyOtp');
  dispatch({ type: actionTypes.verifyOtpRequest, params })
  axios.post(apiUrls.verifyOtp, {
    mobile_number: params.mobileNumber,
    otp: params.otp,
    otp_token: params.token
  }).then((response) => {
    if (response.data.error_code) {
      dispatch({
        type: actionTypes.verifyOtpFailed,
        error: {
          errorCode: response.data.error_code,
          errorMessage: response.data.api_error
        }
      })
    } else {
      dispatch({ type: actionTypes.verifyOtpSuccess, data: response.data })
    }
  }).catch((error) => {
    console.log('error', error);
    dispatch({ type: actionTypes.verifyOtpFailed, error })
  })
}