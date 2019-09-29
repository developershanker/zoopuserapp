import React, { Component } from 'react';
import { View,Alert, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomButton } from '../assests/customButtonLarge.js';
// import { TextInput } from '../assests/TextInput.js';
import ConstantValues from '../constantValues.js';
import { Fade } from '../assests/fade.js';
import { CheckBox } from 'react-native-elements';
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';

export default class passengerDetail extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.checkPassengerDetail();
    // this.getSeatInfo()
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //  date : date + '/' + month + '/' + year,
      date: year + '-' + month + '-' + date,
      time: hours + ':' + min + ':' + sec
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      enterPnr: '',
      pnrEditable: true,
      altMobileNo: '',
      name: '',
      emailId: '',
      addMessage: '',
      skipSms: false,
      skipIrctc: false,
      skipPnr: false,
      date: '',
      time: '',
      isVisible:true
    };
  }

  skipSms = () => {
    this.setState({
      skipSms: !this.state.skipSms
    })
  }
  skipIrctc = () => {
    this.setState({
      skipIrctc: !this.state.skipIrctc
    })
  }
  skipPnr = () => {
    this.setState({
      skipPnr: !this.state.skipPnr
    })
  }
  // getSeatInfo = () => {
  //   if (ConstantValues.seatInfo.length != 0) {
  //     return (
  //       ConstantValues.seatInfo.map((item) => {
  //         ConstantValues.seat = item.berth
  //         ConstantValues.coach = item.coach
  //       }
  //       )
  //     )
  //   } else {
  //     return (
  //       ToastAndroid.showWithGravity('Enter PNR', ToastAndroid.BOTTOM)
  //     )
  //   }
  // }
  checkPassengerDetail = () => {
    if (ConstantValues.pnr == '' || ConstantValues.customerId == '') {
     console.log('Customer id :' + ConstantValues.customerId + 'PNR :'+ConstantValues.pnr)
      {
        return (
          Alert.alert(
          'Alert!!',
          ConstantValues.customerId == '' ? 'Need Login!!' : 'Need PNR',
            [
              {
                text: 'OK',onPress: () => this.props.navigation.navigate('Search'),
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      }
    } else {
      this.setState({
        name:ConstantValues.customerName,
        altMobileNo:ConstantValues.customeralternateMobile,
        emailId:ConstantValues.customerEmailId,   
        isVisible:false
      })
    }
  }
  proceedToPay = () => {
    this.savePassengerDetail()
    {
      this.props.navigation.navigate('PaymentPage'),
        { altMobileNo: this.state.altMobileNo }
    }
  }

  savePassengerDetail = () => {
    ConstantValues.orderDate = this.state.date
    ConstantValues.orderTime = this.state.time
    ConstantValues.passengerDetail = {
      'pnr': ConstantValues.pnr,
      'berth': ConstantValues.seat,
      'coach': ConstantValues.coach,
      'eta': ConstantValues.eta,
      'deliveryDate': ConstantValues.deliveryDate,
      'deliveryTime': ConstantValues.deliveryTime,
      'trainId': ConstantValues.trainId,
      //  'orderDate' : ConstantValues.orderDate,
      //  'orderTime' : ConstantValues.orderTime,
      'stationId': ConstantValues.stationId,
      'stationCode': ConstantValues.stationCode,
      //'stationName' : ConstantValues.stationName,
      'passengerName': ConstantValues.customerName,
      'passengerMobile': ConstantValues.customerPhoneNo,
      'passengeAlternateMobile': ConstantValues.customeralternateMobile,
      'passengerEmail': ConstantValues.customerEmailId,
      'suggestions': ConstantValues.suggestions = this.state.addMessage
    }
  }




  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 20, color: '#000000' }}> Add Passenger Detail </Text>
              </View>
            </View>
            {/* header view ends */}
            {/* Input view starts */}
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Enter PNR'
                  editable={this.state.pnrEditable}
                  value={ConstantValues.searchString.length == 10 ? ConstantValues.searchString : this.state.enterPnr}
                  keyboardType='number-pad'
                  maxLength={10}
                  onChangeText={enterPnr => this.setState({ enterPnr })}
                />
              </View>

              <View style={{ width: Dimensions.get('window').width, paddingVertical: 15, paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Seat - {ConstantValues.seat}</Text>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Coach - {ConstantValues.coach}</Text>
                </View>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Station - {ConstantValues.stationName}</Text>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Expected Date & Time of Delivery - {ConstantValues.eta}</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Passenger`s name'
                  editable={true}
                  keyboardType='default'
                  value={this.state.name}
                  autoCapitalize='characters'
                  onChangeText={name => this.setState({ name })}
                />
              </View>
              <View style={{ width: Dimensions.get('window').width, paddingVertical: 10, paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Contact No - {ConstantValues.customerPhoneNo}</Text>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder='Passenger`s Alt. Contact No.'
                    editable={true}
                    keyboardType='number-pad'
                    value={this.state.altMobileNo}
                    autoCapitalize='none'
                    onChangeText={altMobileNo => this.setState({ altMobileNo })}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder='Passenger`s Email Id.'
                    editable={true}
                    keyboardType='email-address'
                    value={this.state.emailId}
                    autoCapitalize='none'
                    onChangeText={emailId => this.setState({ emailId })}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', }}
                    placeholder='Any request for the resturent? Please write here'
                    editable={true}
                    //keyboardType='default'
                    autoCapitalize='sentences'
                    onChangeText={addMessage => this.setState({ addMessage })}
                  />
                </View>
              </View>
            </View>
            <View>
              <Fade visible={ConstantValues.isAgent == 1 ? true : false}>
                <CheckBox
                  title='Skip SMS'
                  checked={this.state.skipSms}
                  onPress={() => {
                    this.skipSms()
                  }}
                />
                <CheckBox
                  title='Skip IRCTC'
                  checked={this.state.skipIrctc}
                  onPress={() => {
                    this.skipIrctc()
                  }}
                />
                <CheckBox
                  title='Skip PNR'
                  checked={this.state.skipPnr}
                  onPress={() => {
                    this.skipPnr()
                  }}
                />
              </Fade>
            </View>
          </View>
        </ScrollView>
        <CustomButton
          style={{ backgroundColor: '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
          onPress={() => this.proceedToPay()}
          title='Proceed To Pay'
        />
         <Overlay
          isVisible={this.state.isVisible}
          width="auto"
          height="auto"
          // windowBackgroundColor='rgba(255, 255, 255, .5)'
          // overlayBackgroundColor='#ffffff'
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <ZoopLoader isVisible={true} text={'Loading...'} />

        </Overlay>

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
  inputView: {
    marginLeft: 5,
    width: Dimensions.get('window').width,
    borderRadius: 5,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    
  },
  input: {
    fontSize: 20,
    color: '#000000',
    width: Dimensions.get('window').width - 50,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center'
  },
});
