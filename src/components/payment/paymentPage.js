import React, { Component } from 'react';
import { View, Picker, ToastAndroid, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert, CheckBox, FlatList, TouchableWithoutFeedback } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      checked: true,
      clicked: false,
      paymentTypes: [],
      revisedPaymentTypes:[],
      paymentTypeName: '',
      paymentTypeId: '',
      paymentBorderColor: '#000000',
      isVisible: true,
      indexChecked: '0'
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
    } catch (error) {
      console.log('Data received in paymentPage.js catch: ' + error)
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

  limitCod(response){
    if (ConstantValues.totalPayableAmount <= 1000) {
      //eliminating COD
      this.setState({
        revisedPaymentTypes : this.state.paymentTypes.filter((item)=>{
          return item.paymentTypeId != 1
        })
      })
      this.setState({
        paymentTypes:this.state.revisedPaymentTypes,
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
    // return(
    //   ToastAndroid.show('You selected method : ' + item.paymentTypeName ,ToastAndroid.LONG)
    // ),
    console.log('paymentTypeName : ' + this.state.paymentTypeName + '\n' + 'paymentTypeId :' + this.state.paymentTypeId),
      console.log('item.paymentTypeName : ' + item.paymentTypeName + '\n' + 'item.paymentTypeId :' + item.paymentTypeId)
  }

  removeOffer() {
    ConstantValues.walletBalanceUsed = 0
    ConstantValues.couponCode = ''
    ConstantValues.couponValue = 0
    ConstantValues.couponType = ''
    ConstantValues.couponId = 0
    ConstantValues.discount = 0
    ConstantValues.rateDiscount = 0
    ConstantValues.isCouponApplied = false
    ConstantValues.appliedCode = 'Apply Coupon Code'
    cartApi.billDetail()
    console.log('offer removed')
    console.log(
      ConstantValues.walletBalanceUsed, + '\n' + 
      ConstantValues.couponCode ,+ '\n' + 
      ConstantValues.couponValue ,+ '\n' + 
      ConstantValues.couponType,+ '\n' + 
      ConstantValues.couponId ,+ '\n' + 
      ConstantValues.discount ,+ '\n' + 
      ConstantValues.rateDiscount ,+ '\n' + 
      ConstantValues.isCouponApplied ,+ '\n' + 
      ConstantValues.appliedCode ,)
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
          },
          this.orderBooking(ConstantValues.paymentTypeId)
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



  render() {
    const { navigation } = this.props;
    const altMobileNo = navigation.getParam('altMobileNo', '');

    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PassengerDetail')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Regular', fontSize: 25, color: '#000000' }}> Payment Details </Text>
              </View>
            </View>
            {/* header view ends */}
            <View>
              <View>
                <View style={{ backgroundColor: '#ffffff', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>Bill Details</Text>
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
                      <Text style={styles.tiletext}>(+) GST on food</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.gst).toFixed(2)}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>(+) Delivery Charge (Inc. GST)</Text>
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
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>Passenger Details</Text>
              {/* <Image style={{ height: 15, alignSelf: 'center' }} source={require('../images/line.png')} /> */}
            </View>
            <View style={styles.billcard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Coach no. {ConstantValues.coach}</Text>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Seat no. {ConstantValues.seat}</Text>

              </View>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Name : {ConstantValues.customerName}</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Contact No - {ConstantValues.customerPhoneNo}</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000', paddingHorizontal: 10, paddingVertical: 5 }}>Alternate No. - {ConstantValues.customeralternateMobile}</Text>
            </View>
            {/* passengerDetail view ends here */}
            {/* Payment Mode View Starts */}
            <View>
              <View style={{ width: Dimensions.get('window').width - 10, alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ fontSize: 17, fontFamily: 'Poppins-Regular' }}>Choose Payment Mode</Text>
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
                          item.paymentTypeId == 2 ? <Image source={require('../images/paytmnew.png')} /> : <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-Regular', textAlign: 'center' }}>Cash On Delivery</Text>
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
            style={{ backgroundColor: this.state.clicked == true ? '#9b9b9b' : '#60b246', alignSelf: 'center', }}
            onPress={() => this.paymentDetails()}
            title={this.state.clicked === false ? 'Proceed To Pay' : 'Please wait...'}
          />
        </ScrollView>
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
    width: Dimensions.get('window').width - 5,
    marginLeft: 5,

  },
  radioButton: {
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 25 // justifyContent: 'space-between',
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
  iconChecked: {
    marginRight: 20
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
  tile: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  tiletext: {
    fontFamily: 'Poppins-Regular',
    color: '#000000'
  }
});
