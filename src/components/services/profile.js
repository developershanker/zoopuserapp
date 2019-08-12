import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,ToastAndroid } from 'react-native';
import { CustomButton } from '../assests/customButtonShort.js';
import CustomTouchableOpacity from '../assests/customTouchableOpacity';
import loginApi from '../login/loginApi.js';


export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailId: '',
      referralCode: '',
      altmobile: ''
    };
  }
  ///checking Input Validation
  async isEmpty(name, emailId, referralCode) {
    try {
      if (name != '') {
        if (emailId != '') {
          this.editUserInfo(name, emailId, referralCode)
        } else {
          ToastAndroid.show('Please Enter Email Id', ToastAndroid.LONG)
        }
      } else {
        ToastAndroid.show('Please Enter Name', ToastAndroid.LONG)
      }
    } catch (error) {
      console.log('Data received in profile.js catch: ' + error)
    }
  }
  //submitting edited profile info
  async editUserInfo(name, emailId, referralCode) {
    try {
      let response = await loginApi.editUserInfo(name, emailId, referralCode)
      console.log('data received in profile.js : ' + JSON.stringify(response))

      ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG)

    } catch (error) {
      console.log('Data received in profile.js catch: ' + error)
    }
  }
  render() {
    return (
      <View style={styles.slide}>
        <Text style={styles.heading}> My Profile </Text>
        <TextInput style={styles.input}
          placeholder='Full Name'
          keyboardType='default'
          onChangeText={name => this.setState({ name })}
          underlineColorAndroid='#000000'
          autoCapitalize="words"
        />
        <TextInput style={styles.input}
          placeholder='Email id'
          keyboardType='email-address'
          onChangeText={emailId => this.setState({ emailId })}
          underlineColorAndroid='#000000'
        />
        <TextInput style={styles.input}
          placeholder='Alternate Mobile No.'
          keyboardType='number-pad'
          onChangeText={altmobile => this.setState({ altmobile })}
          underlineColorAndroid='#000000'
        />
        <TextInput style={styles.input}
          placeholder='Referral Code (if any)'
          keyboardType='default'
          onChangeText={referralCode => this.setState({ referralCode })}
          underlineColorAndroid='#000000'
        />
        <CustomButton
          title="Register"
          color="#1abc9c"
          onPress={() => {
            this.isEmpty(this.state.name, this.state.emailId, this.state.referralCode)
            // this.props.navigation.navigate('Search')
          }}
        />
        <CustomTouchableOpacity
          text="Skip >>"
          color="#1abc9c"
          onPress={() => {
            this.props.navigation.navigate('Search')
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
    backgroundColor: '#ffffff'
  },
  radioButton: {

    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  heading: {
    color: 'black',
    fontFamily:'Poppins-Bold',
    fontSize: 30,
    marginBottom: 10,
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 5,
    fontSize: 20
  }
})


