import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, Alert, TouchableOpacity, FlatList, Image, ToastAndroid } from 'react-native';
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
import firebase from 'react-native-firebase';
import Modal from "react-native-modal";
import { CouponCodeView } from './couponCodeView.js';
import moment from 'moment';


export default class Cart extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getCartItems(ConstantValues.inCart)
    this.getWalletInfo(),
      this.getCoupons();
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
      visibleModal: null,
      couponCode: '',
      CouponDetail: [],
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
  addItemToCart = (item, index) => {
    let itemId = item.itemId
    let inCart = this.state.revisedInCart

    item.itemCount = item.itemCount + 1
    this.setState({
      count: item.itemCount
    }
    )
    // this.state.totalCartCount += item.itemCount 
    this.state.totalPrice += item.basePrice  //price adding calculation
    ConstantValues.totalBasePrice = this.state.totalPrice
    let idx = this.state.revisedInCart.findIndex(i => { return i.itemId == item.itemId })
    console.log('idx items are  : ' + idx)
    if (idx > -1) {
      this.state.revisedInCart[idx].itemCount = this.state.revisedInCart[idx].itemCount + 1;
    } else {
      this.state.revisedInCart.push(Object.assign({}, item))
    }
    console.log('revisedInCart items are [when added] : ' + JSON.stringify(this.state.revisedInCart))
    // console.log('incart item.itemCount when ++++ : ' + item.itemCount)
    ConstantValues.inCart = this.state.revisedInCart
    // this.cartCalculate(item)
    cartApi.billDetail()

    //console.log('ConstantValues.revisedInCart items are [when added] : ' + JSON.stringify(ConstantValues.revisedInCart))
  }




  removeItemFromCart = (item, index) => {
    let itemId = item.itemId
    let inCart = this.state.revisedInCart

    item.itemCount = item.itemCount - 1
    this.setState({
      count: item.itemCount
    }
    )

    this.state.totalPrice -= item.basePrice //price calculation
    ConstantValues.totalBasePrice = this.state.totalPrice
    let idx = this.state.revisedInCart.findIndex(i => { return i.itemId == item.itemId })
    console.log('idx items are  : ' + idx)
    if (idx > -1) {
      if (this.state.revisedInCart[idx].itemCount == 1) {
        this.state.revisedInCart.splice(idx)
      } else {
        this.state.revisedInCart[idx].itemCount = this.state.revisedInCart[idx].itemCount - 1;
        this.state.totalCartCount -= item.itemCount
      }
    }
    console.log('incart items are [when removed] : ' + JSON.stringify(this.state.revisedInCart))
    // console.log('incart item.itemCount when ++++ : ' + item.itemCount)
    ConstantValues.InCart = this.state.revisedInCart
    // this.cartCalculate(item)
    cartApi.billDetail()
    //console.log('ConstantValues.incart items are [when added] : ' + JSON.stringify(ConstantValues.inCart))
  }

  // cartCalculate = (item) => {
  //   let totalCartCount = 0
  //   this.state.revisedInCart.forEach(i => {
  //     totalCartCount = totalCartCount + i.itemCount
  //   })
  //   this.state.totalCartCount = totalCartCount
  //   console.log('totalCartCount is :  ' + totalCartCount)
  // }


  changeCode = (couponCode) => {
    if (couponCode == '') {
      this.setState({
        textPromoCode: 'Apply Coupon Code',
        visibleModal: 'bottom'
      })
      ConstantValues.appliedCode = 'Apply Coupon Code'
      // console.log('couponCode is : ' + couponCode + 'textPromoCode is : ' + this.state.textPromoCode + '\n' + 'ConstantValues.appliedCode : ' + ConstantValues.appliedCode)
      // this.props.navigation.navigate('CouponPage')
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
    } else {

      // ConstantValues.discount = 0,
      ConstantValues.walletBalanceUsed = 50,
        this.setState({
          discount: 50
        })

      cartApi.billDetail()
      // console.log('On this.state.walletUsed == false..... this.state.discount : ' + this.state.discount + 'ConstantValues.discount : ' +ConstantValues.discount+ "this.state.walletUsed : "+this.state.walletUsed)
    }
  }

  async getCoupons() {
    try {
      let response = await cartApi.getCoupons();

      if (response.status == true) {
        this.setState({
          CouponDetail: response.data
        })
      } else {
        ToastAndroid.show(response.error, ToastAndroid.LONG),
          console.log(response.error)
      }
    } catch (error) {
      console.log('Data received in menu.js catch: ' + error)
    }
  }


  applyCoupons = (couponDetail) => {
    if ( ConstantValues.totalPayableAmount >= couponDetail.minimumOrderValue) {
      // console.log('couponCode : ' + JSON.stringify(couponDetail))
      ConstantValues.couponCode = couponDetail.couponCode
      ConstantValues.couponValue = couponDetail.couponValue
      ConstantValues.discount = couponDetail.couponValue
      ConstantValues.couponType = couponDetail.type
      ConstantValues.couponId = couponDetail.couponId
      ConstantValues.isCouponApplied = true
      console.log('couponCode : ' + ConstantValues.couponCode + ' couponValue : ' + ConstantValues.couponValue + ' type : ' + ConstantValues.couponType)
      // Cart.changeCode(ConstantValues.couponCode)
      cartApi.changeCode(couponDetail.couponCode)
      cartApi.billDetail()
      this.setState({ 
        visibleModal: null ,
        textPromoCode: couponDetail.couponCode
      })
    } else {
      return (
        // ToastAndroid.show(response.error, ToastAndroid.LONG),

        Alert.alert(
          'Invalid Coupon',
          'This Coupon Code is not valid in this order ',
          [
            {
              text: 'OK', onPress: () => this.setState({ visibleModal: null }),
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      )
    }

  }

  applyCouponsFromInput = (couponCode, couponDetail) => {
    if (couponCode != '') {
      if (couponCode == 'ZOOP100') {
        ConstantValues.couponCode = couponCode
        // ConstantValues.discount = ConstantValues.couponValue
        console.log('couponCode : ' + ConstantValues.couponCode)
        ConstantValues.isCouponApplied = true

        this.setState({ visibleModal: null })
      } else {
        return (
          ToastAndroid.show('Invalid Promo Code', ToastAndroid.LONG)
        )
      }
    } else {
      ToastAndroid.show('Please Enter Promo Code', ToastAndroid.LONG)
    }
  }

  confirmCart = () => {
    if (ConstantValues.totalBasePrice >= ConstantValues.minimumOrderValue) {
      return (
        Alert.alert(
          'Confirm!!',
          'Are you sure you want to place this order? No further changes can be made once order is placed.',
          [
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
    else {
      return (
        // ToastAndroid.show(response.error, ToastAndroid.LONG),

        Alert.alert(
          'Add more items!!',
          'Order should be atleast Rs.' + ConstantValues.minimumOrderValue,
          [
            {
              text: 'OK',
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      ),
        console.log('minimumorder issue')
    }
  }
  async submitCart() {
    try {
      let response = await cartApi.inCart();
      if (response.status == true) {
        ToastAndroid.show('Added to Cart', ToastAndroid.SHORT)
        // this.createNotificationChannel()
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
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 25, color: '#000000' }}> Cart </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width, alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: '#000000', fontFamily: 'Poppins-Medium', }}>{this.state.outletName}</Text>
              <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-Medium', }}>{this.state.station}</Text>
            </View>
            {/* Selected Items list */}
            <View>
              <View style={styles.card}>
                <Fade visible={this.state.revisedInCart.length == 0 ? true : false}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', }}>Cart Is Empty</Text>
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
                  renderItem={({ item, index }) =>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 5, alignContent: 'space-around', width: Dimensions.get('window').width }}>
                      <Image style={{ width: 15, height: 15 }} source={{ uri: item.categoryType == 'Veg' ? ConstantValues.IconUrl + ConstantValues.imgurl.veg : ConstantValues.IconUrl + ConstantValues.imgurl.nonveg }} />
                      <Text style={{ fontSize: 13, fontFamily: 'Poppins-Regular', width: 100 }}>{item.itemName}</Text>
                      {/* Adding item to cart button */}
                      <View
                        style={{ alignItems: 'center', width: 90, height: 31, borderColor: '#898c8b', borderRadius: 6, borderWidth: 1 }} key={index}>
                        <TouchableOpacity
                          // onPress={() => { this.addItemToCart(item, index) }}
                          disabled={item.itemCount == 0 ? false : true}
                        >

                          <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around' }}>

                            <TouchableOpacity
                              // onPress={() => { this.removeItemFromCart(item, index) }} 
                              disabled={item.itemCount == 0 ? true : false}
                            >

                              <View style={[styles.plusminus, { opacity: item.itemCount == 0 ? 0 : 100}]}>
                                <Icon name='minus' size={10} color='#60b246' />
                              </View>

                            </TouchableOpacity>

                            <Text style={{ fontFamily: 'Poppins-Medium', color: '#60b246', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'Add' : item.itemCount}</Text>


                            <TouchableOpacity
                            // onPress={() => {this.addItemToCart(item, index)}}
                            >
                              <View style={[styles.plusminus, { opacity: item.itemCount == 0 ? 0 : 100 }]}>
                                <Icon name='plus' size={10} color='#60b246' />
                              </View>
                            </TouchableOpacity>

                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Adding item to cart button ends here */}
                      <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', }}>{ConstantValues.rupee} {item.basePrice}</Text>
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
                    <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 15 }}>Enjoy Offers</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                      <Text style={styles.removetext}>Click here to login</Text>
                    </TouchableOpacity>
                  </View>
                </Fade>
                <Fade visible={ConstantValues.customerId == '' ? false : true}>
                  <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center' }}>
                      <CheckBox
                        disabled={this.state.textPromoCode == ConstantValues.couponCode ? true : false}
                        textStyle={{ fontFamily: 'Poppins-Regular' }}
                        checked={this.state.walletUsed}
                        onPress={() => {
                          this.setState({ walletUsed: !this.state.walletUsed }),
                            this.walletUsed(this.state.walletUsed)
                        }}
                      />
                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 150, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Use Wallet Balance</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light', color: '#000000',alignSelf:'center' }}>Max. Rs.50 per order can be used</Text>
                      </View>

                      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light' }}>Available Balance</Text>
                        <Text style={{ fontSize: 20, fontFamily: 'Poppins-Regular', color: '#000000' }}>{ConstantValues.rupee} {this.state.walletUsed == true ? ConstantValues.walletBalance - 50 : ConstantValues.walletBalance}</Text>
                      </View>
                    </View>

                    <Text>OR</Text>


                    <TouchableOpacity onPress={() => { this.changeCode(ConstantValues.couponCode) }} disabled={this.state.walletUsed == true ? true : false}>
                      <Text style={[styles.coupontext, { color: this.state.walletUsed == true ? '#636666' : '#149db5' }]}>
                        {ConstantValues.appliedCode}
                      </Text>
                    </TouchableOpacity>

                    <Fade visible={ConstantValues.appliedCode == ConstantValues.couponCode ? true : false}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', paddingHorizontal: 10 }}>Applied!!</Text>
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
                <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 5 }}>
                  <Text style={{ fontSize: 20, fontFamily: 'Poppins-Regular', color: '#000000' }}>Bill Details</Text>
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
                      <Text style={[styles.tiletext, { color: '#60b246' }]}> {ConstantValues.rupee} {ConstantValues.couponValue}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Used Wallet Balance</Text>
                      <Text style={[styles.tiletext, { color: '#60b246' }]}>{ConstantValues.rupee} {ConstantValues.walletBalanceUsed}</Text>
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

        <Modal
          isVisible={this.state.visibleModal === 'bottom'}
          onBackButtonPress={() => this.setState({ visibleModal: null })}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['left', 'right', 'down']}
          style={styles.bottomModal}
        >

          <View style={styles.modalView}>
            <View style={styles.promocodeInput}>
              <TextInput
                style={{ fontSize: 15, textTransform: 'uppercase', fontFamily: 'Poppins-Medium', width: 200 }}
                placeholder='Enter Promo Code'
                // keyboardType='default'
                autoCapitalize='characters'
                onChangeText={couponCode => this.setState({ couponCode })}
              />
              <TouchableOpacity onPress={() => { this.applyCouponsFromInput(this.state.couponCode, this.state.CouponDetail) }}>
                <Text style={{ color: '#60b246', fontSize: 15, fontFamily: 'Poppins-Medium', }}>APPLY</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: Dimensions.get('window').width - 10, flexDirection: 'row', paddingTop: 10 }}>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Medium', paddingHorizontal: 10 }}>Available Coupons</Text>
              {/* <Image style={{ height: 10, alignSelf: 'center' }} source={require('../images/line.png')} /> */}
            </View>


            {/* CouponDetail Card begin Here */}
            <View>
              <FlatList
                data={this.state.CouponDetail}
                renderItem={({ item, index }) =>

                  <View style={styles.card}>
                    <View>
                      <CouponCodeView
                        onPress={()=>{this.applyCoupons(item)}}
                        title={item.couponCode}
                      />
                      <Text style={{ paddingTop: 5, color: '#000000', fontFamily: 'Poppins-Regular', }}>{item.discription}</Text>
                      <Text style={{ paddingTop: 5, fontFamily: 'Poppins-Regular', }}>Validity of this coupon is: {moment(item.validityStartDate).format('DD-MM-YYYY HH:mm A')}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.applyCoupons(item)
                      }}
                    >
                      <Text style={{ color: '#60b246', fontSize: 15, fontFamily: 'Poppins-Medium', alignSelf: 'flex-end', marginRight: 25 }}>APPLY</Text>
                    </TouchableOpacity>

                  </View>

                }
                keyExtractor={item => item.couponId.toString()}
              />
            </View>
            {/* CouponDetail Card ends Here  */}
          </View>

        </Modal>

        <CustomButton
          disabled={this.state.revisedInCart.length == 0 ? true : false}
          style={{ backgroundColor: this.state.revisedInCart.length == 0 ? '#9b9b9b' : '#60b246', alignSelf: 'center', marginBottom: 20, }}
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
    // backgroundColor: '#ffffff',//can change as we move to various pages
    // marginBottom: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    // borderColor: '#e4e4e4',
    // borderRadius: 100 / 9,
    // borderWidth: 1,
    // shadowOpacity: 0.4,
    // borderBottomColor: '#e4e4e4',
    // borderBottomWidth: 2,
    width: Dimensions.get('screen').width,
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  promocodeInput: {
    borderRadius: 100 / 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    width: '96%',
    borderColor: '#626663',
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
    borderBottomWidth: 2,
  },
  plusminus: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 6
  },
  coupontext: {
    fontSize: 15,
    // color:'#149db5',
    fontFamily: 'Poppins-Medium',
    // textDecorationLine: 'underline'
  },
  removetext: {
    fontSize: 15,
    color: '#b32120',
    fontFamily: 'Poppins-Medium',
    // textDecorationLine: 'underline'
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
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
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

});
