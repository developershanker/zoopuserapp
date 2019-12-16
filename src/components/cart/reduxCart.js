import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, SectionList, ScrollView, Image, TouchableOpacity, ActivityIndicator, BackHandler, Alert, ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomMenuFAB from '../assests/customMenuFAB.js';
import ToggleSwitch from 'toggle-switch-react-native'
import { Fade } from '../assests/fade.js';
import Modal from "react-native-modal";
import ConstantValues from '../constantValues.js';
import cartApi from '../cart/cartApi.js';
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';
import { Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import * as menuAction from '../../actions/menuAction'
import { CustomButton } from '../assests/customButtonLarge.js';
import styles from './cartCss.js';
import Counter from '../assests/counter.js';

export class ReduxCart extends Component {
  // componentDidMount(){
  //   document.addEventListener('fullscreenchange',this.props.cart)
  // }

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
      totalPayableAmount: 0,
      textPromoCode: 'Apply Coupon Code',
      visibleModal: null,
      couponCode: '',
      CouponDetail: [],
      arrayCoupon: [],
      itemFromCart: [],
      OutletMenuInfo: []
    };
  }

  gobackToMenu() {
    ConstantValues.inCart = []
    ConstantValues.finalCart = []
    this.props.navigation.navigate('ReduxMenu')
  }
  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', width: ConstantValues.deviceWidth, }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ReduxMenu')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 25, color: '#000000' }}> Cart </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ flexDirection: 'column', width: ConstantValues.deviceWidth, justifyContent: 'center', width: Dimensions.get('window').width, alignItems: 'center', marginVertical: 5 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, color: '#000000', fontFamily: 'Poppins-Medium', }}>{ConstantValues.outletName}</Text>
              <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-Medium', }}>{ConstantValues.stationName}</Text>
            </View>

            {/* Selected Items list */}
            <View style={{ width: ConstantValues.deviceWidth, }}>
              <View style={styles.card}>
                {/* <Fade visible={this.props.cart.length == 0 ? true : false}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', }}>Cart Is Empty</Text>
                    <CustomButton
                      title='Add Items'
                      onPress={() => this.gobackToMenu()
                      }
                    />
                  </View>
                </Fade> */}
                <FlatList
                  style={{ width: ConstantValues.deviceWidth - 20, paddingVertical: 5 }}
                  data={this.props.cart}
                  extraData={this.props}
                  renderItem={({ item, index }) =>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, }}>
                      <View style={{ width: 30, alignItems: 'center' }}>
                        <Image style={{ width: 15, height: 15 }} source={{ uri: item.categoryId === 1 ? ConstantValues.IconUrl + ConstantValues.imgurl.veg : ConstantValues.IconUrl + ConstantValues.imgurl.nonveg }} />
                      </View>

                      <Text style={{ fontSize: 13, fontFamily: 'Poppins-Regular', width: 130 }}>{item.itemName}</Text>
                      {/* Adding item to cart button */}
                      <View style={{ width: 200, flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around' }}>
                        <Counter
                          style={{ alignItems: 'center', width: 90, height: 30, borderColor: '#d4d4d4', borderRadius: 6, borderWidth: 1 }}
                          // key={index}
                          itemCount={item.itemCount}
                          onPressAdd={() => { this.props.addItemToCart(item, index) }}
                          onPressRemove={() => { this.props.removeItemFromCart(item, index) }}
                        />
                        {/* <View
                          style={{ alignItems: 'center', width: 90,height: 30, borderColor: '#d4d4d4', borderRadius: 6, borderWidth: 1 }} key={index}>
                          <TouchableOpacity onPress={() => { this.props.addItemToCart(item, index) }} disabled={item.itemCount == 0 ? false : true}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
                              <TouchableOpacity onPress={() => { this.props.removeItemFromCart(item, index) }} disabled={item.itemCount == 0 ? true : false}>
                                <View style={[styles.plusminus, { opacity: item.itemCount == 0 ? 0 : 100 }]}>
                                  <Icon name='minus' size={10} color='#60b246' />
                                </View>

                              </TouchableOpacity>

                              <Text style={{ fontFamily: 'Poppins-Medium', color: '#60b246', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'ADD' : item.itemCount}</Text>


                              <TouchableOpacity onPress={() => {
                                this.props.addItemToCart(item, index)
                              }}>
                                <View style={[styles.plusminus, { opacity: item.itemCount == 0 ? 0 : 100 }]}>
                                  <Icon name='plus' size={10} color='#60b246' />
                                </View>
                              </TouchableOpacity>

                            </View>
                          </TouchableOpacity>
                        </View> */}

                        {/* Adding item to cart button ends here */}
                        <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', }}>{ConstantValues.rupee} {item.basePrice}</Text>
                      </View>
                    </View>
                  }
                  keyExtractor={(item) => item.itemId.toString()}
                />
              </View>
              {/* itemCard ends here */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const mapStateToProp = state => {
  return {
    loading: state.loading,
    cart: state.cart
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (item) => dispatch(menuAction.addItemToCart(item)),
    removeItemFromCart : (item) => dispatch(menuAction.removeItemFromCart(item))
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(ReduxCart)