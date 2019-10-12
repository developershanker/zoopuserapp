import React, { Component } from 'react';
import { View, Dimensions, Button, Text, Icon, Image, TouchableOpacity, StyleSheet, Alert, TextInput, ToastAndroid, ImageBackground, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { CustomButton } from '../assests/customButtonLarge.js';
import CustomTouchableOpacity from '../assests/customTouchableOpacity';
import AsyncStorage from '@react-native-community/async-storage';
import { FadeInView } from '../assests/fadeInView.js';
import Device from 'react-native-device-info';
import ConstantValues from '../constantValues.js'
import loginApi from './loginApi.js';



export default class Welcome extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
    };
  }




  ////Sending Otp API//////
  async sendOtp(mobile) {
    try {
      let response = await loginApi.sendOtp(mobile);
      console.log('data received in welcome.js : ' + JSON.stringify(response))
      if (response.status == true) {
        //  let storedData = this.storeData(response.data.customerId)
        //  console.log('Stored Data: ' + storedData)

        return (console.log(response),
          console.log('Logged with mobile No. :' + mobile),
          console.log('The status is: ' + response.status),
          console.log('The message is: ' + response.message),
          ConstantValues.customerId = response.data.customerId,
          ToastAndroid.show(response.message, ToastAndroid.LONG),
          this.props.navigation.navigate('OtpVerify', {
            mobile: this.state.mobile,
            customerId: response.data.customerId
          }
          )
        )
      } else {
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG),
          console.log(response.error)
        )
      }
    } catch (error) {
      console.log('Data received in welcome.js catch: ' + error)
    }
  }

  // storeData = async (customerId) => {
  //   try {
  //     // await AsyncStorage.setItem('x-authtoken', ConstantValues.token)
  //     await AsyncStorage.setItem('customerId', customerId)
  //     ConstantValues.customerId = customerId
  //     console.log('----------Stored in Local...customerId...---- : ' + ConstantValues.customerId)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }



  render() {
    return (
      <ScrollView>
        <View style={styles.slide}>
          {/* <FadeInView style={styles.anim}> */}
          <ImageBackground style={{ width: Dimensions.get('screen').width, alignItems: 'center', height: Dimensions.get('screen').height / 2, }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.deliveryboypng }}>

            <Image
              style={styles.image}
              source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
            />


          </ImageBackground>

          <Text style={styles.text1}> Login </Text>
          <View style={styles.inputView}>
            <TextInput style={styles.input}
              placeholder="Enter Mobile No."
              keyboardType='number-pad'
              maxLength={10}
              textContentType='telephoneNumber'
              onChangeText={mobile => this.setState({ mobile })}
              value={this.state.mobile}
            />
          </View>
          <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
            <CustomButton
              title="Submit"
              onPress={
                () => {
                  // console.log(this.state.text)
                  console.log(apiLevel)
                  if (this.state.mobile == '') {
                    return (
                      ToastAndroid.show('Please Enter Mobile No.', ToastAndroid.CENTER),
                      console.log('mobile number is empty')
                    )
                  }
                  else {
                    this.sendOtp(this.state.mobile) //this function sends mobile no. through the otp api
                  }
                }
              }
              style={{ backgroundColor: '#FF5819', justifyContent: 'center', }}
              textStyle={styles.text}

            />
            {/* <CustomTouchableOpacity
              text="Skip >>"
              color="#1abc9c"
              onPress={() => {
                this.props.navigation.navigate('Search')
              }}
            /> */}
          </View>
          {/* </FadeInView> */}

        </View>
      </ScrollView>

    );
  }
}



/////sending Device info
const apiLevel = Device.getAPILevel();
const ip = Device.getIPAddress().then(ip => {
  return ip
});
const deviceId = Device.getDeviceId();
const carrier = Device.getCarrier();
const firstInstallTime = Device.getFirstInstallTime();
const macAddress = Device.getMACAddress();
const systemVersion = Device.getSystemVersion();
const systemName = Device.getSystemName();
const appVersion = Device.getVersion();
const deviceType = Device.getDeviceType();
const osBuildId = Device.getBuildId();



///styling with CSS
const styles = StyleSheet.create({
  slide: {
    // flex: 1,
    width: Dimensions.get('screen').width,
    // height:Dimensions.get('screen').height,
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
  },
  anim: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  image: {
    width: 200,
    height: 200,
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#000000',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 10 },
    shadowRadius: 20,
    margin: 10,
  },

  skip: {
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  input: {
    fontSize: 15,
    width: Dimensions.get('window').width - 120,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    alignItems: 'center'
  },
  inputView: {
    borderRadius: 5,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 30
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  text1: {
    fontSize: 25,
    paddingTop: 10,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});