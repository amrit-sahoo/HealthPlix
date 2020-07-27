import { requestStatus, otpState } from '../constants';

const otpInitialState = {
  currentOtpState: otpState,
  requestStatus: requestStatus.IDLE,
  otpData: null,
  error: null,
};

export default otpInitialState;