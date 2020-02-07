import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ToastAndroid,KeyboardAvoidingView, Alert, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { CustomButton } from '../assests/customButtonLarge';
import { CustomButtonShort } from '../assests/customButtonShort';
import CodeInput from 'react-native-confirmation-code-input';
import SplashScreen from 'react-native-splash-screen';
import CustomTouchableOpacity from '../assests/customTouchableOpacity.js';
import ConstantValues from '../constantValues.js';
import AsyncStorage from '@react-native-community/async-storage';
import loginApi from './loginApi.js';
import Colors from '../colors';

export default class otpVerify extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      customerCode: '',
      ButtonStateHolder: true,  //on state ture it will disable the button
      backgroundColor: Colors.darkGrey1,
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
      backgroundColor: Colors.newOrange
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
          console.log('Stored customerId  is:' + ConstantValues.customerId),

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

  storeData = async () => {
    try {
      let storedObject = {};
      storedObject.userToken = ConstantValues.token;
      storedObject.customerId = ConstantValues.customerId;
      storedObject.isAgent = ConstantValues.isAgent;
      await AsyncStorage.setItem('userInfo', JSON.stringify(storedObject));
      console.log('Storing this in local storage' + JSON.stringify(storedObject))
    } catch (error) {
      console.log('Error in storing asyncstorage: ' + error)
    }
  }


  handleCancel() {
    return (
      Alert.alert(
        'Alert!!',
        'Are you sure ?? Pressing the back button would cancel the login process. Press Ok if you wish to cancel.',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('Search'),
            style: 'cancel',
          },
          {
            text: 'cancel', onPress: () => console.log('Waiting for OTP on OTPverify.js...'),
            style: 'cancel'
          }
        ],
        { cancelable: false },
      )
    )
  }


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
          <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginVertical: 15 }} >
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
          <KeyboardAvoidingView enabled>
            <View style={{ paddingHorizontal: 20 }}>
              <CustomTouchableOpacity
                disabled={this.state.disable}
                text={this.state.text}
                onPress={() => this.activateResendOtp(mobile, customerId) }
                // onPress={() => { ToastAndroid.show('OTP Resend Successful', ToastAndroid.LONG) }}
              />
            </View>


            <View style={{ paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <CustomButtonShort
                textStyle={{color:Colors.darkGrey1}}
                style={[styles.button, { backgroundColor: Colors.white, borderColor: Colors.darkGrey1, borderWidth: 1 }]}
                title="CANCEL"
                onPress={() => this.handleCancel()}
              />
              <CustomButtonShort
                style={[styles.button, { backgroundColor: this.state.backgroundColor }]}
                title="SUBMIT"
                activeOpacity={.5}
                disabled={this.state.ButtonStateHolder}
                color="#1abc9c"
                onPress={() => {
                  this.verifyOtp(this.state.customerCode, customerId, mobile)

                }}
              />
            </View>
          </KeyboardAvoidingView>

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
    backgroundColor: '#d9dedd',
    borderWidth: 1.5,
    color: '#000000',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    justifyContent: 'center',
  },
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  image: {
    width: 150,
    height: 150,
    alignItems: 'center'
  },
})
