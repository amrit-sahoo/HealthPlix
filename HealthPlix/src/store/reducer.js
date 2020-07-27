import otpInitialState from './initialState';
import { otpState, requestStatus, actionTypes } from '../constants';

const otpReducer = (state = otpInitialState, action) => {
  switch (action.type) {
    case actionTypes.sendOtpRequest:
      return {
        ...state,
        requestStatus: requestStatus.IN_PROGRESS,
        mobileNumber: action.params.mobileNumber,
        currentOtpState: otpState.SEND_OTP,
      }
    case actionTypes.sendOtpSucess:
      return {
        ...state,
        requestStatus: requestStatus.SUCCESS,
        otpData: {
          ...state.otpData,
          token: action.data.otp_token,
        }
      }
    case actionTypes.sendOtpFailed:
      return {
        ...state,
        requestStatus: requestStatus.FAILED,
        error: action.error,
      }
    case actionTypes.verifyOtpRequest:
      return {
        ...state,
        requestStatus: requestStatus.IN_PROGRESS,
        currentOtpState: otpState.VERIFY_OTP,
      }
    case actionTypes.verifyOtpSuccess:
      return {
        ...state,
        requestStatus: requestStatus.SUCCESS,
        otpData: {
          ...state.otpData,
          authToken: action.data.token,
        }
      }
    case actionTypes.verifyOtpFailed:
      return {
        ...state,
        requestStatus: requestStatus.FAILED,
        error: action.error,
      }
    default:
      return state
  }
}

export default otpReducer;