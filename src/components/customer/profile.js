import React, { Component } from 'react';
import {Picker, View,Text, StyleSheet, TextInput, ToastAndroid , PermissionsAndroid  } from 'react-native';
import { CustomButton } from '../assests/customButtonLarge.js';
import SplashScreen from 'react-native-splash-screen';
import CustomTouchableOpacity from '../assests/customTouchableOpacity';
import loginApi from '../login/loginApi.js';
import { Fade } from '../assests/fade.js';
import ConstantValues from '../constantValues.js';


export default class Profile extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.onRegister();
    this.requestGetAccountPermission()
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailId: '',
      referredBy: '',
      altmobile: '',
      loginCount: null,
    };
  }
  ///checking Input Validation
  async isEmpty(name, emailId, altMobile, referredBy) {
    try {
      if (name != '') {
        if (emailId != '') {
          this.editUserInfo(name, emailId, altMobile, referredBy)
          // this.onRegister()
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

  //getting User register
  async onRegister() {
    try {
      let response = await loginApi.getUserRegister();
      console.log('data received in register.js : ' + JSON.stringify(response))
      ConstantValues.loginCount = response.data.loginCount
      this.state.loginCount = response.data.loginCount

      ConstantValues.customerName = response.data.fullName
      this.setState({
        name: ConstantValues.customerName
      })
      console.log('ConstantValues.customerName :' + ConstantValues.customerName)
      ConstantValues.customerEmailId = response.data.email
      this.setState({
        emailId: ConstantValues.customerEmailId
      })
      ConstantValues.customeralternateMobile = response.data.alternateMobile
      this.setState({
        altmobile: ConstantValues.customeralternateMobile
      })


    } catch (error) {
      console.log('Data received in register.js catch: ' + error)
    }
  }
  //submitting edited profile info
  async editUserInfo(name, emailId, altMobile, referredBy) {
    try {
      let response = await loginApi.editUserInfo(name, emailId, altMobile, referredBy)
      console.log('data received in profile.js : ' + JSON.stringify(response))
      if (response.status == true) {
        return (
          ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG),
          this.props.navigation.navigate('Search')
        )
      }
      else {
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG)
        )
      }

    } catch (error) {
      console.log('Data received in profile.js catch: ' + error)
    }
  }

  async requestGetAccountPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
        {
          title: 'ZoopIndia Account Permission',
          message:
            'Automatically get device account',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Getting Device Accounts');
      } else {
        console.log('Account permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const visible = this.state.loginCount == 1 ? true : false
    return (
      <View style={styles.slide}>
        <Text style={styles.heading}> My Profile </Text>
        <View style = {styles.card}>
        <TextInput style={styles.input}
          placeholder='Full Name'
          value={this.state.name}
          keyboardType='default'
          onChangeText={name => this.setState({ name })}
          autoCapitalize="words"
        />
        <TextInput style={styles.input}
          placeholder='Email id'
          value={this.state.emailId}
          keyboardType='email-address'
          onChangeText={emailId => this.setState({ emailId })}
        />
        <TextInput style={styles.input}
          placeholder='Alternate Mobile No.'
          value={this.state.altmobile}
          keyboardType='number-pad'
          onChangeText={altmobile => this.setState({ altmobile })}
        />
        <Fade visible={visible} >
          <TextInput style={styles.input}
            placeholder='Referral Code (if any)'
            keyboardType='default'
            value={this.state.referredBy}
            onChangeText={referredBy => this.setState({ referredBy })}
          />
        </Fade>

        </View>
        <CustomButton
          title="Submit"
          disabled={ this.state.name.length == 0 ? true : false}
          style={{ backgroundColor:  this.state.name.length == 0 ? '#9b9b9b' : '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
          onPress={() => {
            this.isEmpty(this.state.name, this.state.emailId, this.state.altmobile, this.state.referredBy)
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
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    marginBottom: 10,
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 5,
    fontSize: 20,
    paddingHorizontal:10,
    fontFamily: 'Poppins-SemiBold'
  },
  card: {
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
  },
})


