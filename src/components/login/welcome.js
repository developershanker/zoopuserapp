import React, { Component } from 'react';
import { View ,Button, Text,Icon,TouchableOpacity,StyleSheet,Alert,Image,TextInput,ToastAndroid} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { CustomButton } from '../assests/customButtonShort.js';
import {FadeInView} from '../assests/fadeInView.js';
import Device from 'react-native-device-info';

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




  ////Sending Otp//////
  sendOtp(mobile){
  console.log(mobile)
  fetch('http://192.168.0.26:3000/customer/login',{
    method:'POST',
    headers:{
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: mobile,  
      
      
    })
  })
  .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status==true){
      return(console.log(responseJson),
      console.log('Logged with mobile No. :'+mobile),
      console.log('The status is: '+responseJson.status),
      console.log('The message is: '+responseJson.message),
      ToastAndroid.show(responseJson.message, ToastAndroid.LONG)
      )
      }else if(responseJson.state==false){
        return(ToastAndroid.show(responseJson.error,ToastAndroid.LONG))
      }
    })
    .catch((error) => {
      console.error(error);
    });
}





  render() {
    return (
      <View style={styles.slide}>
        <FadeInView style={styles.anim}>
        <Image
        style={styles.image}
         source={require('../images/zooplogo.png')}
        />

         <Text style={styles.text1}> LOGIN </Text>
        <View style={styles.input}>
        <TextInput 
        placeholder="Enter Mobile No."
        keyboardType='number-pad'
        maxLength={10}
        onChangeText={mobile => this.setState({ mobile })}
        value={this.state.mobile}      
        // autoFocus={true}
        ></TextInput>
        <CustomButton
            title="SUBMIT"
            onPress={
              () => {
                // console.log(this.state.text)
                console.log(apiLevel)
                this.sendOtp(this.state.mobile) //this function sends mobile no. to the otpapi method
                this.props.navigation.navigate('OtpVerify') 
              }
            }
            
            // style={styles.button}
            textStyle={styles.text}
            
        />
        </View>

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
