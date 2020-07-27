import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, ToastAndroid, Image } from 'react-native';
import Button from './Button';
import { sendOtp } from '../store/thunk';
import { requestStatus, otpState } from '../constants';


class SendOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.requestStatus !== this.props.requestStatus
      && this.props.requestStatus === requestStatus.SUCCESS
      && this.props.currentOtpState === otpState.SEND_OTP)
    {
      this.props.navigation.navigate('verifyOtp');
    }

    if (prevProps.requestStatus !== this.props.requestStatus
      && this.props.requestStatus === requestStatus.FAILED
      && this.props.currentOtpState === otpState.SEND_OTP
      && this.props.error && this.props.error.errorMessage)
    {
      ToastAndroid.show(this.props.error.errorMessage, ToastAndroid.SHORT)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            width: '80%',
            borderColor: 'gray',
            borderBottomWidth: 1,
            fontSize: 21
          }}
        >
          <View style={{ height: 60, justifyContent: 'center'  }}>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>+91</Text>
          </View>
          <TextInput
            style={{ height: 60, fontSize: 20, paddingLeft: 10 }}
            onChangeText={text => this.setState({ value: text })}
            value={this.state.value}
            keyboardType='numeric'
            maxLength={10}
            placeholder='Enter your mobile number'
          />
        </View>
        <Button
          onPress={() => {
            if(this.state.value.length < 10) {
              ToastAndroid.show('Phone number must be 10 digits', ToastAndroid.SHORT);
              return;
            }
            this.props.sendOtp({ mobileNumber: this.state.value }) 
          }}
          text='Get OTP'
          isLoading={this.props.currentOtpState === otpState.SEND_OTP && this.props.requestStatus === requestStatus.IN_PROGRESS}
          style={{ minWidth: '80%' }}
        />
        <View
          style={{
            position: 'absolute',
            top: '20%',
          }}>
          <Image
            style={styles.logo}
            source={require('../res/logo.png')}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentOtpState: state.currentOtpState,
  requestStatus: state.requestStatus,
  error: state.error,
})

const mapDispatchToProps = {
  sendOtp,
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    minHeight: 30,
    width: '100%',
    borderColor: 'gray',
  },
  input: {
    fontSize: 14,
    width: '100%',
    paddingHorizontal: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SendOtp);