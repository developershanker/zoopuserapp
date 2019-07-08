import React, { Component } from 'react';
import { View, Text,Button,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import RNAccountKit from 'react-native-facebook-account-kit';
import Register from './register.js';
import Search from '../mainactivity/search.js';

export default class Login extends Component {
  componentDidMount() {
    SplashScreen.hide();
    }
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
  render(){
   RNAccountKit.configure({
     responseType:'code' ,// 'token' by default,
     initialPhoneCountryPrefix: '+91', // autodetected if none is provide
     defaultCountry: 'IN',
     }),
   
     RNAccountKit.loginWithPhone()
     .then((token) => {
       if (!token) {
         console.log('Login cancelled')
         return(
           <Search/>
         )
         
       }
        else {
         console.log(`Logged with phone. Token: ${JSON.stringify(token)}`)
         console.log(token)
         AsyncStorage.setItem('aktoken',JSON.stringify(token))
         return(
          <Register/>
        )
       }
       
     })
    }
  }
