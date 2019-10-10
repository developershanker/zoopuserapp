import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
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
import searchApi from '../mainactivity/searchApi.js';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

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
      time: hours + ':' + min + ':' + sec,
      journeyTime:moment(ConstantValues.ata, 'HHmmss').format('HH:mm')
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      enterPnr: '',
      pnrEditable: true,
      altMobileNo: '',
      name: '',
      emailId: 'care@zoopindia.com',
      customerPhoneNo:'',
      addMessage: '',
      skipSms: false,
      skipIrctc: false,
      skipPnr: false,
      date: '',
      time: '',
      isVisible: true,
      visibleModalLogin: null,
      enterSeatInfo: null,
      journeyDate:'',
      journeyTime:'',
      seatNo: '',
      coach: '',
      enterPnrmodal: '',
      mobile: '',
      customerCode: '',
      ButtonStateHolder: true,  //on state ture it will disable the button
      backgroundColor: '#9c9595',
      modalRegister: null,
      stationInfo: []
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

  async checkPnrForAgent(pnr){
    try {
      let response = await searchApi.searchBy(pnr);
      if (response.status == true) {
        ConstantValues.pnr = pnr
        ConstantValues.seat = response.data.seatInfo.berth
        ConstantValues.coach = response.data.seatInfo.coach  
        if (response.data.trainDetails.trainNumber == ConstantValues.trainNumber) {
          this.setState({
            isVisible: false,
            visibleModalLogin: null,
            enterPnr: this.state.enterPnrmodal,
          })
        }else{
          return (
            Alert.alert(
              'Train No. and Enter PNR detail Mismatch',
              'Oops !! This PNR is of a different route. Kindly search restaurants again with PNR.',
              [
                {
                  text: 'OK', onPress: () => { this.setState({ visibleModalLogin: 'bottom' }) },
                  style: 'cancel'
                },
              ],
              { cancelable: false },
            )
          )
        }

              
      } else {
        console.log('Invalid Pnr')
        this.setState({ visibleModalLogin: null })
        return(
          Alert.alert(
            'Wrong PNR',
            'Do you want to continue to fill the details?',
          
            [
              {
                text: 'NO',
                onPress: () => this.setState({ visibleModalLogin: 'bottom' }),
                style: 'cancel',
              },
              {
                text: 'YES', onPress: () => {
                  this.setState({
                    isVisible: false,
                    visibleModalLogin: null,
                    enterSeatInfo :'bottom'
                  })
                  ConstantValues.pnr = this.state.enterPnr
                }
              },
            ],
            { cancelable: false },
          )
        )
      }
    } catch (error) {
      console.log('Data received in passengerDetail.js catch: ' + error)
    }
  }

  async getdetailpnr(pnr) {
    try {
      let response = await searchApi.searchBy(pnr);
      if (response.status == true) {
        ConstantValues.pnr = pnr
        ConstantValues.seat = response.data.seatInfo.berth
        ConstantValues.coach = response.data.seatInfo.coach
        console.log('ConstantValues.trainNumber : ' + ConstantValues.trainNumber + '\n' + 'response.data.trainDetails.trainNumber : ' + response.data.trainDetails.trainNumber + '\n' + 'ConstantValues.seat : ' + ConstantValues.seat + 'ConstantValues.coach : ' + ConstantValues.coach)
        //checking train number
        if (response.data.trainDetails.trainNumber == ConstantValues.trainNumber) {
          this.setState({
            isVisible: false,
            visibleModalLogin: null,
            enterPnr: this.state.enterPnrmodal,
            name: ConstantValues.customerName,
            altMobileNo: ConstantValues.customeralternateMobile,
            emailId: ConstantValues.customerEmailId,
            // enterPnr: ConstantValues.pnr,
            stationInfo: response.data.trainRoutes
          })
          this.state.stationInfo.map((item) => {
            //checking station
            if (ConstantValues.stationId == item.stationId) {
              ConstantValues.deliveryDate = item.arrDate
              ConstantValues.deliveryTime = item.arrival
              ConstantValues.dateOfOrder = this.state.date
              ConstantValues.timeOfOrder = this.state.time
              
              console.log('ConstantValues.deliveryDate : ' + ConstantValues.deliveryDate + '\n' +
               'ConstantValues.deliveryTime : ' + ConstantValues.deliveryTime + '\n' + 
               'ConstantValues.cuttoff : ' + ConstantValues.cuttoff + '\n' + 
               'ConstantValues.openTime : ' + ConstantValues.openTime  + '\n' +
               'ConstantValues.closeTime : ' +  ConstantValues.closeTime  + '\n' +
               'ConstantValues.weeklyOff : ' + ConstantValues.weeklyOff + '\n' +
               'ConstantValues.dateOfOrder : '+ConstantValues.dateOfOrder+ '\n' +
               'ConstantValues.timeOfOrder : ' + ConstantValues.timeOfOrder 
               )
            }
          })
        } else {
          return (
            Alert.alert(
              'Train No. and Enter PNR detail Mismatch',
              'Oops !! This PNR is of a different route. Kindly search restaurants again with PNR.',
              [
                {
                  text: 'Search Again',
                  onPress: () => this.props.navigation.navigate('Search'),
                  style: 'cancel',
                },
                {
                  text: 'OK', onPress: () => { this.setState({ visibleModalLogin: 'bottom' }) },
                  style: 'cancel'
                }
              ],
              { cancelable: false },
            )
          )
        }
      } else {
        console.log('error found in pnr')
        return (
          Alert.alert(
            'Invalid PNR',
            'Oops !! This PNR invalid. Enter correct PNR!!',
            [
              {
                text: 'Search Again',
                onPress: () => this.props.navigation.navigate('Search'),
                style: 'cancel',
              },
              {
                text: 'OK', onPress: () => { this.setState({ visibleModalLogin: 'bottom' }) },
                style: 'cancel'
              }
            ],
            { cancelable: false },
          )
        )
      
      }
    } catch (error) {
      console.log('Data received in passengerDetail.js catch: ' + error)
    }
  }



  checkPassengerDetail = () => {
    if (ConstantValues.pnr == '' && this.state.enterPnr == '') {
      console.log('Customer id :' + ConstantValues.customerId + 'PNR :' + ConstantValues.pnr)
      this.setState({
        isVisible: false,
      })
      {
        return (
          Alert.alert(
            'Alert!!',
            'Need PNR',
            [
              {
                text: 'OK', onPress: () => { ConstantValues.pnr == '' && this.state.enterPnr == '' ? this.setState({ visibleModalLogin: 'bottom' }) : this.setState({ pnrEditable: false }) },
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      }
    } else {
      if (ConstantValues.isAgent == 1) {
        this.setState({
          enterPnr: ConstantValues.pnr,
          name: this.state.name,
          altMobileNo: this.state.altMobileNo,
          emailId: this.state.emailId,
          customerPhoneNo:this.state.customerPhoneNo,
          isVisible: false
        })
      } else {
        this.setState({
          enterPnr: ConstantValues.pnr,
          name: ConstantValues.customerName,
          altMobileNo: ConstantValues.customeralternateMobile,
          emailId: ConstantValues.customerEmailId,
          customerPhoneNo:ConstantValues.customerPhoneNo,
          isVisible: false
        })
      }
     

    }
  }
  proceedToPay = () => {
    // ConstantValues.customerName = this.state.name,
    // ConstantValues.customeralternateMobile = this.state.altMobileNo,
    // ConstantValues.customerEmailId = this.state.emailId,
    // ConstantValues.customerPhoneNo = this.state.customerPhoneNo
    if (ConstantValues.isAgent == 1) {
      if (this.state.name.length == 0 || this.state.customerPhoneNo.length == 0) {
        return(
          ToastAndroid.show('Please fill name & contact',ToastAndroid.LONG)
        )
      } else {
        this.agentAction()
        this.savePassengerDetail()
        {
          this.props.navigation.navigate('PaymentPage'),
            { altMobileNo: this.state.altMobileNo }
        }
      }
    } else {
      if (this.state.name.length == 0) {
        return(
          ToastAndroid.show('Please fill name',ToastAndroid.LONG)
        )
      } else {
        this.agentAction()
      this.savePassengerDetail()
      {
        this.props.navigation.navigate('PaymentPage'),
          { altMobileNo: this.state.altMobileNo }
      }
      }
      
    }
    
   
   
  }

  agentAction = () => {
    console.log('Status of skipSms : ' + this.state.skipSms + '\n' + 'Status of skipIrctc : ' + this.state.skipIrctc + '\n' + 'Status of skipPnr : ' + this.state.skipPnr)
    if (ConstantValues.isAgent == 1) {
      if (this.state.skipSms == true) {
        ConstantValues.skipSms = 1
      }
      if (this.state.skipIrctc == true) {
        ConstantValues.skipIrctc = 1
      }
      if(this.state.skipPnr == true){
        ConstantValues.skipPnr = 1
      }
      
    }
    ConstantValues.agentAction = {
      'skipSms' : ConstantValues.skipSms,
      'skipIrctc' : ConstantValues.skipIrctc,
      'skipPnr' : ConstantValues.skipPnr
    }
  }

  savePassengerDetail = () => {
    ConstantValues.orderDate = this.state.date
    ConstantValues.orderTime = this.state.time

    ConstantValues.pnr = this.state.enterPnr
    ConstantValues.customerName = this.state.name,
    ConstantValues.customeralternateMobile = this.state.altMobileNo,
    ConstantValues.customerEmailId = this.state.emailId
    if (ConstantValues.isAgent == 1) {
      ConstantValues.customerPhoneNo = this.state.customerPhoneNo
    }
    
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
      'passengerSeatInfo': ConstantValues.passengerInfo,
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
                  editable={false}
                  value={ConstantValues.searchString.length == 10 ? ConstantValues.searchString : this.state.enterPnr}
                  keyboardType='number-pad'
                  maxLength={10}
                  onChangeText={enterPnr => this.setState({ enterPnr })}
                />
              </View>

              <Fade visible={ConstantValues.isAgent == 1}>
                
                  <TouchableOpacity onPress={()=>this.setState({ enterSeatInfo : 'bottom'}) }>
                  <View style={[styles.inputView,{marginTop: 10}]}>
                    <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular', color: '#F15926',textAlign:'center', paddingHorizontal: 10, paddingVertical: 5 }}>Change Coach and Seat Information</Text>
                  </View>
                  </TouchableOpacity>
               
              </Fade>


              <View style={[styles.billcard, { marginTop: 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Coach : {ConstantValues.coach}</Text>
                  <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Seat : {ConstantValues.seat}</Text>

                </View>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Station : {ConstantValues.stationName}</Text>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Expected Date & Time of Delivery : {ConstantValues.ata}</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Passenger name'
                  editable={true}
                  keyboardType='default'
                  value={this.state.name}
                  autoCapitalize='characters'
                  onChangeText={name => this.setState({ name })}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                {/* <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Contact No - {ConstantValues.customerPhoneNo}</Text> */}
                <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Passenger Contact No.'
                  editable={ConstantValues.isAgent == 1 ? true : false}
                  keyboardType='number-pad'
                  maxLength={10}
                  value={ConstantValues.isAgent == 1 ? this.state.customerPhoneNo : ConstantValues.customerPhoneNo }
                  
                  onChangeText={customerPhoneNo => this.setState({ customerPhoneNo })}
                />
              </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder='Passenger Alt. Contact No.'
                    editable={true}
                    maxLength={10}
                    keyboardType='number-pad'
                    value={this.state.altMobileNo}
                    autoCapitalize='none'
                    onChangeText={altMobileNo => this.setState({ altMobileNo })}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder='Passenger Email Id.'
                    editable={ConstantValues.isAgent == 1 ? true : false}
                    keyboardType='email-address'
                    value={ConstantValues.isAgent == 1 ? this.state.emailId : ConstantValues.customerEmailId }
                    autoCapitalize='none'
                    onChangeText={emailId => this.setState({ emailId })}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', }}
                    placeholder='Any request for the restaurant? Please write here..'
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
                  // onPress={() => {
                  //   this.skipSms()
                  // }}
                  onPress={() => this.setState({skipSms: !this.state.skipSms})}
                />
                <CheckBox
                  title='Skip IRCTC'
                  checked={this.state.skipIrctc}
                  // onPress={() => {
                  //   this.skipIrctc()
                  // }}
                  onPress={() => this.setState({skipIrctc: !this.state.skipIrctc})}
                />
                <CheckBox
                  title='Skip PNR'
                  checked={this.state.skipPnr}
                  onPress={() => this.setState({skipPnr: !this.state.skipPnr})}
                  // onPress={() => {
                  //   this.skipPnr()
                  // }}
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
          onBackButtonPress={() => this.state.visibleModalLogin === 'bottom'}
          //  onSwipeComplete={() => this.setState({ visibleModal: null })}
          //  swipeDirection={['left', 'right', 'down']}
          style={styles.bottomModal}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, paddingTop: 10, color: '#000000', textAlign: 'center', fontFamily: 'Poppins-Regular' }}> Enter PNR</Text>
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
                      if (ConstantValues.isAgent == 1) {
                        this.checkPnrForAgent(this.state.enterPnrmodal)
                      } else {
                          this.getdetailpnr(this.state.enterPnrmodal)
                      }
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


        <Modal
          isVisible={this.state.enterSeatInfo === 'bottom'}
          onBackButtonPress={() =>this.state.visibleModalLogin === 'bottom'}
          //  onSwipeComplete={() => this.setState({ visibleModal: null })}
          //  swipeDirection={['left', 'right', 'down']}
          style={styles.bottomModal}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 18, paddingTop: 10, color: '#000000', textAlign: 'center', fontFamily: 'Poppins-Regular' }}> Enter Journey Information</Text>
            <View style={styles.inputViewmodal}>
              <TextInput style={styles.inputmodal}
                placeholder="Enter Seat No."
                keyboardType='number-pad'
                maxLength={4}
                onChangeText={seatNo => this.setState({ seatNo })}
                value={this.state.seatNo}
              />
            </View>
            <View style={styles.inputViewmodal}>
              <TextInput style={styles.inputmodal}
                placeholder="Enter Coach No."
                autoCapitalize='words'
                maxLength={4}
                onChangeText={coach => this.setState({ coach })}
                value={this.state.coach}
              />
            </View>

            <DatePicker
                style={{ width: Dimensions.get('window').width - 10 }}
                date={this.state.journeyDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Choose your journey date"
                format="DD-MM-YYYY"
                minDate="01-01-2016"
                maxDate="01-01-2030"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 10
                  },
                  dateInput: {
                    marginLeft: 65,
                    width: Dimensions.get('window').width - 10,
                    borderRadius: 5,
                    borderColor: '#e7e7e7',
                    borderWidth: 1,
                  },
                  dateText: {
                    fontSize: 15,
                    textAlign: 'center',
                    color: '#000000',

                    fontFamily: 'Poppins-Regular',
                  },
                  placeholderText: {
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#',
                    color: '#989c9a',
                    fontFamily: 'Poppins-Regular',
                  }
                }}
                onDateChange={(journeyDate) => { this.setState({ journeyDate: journeyDate }) }}
              />
               <DatePicker
                style={{ width: Dimensions.get('window').width - 10 }}
                date={this.state.journeyTime} //initial date from state
                mode="time" //The enum of date, datetime and time
                placeholder="Choose your journey time"
                // format="DD-MM-YYYY"
                // minDate="01-01-2016"
                // maxDate="01-01-2030"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 10
                  },
                  dateInput: {
                    marginLeft: 65,
                    width: Dimensions.get('window').width - 10,
                    borderRadius: 5,
                    borderColor: '#e7e7e7',
                    borderWidth: 1,
                  },
                  dateText: {
                    fontSize: 15,
                    textAlign: 'center',
                    color: '#000000',

                    fontFamily: 'Poppins-Regular',
                  },
                  placeholderText: {
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#',
                    color: '#989c9a',
                    fontFamily: 'Poppins-Regular',
                  }
                }}
                onDateChange={(journeyTime) => { this.setState({ journeyTime: journeyTime }) }}
              />

            <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
              <CustomButton
                title="Submit"
                onPress={
                  () => {
                    if (this.state.seatNo != '') {
                      if (this.state.coach != '') {
                        return (
                          this.setState({
                            isVisible: false,
                            enterSeatInfo: null,
                            enterPnr: this.state.enterPnrmodal,
                          }),
                          ConstantValues.seat = this.state.seatNo,
                          ConstantValues.coach = this.state.coach,
                          ConstantValues.deliveryDate = moment(this.state.journeyDate,'DD-MM-YYYY').format('YYYY-MM-DD'),
                          ConstantValues.deliveryTime = this.state.journeyTime
                          // ConstantValues.customerName = this.state.name,
                          // ConstantValues.customeralternateMobile = this.state.altMobileNo,
                          // ConstantValues.customerEmailId = this.state.emailId,
                          // ConstantValues.customerPhoneNo = this.state.customerPhoneNo
                        )
                      } else {
                        return (
                          ToastAndroid.show('Please Enter Valid Coach', ToastAndroid.CENTER),
                          console.log(' invalid coach')
                        )
                      }
                    }
                    else {
                      return (
                        ToastAndroid.show('Please Enter Valid Seat No.', ToastAndroid.CENTER),
                        console.log(' invalid seatNo')
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
    width: Dimensions.get('window').width - 10,
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
    backgroundColor: '#d9dedd',
    borderWidth: 1.5,
    color: '#000000',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
  },
  billcard: {
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 2,
  },
});
