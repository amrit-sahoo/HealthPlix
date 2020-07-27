import React from 'react';
import { View, Text, StyleSheet, ToastAndroid, Image } from 'react-native';
import { connect } from 'react-redux';
import { verifyOtp, sendOtp } from '../store/thunk';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Button from './Button';
import{ requestStatus, otpState } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

class VerifyOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: null,
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.requestStatus !== this.props.requestStatus
      && this.props.requestStatus === requestStatus.SUCCESS
      && this.props.currentOtpState === otpState.SEND_OTP)
    {
      ToastAndroid.show('Otp Sent', ToastAndroid.SHORT)
    }

    if (prevProps.requestStatus !== this.props.requestStatus
      && this.props.requestStatus === requestStatus.SUCCESS
      && this.props.currentOtpState === otpState.VERIFY_OTP
      && this.props.otpData && this.props.otpData.authToken)
    {
      this.props.navigation.navigate('dashboard');
    }

    if (prevProps.requestStatus !== this.props.requestStatus
      && this.props.requestStatus === requestStatus.FAILED
      && this.props.currentOtpState === otpState.VERIFY_OTP
      && this.props.error && this.props.error.errorMessage)
    {
      ToastAndroid.show(this.props.error.errorMessage, ToastAndroid.SHORT)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          Please enter the OTP sent to
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'rgba(0, 0, 0, 0.8)',
            fontWeight: '700',
            paddingTop: 10
          }}
        >
          +91 {this.props.mobileNumber}
        </Text>
        <OTPInputView
          style={{ width: '70%', height: 120 }}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {(code => {
            this.setState({
              otp: code,
            });
          })}
        />
        <Button
          text='Verify'
          isLoading={
            this.props.currentOtpState === otpState.VERIFY_OTP
            && this.props.requestStatus === requestStatus.IN_PROGRESS
          }
          style={{ width: 200  }}
          onPress={() => {
            if (this.state.otp) {
              this.props.verifyOtp({
                mobileNumber: this.props.mobileNumber,
                token: this.props.otpData.token,
                otp: this.state.otp
              })
            }
          }}
        />
        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              color: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            Didn't receive otp?
          </Text>
          <TouchableOpacity
            style={{
              paddingLeft: 10,
            }}
            onPress={() => {
              if (this.props.mobileNumber) {
                this.props.sendOtp({ mobileNumber: this.props.mobileNumber })
              }
            }}
          >
            <Text 
              style={{
                fontSize: 16,
                color: '#5a85c4',
              }}
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            top: '10%',
          }}>
          <Image
            source={require('../res/logo.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 45,
    height: 50
  },

  underlineStyleBase: {
    width: 45,
    height: 50,
    fontSize: 24,
    borderWidth: 0,
    color: 'rgba(0,0,0,0.7)',
    borderBottomWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },

  underlineStyleHighLighted: {
    borderColor: "#5a85c4",
  },
});

const mapStateToProps = (state) => ({
  currentOtpState: state.currentOtpState,
  requestStatus: state.requestStatus,
  otpData: state.otpData,
  error: state.error,
  mobileNumber: state.mobileNumber,
})

const mapDispatchToProps = {
  verifyOtp,
  sendOtp,
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);