import React, { Component } from 'react';
import { View ,Dimensions,Button, Text,Icon,TouchableOpacity,StyleSheet,Alert,Image,TextInput,ToastAndroid} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { CustomButton } from '../assests/customButtonShort.js';
import {FadeInView} from '../assests/fadeInView.js';
import Device from 'react-native-device-info';
import ConstantValues from '../constantValues.js'



export default class Welcome extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
  constructor(props) {
    super(props);
    this.state = {
      mobile:'',
    };
  }




  ////Sending Otp API//////
  sendOtp(mobile){
  console.log(mobile)
  fetch(ConstantValues.apiUrl+'customer/login',{
    method:'POST',
    headers:{
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: mobile, 
      device:{apiLevel,ip,carrier,deviceId,firstInstallTime,macAddress,systemVersion,systemName,appVersion,deviceType,osBuildId},
      
    })
  })
  .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status==true){
      return(console.log(responseJson),
      console.log('Logged with mobile No. :'+mobile),
      console.log('The status is: '+responseJson.status),
      console.log('The message is: '+responseJson.message),
      // global.foo={mobile},
      // global.id=(responseJson.data.customerId),
      ToastAndroid.show(responseJson.message, ToastAndroid.LONG),
      this.props.navigation.navigate('OtpVerify',{
        mobile:this.state.mobile,
        customerId:responseJson.data.customerId}) 
      )
      }else {
        return(
          ToastAndroid.show(responseJson.error,ToastAndroid.LONG),
        console.log(responseJson.error)
        // this.props.navigation.navigate('OtpVerify') 
        )
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// isEmpty(){
//   if (this.state.mobile==''){
//     ToastAndroid.show('Please Enter Valid Mobile No.',ToastAndroid.CENTER)
//   }
// }



  render() {
    return (
      <View style={styles.slide}>
        <FadeInView style={styles.anim}>
        <Image
        style={styles.image}
         source={require('../images/zooplogo.png')}
        />

         {/* <Text style={styles.text1}> LOGIN </Text> */}
       
        <TextInput style={styles.input}
        placeholder="Enter Mobile No."
        keyboardType='number-pad'
        maxLength={10}
        onChangeText={mobile => this.setState({ mobile })}
        value={this.state.mobile}
        underlineColorAndroid='#000000'
        ></TextInput>
        <CustomButton
            title="SUBMIT"
            onPress={
              () => {
                // console.log(this.state.text)
                console.log(apiLevel)
                if (this.state.mobile==''){
                  return(
                  ToastAndroid.show('Please Enter Mobile No.',ToastAndroid.CENTER),
                  console.log('mobile number is empty')
                  )
                }
                else {
                this.sendOtp(this.state.mobile) //this function sends mobile no. through the otp api
                }
              }
            }
            
            // style={styles.button}
            textStyle={styles.text}
            
        />
       

<CustomButton
            title="SKIP"
            onPress={() => this.props.navigation.navigate('Search')}
            // style={styles.button}
            // textStyle={styles.text}
        />
        
        </FadeInView>

      </View>

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
 const macAddress= Device.getMACAddress();
 const systemVersion = Device.getSystemVersion();
 const systemName = Device.getSystemName();
 const appVersion = Device.getVersion();
 const deviceType = Device.getDeviceType();
 const osBuildId = Device.getBuildId();
///styling with CSS
const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#ffffff'
    },
   anim: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#ffffff'
    },
    image: {
      width:200,
      height:200,
      justifyContent:'flex-start'
    },
    button: {
      display: 'flex',
      width: 100,
      height: 30,
      borderRadius: 5,
      justifyContent:'center',
      paddingVertical: 20,
      alignItems: 'center',
      backgroundColor: '#000000',
      shadowColor: '#000000',
      shadowOpacity: 0.4,
      shadowOffset: { height: 10, width: 10 },
      shadowRadius: 20,
      margin: 10,
  },

    skip:{
      alignItems: 'baseline',
      justifyContent: 'center',
      backgroundColor:'#ffffff'
    },
    input:{
      fontSize:20,
      width:Dimensions.get('window').width - 120,
    },
    text: {
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Times New Roman',
    },
    text1: {
      color: '#000000',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Times New Roman',
    },  
  });
