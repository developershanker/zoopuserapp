import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert, TouchableOpacity, FlatList, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButton } from '../assests/customButtonLarge.js';
import { Fade } from '../assests/fade.js';
import walletApi from '../customer/walletApi.js';
import { CheckBox } from 'react-native-elements';
import cartApi from './cartApi.js';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'


export default class Cart extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getCartItems(ConstantValues.inCart)
    this.getWalletInfo()
    this.billDetail()
    this.checkCoupon(ConstantValues.appliedCode)
  }
 
  
  constructor(props) {
    super(props);
    this.state = {
      outletName: 'MOTI MAHAL RESTURENT',
      station: 'Kanpur',
      count: 0,
      discount: 0,
      totalPrice: 0,
      revisedInCart: [],
      walletBalance: 0,
      walletUsed: false,
      walletBalanceUsed: 0,
      textPromoCode: 'Apply Coupon Code',
      OutletMenuInfo: [
        // { key: "1", itemName: "Special Thali", itemImage: require('../images/thali.png'), itemPrice: "175", itemCategory: "Thali", itemType: "veg", itemMarking: "", itemDescription: "" },
        // { key: "2", itemName: "Chicken Curry", itemImage: require('../images/chickencurry.png'), itemPrice: "200", itemCategory: "Main Course", itemType: "nonveg", itemMarking: "", itemDescription: "" },
      ]
    };
  }
  getCartItems = (inCart) => {
    this.setState({
      revisedInCart: inCart,
      station: ConstantValues.stationName,
      outletName: ConstantValues.outletName
    })
    ConstantValues.appliedCode = 'Apply Coupon Code'
    console.log('revisedInCart is' + JSON.stringify(this.state.revisedInCart))
  }
  // addItemToCart = (item) => {
  //   item.itemCount = item.itemCount + 1
  //   this.setState({
  //     count: item.itemCount
  //   }
  //   )
  //   // this.state.totalPrice = item.sellingPrice
  //   this.state.revisedInCart.push(item)
  //   ConstantValues.inCart = this.state.revisedInCart
  //   // console.log('ConstantValues.incart items are [when added] : ' + JSON.stringify(ConstantValues.inCart))
  // }


  // removeItemFromCart = (item) => {

  //   item.itemCount = item.itemCount - 1
  //   this.setState({
  //     count: item.itemCount
  //   }
  //   )
  //   this.state.revisedInCart.pop(item)
  //   // console.log('incart items are [when removed] : ' + JSON.stringify(this.state.inCart))
  //   // console.log('incart item.itemCount when ---- : ' + item.itemCount)
  //   ConstantValues.inCart = this.state.revisedInCart
  //   //console.log('ConstantValues.incart items are [when removed] : ' + JSON.stringify(ConstantValues.inCart))
  // }

  changeCode = (couponCode) => {

    if (couponCode == '') {
      this.setState({
        textPromoCode: 'Apply Coupon Code'
      })
      ConstantValues.appliedCode = 'Apply Coupon Code'
     // console.log('couponCode is : ' + couponCode + 'textPromoCode is : ' + this.state.textPromoCode + '\n' + 'ConstantValues.appliedCode : ' + ConstantValues.appliedCode)
      this.props.navigation.navigate('CouponPage')
    } else {
      this.setState({
        textPromoCode: couponCode
      })
      ConstantValues.appliedCode = couponCode
     // console.log('couponCode is : ' + couponCode + 'textPromoCode is : ' + this.state.textPromoCode + '\n' + 'ConstantValues.appliedCode : ' + ConstantValues.appliedCode)
    }
  }
  checkCoupon = (couponCode) => {
    if (ConstantValues.isCouponApplied == true) {
      ConstantValues.appliedCode == couponCode
      // this.setState({
      //   textPromoCode: couponCode
      // })
    } else {
      ConstantValues.appliedCode == 'Apply Coupon Code'
    }
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
    );
  };

  removeCoupon = () => {
    ConstantValues.couponCode = ''
    ConstantValues.couponValue = 0
    ConstantValues.couponType = ''
    ConstantValues.discount = 0
    this.setState({
      textPromoCode: 'Apply Coupon Code'
    })
    ConstantValues.appliedCode = 'Apply Coupon Code'
    cartApi.billDetail()
  }

  async getWalletInfo() {
    try {
      let response = await walletApi.getWalletInfo();
      // console.log('data received in cart.js : ' + JSON.stringify(response))
      if (response.status == true) {
        ConstantValues.walletBalance = response.data.balance
        this.setState({
          walletBalance: ConstantValues.walletBalance,
        })
        // console.log('data array is : '+ JSON.stringify(this.state.data))
      } else {
        return (

          ToastAndroid.show('No data Found', ToastAndroid.LONG)

        )
      }
    } catch (error) {
      console.log('Data received in cart.js catch: ' + error)
    }
  }


  walletUsed = (walletUsed) => {
    // this.setState({
    //   walletUsed: !this.state.walletUsed
    // })
    if (walletUsed == true) {
      
        ConstantValues.walletBalanceUsed = 0,
        // ConstantValues.discount = 50,
        this.setState({
          discount: 0
        })
     
        cartApi.billDetail()
      // console.log('On this.state.walletUsed == true..... this.state.discount : ' + this.state.discount + 'ConstantValues.discount : ' +ConstantValues.discount+ "this.state.walletUsed : "+this.state.walletUsed)
    } else{
     
        // ConstantValues.discount = 0,
        ConstantValues.walletBalanceUsed = 50,
        this.setState({
          discount: 50
        })
     
        cartApi.billDetail()
      // console.log('On this.state.walletUsed == false..... this.state.discount : ' + this.state.discount + 'ConstantValues.discount : ' +ConstantValues.discount+ "this.state.walletUsed : "+this.state.walletUsed)
    }
  }
  confirmCart = () => {
    return (
      Alert.alert(
        'Confirm!!',
        'Are you sure you want to place this order? No further changes can be made once order is placed.',
        [// { text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'NO',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'YES', onPress: () => {
              this.savePassengerDetail(),
                this.items(),
                this.submitCart()
            }
          },
        ],
        { cancelable: false },
      )
    )
  }
  async submitCart() {
    try {
      let response = await cartApi.inCart();
      if (response.status == true) {
        ToastAndroid.show('Added to Cart', ToastAndroid.SHORT)
        this.createNotificationChannel()
        this.props.navigation.navigate('PassengerDetail')
      } else {
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
      }
    } catch (error) {
      console.log('Data received in cart.js catch: ' + error)
    }
  }
  items = () => {
    ConstantValues.finalCart = []
    this.state.revisedInCart.map((item) =>
      ConstantValues.finalCart.push({
        'itemId': item.itemId,
        'itemName': item.itemName,
        'itemDescription': item.itemDescription,
        'categoryId': item.categoryId,
        //billing details
        'zoopPrice': item.zoopPrice,
        'basePrice': item.basePrice,
        'basePriceGstRate': item.basePriceGstRate,
        'basePriceGst': item.basePriceGst,
        'sellingPrice': item.sellingPrice,
        'deliveryCharge': item.deliveryCharge,
        'deliveryChargeGstRate': item.deliveryChargeGstRate,
        'deliveryChargeGst': item.deliveryChargeGst,
        'basePrice': item.basePrice,

        'quantity': item.itemCount,
        'itemTimes': item.itemTimes
      })
    )
    console.log('items are : ' + ConstantValues.finalCart)
  }
  billDetail = () => {
    ConstantValues.gst = (ConstantValues.totalBasePrice / 100) * 5,
      ConstantValues.totalPayableAmount = ConstantValues.totalBasePrice + ConstantValues.deliveryCharge - ConstantValues.couponValue - ConstantValues.walletBalanceUsed + ConstantValues.gst,
      ConstantValues.billDetail = {
        'totalAmount': ConstantValues.totalBasePrice,
        'deliveryCharge': ConstantValues.deliveryCharge,
        'discount': ConstantValues.couponValue,
        'couponId': ConstantValues.couponId,
        'couponCode': ConstantValues.couponCode,
        'couponValue': ConstantValues.couponValue,
        'walletAmount': ConstantValues.walletBalanceUsed,
        'gst': (ConstantValues.gst).toFixed(2),
        'totalPayableAmount': (ConstantValues.totalPayableAmount).toFixed(2)
      }
    console.log('ConstantValues.billDetail : ' + JSON.stringify(ConstantValues.billDetail))
  }

  savePassengerDetail = () => {
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
      //'suggestions': ConstantValues.suggestions = this.state.addMessage
    }
  }


  createNotificationChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
      'zoop-e2126',//fcm_FirebaseNotifiction_default_channel
      'Zoop', //Demo app name
      firebase.notifications.Android.Importance.High)
      .setDescription('Zoop app description')
      .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);
    console.log('channel id of fcm : ' + JSON.stringify(channel))
  }
  render() {
    const { navigation } = this.props;
    const count = navigation.getParam('count', '0');
    const totalPrice = navigation.getParam('totalPrice', '0')
    const couponCode = navigation.getParam('couponCode', 'ZOOP50')
    // this.changeCode(couponCode)
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 25, color: '#000000' }}> Cart </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width, alignItems: 'center', marginVertical: 15 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: '#000000', fontFamily: 'Poppins-SemiBold', }}>{this.state.outletName}</Text>
              <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-SemiBold', }}>{this.state.station}</Text>
            </View>
            {/* Selected Items list */}
            <View>
              <View style={styles.card}>
                <Fade visible={this.state.revisedInCart.length == 0 ? true : false}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-SemiBold', }}>Cart Is Empty</Text>
                    <CustomButton
                      title='Add Items'
                      onPress={() => {
                        this.props.navigation.navigate('Menu'),
                          cartApi.resetCart()
                      }}
                    />
                  </View>
                </Fade>
                <FlatList
                  style={{ width: Dimensions.get('window').width }}
                  data={this.state.revisedInCart}
                  extraData={this.state}
                  renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, paddingHorizontal: 10, marginBottom: 5, alignItems: 'center' }}>
                      <Icons name={'carrot'} size={15} color={item.categoryType == 'Veg' ? '#1e8728' : '#eb0909'} />
                      <Text style={{ alignSelf: 'center', fontSize: 15, fontFamily: 'Poppins-SemiBold', }}>{item.itemName}</Text>
                      {/* Adding item to cart button */}


                      <View
                        style={{ alignItems: 'center', width: 80, borderColor: '#1e8728', borderRadius: 100 / 8, borderWidth: 2 }}>
                        <TouchableOpacity
                          // onPress={() => { this.addItemToCart(item)} 
                          disabled={item.itemCount == 0 ? false : true}>
                          <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                              // onPress={() => { this.removeItemFromCart(item) }}
                              disabled={item.itemCount == 0 ? true : false}>
                              <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='minus' size={15} color='#1e8728' />
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', color: '#1e8728', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'Add' : item.itemCount}</Text>


                            <TouchableOpacity
                            //onPress={() => {
                            //this.addItemToCart(item)
                            //}}
                            >
                              <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='plus' size={15} color='#1e8728' />
                            </TouchableOpacity>

                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Adding item to cart button ends here */}
                      <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-SemiBold', }}>{ConstantValues.rupee} {item.basePrice}</Text>
                    </View>
                  }
                  keyExtractor={(item) => item.itemId.toString()}
                />
              </View>
              {/* itemCard ends here */}
              {/* Wallet and Coupon Card begin here */}
              <View style={styles.couponcard}>
                <Fade visible={ConstantValues.customerId == '' ? true : false}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#000000', fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>Enjoy Offers</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                      <Text style={styles.removetext}>Click here to login</Text>
                    </TouchableOpacity>
                  </View>
                </Fade>
                <Fade visible={ConstantValues.customerId == '' ? false : true}>
                  <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,alignContent:'center'}}>


                      <CheckBox
                        disabled={this.state.textPromoCode == ConstantValues.couponCode ? true : false}
                        title='Use Wallet Balance'
                        checked={this.state.walletUsed}
                        onPress={() => {
                          this.setState({walletUsed: !this.state.walletUsed}),
                         this.walletUsed(this.state.walletUsed)
                        }}
                      />


                      <View style={{ flexDirection: 'column',justifyContent:'center', alignItems: 'center'}}>
                      <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light'}}>Available Balance</Text>
                      <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>{ConstantValues.rupee} {this.state.walletUsed == true ? ConstantValues.walletBalance - 50 : ConstantValues.walletBalance}</Text>
                      </View>
                    </View>
                    <Text>OR</Text>


                    <TouchableOpacity onPress={() => {this.changeCode(ConstantValues.couponCode)}} disabled={this.state.walletUsed == true ? true : false}>
                      <Text style={[styles.coupontext, { color: this.state.walletUsed == true ? '#636666' : '#149db5' }]}>
                        {ConstantValues.appliedCode}
                      </Text>
                    </TouchableOpacity>

                    <Fade visible={ConstantValues.appliedCode == ConstantValues.couponCode ? true : false}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ color: '#000000', fontFamily: 'Poppins-Medium',paddingHorizontal:10 }}>Applied!!</Text>
                        <TouchableOpacity onPress={() => this.removeCoupon()}>
                          <Text style={styles.removetext}>REMOVE</Text>
                        </TouchableOpacity>
                      </View>

                    </Fade>
                  </View>
                </Fade>
              </View>
              {/* Wallet and Coupon Card ends here */}
              {/* bill detail Card begins here */}
              <View>
                <View style={{ backgroundColor: '#ffffff', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Bill Details</Text>
                  <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} />
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
                      <Text style={styles.tiletext}>Delivery Charges</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.deliveryCharge}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Discount</Text>
                      <Text style={[styles.tiletext, { color: '#1fc44e' }]}> {ConstantValues.rupee} {ConstantValues.couponValue}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Used Wallet Balance</Text>
                      <Text style={[styles.tiletext, { color: '#1fc44e' }]}>{ConstantValues.rupee} {ConstantValues.walletBalanceUsed}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Add GST 5%</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.gst).toFixed(2)}</Text>
                    </View>

                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>To Pay</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.totalPayableAmount).toFixed(2)}</Text>
                    </View>

                  </View>
                </View>
              </View>
              {/* bill detail Card ends here */}

            </View>
          </View>
        </ScrollView>
        <CustomButton
          disabled={this.state.revisedInCart.length == 0 ? true : false}
          style={{ backgroundColor: this.state.revisedInCart.length == 0 ? '#9b9b9b' : '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
          onPress={() => this.confirmCart()}
          title='Add Passenger Details'
        />
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
  },
  couponcard: {
    width: Dimensions.get('window').width - 5,
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
  },
  coupontext: {
    fontSize: 20,
    // color:'#149db5',
    fontFamily: 'Poppins-SemiBold',
    // textDecorationLine: 'underline'
  },
  removetext: {
    fontSize: 15,
    color: '#b32120',
    fontFamily: 'Poppins-SemiBold',
    // textDecorationLine: 'underline'
  },
  billcard: {
    // width: Dimensions.get('window').width,
    // borderRadius: 100 / 4,
    // // marginLeft: 5,
    // // marginRight: 10,
    // // marginTop: 10,
    // alignItems: 'center',
    // flexDirection: 'row',
    // // paddingTop: 10,
    // // paddingBottom: 10,
    // // paddingLeft: 10,
    // // paddingRight: 10
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
  },
  tile: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },




  tiletext: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000'
  }

});
