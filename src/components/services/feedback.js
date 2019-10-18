import React, { Component } from 'react';
import { View, TextInput, Linking, Text,Alert, StyleSheet, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, FlatList} from 'react-native';
import servicesApi from './servicesApi';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { CustomButton } from '../assests/customButtonLarge.js';
import ConstantValues from '../constantValues';
export default class feedback extends Component {
  componentDidMount(){
    this.setState({
      name: '',
      email: '',
      message: ''
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      message:''
    };
  }

  async sendFeedback(name, email, message) {
     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      let response = await servicesApi.sendFeedback(name, email, message);
      if (name != '') {
        if (email != '') {
          if (re.test(email)) {
            if (message != '') {
              if (response.status == true) {
                this.setState({
                  name: '',
                  email: '',
                  message: ''
                })
                return (
                  Alert.alert(
                    'Thank you!!',
                    'Thank You for contacting Zoop. We will reach you soon.',
                    [
                      {
                        text: 'OK', onPress: () => {
                          this.props.navigation.navigate('Search')
                        },
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
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 25, color: '#000000' }}> FeedBack </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <TextInput
                style={styles.inputS}
                underlineColorAndroid={'#e4e4e4'}
                placeholder='Name'
                keyboardType='default'
                onChangeText={name => this.setState({ name })}
              />
              <TextInput
                style={styles.inputS}
                underlineColorAndroid={'#e4e4e4'}
                placeholder='E-mail'
                keyboardType='default'
                onChangeText={email => this.setState({ email })}
              />
              <Text style={styles.textS}>Message</Text>
              <View style={styles.messagebox}>
               <TextInput
                style={styles.inputD}
                placeholder=''
                multiline={true}
                numberOfLines={3}
                keyboardType='default'
                onChangeText={message => this.setState({ message })}
              />
              </View>
              <CustomButton
                style={{ backgroundColor: '#60b246', alignSelf: 'center', marginBottom: 20, }}
                onPress={() => { this.sendFeedback(this.state.name, this.state.email,this.state.message) }}
                title='Send'
              />

            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputS: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: 15,
    marginVertical: 40
  },
  inputD: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: 15,
  },
  textS: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    // color: '#000000'
  },
  messagebox:{
    borderColor: '#e4e4e4',
    borderRadius: 100 / 9,
    borderWidth: 1,
    width: '80%',
    height:150,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  }
});