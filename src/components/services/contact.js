import React, { Component } from 'react';
import { View, TextInput, Linking, Text, StyleSheet, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, FlatList, Image } from 'react-native';
import servicesApi from './servicesApi';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { CustomButton } from '../assests/customButtonLarge.js';
import ConstantValues from '../constantValues';

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
      subject: '',
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
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 25, color: '#000000' }}> Contact Us </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={styles.card}>
              <TextInput
                style={styles.inputS}
                underlineColorAndroid={'#000000'}
                placeholder='Subject'
                keyboardType='default'
                onChangeText={subject => this.setState({ subject })}
              />
              <TextInput
                style={styles.inputD}
                underlineColorAndroid={'#000000'}
                placeholder='Description'
                keyboardType='default'
                onChangeText={description => this.setState({ description })}
              />
              <CustomButton
                style={{ backgroundColor: '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
                onPress={() => {
                  ToastAndroid.show('ThankYou for contacting. We will reach you soon')
                  this.props.navigation.navigate('Search')
                }}
                title='Submit'
              />
            </View>

            <View>
              <View style={styles.detailview}>
                <Image style={styles.image} source={require('../images/location.png')} />
                <Text style={styles.detailText}> {this.state.zoopAddress} </Text>
              </View>
              <View style={styles.detailview}>
                <Image style={styles.image} source={require('../images/call.png')} />
                <Text style={styles.detailText}> {this.state.zoopPhone} </Text>
              </View>
              <View style={styles.detailview}>
                <Image style={styles.image} source={require('../images/email.png')} />
                <Text style={styles.detailText}> {this.state.zoopEmail} </Text>
              </View>
            </View>

            <View style={{justifyContent:'center',alignItems:'center',paddingTop:20}}>
              <Text style={styles.textS}>FOLLOW US ON</Text>
              <View style={styles.detailview}>

                <View style={styles.cardS}>
                  <TouchableOpacity onPress={() => this.gotoLink(ConstantValues.zoopFacebook)}>
                    <Image style={styles.imageS} source={require('../images/facebook.png')} />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardS}>
                  <TouchableOpacity onPress={() => this.gotoLink(ConstantValues.zoopTwitter)}>
                    <Image style={styles.imageS} source={require('../images/twitter.png')} />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardS}>
                  <TouchableOpacity onPress={() => this.gotoLink(ConstantValues.zoopInstagram)}>
                    <Image style={styles.imageS} source={require('../images/insta.png')} />
                  </TouchableOpacity>
                </View>

              </View>
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
  card: {
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 10
  },
  cardS: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
    paddingVertical: 5
  },
  inputS: {
    fontFamily: 'Poppins-SemiBold',
    width: '80%',
    fontSize: 15,
    marginVertical: 40
  },
  textS: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color:'#000000'
  },
  inputD: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: 15,
    marginVertical: 40
  },
  image: {
    width: 30,
    height: 30
  },
  imageS: {
    width: 50,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  detailText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color:'#000000'
  },
  detailview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: Dimensions.get('screen').width - 100,
    paddingVertical: 10
  }
});
