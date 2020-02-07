import React, { Component } from 'react';
import { View, TextInput, Linking, Text,Image, Alert, StyleSheet, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import servicesApi from './servicesApi';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { CustomButton } from '../assests/customButtonLarge.js';
import { CustomAlert } from '../assests/customAlert';
import ConstantValues from '../constantValues';
import Colors from '../colors';
const img = ConstantValues.IconUrl + ConstantValues.imgurl.zooporange
export default class feedback extends Component {
  componentDidMount() {
    this.setState({
      name: '',
      email: '',
      message: ''
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      clicked: false,
    };
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    console.log('I am back on Feedback.js')
    // this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
    this.props.navigation.navigate('Search')
    return true;
  };

  handleSuccess() {
    this.setState({
      name: '',
      email: '',
      message: '',
      clicked: true,
    })

    this.props.navigation.navigate('Search')

  }

  async sendFeedback(name, email, message) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regexName = /^[a-zA-Z ]*$/;
    try {
      // let response = await servicesApi.sendFeedback(name, email, message);
      if (name != '' && regexName.test(name)) {
        if (email != '') {
          if (re.test(email)) {
            if (message != '') {
              let response = await servicesApi.sendFeedback(name, email, message);
              if (response.status == true) {
                this.setState({
                  name: '',
                  email: '',
                  message: ''
                })

                this.setState({
                  clicked: true
                })
                return (
                  Alert.alert(
                    'Thank you!!',
                    'Thank You for contacting Zoop. We will reach you soon.',
                    [
                      {
                        text: 'OK', onPress: () => this.handleSuccess(),
                        style: 'cancel'
                      },
                    ],
                    { cancelable: false },
                  )
                )
              } else {
                ToastAndroid.show('Something went wrong. Please try after some time', ToastAndroid.LONG)
              }
            }
            else {
              ToastAndroid.show('Please enter some message', ToastAndroid.CENTER)
            }

          } else {
            ToastAndroid.show('Please Enter Valid Email', ToastAndroid.LONG)
          }
        } else {
          ToastAndroid.show('Please Enter Email', ToastAndroid.LONG)
        }
      } else {
        ToastAndroid.show('Please Enter Name', ToastAndroid.LONG)
      }
    }
    catch (error) {
      console.log('Data received in contact.js catch: ' + error)
    }
  }
  
  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View style={{ width: ConstantValues.deviceWidth }}>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                {/* <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} /> */}
                <IconA name={'arrowleft'} style={{ margin: 20 }} size={25} color={Colors.black} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> FeedBack </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={styles.card}>
              <View style={{ width: '92%' }}>
                <TextInput
                  style={styles.inputS}
                  underlineColorAndroid={Colors.lightGrey}
                  placeholder='Name'
                  keyboardType='default'
                  onChangeText={name => this.setState({ name })}
                />
              </View>
              <View style={{ width: '92%' }}>
                <TextInput
                  style={styles.inputS}
                  underlineColorAndroid={Colors.lightGrey}
                  placeholder='E-mail'
                  keyboardType='default'
                  onChangeText={email => this.setState({ email })}
                />
              </View>
              <View style={{ flexDirection: 'column', width: '92%', alignContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                <Text style={styles.textS}>Message</Text>
                <View style={styles.messagebox}>
                  <TextInput
                    style={styles.inputD}
                    multiline={true}
                    numberOfLines={5}
                    keyboardType='default'
                    onChangeText={message => this.setState({ message })}
                  />
                </View>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', width:'92%', height: '10%', backgroundColor: '#fff' }}>
                <CustomButton
                  textStyle={{ color: this.state.clicked == true ? Colors.darkGrey1 : Colors.white }}
                  disabled={this.state.clicked}
                  style={{ width: '100%', backgroundColor: this.state.clicked == true ? Colors.white : Colors.newgGreen3, alignSelf: 'center', marginBottom: 20, }}
                  onPress={() => { this.sendFeedback(this.state.name, this.state.email, this.state.message) }}
                  title={this.state.clicked === false ? 'SUBMIT' : 'Feedback Sent'}
                />
              </View>
            </View>
            <View style={{ width: ConstantValues.deviceWidth, height: 200, opacity: 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri:img }}
                style={{ width: '80%', height: '100%' }}
              />
            </View>
          </View>
        </ScrollView>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', width: ConstantValues.deviceWidth - 10, height: '10%', backgroundColor: '#fff' }}>
          <CustomButton
            disabled={this.state.clicked}
            style={{ backgroundColor: this.state.clicked == true ? '#9b9b9b' : Colors.newgGreen3, alignSelf: 'center', marginBottom: 20, }}
            onPress={() => { this.sendFeedback(this.state.name, this.state.email, this.state.message) }}
            title={this.state.clicked === false ? 'SUBMIT' : 'Feedback Sent'}
          />
        </View> */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputS: {
    fontFamily: 'Poppins-Regular',
    width: '100%',
    fontSize: 14,
    marginVertical: 20
  },
  inputD: {
    fontFamily: 'Poppins-Regular',
    width: '100%',
    fontSize: 14,
  },
  textS: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    // color: '#000000'
  },
  messagebox: {
    borderColor: Colors.lightGrey1,
    borderRadius: 6,
    borderWidth: 0.3,
    width: '100%',
    height: 100,
    // height: 250,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // backgroundColor: Colors.darkGrey,
  },
  card: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ffffff',//can change as we move to various pages
    // marginBottom: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'column',
    // shadowOpacity: 0.4,
    // borderBottomColor: '#e4e4e4',
    // borderBottomWidth: 2,
    // paddingVertical: 10
  },
});