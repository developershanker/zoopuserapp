import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ToastAndroid, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { CustomButton } from '../assests/customButtonLarge';
import CodeInput from 'react-native-confirmation-code-input';
import SplashScreen from 'react-native-splash-screen';
import CustomTouchableOpacity from '../assests/customTouchableOpacity.js';
import ConstantValues from '../constantValues.js';
import AsyncStorage from '@react-native-community/async-storage';
import loginApi from './loginApi.js';

export default class otpVerify extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      customerCode: '',
      ButtonStateHolder: true,  //on state ture it will disable the button
      backgroundColor: '#9c9595',
      disable: true,
      text: '',
      code: ''
    };
    timeLeft = 15;
    timerId = setInterval(() => {
      this.countdown()
    }, 1000);
  }


  countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      this.activateResend()
    } else {
      // text = "Resend OTP in"+timeLeft+" sec";
      this.setState({ text: "Resend OTP in " + timeLeft + " sec" })
      timeLeft--;
    }
  }



  EnableButtonFunction = () => {
    this.setState({
      // On State false it will enable the button.
      ButtonStateHolder: false,
      backgroundColor: '#FF5819'
    })
  }
  ///this fuction will send OTP to Zoop Server for matching
  async verifyOtp(customerCode, customerId, mobile) {
    try {
      let response = await loginApi.verifyOtp(customerCode, customerId, mobile);
      console.log('data received in OtpVerify.js : ' + JSON.stringify(response))
      if (response.status == true) {
        return (
          console.log('token is : ' + response.data.token),//getting user auth token
          ToastAndroid.show(response.message, ToastAndroid.LONG),
          ConstantValues.customerPhoneNo = mobile,   //storing mobile no for accessing globally
          ConstantValues.customerId = customerId,     //storing customer id for accessing globally
          ConstantValues.token = response.data.token, //storing customer auth token for accessing globally
          ConstantValues.customer.token = response.data.token,
         // console.log('Info: ' + JSON.stringify(ConstantValues.customer)),
          console.log('Stored Mobile No. is:' + ConstantValues.customerPhoneNo),
          // this.storeToken(),
          // this.storeCustomerId(),
          this.storeData(),
          // this.props.navigation.navigate('Register', { mobile: mobile }),
          this.props.navigation.navigate('Profile', { mobile: mobile })
        )
      } else {
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG),
          console.log(response.error)
        )
      }
    } catch (error) {
      console.log('Data received in OtpVerify.js catch: ' + error)
    }
  }

  storeData =  async () => {
    let keys = [['x-authtoken', ConstantValues.token],['customerId', ConstantValues.customerId]]
    try {
     await  AsyncStorage.multiSet(keys,()=>{
      console.log('Stored this token to the local storage : ' + keys)
     })
      //  AsyncStorage.setItem('customerId', ConstantValues.customerId)
      
     
      // console.log('Stored this customerId to the local storage : ' + ConstantValues.customerId)
    } catch (e) {
      console.log(e)
    }
  }

  ///storing auth token
  storeToken =  async () => {
    try {
     await  AsyncStorage.setItem('x-authtoken', ConstantValues.token)
      //  AsyncStorage.setItem('customerId', ConstantValues.customerId)
      
      console.log('Stored this token to the local storage : ' + ConstantValues.token)
      // console.log('Stored this customerId to the local storage : ' + ConstantValues.customerId)
    } catch (e) {
      console.log(e)
    }
  }
   //storing customerId
   storeCustomerId = async () => {
    try {
      await AsyncStorage.setItem('customerId', ConstantValues.customerId)
      console.log('Stored this customerId to the local storage : ' + ConstantValues.customerId)
    } catch (e) {
      console.log(e)
    }
  }
  // await AsyncStorage.setItem('customerId', ConstantValues.customerId)

  ////setting timer for resending otp
  activateResend = () => {
    this.setState({
      text: "Resend OTP",
      disable: false,
    })
  }

  ///this function will resend OTP
  async activateResendOtp(mobile, customerId) {
    try {
      let response = await loginApi.resendOtp(mobile, customerId);
      console.log('data received in OtpVerify.js for resend otp : ' + JSON.stringify(response))
      return ToastAndroid.show('OTP Resend Successful', ToastAndroid.LONG)
    } catch (error) {
      console.log('Data received in OtpVerify.js catch: ' + error)
    }
  }

  render() {
    const { navigation } = this.props;
    const mobile = navigation.getParam('mobile', '0');
    const customerId = navigation.getParam('customerId', '0')
    return (
      <ScrollView>
        <View style={styles.slide}>
          <ImageBackground style={{ width: Dimensions.get('screen').width, alignItems: 'center', height: Dimensions.get('screen').height / 2, }} source={require('../images/deliveryboy.png')}>
            <Image
              style={styles.image}
              source={require('../images/zooplogoorange.png')}
            />
          </ImageBackground>
          <Text style={styles.heading}>Phone Verification</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 30 }} >
            <CodeInput
              // underlineColorAndroid='#000000'
              secureTextEntry={false}
              selectionColor='#000000'
              codeInputStyle={styles.text}
              codeLength={4}
              className='border-circle'
              inputPosition='left'
              keyboardType='number-pad'
              onFulfill={(customerCode) => {
                this.setState({ customerCode })
                console.log(customerCode)
                this.EnableButtonFunction()
              }}
            />
          </View>


          <CustomTouchableOpacity
            disabled={this.state.disable}
            text={this.state.text}
            // onPress={() => { this.activeResendOtp(mobile, customerId) }}
            onPress={() => { ToastAndroid.show('OTP Resend Successful', ToastAndroid.LONG) }}
          />

          <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
            <CustomButton
              style={[styles.button, { backgroundColor: this.state.backgroundColor }]}
              title="Register"
              activeOpacity={.5}
              disabled={this.state.ButtonStateHolder}
              color="#1abc9c"
              onPress={() => {
                this.verifyOtp(this.state.customerCode, customerId, mobile)

              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    // flex: 1,
    width: Dimensions.get('screen').width,
    // height:Dimensions.get('screen').height,
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
  },
  heading: {
    fontSize: 20,
    paddingTop: 10,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  text: {
    width: 50,
    height: 50,
    fontSize: 20,
    backgroundColor:'#d9dedd',
    borderWidth: 1.5,
    color: '#000000',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
  },
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  image: {
    width: 200,
    height: 200,
    alignItems: 'center'
  },
})
