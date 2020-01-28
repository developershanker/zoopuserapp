import React, { Component } from 'react';
import { View, TextInput, Linking, Text, Alert, StyleSheet, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, FlatList } from 'react-native';
import servicesApi from './servicesApi';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { CustomButton } from '../assests/customButtonLarge.js';
import {CustomAlert} from '../assests/customAlert';
import ConstantValues from '../constantValues';
import Colors from '../colors';
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

  handleSuccess(){
    this.setState({
      name: '',
      email: '',
      message: '',
      clicked:true,
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
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> FeedBack </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <TextInput
                style={styles.inputS}
                underlineColorAndroid={'#000'}
                placeholder='Name'
                keyboardType='default'
                onChangeText={name => this.setState({ name })}
              />
              <TextInput
                style={styles.inputS}
                underlineColorAndroid={'#000'}
                placeholder='E-mail'
                keyboardType='default'
                onChangeText={email => this.setState({ email })}
              />
              <View style={{ flexDirection: 'column', backgroundColor: '#fff', width: ConstantValues.deviceWidth, height: '60%', alignContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
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
            </View>

          </View>
        </ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: ConstantValues.deviceWidth - 10, height: '10%', backgroundColor: '#fff' }}>
          <CustomButton
            disabled={this.state.clicked}
            style={{ backgroundColor: this.state.clicked == true ? '#9b9b9b' : Colors.newgGreen3 , alignSelf: 'center', marginBottom: 20, }}
            onPress={() => { this.sendFeedback(this.state.name, this.state.email, this.state.message) }}
            title={this.state.clicked === false ? 'SUBMIT' : 'Feedback Sent'}
          />
        </View>
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
    width: '90%',
    fontSize: 15,
    marginVertical: 20
  },
  inputD: {
    fontFamily: 'Poppins-Regular',
    width: '85%',
    fontSize: 14,
  },
  textS: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    // color: '#000000'
  },
  messagebox: {
    borderColor: '#9b9b9b',
    borderRadius: 100 / 9,
    borderWidth: 1,
    width: '90%',
    height: 250,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // backgroundColor: Colors.darkGrey,
  }
});