import React, { Component } from 'react';
import { Picker, View, Text, StyleSheet, Dimensions, TextInput, ToastAndroid, PermissionsAndroid, Alert, TouchableOpacity } from 'react-native';
import { CustomButton } from '../assests/customButtonLarge.js';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomTouchableOpacity from '../assests/customTouchableOpacity';
import loginApi from '../login/loginApi.js';
import { Fade } from '../assests/fade.js';
import ConstantValues from '../constantValues.js';
import Modal from "react-native-modal";
import Spinner from 'react-native-spinkit';
import { Overlay } from 'react-native-elements';
import * as menuAction from '../../actions/menuAction'
import { connect } from 'react-redux';
import { ZoopLoader } from '../assests/zoopLoader.js';
import Colors from '../colors.js';


export class Register extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.checkLogin()
    //this.requestGetAccountPermission()
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailId: '',
      referredBy: '',
      altmobile: '',
      isVisible: true,
      loginCount: null,
      clicked: false,
      buttonColor: '#9b9b9b',
      buttonText: 'SUBMIT',
      visibleModal: 'center',
    };
  }


  checkLogin() {
    if (ConstantValues.customerId == '') {
      this.setState({
        isVisible: false
      })
      return (
        Alert.alert(
          'Need Login!!',
          'Please Login',
          [
            {
              text: 'OK', onPress: () => {
                ConstantValues.navigationChannel = 'Search'
                this.props.navigation.navigate('Welcome')
              },
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      )
    } else {
      // this.props.getUserInfo()
      this.onRegister();
    }
  }
  ///checking Input Validation
  async isEmpty(name, emailId, altMobile, referredBy) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let reg = /^[0-9]+$/;
    try {
      if (name != '') {
        if (emailId != '') {
          if (re.test(emailId)) {
            if (altMobile.length > 0) {
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

  async onRegister() {
    const response = await this.props.getUserInfo()
    ConstantValues.loginCount = this.props.response.data.loginCount
    this.state.loginCount = this.props.response.data.loginCount
    ConstantValues.customerName = this.props.response.data.fullName
    this.setState({
      name: (ConstantValues.customerName == '' ? this.props.response.data.fullName : ConstantValues.customerName)
    })
    console.log('this.props.response :' + this.props.response);
    console.log('ConstantValues.customerName :' + ConstantValues.customerName)
    ConstantValues.customerEmailId = this.props.response.data.email
    this.setState({
      emailId: (ConstantValues.customerEmailId == '' ? this.props.response.data.email : ConstantValues.customerEmailId)
    })
    ConstantValues.customeralternateMobile = this.props.response.data.alternateMobile
    this.setState({
      altmobile: (ConstantValues.customeralternateMobile == '' ? this.props.response.data.alternateMobile : ConstantValues.customeralternateMobile)
    })
    //agent config
    ConstantValues.isAgent = this.props.response.data.isAgent
    this.setState({
      isVisible: false
    })
  }

  //getting User register
  // async onRegister() {
  //   try {
  //     let response = await loginApi.getUserRegister();
  //     console.log('data received in register.js : ' + JSON.stringify(response))
  //     ConstantValues.loginCount = response.data.loginCount
  //     this.state.loginCount = response.data.loginCount

  //     ConstantValues.customerName = response.data.fullName
  //     this.setState({
  //       name: ConstantValues.customerName
  //     })
  //     console.log('ConstantValues.customerName :' + ConstantValues.customerName)
  //     ConstantValues.customerEmailId = response.data.email
  //     this.setState({
  //       emailId: ConstantValues.customerEmailId
  //     })
  //     ConstantValues.customeralternateMobile = response.data.alternateMobile
  //     this.setState({
  //       altmobile: ConstantValues.customeralternateMobile
  //     })


  //   } catch (error) {
  //     console.log('Data received in register.js catch: ' + error)
  //   }
  // }


  //submitting edited profile info
  async editUserInfo(name, emailId, altMobile, referredBy) {
    this.setState({ buttonText: 'Submitting..', clicked: true, buttonColor: '#9b9b9b' })
    try {
      let response = await loginApi.editUserInfo(name, emailId, altMobile, referredBy)
      console.log('data received in profile.js : ' + JSON.stringify(response))
      if (response.status == true) {
        this.setState({ buttonText: 'Profile Updated Successfully', clicked: true, buttonColor: '#9b9b9b' })
        // this.setState({
        //   name:ConstantValues.customerName,
        //   altmobile:ConstantValues.customeralternateMobile,
        //   emailId:ConstantValues.customerEmailId,
        // })
        ConstantValues.customerName = name
        ConstantValues.customerEmailId = emailId
        ConstantValues.customeralternateMobile = altMobile
        return (
          ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG),
          this.props.navigation.navigate(ConstantValues.navigationChannel)
        )
      }
      else {
        this.setState({ buttonText: 'SUBMIT', clicked: false, buttonColor: Colors.newgGreen3 })
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG)
        )
      }

    } catch (error) {
      this.setState({ buttonText: 'SUBMIT', clicked: false, buttonColor: Colors.newgGreen3 })
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
        {/* header view */}
        <View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'flex-start' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
          <IconA style={{ margin: 20 }} name={'arrowleft'} size={25} color={Colors.black} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
            <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> My Profile </Text>
          </View>
        </View>
        {/* header view ends */}
        <View style={{ paddingVertical: 60, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
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
              onChangeText={emailId => this.setState({ emailId })}
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
            title="SUBMIT"
            disabled={this.state.name == '' ? true : false}
            style={{ backgroundColor: Colors.newgGreen3, alignSelf: 'center', marginBottom: 20, }}
            onPress={() => {
              this.isEmpty(this.state.name, this.state.emailId, this.state.altmobile, this.state.referredBy)
              // this.props.navigation.navigate('Search')
            }}
          />
        </View>
        <Fade visible={ConstantValues.customerId != ''}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LogOut')}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'stretch' }}>
              <Icon name={'power-off'} size={20} color={'#000000'} style={{ margin: 5 }} />
              <Text style={{ fontSize: 20, color: '#000000', textAlign: 'center', fontFamily: 'Poppins-Medium', }}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        </Fade>
        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#9b9b9b', textAlign: 'center' }}>App Version : {ConstantValues.device.appVersion}</Text>
        <Overlay
          isVisible={this.state.isVisible}
          width="auto"
          height="auto"
          // windowBackgroundColor='rgba(255, 255, 255, .5)'
          // overlayBackgroundColor='#ffffff'
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <ZoopLoader isVisible={true} />


        </Overlay>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    height: ConstantValues.deviceHeight,
    alignItems: 'stretch',
    // alignContent: 'stretch',
    // justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  radioButton: {

    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
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

const mapStateToProp = state => {
  return {
    response: state.response
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(menuAction.getUserInfo())
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(Register);
