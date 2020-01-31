import React, { Component } from 'react';
import { View, TextInput, Linking, Text, StyleSheet, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import servicesApi from './servicesApi';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { CustomButton } from '../assests/customButtonLarge.js';
import ConstantValues from '../constantValues';
import Colors from '../colors';
// import Image from 'react-native-remote-svg';

export default class contact extends Component {

  componentDidMount() {
    SplashScreen.hide();
    this.getContactUs()
  }
  constructor(props) {
    super(props);
    this.state = {
      zoopAddress: '',
      zoopPhone: '',
      zoopEmail: '',
      name: '',
      mobile: '',
      clicked: false,
      description: '',
    };
  }

  async getContactUs() {
    try {
      let response = await servicesApi.getContactUs();
      if (response.status == true) {
        this.setState({
          zoopAddress: response.data.zoopAddress,
          zoopPhone: response.data.zoopPhone,
          zoopEmail: response.data.zoopEmail
        })

      } else {
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG),
          console.log(response.error)
        )
      }

    } catch (error) {
      console.log('Data received in contact.js catch: ' + error)
    }
  }
  gotoLink = (link) => {
    Linking.openURL(link);
  }

  async sendContent(name, mobile, description) {
    let regexName = /^[a-zA-Z ]*$/;
    let regexMobile = /^[0-9]+$/;
    try {
      // let response = await servicesApi.sendContent(name,mobile,description);
      if (name != '' && regexName.test(name)) {
        //console.log("mobile.length is:" + mobile.length)
        if (mobile != '' && mobile.length === 10) {
          if (regexMobile.test(mobile)) {
            if (description != '') {
              let response = await servicesApi.sendContent(name, mobile, description);
              if (response.status == true) {
                this.setState({
                  name: '',
                  mobile: '',
                  description: '',
                  clicked: true
                })
                return (
                  Alert.alert(
                    'Thank you!!',
                    'Thank You for contacting. We will reach you soon',
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
            } else {
              ToastAndroid.show('Please Enter Description', ToastAndroid.LONG)
            }
          } else {
            ToastAndroid.show('Please Enter Valid Mobile No.', ToastAndroid.LONG)
          }
        } else {
          ToastAndroid.show('Please Enter Valid Mobile No.', ToastAndroid.LONG)
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
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> Contact Us </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={styles.card}>
              <TextInput
                style={styles.inputS}
                underlineColorAndroid={'#000000'}
                placeholder='Enter Name'
                keyboardType='default'
                onChangeText={name => this.setState({ name })}
              />
              <TextInput
                style={styles.inputS}
                underlineColorAndroid={'#000000'}
                placeholder='Enter Mobile No.'
                keyboardType='number-pad'
                maxLength={10}
                onChangeText={mobile => this.setState({ mobile })}
              />
              <TextInput
                style={styles.inputD}
                underlineColorAndroid={'#000000'}
                placeholder='Add Description'
                keyboardType='default'
                onChangeText={description => this.setState({ description })}
              />
              <CustomButton
                disabled={this.state.clicked}
                style={{ backgroundColor: this.state.clicked == true ? '#9b9b9b' : Colors.newgGreen3, alignSelf: 'center', marginBottom: 20, width: 300 }}
                onPress={() => { this.sendContent(this.state.name, this.state.mobile, this.state.description) }}
                title={this.state.clicked === false ? 'SUBMIT' : 'Message Sent'}
              />
            </View>

            <View>
              <View style={styles.detailview}>
                <Image style={styles.image} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.location }} />
                <Text style={[styles.detailText, { width: 200,  }]}> {this.state.zoopAddress} </Text>
              </View>
              <View style={styles.detailview}>
                <Image style={styles.image} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.call }} />
                <Text style={[styles.detailText, { width: 200,}]}> {this.state.zoopPhone} </Text>
              </View>
              <View style={styles.detailview}>
                <Image style={styles.image} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.email }} />
                <Text style={[styles.detailText, { width: 200,}]}> {this.state.zoopEmail} </Text>
              </View>
            </View>

            {/* <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
              <Text style={styles.textS}>FOLLOW US ON</Text>
              <View style={styles.detailview}>

                <View style={styles.cardS}>
                  <TouchableOpacity onPress={() => this.gotoLink(ConstantValues.zoopFacebook)}>
                    <Image style={styles.imageS} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.facebook }} />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardS}>
                  <TouchableOpacity onPress={() => this.gotoLink(ConstantValues.zoopTwitter)}>
                    <Image style={styles.imageS} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.twitter }} />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardS}>
                  <TouchableOpacity onPress={() => this.gotoLink(ConstantValues.zoopInstagram)}>
                    <Image style={styles.imageS} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.instagram }} />
                  </TouchableOpacity>
                </View>

              </View>
            </View> */}

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
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 5,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 2,
    paddingVertical: 10
  },
  cardS: {
    alignItems: 'center',
    width: 60,
    justifyContent: 'center',
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 5,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 2,
    paddingVertical: 5
  },
  inputS: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: 14,
    marginVertical: 20
  },
  textS: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: '#000000'
  },
  inputD: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: 15,
    marginVertical: 20
  },
  image: {
    width: 30,
    height: 30,
  },
  imageS: {
    width: 50,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
    textAlign:'left'
  },
  detailview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: Dimensions.get('screen').width,
    paddingVertical: 10
  }
});
