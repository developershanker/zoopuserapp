import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet,Button,ToastAndroid } from 'react-native';
import { CustomButton } from '../assests/customButtonLarge';
import CodeInput from 'react-native-confirmation-code-input';
import SplashScreen from 'react-native-splash-screen';
import CustomTouchableOpacity from '../assests/customTouchableOpacity.js';
import ConstantValues from '../constantValues.js';
import AsyncStorage from '@react-native-community/async-storage';

 
export default class otpVerify extends Component {
  componentDidMount() {
    SplashScreen.hide();
}
  constructor(props) {
    super(props);
    this.state = {
        customerCode:'',
        ButtonStateHolder : true,  //on state ture it will disable the button
        backgroundColor:'#9c9595',
        disable:true,
        text:'',
        code:''

        
    };
  timeLeft=15;
   timerId= setInterval(() => {
      this.countdown()
    }, 1000);
  }


countdown(){
    if (timeLeft == -1) {
      clearTimeout(timerId);
      this.activateResend()
  } else {
      // text = "Resend OTP in"+timeLeft+" sec";
      this.setState({text:"Resend OTP in "+timeLeft+" sec"})
      timeLeft--;
  }
  }



  EnableButtonFunction =()=>{
    this.setState({
      // On State false it will enable the button.
      ButtonStateHolder : false ,
      backgroundColor:'#edd361'
    })
  }
  ///this fuction will send OTP to Zoop Server for matching
 verifyOtp(customerCode,customerId,mobile){
  console.log(customerCode)
  console.log(customerId)
  fetch(ConstantValues.apiUrl+'customer/verifyotp',{
    method:'POST',
    headers:{
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerCode:customerCode,
      customerId:customerId
      
    })
  })
  .then((response)=>response.json())
  .then((responseJson)=>
  {
    console.log(responseJson)
    if(responseJson.status==true){
    return(
    console.log('token is : '+responseJson.data.token),//getting user auth token
    ToastAndroid.show(responseJson.message, ToastAndroid.LONG),
    ConstantValues.customerPhoneNo=mobile,   //storing mobile no for accessing globally
    ConstantValues.customerId=customerId,     //storing customer id for accessing globally
    ConstantValues.token=responseJson.data.token, //storing customer auth token for accessing globally
    ConstantValues.customer.token=responseJson.data.token,
    console.log('Info: '+JSON.stringify(ConstantValues.customer)),
    console.log('Stored Mobile No. is:'+ConstantValues.customerPhoneNo),
    this.storeData(),
    this.props.navigation.navigate('Register',{mobile:mobile}) 
    )
    }else {
      return(
        ToastAndroid.show(responseJson.error,ToastAndroid.LONG),
      console.log(responseJson.error) 
      )
    }
  })
  .catch((error) => {
    console.error(error)
    return(
    ToastAndroid.show('Something went wrong.Please try again later',ToastAndroid.LONG)
    )
  });
 }


///storing auth token
storeData = async () => {
  try {    
    await AsyncStorage.setItem('x-authtoken',ConstantValues.token)
    console.log('Stored this token to the local storage : '+ConstantValues.token)
  } catch (e) {
    console.log(e)
  }
}

 ////setting timer for resending otp
 activateResend=()=>{
   this.setState({
     text:"Resend OTP",
     disable:false,
   })   
 }
 
 ///this function will resend OTP
 activeResendOtp(mobile,customerId){
    console.log(mobile)
   console.log(customerId)
  fetch(ConstantValues.apiUrl+'customer/resendotp',{
    method:'POST',
    headers:{
      Accept: '*/*',
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({
      mobile:mobile,
      customerId:customerId
      
    })
  })
  .then((response)=>response.json())
  .then((responseJson)=>{
    console.log(responseJson)
    return ToastAndroid.show('OTP Resend Successful',ToastAndroid.LONG)
    
  })
 }
  render() {
    const { navigation } = this.props;
    const mobile = navigation.getParam('mobile','0');
    const customerId=navigation.getParam('customerId','0')
    return (
      <View style={styles.slide}>
          <Text style={styles.heading}>PHONE VERIFICATION</Text>
          <CodeInput
      underlineColorAndroid='#000000'
      secureTextEntry={false}
      selectionColor='#1abc9c'
      codeInputStyle={styles.text}
      codeLength={4}
      inputPosition='left'
      keyboardType='number-pad'
      onFulfill={(customerCode) => {
        this.setState({customerCode})
        console.log(customerCode)
        this.EnableButtonFunction()
      }}
    />
   
    
    <CustomTouchableOpacity
    disabled={this.state.disable}
    text={this.state.text}
    onPress={()=>this.activeResendOtp(mobile,customerId)}
    />

    
        <CustomButton
        style={[styles.button,{backgroundColor:this.state.backgroundColor}]}
            title="Register"
            activeOpacity={.5}
            disabled={this.state.ButtonStateHolder}
            color="#1abc9c"
            onPress={()=>{
              this.verifyOtp(this.state.customerCode,customerId,mobile)
              

            }}
            />
            </View>
     
    );
  }
}








const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#ffffff',
      paddingTop:100,
      marginLeft: 20,
      marginRight: 20,
    },
    heading:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        justifyContent:'center',
        
      },
      text: {
        width:100,
        height:100,
        fontSize:40,
        color: '#000000',
        alignItems:'center',
        fontWeight: 'bold',
        justifyContent:'center',        
      },
      button:{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        // color:'#1abc9c',        
        marginTop:20,
        marginBottom:40
      },
})
