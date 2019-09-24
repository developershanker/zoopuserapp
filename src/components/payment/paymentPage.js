import React, { Component } from 'react';
import { View, Picker, ToastAndroid, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, CheckBox, FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { CustomButton } from '../assests/customButtonLarge.js';
import { CustomTextInput } from '../assests/customTextInput.js';
import ConstantValues from '../constantValues.js';
import BillDetailCard from '../cart/billDetailCard.js';
import { RadioButton } from 'react-native-paper';
import { Fade } from '../assests/fade.js';
import orderApi from '../orderBooking/orderApi.js';
import paymentApi from '../payment/paymentApi.js';

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
      paymentTypes: [],
      paymentTypeName: '',
      paymentTypeId: '',
      paymentBorderColor:'#000000',
      // backgroundColor : ''
    };
  }
  async orderBooking(paymentType) {
    try {
      let response = await orderApi.orderBooking();
      if (response.status == true) {
        ConstantValues.zoopOrderId = response.data.orderId
        ConstantValues.zooptransactionId = response.data.transactionId
        if (paymentType == 'Prepaid') {
          return (

           ToastAndroid.show('Requesting payment, please wait...', ToastAndroid.LONG),
            this.props.navigation.navigate('PaymentPaytm')
            // this.props.navigation.navigate('OrderConfirm')
          )
        } else {
          return (

            ToastAndroid.show('!! Order Placed Successfully !!', ToastAndroid.LONG),
            // this.props.navigation.navigate('PaymentPaytm')
            this.props.navigation.navigate('OrderConfirm')
          )
        }
       
      } else {
        ToastAndroid.show('Oops!! Something went wrong!!', ToastAndroid.LONG)
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
          paymentTypes: response.data
        })
        console.log('Data received in paymentPage.js response: ' + JSON.stringify(this.state.paymentTypes))
      } else {
        ToastAndroid.show('Oops!! Something went wrong!!', ToastAndroid.LONG)
      }
    } catch (error) {
      console.log('Data received in paymentPage.js catch: ' + error)
    }
  }


  setPaymentInfo = (item) => {
   this.setState({
      paymentTypeName: item.paymentTypeName,
      paymentTypeId: item.paymentTypeId,
      // paymentBorderColor:'#f15926'
    })
    return(
      ToastAndroid.show('You selected method : ' + item.paymentTypeName ,ToastAndroid.LONG)
    ),
    console.log('paymentTypeName : ' + this.state.paymentTypeName + '\n' + 'paymentTypeId :' + this.state.paymentTypeId),
    console.log('item.paymentTypeName : ' + item.paymentTypeName + '\n' + 'item.paymentTypeId :' + item.paymentTypeId)
  }


  paymentDetails = () => {
    // if (this.state.codActive == true) {
    //   ConstantValues.paymentType = this.state.paymentTypeName
    //   ConstantValues.paymentTypeId = this.state.paymentTypeId
    //   ConstantValues.refNo = 'N.A'
    //   ConstantValues.paymentDetails = {
    //     'referenceNo' : ConstantValues.refNo,
    //     'paymentType' : ConstantValues.paymentType,
    //     'paymentTypeId':ConstantValues.paymentTypeId
    //   }
    //   this.orderBooking()
    // } else {
    //   ConstantValues.paymentType = this.state.paymentTypeName
    //   ConstantValues.paymentTypeId = this.state.paymentTypeId
    //   ConstantValues.refNo = ''
    //   ConstantValues.paymentDetails = {
    //     'referenceNo' : ConstantValues.refNo,
    //     'paymentType' : ConstantValues.paymentType,
    //     'paymentTypeId':ConstantValues.paymentTypeId
    //   }
    //   this.orderBooking()
    ConstantValues.paymentType = this.state.paymentTypeName,
      ConstantValues.paymentTypeId = this.state.paymentTypeId,
      ConstantValues.refNo = '',
      ConstantValues.paymentDetails = {
        'referenceNo': ConstantValues.refNo,
        'paymentType': ConstantValues.paymentType,
        'paymentTypeId': ConstantValues.paymentTypeId
      },
      this.orderBooking(ConstantValues.paymentType)

  }



  render() {
    const { navigation } = this.props;
    const altMobileNo = navigation.getParam('altMobileNo', '');
    return (
      <SafeAreaView>
        <ScrollView style={styles.slide}>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PassengerDetail')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 25, color: '#000000' }}> Payment Detail </Text>
              </View>
            </View>
            {/* header view ends */}
            <View>
              <BillDetailCard />
            </View>
            {/* passengerDetail view begin here */}
            <View style={{ width: Dimensions.get('window').width - 10, flexDirection: 'row', paddingTop: 10 }}>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Passenger Details</Text>
              {/* <Image style={{ height: 15, alignSelf: 'center' }} source={require('../images/line.png')} /> */}
            </View>
            <View style={{ width: Dimensions.get('window').width, paddingVertical: 15, paddingHorizontal: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Seat no. {ConstantValues.seat}</Text>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Coach no. {ConstantValues.coach}</Text>
              </View>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Name : {ConstantValues.customerName}</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Contact No - {ConstantValues.customerPhoneNo}</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Alternate No. - {altMobileNo}</Text>
            </View>
            {/* passengerDetail view ends here */}
            {/* Payment Mode View Starts */}
            <View>
              <View style={{ width: Dimensions.get('window').width - 10, alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Poppins-SemiBold' }}>Choose Payment Mode</Text>
              </View>



              <FlatList
                data={this.state.paymentTypes}
                extraData={this.state}
                renderItem={({ item }) =>

                  <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 10,paddingHorizontal: 10 }}>
                    <View style={[styles.paytmView,{borderColor:this.state.paymentBorderColor}]}>
                      <TouchableOpacity onPress={() => {this.setPaymentInfo(item)}}>
                        <Text style={{ color: this.state.paymentBorderColor, fontSize: 15, fontFamily: 'Poppins-SemiBold' }}>{item.paymentTypeName == 'Prepaid' ? 'Pay through Paytm' : 'Cash On Delivery'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                }
                keyExtractor={(item) => item.paymentTypeId.toString()}
              />



              {/* <RadioButton.Group
                onValueChange={value => this.setState({ value })}
                value={this.state.value}
              >
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginHorizontal: 20 }}>
                  <View style={styles.paytmView}>
                    <RadioButton
                      value="Paytm"
                      color='#000000'
                    />
                    <Image style={{ marginHorizontal: 20 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.paytm }} />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                    <RadioButton
                      value="Other"
                      color='#000000'
                    />
                    <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-SemiBold' }}>Other Payment Option</Text>
                  </View>
                  <Fade visible={this.state.value == "Other" ? true : false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CheckBox
                        value={this.state.codActive}
                        disabled={false}
                        onValueChange={codActive => this.setState({ codActive })}
                      />
                      <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-SemiBold' }}>Cash On Delivery</Text>
                    </View>
                  </Fade>
                </View>
              </RadioButton.Group> */}
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <CheckBox
                  value={this.state.checked}
                  disabled={false}
                  onValueChange={checked => this.setState({ checked })}
                />
                <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-SemiBold' }}>I Agree to </Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('TermsActivity') }}>
                  <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-SemiBold', textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Payment Mode View Ends */}

          </View>
          <CustomButton
            disabled={this.state.checked == false ? true : false}
            style={{ backgroundColor: this.state.checked == false ? '#9b9b9b' : '#1fc44e', alignSelf: 'center', }}
            onPress={() => this.paymentDetails()}
            title='Proceed To Pay'
          />
        </ScrollView>

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
    width:300,
    borderWidth:2,
    borderRadius: 100 / 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebe8e8',
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});
