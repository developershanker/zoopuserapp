import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet,Button,ToastAndroid } from 'react-native';
import { CustomButton } from '../assests/customButtonLarge';
import CodeInput from 'react-native-confirmation-code-input';
import SplashScreen from 'react-native-splash-screen';
import CustomTouchableOpacity from '../assests/customTouchableOpacity.js';



export default class otpVerify extends Component {
  componentDidMount() {
    SplashScreen.hide();
}
  constructor(props) {
    super(props);
    this.state = {
        code:'',
        ButtonStateHolder : true,//on state ture it will disable the button
        backgroundColor:'#9c9595',
        disable:true,
        text:'',
        
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
 verifyOtp(code){
   return(code),
   console.log(code)
 }
 ////setting timer for resending otp
 activateResend=()=>{
   this.setState({
     text:"Resend OTP",
     disable:false,
   })
 }
 ///this function will resend OTP
 activeResendOtp(){

  ToastAndroid.show('OTP Resend Successful',ToastAndroid.LONG)  
  
 }








  render() {
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
      onFulfill={(code) => {
        this.verifyOtp(code)
        this.EnableButtonFunction()
      }}
    />
   
    
    <CustomTouchableOpacity
    disabled={this.state.disable}
    text={this.state.text}
    onPress={()=>this.activeResendOtp()}
    />

    
        <CustomButton
        style={[styles.button,{backgroundColor:this.state.backgroundColor}]}
            title="Register"
            activeOpacity={.5}
            disabled={this.state.ButtonStateHolder}
            color="#1abc9c"
            onPress={()=>this.props.navigation.navigate('Register')}
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
