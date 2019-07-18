import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet } from 'react-native';
import { CustomButton } from '../assests/customButtonShort.js';
import CodeInput from 'react-native-confirmation-code-input';



export default class otpVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
        code:''
    };
  }
  ///this fuction will send OTP to Zoop Server for matching
 verifyOtp(code){
   return(code),
   console.log(code)
 }

  render() {
    return (
      <View style={styles.slide}>
          <Text style={styles.heading}>PHONE VERIFICATION</Text>
          <CodeInput style={styles.text}
    //   ref="codeInputRef1"
      secureTextEntry={false}
      className={'border-circle'}
      selectionColor='#1abc9c'
      space={5}
      size={30}
      codeLength={6}
      inputPosition='left'
      keyboardType='number-pad'
      onFulfill={(code) => this.verifyOtp(code)}
    />
        <CustomButton
            title="Register"
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
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor:'#ffe97a'
    },
    heading:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        justifyContent:'center',
      },
      text: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
      },
})
