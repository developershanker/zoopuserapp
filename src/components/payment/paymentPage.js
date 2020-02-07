import React, { Component } from 'react';
import { View, Picker, ToastAndroid, Text, Image, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, TouchableOpacity, Alert, CheckBox, FlatList, TouchableWithoutFeedback } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import IconZ from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/FontAwesome5';
import { CustomButton } from '../assests/customButtonLarge.js';
import { CustomTextInput } from '../assests/customTextInput.js';
import ConstantValues from '../constantValues.js';
import BillDetailCard from '../cart/billDetailCard.js';
import { RadioButton } from 'react-native-paper';
import { Fade } from '../assests/fade.js';
import orderApi from '../orderBooking/orderApi.js';
import paymentApi from '../payment/paymentApi.js';
import { Overlay } from 'react-native-elements';
import { ZoopLoader } from '../assests/zoopLoader.js';
import cartApi from '../cart/cartApi.js';
import Modal from "react-native-modal";
import { CustomButtonShort } from '../assests/customButtonShort.js';
import Colors from '../colors.js';

export default class PaymentPage extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getPaymentInfo()

  }
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      codActive: false,
      checked: false,
      clicked: false,
      paymentTypes: [],
      revisedPaymentTypes: [],
      visibleModal: null,
      paymentTypeName: 'Prepaid',
      paymentTypeId: 2,
      paymentBorderColor: '#000000',
      isVisible: true,
      indexChecked: '2'
      // backgroundColor : ''
    };
  }
  async orderBooking(paymentType) {
    this.setState({ clicked: true })
    try {
      let response = await orderApi.orderBooking();
      if (response.status == true) {
        ConstantValues.zoopOrderId = response.data.orderId
        ConstantValues.zooptransactionId = response.data.zoopTransactionNo
        if (paymentType == 2) {
          return (
            ToastAndroid.show('Requesting payment, please wait...', ToastAndroid.LONG),
            this.props.navigation.navigate('PaymentPaytm')
          )
        } else if (paymentType == 1) {
          return (
            ToastAndroid.show('Requesting IRCTC , please wait...', ToastAndroid.LONG),
            this.props.navigation.navigate('IrctcConfirmationCod')
          )
        }

      } else {
        return (
          Alert.alert(
            'Alert!!',
            response.error,
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
      }
    } catch (error) {
      console.log('Data received in paymentPage.js catch: ' + error)
      return (
        Alert.alert(
          'Alert!!',
          'Something went wrong... Please try again later.',
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
    }
  }
  async getPaymentInfo() {
    try {
      let response = await paymentApi.paymentTypes();
      if (response.status == true) {
        this.setState({
          paymentTypes: response.data,
        })
        if (ConstantValues.isAgent === 0) {
          this.limitCod(response.data)
        } else {
          this.setState({
            paymentTypes: response.data,
            isVisible: false
          })
        }
        console.log('Data received in paymentPage.js response: ' + JSON.stringify(this.state.paymentTypes))
      } else {
        ToastAndroid.show('Oops!! Something went wrong!!', ToastAndroid.LONG)
      }
    } catch (error) {
      console.log('Data received in paymentPage.js catch: ' + error)
    }
  }

  limitCod(response) {
    if (ConstantValues.totalPayableAmount >= 500) {
      //eliminating COD
      this.setState({
        revisedPaymentTypes: this.state.paymentTypes.filter((item) => {
          return item.paymentTypeId != 1
        })
      })
      this.setState({
        paymentTypes: this.state.revisedPaymentTypes,
        isVisible: false
      })
    } else {
      //all payment Shown
      this.setState({
        paymentTypes: response,
        isVisible: false
      })
    }
  }

  setPaymentInfo = (item, index) => {

    this.setState({
      paymentTypeName: item.paymentTypeName,
      paymentTypeId: item.paymentTypeId,
      // paymentBorderColor:'#f15926'
      indexChecked: item.paymentTypeId.toString()
    })
    //removing discounts
    if (ConstantValues.isAgent === 0) {
      console.log('this.state.paymentTypeId : ' + item.paymentTypeId)
      // this.codActions()
      if (item.paymentTypeId === 1 && ConstantValues.discount !== 0) {
        console.log('this.state.paymentTypeId [in codAction] : ' + item.paymentTypeId)
        this.setState({ visibleModal: 'center' })
      } else {
        console.log('running from else.....')
      }
    } else {
      console.log('running from else..........')
    }
    // return(
    //   ToastAndroid.show('You selected method : ' + item.paymentTypeName ,ToastAndroid.LONG)
    // ),
    console.log('paymentTypeName : ' + this.state.paymentTypeName + '\n' + 'paymentTypeId :' + this.state.paymentTypeId),
      console.log('item.paymentTypeName : ' + item.paymentTypeName + '\n' + 'item.paymentTypeId :' + item.paymentTypeId)
  }

  removeOffer = () => {
    ConstantValues.walletBalanceUsed = 0
    ConstantValues.couponCode = ''
    ConstantValues.couponValue = 0
    ConstantValues.couponType = ''
    ConstantValues.couponId = 0
    ConstantValues.discount = 0
    ConstantValues.rateDiscount = 0
    ConstantValues.minimumPriceRequired = 0
    ConstantValues.isCouponApplied = false
    ConstantValues.appliedCode = 'Apply Coupon Code'
    cartApi.billDetail()
    console.log('offer removed')
    this.setState({ visibleModal: null })
  }

  paymentDetails = () => {
    //this.setState({ clicked: true })
    if (this.state.checked == true) {
      if (this.state.paymentTypeId == 1 || this.state.paymentTypeId == 2) {
        ConstantValues.paymentType = this.state.paymentTypeName,
          ConstantValues.paymentTypeId = this.state.paymentTypeId,
          ConstantValues.refNo = '',
          ConstantValues.paymentDetails = {
            'referenceNo': ConstantValues.refNo,
            'paymentType': ConstantValues.paymentType,
            'paymentTypeId': ConstantValues.paymentTypeId
          }
        if (ConstantValues.pnr != '' && ConstantValues.pnr.length === 10) {
          if (ConstantValues.deliveryDate !== '' && ConstantValues.deliveryTime !== '') {
            if (ConstantValues.customerPhoneNo !== '' && ConstantValues.customerPhoneNo.length === 10) {
              console.log('going for order ---->' + '\n' + ConstantValues.pnr + '\n' + "::::" + ConstantValues.deliveryDate + '\n' + "::::" + ConstantValues.deliveryTime)
              this.orderBooking(ConstantValues.paymentTypeId)
              console.log('//////////////Order Booked/////////////////' + 'ConstantValues.paymentTypeId::::' + ConstantValues.paymentTypeId + '\n' + 'ConstantValues.paymentType::::' + ConstantValues.paymentType)
            } else {
              console.log('going for order :error in date and time:' + ConstantValues.pnr + '\n' + "::::" + ConstantValues.deliveryDate + '\n' + "::::" + ConstantValues.deliveryTime)
              return (
                Alert.alert(
                  'Mandatory Field Alert!!',
                  'Oops !! Mandatory Field missing. Please try again.',
                  [
                    {
                      text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                      style: 'cancel'
                    },
                  ],
                  { cancelable: false },
                )
              )
            }
          } else {
            console.log('going for order :error in date and time:' + ConstantValues.pnr + '\n' + "::::" + ConstantValues.deliveryDate + '\n' + "::::" + ConstantValues.deliveryTime)
            return (
              Alert.alert(
                'Mandatory Field Alert!!',
                'Oops !! Mandatory Field missing. Please try again.',
                [
                  {
                    text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                    style: 'cancel'
                  },
                ],
                { cancelable: false },
              )
            )
          }
        } else {
          console.log('going for order :error in pnr:' + ConstantValues.pnr + '\n' + "::::" + ConstantValues.deliveryDate + '\n' + "::::" + ConstantValues.deliveryTime)
          return (
            Alert.alert(
              'Mandatory Field Alert!!',
              'Oops !! Mandatory Field missing. Please try again.',
              [
                {
                  text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                  style: 'cancel'
                },
              ],
              { cancelable: false },
            )
          )
        }
      } else {
        return (
          ToastAndroid.show('Please select any payment method!!', ToastAndroid.LONG)
        ),
          console.log('paymentTypeName : ' + this.state.paymentTypeName + '\n' + 'paymentTypeId :' + this.state.paymentTypeId)
      }
    } else {
      return (
        ToastAndroid.show('Please accept Terms & Conditions to proceed', ToastAndroid.SHORT)
      )
    }
  }

  checkValidation = () => {
    if (ConstantValues.isAgent === 0) { //user/agent validation
      console.log('this.state.paymentTypeId : ' + this.state.paymentTypeId)
      if (this.state.paymentTypeId === 1 && ConstantValues.discount !== 0) { //COD && discount value validation
        console.log('this.state.paymentTypeId [in codAction] : ' + this.state.paymentTypeId)
        this.setState({ visibleModal: 'center' })
      } else {
        this.paymentDetails()
      }
    } else {
      this.paymentDetails()
    }
  }


  render() {
    const { navigation } = this.props;
    const altMobileNo = navigation.getParam('altMobileNo', '');

    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', width: ConstantValues.deviceWidth, backgroundColor: Colors.white, paddingVertical: 10 }}>
              <TouchableOpacity style={{ width: '10%', backgroundColor: Colors.white, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('PassengerDetail')}>
                <IconA name={'arrowleft'} size={25} color={Colors.black} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: '90%', backgroundColor: Colors.white, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Regular', fontSize: 18, color: Colors.newOrange }}> Payment Details </Text>
              </View>
            </View>
            {/* header view ends */}
            <View>
              <View>
                <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', width: ConstantValues.deviceWidth }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', color: '#000000', marginLeft: '2%', width: '96%' }}>Bill Details</Text>
                  {/* <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} /> */}
                </View>
                <View
                  style={styles.billcard}
                >
                  <View>
                    {/* <Text style={{fontSize:15,fontWeight:'bold',padding:5}}></Text> */}
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Item Total</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.totalBasePrice}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>+ GST on food</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.gst).toFixed(2)}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>+ Delivery Charge (Inc. GST)</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.deliveryCharge}</Text>
                    </View>
                    {/* <View style={styles.tile}>
                      <Text style={styles.tiletext}>Add GST 18%</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {Math.round(ConstantValues.deliveryChargegst)}</Text>
                    </View> */}
                    {/* <View style={styles.tile}>
                      <Text style={styles.tiletext}>(-) Discounts  </Text>
                      <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {ConstantValues.couponValue}</Text>
                    </View> */}
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>(-) Discounts  </Text>
                      <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {ConstantValues.discount}</Text>
                    </View>
                    {/* <View style={styles.tile}>
                      <Text style={styles.tiletext}>Wallet Balance Used</Text>
                      <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {ConstantValues.walletBalanceUsed}</Text>
                    </View> */}


                    <View style={styles.tile}>
                      <Text style={[styles.tiletext, { fontFamily: 'Poppins-Medium', fontSize: 16 }]}>Order Total</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name={'rupee'} size={20} color={'#000000'} />
                        <Text style={[styles.tiletext, { fontFamily: 'Poppins-Medium', fontSize: 16 }]}> {(ConstantValues.totalPayableAmount).toFixed(2)}</Text>
                      </View>
                    </View>

                  </View>
                </View>
              </View>
            </View>
            {/* passengerDetail view begin here */}
            <View style={{ width: Dimensions.get('window').width - 10, flexDirection: 'row', }}>
              <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', color: '#000000', marginLeft: '2%', width: '96%' }}>Passenger Details</Text>
              {/* <Image style={{ height: 15, alignSelf: 'center' }} source={require('../images/line.png')} /> */}
            </View>
            <View style={styles.billcard}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '98%' }}>
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 5, paddingVertical: 2 }}>Coach : {ConstantValues.coach}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 5, paddingVertical: 2 }}>Seat : {ConstantValues.seat}</Text>
              </View> */}
              <View style={{ flexDirection: 'column', width: '98%' }}>
                <View style={styles.elementView}>
                  <Text style={styles.itemTextMedium}>Coach / Seat </Text>
                  <Text style={styles.itemTextColon}>:</Text>
                  <Text style={styles.itemTextRegular}>{ConstantValues.coach} / {ConstantValues.seat}</Text>
                </View>
                <View style={styles.elementView}>
                  <Text style={styles.itemTextMedium}>Name </Text>
                  <Text style={styles.itemTextColon}>:</Text>
                  <Text style={styles.itemTextRegular}>{ConstantValues.customerName}</Text>
                </View>
                <View style={styles.elementView}>
                  <Text style={styles.itemTextMedium}>Contact No. </Text>
                  <Text style={styles.itemTextColon}>:</Text>
                  <Text style={styles.itemTextRegular}>{ConstantValues.customerPhoneNo}</Text>
                </View>
                <View style={styles.elementView}>
                  <Text style={styles.itemTextMedium}>Alternate No.</Text>
                  <Text style={styles.itemTextColon}>:</Text>
                  <Text style={styles.itemTextRegular}>{ConstantValues.customeralternateMobile}</Text>
                </View>
                {/* <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 5, paddingVertical: 2 }}>Name : {ConstantValues.customerName}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 5, paddingVertical: 2 }}>Contact No : {ConstantValues.customerPhoneNo}</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 5, paddingVertical: 2 }}>Alternate No. : {ConstantValues.customeralternateMobile}</Text> */}
              </View>
            </View>
            {/* passengerDetail view ends here */}
            {/* Payment Mode View Starts */}
            <View>
              <View style={{ width: Dimensions.get('window').width - 10, alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular' }}>Choose Payment Mode</Text>
              </View>



              <FlatList
                data={this.state.paymentTypes}
                extraData={this.state}
                renderItem={({ item, index }) =>
                  <TouchableWithoutFeedback onPress={() => { this.setPaymentInfo(item, index) }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                      <View style={styles.paytmView}>
                        <Icons name={this.state.indexChecked === item.paymentTypeId.toString() ? 'check-square' : 'square'} size={20} color={'#000000'} style={{ width: 50, alignSelf: 'center' }} />
                        {/* <Text style={{ color: this.state.paymentBorderColor, fontSize: 15, fontFamily: 'Poppins-Regular' }}>{item.paymentTypeName == 'Prepaid' ? 'Pay through Paytm' : 'Cash On Delivery'}</Text> */}
                        {
                          item.paymentTypeId == 2 ? <Image source={require('../images/paytmImg.png')} style={{ width: '80%', height: 50 }} /> : <Text style={{ color: Colors.darkGrey, fontSize: 14, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>Cash On Delivery</Text>
                        }

                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                }
                keyExtractor={(item) => item.paymentTypeId.toString()}
              />


              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20 }}>
                <CheckBox
                  value={this.state.checked}
                  disabled={false}
                  onValueChange={checked => this.setState({ checked })}
                />
                <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-Regular' }}>I Agree to </Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('TermsActivity') }}>
                  <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-Regular', textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Payment Mode View Ends */}

          </View>
          <CustomButton
            disabled={this.state.clicked}
            textStyle={{ color: this.state.clicked == true ? Colors.darkGrey1 : Colors.white, }}
            style={{ backgroundColor: this.state.clicked == true ? Colors.white : Colors.newgGreen3, alignSelf: 'center', }}
            onPress={() => this.checkValidation()}
            title={this.state.clicked === false ? 'PROCEED TO PAY' : 'Please wait...'}
          />
        </ScrollView>
        {/* cod action view modal */}
        <KeyboardAvoidingView enabled>
          <Modal
            isVisible={this.state.visibleModal === 'center'}
            onBackButtonPress={() => this.setState({ visibleModal: null })}
            // onSwipeComplete={() => this.setState({ visibleModal: null })}
            // swipeDirection={['left', 'right']}
            style={styles.centerModal}
          >
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={styles.tiletextH}>Confirm!!</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', paddingTop: 5, textAlign: 'center' }}>No discount will be applicable on </Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', textAlign: 'center' }}>Cash On Delivery.</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', paddingTop: 5, textAlign: 'center' }}>Press "OK" to proceed.</Text>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <CustomButtonShort
                  onPress={() => { this.setState({ visibleModal: null }), console.log('Cancel Pressed...') }}
                  title='Cancel'
                  style={{ alignSelf: 'center', backgroundColor: '#fff' }}
                  textStyle={{ color: '#9b9b9b' }} />
                <CustomButtonShort
                  onPress={() => this.removeOffer()}
                  title='OK'
                  style={{ alignSelf: 'center', backgroundColor: '#fff' }}
                  textStyle={{ color: Colors.newOrange }} />
              </View>
            </View>

          </Modal>
        </KeyboardAvoidingView>


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
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // marginLeft: 5,

  },
  radioButton: {
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 25 // justifyContent: 'space-between',
  },
  itemTextMedium: {
    width: '30%',
    // alignSelf: 'center',
    color: Colors.black,
    // backgroundColor:Colors.lightGrey,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  itemTextColon: {
    width: '4%',
    // alignSelf: 'center',
    color: Colors.black,
    // backgroundColor:Colors.lightYellow,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  itemTextRegular: {
    width: '65%',
    textAlign: 'left',
    // alignSelf: 'center',
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    // backgroundColor:Colors.lightGrey,
    fontSize: 14,
  },
  paytmView: {
    width: 300,
    // borderWidth:1,
    // borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    // paddingVertical: 10,
    // paddingHorizontal: 5
  },
  centerModal: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  iconChecked: {
    marginRight: 20
  },
  billcard: {
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
  elementView: {
    flexDirection: 'row',
    width: ConstantValues.deviceWidth - 40,
    // height: '12%',
    // backgroundColor:'#e7e7e7',
    alignSelf: 'center',
    alignContent: 'flex-start',
  },
  tile: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  tiletext: {
    fontFamily: 'Poppins-Regular',
    color: '#000000'
  },
  modalView: {
    width: Dimensions.get('screen').width - 20,
    height: 170,
    backgroundColor: '#ffffff',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5,
    borderBottomStartRadius: 100 / 5,
    borderBottomEndRadius: 100 / 5
  },
  tiletextH: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 18
  },
});
