import React, { Component } from 'react';
import { View, Text,Button,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import AccountKit from 'react-native-facebook-account-kit';
import Search from '../mainactivity/search.js';
import Register from './register.js';

export default class Login extends Component {
  componentDidMount() {
    SplashScreen.hide();
    }
  render(){
    

   AccountKit.configure({
     responseType:'code' ,// 'token' by default,
     initialPhoneCountryPrefix: '+91', // autodetected if none is provide
     defaultCountry: 'IN',
     }),
   
     AccountKit.loginWithPhone()
     .then((token) => {
       if (!token) {
         console.log('Login cancelled')
         
       }
        else {
         console.log(`Logged with phone. Token: ${JSON.stringify(token)}`)
         console.log(token)
         AsyncStorage.setItem('aktoken',JSON.stringify(token));   
         
       }
     })
     return(
       <Register/>
     )
     
    
    }
  }
