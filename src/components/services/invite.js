import React, { Component } from 'react';
import { View, Text, StyleSheet, Clipboard, ScrollView, Platform, Dimensions, Alert, TouchableOpacity, FlatList, Image, ToastAndroid, Linking,Share } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ConstantValues from '../constantValues';
import { CustomButton } from '../assests/customButtonLarge.js';
import { CustomButtonShort } from '../assests/customButtonShort';
import loginApi from '../login/loginApi';


export default class Invite extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.checkRegister()
  }

  constructor(props) {
    super(props);
    this.state = {
      phone: '123456789',
      backgroundColor: '#60b246',
      copyMsg: 'TAP TO COPY',
      referralCode:''
    };
  }


  checkRegister(){
    if ( ConstantValues.customerId == '') {
      return(
        Alert.alert(
          'Need Login!!',
          'Please LOGIN to Proceed.',
          [
            {
              text: 'OK', onPress: () => this.props.navigation.navigate('Welcome'),
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      )
    } else {
      this.onRegister()
    }
  }
  async onRegister() {
    try {
      let response = await loginApi.getUserRegister();
      console.log('data received in register.js : ' + JSON.stringify(response))
      ConstantValues.loginCount = response.data.loginCount
      ConstantValues.customerPhoneNo = response.data.mobile
      ConstantValues.customerName = response.data.fullName
      ConstantValues.customerRefferalCode = response.data.referralCode,
      this.setState({
        referralCode:response.data.referralCode
      })
      
    } catch (error) {
      console.log('Data received in register.js catch: ' + error)
    }
  }
  shareToWhatsApp = (text) => {
    Linking.openURL(`whatsapp://send?text=${text}`);
  }

  //invite through SMS
  inviteSms = (msg) => {
    Linking.openURL(`sms:${this.getSMSDivider()}body=${msg}`)
  }

  getSMSDivider() {
    return Platform.OS === "ios" ? "&" : "?";
  }

  async writeToClipboard() {
    //To copy the text to clipboard
    Clipboard.setString(ConstantValues.customerRefferalCode);
    return (
      ToastAndroid.show('Refferal Code Copied!!', ToastAndroid.LONG)
    ),
      this.setState({
        backgroundColor: '#9b9b9b',
        copyMsg: 'COPIED!!'
      })
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
        'Hi, upgrade your train food experience by using my code ' + '\'' + ConstantValues.customerRefferalCode + '\'' + ' and get benefits worth Rs 150 when you sign-up at Zoop APP. Download: goo.gl/fGC622',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const width = Dimensions.get('screen').width
    const msg = 'Hi, upgrade your train food experience by using my code ' + '\'' + ConstantValues.customerRefferalCode + '\'' + ' and get benefits worth Rs 150 when you sign-up at Zoop APP. Download: goo.gl/fGC622'
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.slide}>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                {/* <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} /> */}
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 25, color: '#000000' }}> Refer & Earn </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}>

              <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Regular', fontSize: 15, color: '#000000', paddingVertical: 10 }}>
                Refer friends and earn.
                </Text>

              <Text style={{ width:300, alignItems: 'center', fontFamily: 'Poppins-Regular', fontSize: 15, color: '#000000', paddingVertical: 10 }}>
                Invite your friends on Zoop and Earn promo balance worth {ConstantValues.rupee}50 per referral.
                </Text>

              <View style={{ width: width, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TouchableOpacity  onPress={()=>this.onShare()}>
                  <View style={styles.cardS}>
                    <Icon style={{ paddingHorizontal: 5 }} name={'facebook'} size={25} color={'#3b5998'} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity  onPress={()=>this.onShare()}>
                  <View style={styles.cardS}>
                    <Icon name={'twitter'} size={25} color={'#00acee'} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.shareToWhatsApp(msg)}>
                  <View style={styles.cardS}>
                    <Icon name={'whatsapp'} size={25} color={'#43D854'} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.onShare()}>
                  <View style={styles.cardS}>
                    <Icon name={'share-alt'} size={25} color={'#000000'} />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', paddingVertical: 10 }}>OR</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular' }}>Share your personal invite code</Text>
              <Text style={{ fontSize: 40, fontFamily: 'Poppins-Regular', color: '#00acee', paddingVertical: 15 }}>{ConstantValues.customerRefferalCode == '' ? this.state.referralCode : ConstantValues.customerRefferalCode}</Text>

              <CustomButtonShort
                style={{ backgroundColor: this.state.backgroundColor }}
                onPress={() => this.writeToClipboard()}
                title={this.state.copyMsg}
              />

              <CustomButton
                onPress={() => this.inviteSms(msg)}
                title='Invite Using SMS'
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
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    paddingVertical: 10,
    paddingHorizontal: 10
  },
})