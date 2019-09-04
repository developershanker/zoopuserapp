import React, { Component } from 'react';
import { View,  Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
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


export default class Cart extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getCartItems(ConstantValues.inCart)
    this.getWalletInfo()
    
    // this.changeCode(ConstantValues.couponCode)
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
      walletBalance: 500,
      walletUsed: false,
      textPromoCode: 'Apply Coupon Code',
      OutletMenuInfo: [
        { key: "1", itemName: "Special Thali", itemImage: require('../images/thali.png'), itemPrice: "175", itemCategory: "Thali", itemType: "veg", itemMarking: "", itemDescription: "" },
        { key: "2", itemName: "Chicken Curry", itemImage: require('../images/chickencurry.png'), itemPrice: "200", itemCategory: "Main Course", itemType: "nonveg", itemMarking: "", itemDescription: "" },
      ]
    };
  }
  getCartItems = (inCart) => {
    this.setState({
      revisedInCart : inCart
    })
    console.log('revisedInCart is'+ JSON.stringify(this.state.revisedInCart))
  }
  // incrementCounter = () => {
  //   this.setState({
  //     count: this.state.count + 1
  //   })
  // }
  // decrementCounter = () => {
  //   this.setState({
  //     count: this.state.count - 1
  //   })
  // }
  addItemToCart = (item) => {
    item.itemCount = item.itemCount + 1
    this.setState({
      count: item.itemCount
    }
    )
    // this.state.totalPrice = item.sellingPrice
    this.state.revisedInCart.push(item)
    // console.log('incart items are  : ' + JSON.stringify(item))
    // console.log('incart items are [when added] : ' + JSON.stringify(this.state.inCart))
    // console.log('incart item.itemCount when ++++ : ' + item.itemCount)
    ConstantValues.inCart = this.state.inCart
   // console.log('ConstantValues.incart items are [when added] : ' + JSON.stringify(ConstantValues.inCart))
  }


  removeItemFromCart = (item) => {

    item.itemCount = item.itemCount - 1
    this.setState({
      count: item.itemCount
    }
    )
    this.state.revisedInCart.pop(item)
    // console.log('incart items are [when removed] : ' + JSON.stringify(this.state.inCart))
    // console.log('incart item.itemCount when ---- : ' + item.itemCount)
    ConstantValues.inCart = this.state.inCart
    //console.log('ConstantValues.incart items are [when removed] : ' + JSON.stringify(ConstantValues.inCart))
  }

  changeCode = (couponCode) => {
    if (couponCode == '') {
      this.setState({
        textPromoCode: 'Apply Coupon Code'
      })

      console.log('couponCode is : ' + couponCode + 'textPromoCode is : ' + this.state.textPromoCode)
      this.props.navigation.navigate('CouponPage')
    } else {
      this.setState({
        textPromoCode: couponCode
      })
      console.log('couponCode is : ' + couponCode + 'textPromoCode is : ' + this.state.textPromoCode)
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


  walletUsed = () => {
    this.setState({
      walletUsed: !this.state.walletUsed
    })
    if (this.state.walletUsed == true) {
      return(
      ConstantValues.discount = 50,
      this.setState({
        discount : 50
      })
      )
     // console.log('On this.state.walletUsed == true..... this.state.discount : ' + this.state.discount + 'ConstantValues.discount : ' +ConstantValues.discount+ "this.state.walletUsed : "+this.state.walletUsed)
    } else if(this.state.walletUsed == false){
      return(
      ConstantValues.discount = 0,
      this.setState({
        discount : 50
      })
      )
     // console.log('On this.state.walletUsed == false..... this.state.discount : ' + this.state.discount + 'ConstantValues.discount : ' +ConstantValues.discount+ "this.state.walletUsed : "+this.state.walletUsed)
    }
    

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
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 25, color: '#000000' }}> Cart </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width, alignItems: 'center', marginTop: 15 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: '#000000', fontFamily: 'Poppins-Bold', }}>{this.state.outletName}</Text>
              <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000' }}>{this.state.station}</Text>
            </View>
            {/* Selected Items list */}
            <View>
              <View
                style={styles.card}
              >
                <FlatList
                  style={{ width: Dimensions.get('window').width }}
                  data={this.state.revisedInCart}
                  extraData={this.state}
                  renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 5, alignItems: 'center' }}>
                      <Icons name={'carrot'} size={15} color={item.categoryType == 'Veg' ? '#1e8728' : '#eb0909'} />
                      <Text>{item.itemName}</Text>
                      {/* Adding item to cart button */}

                      <View
                      style={{ alignItems: 'center', width: 80, borderColor: '#1e8728', borderRadius: 100 / 8, borderWidth: 2 }}>
                      <TouchableOpacity onPress={() => { this.addItemToCart(item), this.state.totalPrice = item.sellingPrice }} disabled={item.itemCount == 0 ? false : true}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                          <TouchableOpacity onPress={() => { this.removeItemFromCart(item) }} disabled={item.itemCount == 0 ? true : false}>
                            <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='minus' size={15} color='#1e8728' />
                          </TouchableOpacity>

                          <Text style={{ fontWeight: 'bold', color: '#1e8728', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'Add' : item.itemCount}</Text>


                          <TouchableOpacity onPress={() => {
                            this.addItemToCart(item)
                          }}>
                            <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='plus' size={15} color='#1e8728' />
                          </TouchableOpacity>

                        </View>
                      </TouchableOpacity>
                    </View>

                      {/* Adding item to cart button ends here */}
                      <Text>{ConstantValues.rupee} {item.sellingPrice}</Text>
                    </View>
                  }
                  keyExtractor={(item) => item.itemId.toString()}
                />
              </View>
              {/* itemCard ends here */}
              {/* Wallet and Coupon Card begin here */}
              <View
                style={styles.couponcard}
              >
                <View style={{ flexDirection: 'column' }}>
                  {/* <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}> */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      {/* <CheckBox
                        value={this.state.walletUsed}
                        disabled={this.state.textPromoCode == ConstantValues.couponCode ? true : false}
                        onValueChange={walletUsed => this.setState({ walletUsed })}
                        

                      /> */}
                      <CheckBox
                        // title='Use Wallet Balance'
                        checked={this.state.walletUsed}
                        onPress={() => {
                         this.walletUsed()
                        }}
                      />
                      <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold', }}>Use Zoop Wallet</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: '#000000' }}>{ConstantValues.rupee} {this.state.walletUsed == true ? ConstantValues.walletBalance - 50 : ConstantValues.walletBalance}</Text>
                    </View>
                  </View>
                  <Fade visible={this.state.walletUsed == true ? true : false}>
                    <View>
                      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }} >Discount Provided : {ConstantValues.rupee} 50/-</Text>
                    </View>
                  </Fade>
                  {/* <View style={{ justifyContent: 'center' }}> */}
                  <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, alignSelf: 'center' }}>OR</Text>
                  {/* </View> */}
                  {/* </View> */}

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => this.changeCode(ConstantValues.couponCode)} disabled={this.state.walletUsed == true ? true : false}>
                      <Text style={[styles.coupontext, { color: this.state.walletUsed == true ? '#636666' : '#149db5' }]}>
                        {this.state.textPromoCode}
                      </Text>
                    </TouchableOpacity>
                    <Fade visible={this.state.textPromoCode == ConstantValues.couponCode ? true : false}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular' }}>---Applied Successfully---</Text>
                        <TouchableOpacity onPress={() => this.removeCoupon()}>
                          <Text style={styles.removetext}>REMOVE</Text>
                        </TouchableOpacity>
                      </View>

                    </Fade>

                  </View>
                </View>
              </View>
              {/* Wallet and Coupon Card ends here */}
              {/* bill detail Card begins here */}
              <View>
                <View style={{ backgroundColor: '#ffffff', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: '#000000' }}>Bill Details</Text>
                  <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} />
                </View>
                <View
                  style={styles.billcard}
                >
                  <View>
                    {/* <Text style={{fontSize:15,fontWeight:'bold',padding:5}}></Text> */}
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>ITEM TOTAL</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.totalBasePrice}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>TOTAL DISCOUNT</Text>
                      <Text style={[styles.tiletext, { color: '#1fc44e' }]}> {ConstantValues.rupee} { this.state.walletUsed == true ? this.state.discount : ConstantValues.couponValue}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>DELIVERY FEE</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.deliveryCharge}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>TOTAL</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.totalPayableAmount}</Text>
                    </View>

                  </View>
                </View>
              </View>
              {/* bill detail Card ends here */}

            </View>
          </View>
        </ScrollView>
        <CustomButton
          style={{ backgroundColor: '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
          onPress={() => this.props.navigation.navigate('PassengerDetail')}
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
    // width: Dimensions.get('window').width - 5,
    // justifyContent: 'center',
    // borderRadius: 100 / 4,
    // marginLeft: 5,
    // marginRight: 10,
    // marginTop: 10,
    // alignItems: 'center',
    // flexDirection: 'row',
    // paddingBottom: 10,
    // paddingLeft: 10,
    // paddingRight: 10
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
    fontFamily: 'Poppins-Bold',
    // textDecorationLine: 'underline'
  },
  removetext: {
    fontSize: 15,
    color: '#b32120',
    fontFamily: 'Poppins-Bold',
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
    fontFamily: 'Poppins-Bold',
    color: '#000000'
  }

});
