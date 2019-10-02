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
import Modal from "react-native-modal";
import CodeInput from 'react-native-confirmation-code-input';
import searchApi from '../mainactivity/searchApi.js';

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
      isVisible:true,
      visibleModalLogin:null,
      enterPnrmodal:'',
      mobile:'',
      customerCode: '',
      ButtonStateHolder: true,  //on state ture it will disable the button
      backgroundColor: '#9c9595',
      modalRegister:null,
      stationInfo:[]
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
  
 async getdetailpnr(pnr){
   try {
    let response = await searchApi.searchBy(pnr);
    if (response.status == true) {
      ConstantValues.pnr = pnr
      ConstantValues.seat = response.data.seatInfo.berth
      ConstantValues.coach = response.data.seatInfo.coach
      console.log('ConstantValues.trainNumber : ' + ConstantValues.trainNumber + '\n' + 'response.data.trainDetails.trainNumber : ' + response.data.trainDetails.trainNumber + '\n' + 'ConstantValues.seat : ' + ConstantValues.seat + 'ConstantValues.coach : ' + ConstantValues.coach)
      if(response.data.trainDetails.trainNumber == ConstantValues.trainNumber){
        this.setState({
          isVisible:false,
          visibleModalLogin: null,
          enterPnr: this.state.enterPnrmodal,
          name:ConstantValues.customerName,
          altMobileNo:ConstantValues.customeralternateMobile,
          emailId:ConstantValues.customerEmailId,
          enterPnr:ConstantValues.pnr,
          stationInfo:response.data.trainRoutes
        })
        this.state.stationInfo.map((item)=>{
          if (ConstantValues.stationId == item.stationId) {
            ConstantValues.deliveryDate = item.arrDate
            ConstantValues.deliveryTime = item.arrival
          }
        })
      }else{
        return(
          Alert.alert(
            'Train No. and Enter PNR detail Mismatch',
            'Enter PNR Again!!',
              [
                {
                  text: 'OK',onPress: () => {this.setState({visibleModalLogin: 'bottom'})},
                  style: 'cancel'
                },
              ],
              { cancelable: false },
            )
        )
      }
    } else {
      console.log('error found in pnr')
    }
   } catch (error) {
      console.log('Data received in passengerDetail.js catch: ' + error)
   }
 }
  checkPassengerDetail = () => {
    if (ConstantValues.pnr == '' && this.state.enterPnr == '') {
     console.log('Customer id :' + ConstantValues.customerId + 'PNR :'+ConstantValues.pnr)
      {
        return (
          Alert.alert(
          'Alert!!',
          'Need PNR',
            [
              {
                text: 'OK',onPress: () => { ConstantValues.pnr == '' && this.state.enterPnr == '' ? this.setState({visibleModalLogin: 'bottom'}): this.setState({pnrEditable: false})},
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      }
    } else {
      this.setState({
        enterPnr:ConstantValues.pnr,
        name:ConstantValues.customerName,
        altMobileNo:ConstantValues.customeralternateMobile,
        emailId:ConstantValues.customerEmailId,   
        isVisible:false
      })
    }
  }
  proceedToPay = () => {
    this.savePassengerDetail()
    ConstantValues.customeralternateMobile = this.state.altMobileNo
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
  EnableButtonFunction = () => {
    this.setState({
      // On State false it will enable the button.
      ButtonStateHolder: false,
      backgroundColor: '#FF5819'
    })
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
              <View style={{ width: Dimensions.get('window').width, paddingVertical: 10, paddingHorizontal: 15 ,justifyContent:'center'}}>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Contact No - {ConstantValues.customerPhoneNo}</Text>
              </View>
              <View style={{ paddingVertical:10 }}>
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
              <View style={{ paddingVertical:10 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder='Passenger`s Email Id.'
                    editable={true}
                    keyboardType='email-address'
                    value={ConstantValues.customerEmailId}
                    autoCapitalize='none'
                    onChangeText={emailId => this.setState({ emailId })}
                  />
                </View>
              </View>
              <View style={{ paddingVertical:10 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', }}
                    placeholder='Any request for the resturent? Please write here'
                    editable={true}
                    //keyboardType='default'
                    numberOfLines={4}
                    multiline={true}
                    maxLength={200}
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
          style={{ backgroundColor: '#60b246', alignSelf: 'center', marginBottom: 20, }}
          onPress={() => this.proceedToPay()}
          title='Proceed To Pay'
        />



        <Modal
           isVisible={this.state.visibleModalLogin === 'bottom'}
           onBackButtonPress={() => this.props.navigation.navigate('Cart')}
          //  onSwipeComplete={() => this.setState({ visibleModal: null })}
          //  swipeDirection={['left', 'right', 'down']}
           style={styles.bottomModal}
        >
          <View style={styles.modalView}>
          <Text style={{ fontSize: 20,paddingTop: 10,color: '#000000',textAlign: 'center',fontFamily: 'Poppins-Regular'}}> Enter PNR</Text>
          <View style={styles.inputViewmodal}>
            <TextInput style={styles.inputmodal}
              placeholder="Enter PNR"
              keyboardType='number-pad'
              maxLength={10}
              onChangeText={enterPnrmodal => this.setState({ enterPnrmodal })}
              value={this.state.enterPnrmodal}
            />
          </View>
          <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
            <CustomButton
              title="Submit"
                onPress={
                () => {
                  if (this.state.enterPnrmodal != '' && this.state.enterPnrmodal.length == 10) {
                    return(
                      this.getdetailpnr(this.state.enterPnrmodal)
                    )
                  }
                    else {
                      return (
                        ToastAndroid.show('Please Enter Valid PNR', ToastAndroid.CENTER),
                        console.log(' invalid pnr')
                      )
                    }
                  }
                }
                  
                  
               
              style={{ backgroundColor: '#FF5819', justifyContent: 'center', }}
             

            />
            </View>
          </View>

        </Modal>

      


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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  inputView: {
    marginLeft: 5,
    width: Dimensions.get('window').width,
    borderRadius: 5,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    
  },
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  input: {
    fontSize: 15,
    color: '#000000',
    width: Dimensions.get('window').width - 50,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center'
  },
  modalView: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#ffffff',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5
  },
  inputViewmodal: {
    borderRadius: 5,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 30
  },
  inputmodal: {
    fontSize: 15,
    width: Dimensions.get('window').width - 120,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    alignItems: 'center'
  },
  text: {
    width: 50,
    height: 50,
    fontSize: 20,
    backgroundColor:'#d9dedd',
    borderWidth: 1.5,
    color: '#000000',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
  },
});
