import React, { Component } from 'react';
import { Picker, View, Text, StyleSheet, TextInput, Dimensions, ToastAndroid, PermissionsAndroid, Alert } from 'react-native';
import { CustomButton } from '../assests/customButtonLarge.js';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomTouchableOpacity from '../assests/customTouchableOpacity';
import loginApi from '../login/loginApi.js';
import { Fade } from '../assests/fade.js';
import ConstantValues from '../constantValues.js';
import Modal from "react-native-modal";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../colors.js';


export default class Profile extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.onRegister();
    //this.requestGetAccountPermission()
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailId: '',
      referredBy: '',
      altmobile: '',
      loginCount: null,
      clicked: false,
      buttonTextColor: Colors.white,
      buttonColor: Colors.newgGreen3,
      buttonText: 'SUBMIT',
      visibleModal: 'bottom'
    };
  }
  ///checking Input Validation
  async isEmpty(name, emailId, altMobile, referredBy) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let reg = /^[0-9]+$/;
    try {
      if (name != '') {
        if (emailId != '') {
          if (re.test(emailId)) {
            if (altMobile != null && altMobile.length > 0) {
              if (altMobile.length === 10) {
                if (reg.test(altMobile)) {
                  this.editUserInfo(name, emailId, altMobile, referredBy)
                  this.onRegister()
                } else {
                  return (
                    Alert.alert(
                      'Invalid Input!!',
                      'Incorrect Alternate No. format!!' + '\n' + 'Please enter correct Alternate No.',
                      [
                        {
                          text: 'OK', onPress: () => console.log('Invalid alternate no.'),
                          style: 'cancel'
                        },
                      ],
                      { cancelable: false },
                    )
                  )
                }
              } else {
                return (
                  Alert.alert(
                    'Invalid Input!!',
                    'Incorrect Alternate No. format!!' + '\n' + 'Please enter correct Alternate No.',
                    [
                      {
                        text: 'OK', onPress: () => console.log('Invalid alternate no.'),
                        style: 'cancel'
                      },
                    ],
                    { cancelable: false },
                  )
                )
              }
            } else {
              this.editUserInfo(name, emailId, altMobile, referredBy)
            }
          } else {
            return (
              Alert.alert(
                'Invalid Input!!',
                'Incorrect Email format!!' + '\n' + 'Please enter correct Email Id!!',
                [
                  {
                    text: 'OK', onPress: () => console.log('Invalid email id'),
                    style: 'cancel'
                  },
                ],
                { cancelable: false },
              )
            )
          }
        } else {
          //ToastAndroid.show('Please Enter Email Id', ToastAndroid.LONG)
          return (
            Alert.alert(
              'Invalid Input!!',
              'Please Enter Email Id.',
              [
                {
                  text: 'OK', onPress: () => console.log('Invalid email id'),
                  style: 'cancel'
                },
              ],
              { cancelable: false },
            )
          )
        }
      } else {
        // ToastAndroid.show('Please Enter Name', ToastAndroid.LONG)
        return (
          Alert.alert(
            'Invalid Input!!',
            'Please Enter Name.',
            [
              {
                text: 'OK', onPress: () => console.log('Invalid name'),
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      }
    } catch (error) {
      console.log('Data received in profile.js catch: ' + error)
    }
  }

  //getting User register
  async onRegister() {
    try {
      let response = await loginApi.getUserRegister();
      console.log('data received in profile.js : ' + JSON.stringify(response))
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
      if (ConstantValues.customerName.length != 0) {
        this.setState({
          buttonColor: Colors.newgGreen3,
          buttonTextColor:Colors.white
        })
      }
      ConstantValues.isAgent = response.data.isAgent
    } catch (error) {
      console.log('Data received in register.js catch: ' + error)
    }
  }
  //submitting edited profile info
  async editUserInfo(name, emailId, altMobile, referredBy) {
    this.setState({ buttonText: 'Submitting..', clicked: true, buttonColor: Colors.white, buttonTextColor: Colors.darkGrey1 })
    try {
      let response = await loginApi.editUserInfo(name, emailId, altMobile, referredBy)
      console.log('data received in profile.js : ' + JSON.stringify(response))
      if (response.status == true) {
        this.setState({ buttonText: 'Profile Updated Successfully', clicked: true, buttonColor: Colors.white, buttonTextColor: Colors.darkGrey1 })
        // this.setState({
        //   name:ConstantValues.customerName,
        //   altmobile:ConstantValues.customeralternateMobile,
        //   emailId:ConstantValues.customerEmailId,
        // })
        ConstantValues.customerName = name
        ConstantValues.customerEmailId = emailId
        ConstantValues.customeralternateMobile = altMobile
        return (
          // ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG),
          this.props.navigation.navigate(ConstantValues.navigationChannel)
        )
      }
      else {
        this.setState({ buttonText: 'SUBMIT', clicked: false, buttonColor: Colors.newgGreen3, buttonTextColor: Colors.white })
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG)
        )
      }

    } catch (error) {
      this.setState({ buttonText: 'SUBMIT', clicked: false, buttonColor: Colors.newgGreen3, buttonTextColor: Colors.white })
      console.log('Data received in profile.js catch: ' + error)
      return (
        ToastAndroid.show('Something went wrong' + error, ToastAndroid.LONG)
      )
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

  onBackButtonPress() {
    return (
      ToastAndroid.show('Please click on "SUBMIT" to proceed', ToastAndroid.LONG)
    )
  }

  render() {
    const visible = this.state.loginCount == 1 ? true : false
    return (
      <View style={styles.slide}>
        <Modal
          isVisible={this.state.visibleModal === 'bottom'}
          // onBackButtonPress={() => this.setState({ visibleModal: null })}
          onBackButtonPress={() => this.onBackButtonPress()}
          // onSwipeComplete={() => this.setState({ visibleModal: null })}
          // swipeDirection={['left', 'right']}
          style={styles.bottomModal}
        >
          <View style={styles.modalView}>
            <Text style={[styles.heading, { alignSelf: 'center' }]}> My Profile </Text>
            <View style={styles.card}>
              <TextInput style={styles.input}
                placeholder='Full Name'
                maxLength={25}
                value={this.state.name}
                // keyboardType='default'
                onChangeText={name => this.setState({ name })}
                autoCapitalize='words'
              />
              <TextInput style={styles.input}
                placeholder='Email id'
                value={this.state.emailId}
                keyboardType='email-address'
                onChangeText={emailId => this.setState({ emailId, buttonColor: Colors.newgGreen3, buttonTextColor: Colors.white })}
              />
              <TextInput style={styles.input}
                placeholder='Alternate Mobile No.'
                value={this.state.altmobile}
                maxLength={10}
                keyboardType='number-pad'
                onChangeText={altmobile => this.setState({ altmobile })}
              />
              {/* <Fade visible={visible} >
          <TextInput style={styles.input}
            placeholder='Referral Code (if any)'
            keyboardType='default'
            value={this.state.referredBy}
            onChangeText={referredBy => this.setState({ referredBy })}
          />
        </Fade> */}

            </View>
            <CustomButton
              textStyle={{ color: this.state.buttonTextColor }}
              title={this.state.buttonText}
              disabled={this.state.clicked}
              style={{ backgroundColor: this.state.buttonColor, alignSelf: 'center', marginBottom: 2, }}
              onPress={() => {
                this.isEmpty(this.state.name, this.state.emailId, this.state.altmobile, this.state.referredBy)
                // this.props.navigation.navigate('Search')
              }}
            />
          </View>
        </Modal>
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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    width: Dimensions.get('screen').width,
    height: 300,
    backgroundColor: '#fff',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5
  },
  radioButton: {

    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  heading: {
    color: Colors.newOrange,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginBottom: 10,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 5,
    fontSize: 14,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular'
  },
  card: {
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 6,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 2,
  },
})


