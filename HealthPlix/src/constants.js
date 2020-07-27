export const otpState = {
  IDLE: 1,
  SEND_OTP: 2,
  VERIFY_OTP: 3,
}

export const requestStatus = {
  IDLE: 1,
  IN_PROGRESS: 2,
  SUCCESS: 3,
  FAILED: 4
}

export const actionTypes = {
  sendOtpRequest: 'SEND_OTP_REQUEST',
  sendOtpSucess: 'SEND_OTP_SUCCESS',
  sendOtpFailed: 'SEND_OTP_FAILED',
  verifyOtpRequest: 'VERIFY_OTP_REQUEST',
  verifyOtpSuccess: 'VERIFY_OTP_SUCCESS',
  verifyOtpFailed: 'VERIFY_OTP_FAILED',
}

export const apiUrls = {
  sendOtp: 'https://api-test.healthplix.com/api/evolve/sendOtp.php',
  verifyOtp: 'https://api-test.healthplix.com/api/evolve/verifyOtp.php',
}