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
import menuApi from './menuApi.js';
import ConstantValues from '../constantValues.js';
import cartApi from '../cart/cartApi.js';
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';
import { Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/actions';


/////-----------Redux Imports-----------///////////
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from '../../store'
import { MenuLoader } from './MenuLoader.js';
import styles from './menuCss.js';




export class Menu extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getMenu();
    //this.props.addToCart()
    // this.refreshCart()
    //this.enableOnlyVeg()
    //this.backHandler = BackHandler.addEventListener('hardwareBackPress',this.handleBackPress);    
  }

  constructor(props) {
    super(props);
    this.state = {
      text: 'Add',
      offer: '',
      gstin: '',
      fssaiNo: '',
      vegOnly: false,
      loading: false,
      count: 0,
      show: 'Add',
      visibleModal: null,
      totalPrice: 0,
      zoopPrice: 0,
      RecommendedMenuInfo: [],
      OutletMenuInfo: [],
      inCart: [],
      totalCartCount: 0,
      isVisible: true,
      onlyVegMenu: [],
      allMenu: [],
    };
  }
  // handleBackPress = () => {
  //   return (
  //     Alert.alert(
  //       'Confirm!!',
  //       'Are you sure you want to go back? All items from the cart will be removed.',
  // [// { text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //         {
  //           text: 'NO',
  // onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'YES', onPress: () => {
  //             cartApi.resetCart();
  // console.log('ConstantValues.inCart : ' + ConstantValues.inCart + '\n' + 'ConstantValues.finalCart : ' + ConstantValues.finalCart)
  //             return true
  //           }
  //         },
  //       ],
  //       { cancelable: false },
  //     )
  //   )
  // }


  addItemToCart = (item, index) => {
    let itemId = item.itemId
    let inCart = this.state.inCart

    item.itemCount = item.itemCount + 1
    this.setState({
      count: item.itemCount
    }
    )
    // this.state.totalCartCount += item.itemCount 
    this.state.totalPrice += item.basePrice  //price adding calculation
    ConstantValues.totalBasePrice = this.state.totalPrice
    this.state.zoopPrice += item.zoopPrice    //zoopprice adding calculation 
    ConstantValues.totalZoopPrice = this.state.zoopPrice
    let idx = this.state.inCart.findIndex(i => { return i.itemId == item.itemId })
    console.log('idx items are  : ' + idx)
    if (idx > -1) {
      this.state.inCart[idx].itemCount = this.state.inCart[idx].itemCount + 1;
    } else {
      this.state.inCart.push(Object.assign({}, item))
    }
    console.log('incart items are [when added] : ' + JSON.stringify(this.state.inCart))
    // console.log('incart item.itemCount when ++++ : ' + item.itemCount)
    ConstantValues.inCart = this.state.inCart
    this.cartCalculate(item)
    // console.log('ConstantValues.incart items are [when added] : ' + JSON.stringify(ConstantValues.inCart))
  }

  removeItemFromCart = (item, index) => {
    let itemId = item.itemId
    let inCart = this.state.inCart

    item.itemCount = item.itemCount - 1
    this.setState({
      count: item.itemCount
    }
    )

    this.state.totalPrice -= item.basePrice //price calculation
    ConstantValues.totalBasePrice = this.state.totalPrice
    this.state.zoopPrice -= item.zoopPrice    //zoopprice calculation 
    ConstantValues.totalZoopPrice = this.state.zoopPrice
    let idx = this.state.inCart.findIndex(i => { return i.itemId == item.itemId })
    console.log('idx items are  : ' + idx)
    if (idx > -1) {
      if (this.state.inCart[idx].itemCount == 1) {
        this.state.inCart.splice(idx)
      } else {
        this.state.inCart[idx].itemCount = this.state.inCart[idx].itemCount - 1;
        this.state.totalCartCount -= item.itemCount
      }
    }
    console.log('incart items are [when removed] : ' + JSON.stringify(this.state.inCart))
    // console.log('incart item.itemCount when ++++ : ' + item.itemCount)
    ConstantValues.inCart = this.state.inCart
    this.cartCalculate(item)
    // console.log('ConstantValues.incart items are [when added] : ' + JSON.stringify(ConstantValues.inCart))
  }

  cartCalculate = (item) => {
    let totalCartCount = 0
    this.state.inCart.forEach(i => {
      totalCartCount = totalCartCount + i.itemCount
    })
    this.state.totalCartCount = totalCartCount
    console.log('totalCartCount is :  ' + totalCartCount)
  }

  // FlatListItemSeparator = () => {
  //   this.state.OutletMenuInfo.map((item, index) => {
  //     return (
  //       //Item Separator
  //       // <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
  //       <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 5 }} >
  //         <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>{item.typeName}</Text>
  //       </View>
  //     )
  //   }
  //   )
  // };

  //getting menudetails
   getMenu() {
    this.setState({
      loading: true
    })
    try {
      // let response = await menuApi.getMenu();
      console.log('ConstantValues.OutletMenuInfo : ' + ConstantValues.OutletMenuInfo)
      if (ConstantValues.OutletMenuInfo && ConstantValues.OutletMenuInfo.length) {
        this.setState({
          gstin: ConstantValues.gstIn,
          fssaiNo: ConstantValues.fssaiNo,
          offer: ConstantValues.offer,
          RecommendedMenuInfo: ConstantValues.RecommendedMenuInfo,
          OutletMenuInfo: ConstantValues.OutletMenuInfo,
          allMenu: ConstantValues.OutletMenuInfo,
          isVisible: false
        })
        this.setState({
          onlyVegMenu: ConstantValues.OutletMenuInfo.filter((item) => {
            // console.log('item`s categoryId are:   ' + item.categoryId)
            return item.categoryId === 1
          })
        })
        // if (this.state.OutletMenuInfo && this.state.OutletMenuInfo.length) {
        //   this.setState({
        //     gstin: ConstantValues.gstIn,
        //     fssaiNo: ConstantValues.fssaiNo,
        //     offer: ConstantValues.offer,
        //     RecommendedMenuInfo: ConstantValues.RecommendedMenuInfo,
        //     OutletMenuInfo: ConstantValues.OutletMenuInfo,
        //     allMenu: ConstantValues.OutletMenuInfo,
        //     isVisible: false
        //   })
        //   this.setState({
        //     onlyVegMenu: this.state.OutletMenuInfo.filter((item) => {
        //       //console.log('item`s categoryId are:   ' + item.categoryId)
        //       return item.categoryId === 1
        //     })
        //   })
        //   // console.log('Veg Items are:' + JSON.stringify(this.state.onlyVegMenu))

        // } else {
        //   return (

        //     Alert.alert(
        //       'Alert!!',
        //       'No Items to display.Select another outlet',
        //       [
        //         {
        //           text: 'OK', onPress: () => this.props.navigation.navigate('Station'),
        //           style: 'cancel'
        //         },
        //       ],
        //       { cancelable: false },
        //     )
        //   )
        // }


      } else {
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG),
          console.log(response.error)
        )
      }

    } catch (error) {
      console.log('Data received in menu.js catch: ' + error)
    }
  }

  checkCart() {
    if (this.state.totalPrice >= ConstantValues.minimumOrderValue) {
      if (ConstantValues.customerId != '') {
        cartApi.removeCoupon()
        ConstantValues.walletBalanceUsed = 0
        ConstantValues.couponValue = 0
        this.props.navigation.navigate('Cart')
        console.log('neither minimumorder issue nor login issue')
      } else {
        ConstantValues.navigationChannel = 'Cart'
        return (
          // ToastAndroid.show(response.error, ToastAndroid.LONG),

          Alert.alert(
            'Alert!!',
            'Please LOGIN to Proceed.',
            [
              {
                text: 'OK', onPress: () => this.props.navigation.navigate('Welcome'),
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        ),
          console.log('Login issue')
      }


    } else {

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


  scrollToTag = (item) => {
    this.setState({ visibleModal: null })
    this.flatListRef.scrollToEnd({ animated: true });
    console.log("Item scrolled is....." + item)
  }
  // listHeader = () => {
  //   return (
  //     <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 10 }}>

  //       <Text style={{ fontSize: 15, fontFamily: 'Poppins-Medium', color: '#000000' }}>This is Header</Text>

  //     </View>
  //   )
  // }




  render() {
    const visible = this.state.inCart.length == 0 ? false : true
    // const fssaiVisible = this.state.fssaiNo == null ? false : true
    const uniqueTags = []
    const uniqueHeader = []
    let prevtypeName = ''
    let flag = 0
    const newFlag = 0
    return ( this.state.isVisible === true ? <MenuLoader visible = {this.state.isVisible}/> :
      <SafeAreaView style={styles.slide}>
        {/* <ZoopLoader show={this.state.loading}/> */}
        <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
          <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width }}>
            <View style={{ justifyContent: 'flex-start', alignContent: 'flex-start', padding: 20 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Station')}>
                <Icon name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width - 80, paddingTop: 10 }}>
              <Text style={styles.outletName}> {ConstantValues.outletName} </Text>
              <Text style={{ fontFamily: 'Poppins-Medium', paddingBottom: 10, fontSize: 15 }}>{ConstantValues.stationName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
            {/* <Text style={{ fontFamily: 'Poppins-Regular' }}>Veg. Only</Text> */}
            <ToggleSwitch
              isOn={this.state.vegOnly}
              onColor="green"
              offColor="grey"
              label="Veg. Only"
              labelStyle={{ fontFamily: 'Poppins-Regular' }}
              size="medium"
              onToggle={
                vegOnly => {
                  this.setState({ vegOnly })
                  if (vegOnly === true) {
                    this.setState({
                      OutletMenuInfo: this.state.onlyVegMenu
                    })
                    console.log("vegOnly === true : ", vegOnly)
                  } else {
                    this.setState({
                      OutletMenuInfo: this.state.allMenu
                    })
                    console.log("else : ", vegOnly)
                  }
                  console.log("normal", vegOnly)
                }
              }
            />
            {/* <Switch
              value={this.state.vegOnly}
              onValueChange={
                (vegOnly) => this.setState({ vegOnly })
              }

            /> */}
          </View>
        </View>
        <ScrollView>
          <View >
            {/* go back navigator icon */}
            {/* <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Station')}>
                <Icon name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
            </View> */}
            {/* go back navigator icon ends here */}

            <View style={styles.topContainer}>



              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Image style={{ width: 30, height: 15 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.fssai }} /> */}
                  <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular' }}> fssai Lic No. {this.state.fssaiNo}</Text>
                </View>
                <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular', marginRight: 10 }}>GST No. {this.state.gstin}</Text>
              </View>


              <View
                style={styles.card}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                  <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, marginLeft: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name='star' size={15} color='#ff9214' />
                      <Text style={{ fontFamily: 'Poppins-Regular' }}> {ConstantValues.outletRating} </Text>
                    </View>
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>Rating</Text>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>{ConstantValues.rupee} {ConstantValues.minimumOrderValue}</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>Min. Order</Text>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, marginRight: 20 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>{ConstantValues.haltTime} minutes</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>Halt Time</Text>
                  </View>

                </View>
              </View>
              {/* Offer text label */}
              {/* <Fade visible={this.state.offer.length != 0}>
                <View style={styles.offerboard}>
                  <Text style={styles.offerText}>Offer:- {this.state.offer}</Text>
                </View>
              </Fade> */}
            </View>
          </View>
          {/*  MENU ITEM STYLES{GRID} */}
          <View style={{ width: Dimensions.get('window').width }}>
            {/* <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Medium', color: '#000000' }}>Recommended Items</Text>
            </View> */}

            <FlatList
              style={{ width: Dimensions.get('window').width }}
              onContentSizeChange={() => this.flatListRef.scrollToEnd({ animated: true })}
              onLayout={() => this.flatListRef.scrollToEnd({ animated: true })}
              ref={(ref) => { this.flatListRef = ref; }}
              data={this.state.OutletMenuInfo}
              // this.state.vegOnly == true ? this.state.onlyVegMenu : this.state.OutletMenuInfo
              extraData={this.state}
              renderItem={({ item, index }) =>

                <View>

                  <Fade visible={index == 0 ? true : index > 0 && (item.typeName != this.state.OutletMenuInfo[index - 1].typeName)}>
                    <View style={{ width: Dimensions.get('window').width - 10, backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 15 }} >
                      {/* <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} /> */}
                      <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>{item.typeName}</Text>
                    </View>
                  </Fade>

                  <View style={styles.menuCardContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                      <View style={{ flexDirection: 'column', paddingHorizontal: 5, paddingVertical: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 5, paddingHorizontal: 5 }}>

                          <View style={{ paddingTop: 8 }}>
                            <Image style={{ width: 15, height: 15, }} source={{ uri: item.categoryId === 1 ? ConstantValues.IconUrl + ConstantValues.imgurl.veg : ConstantValues.IconUrl + ConstantValues.imgurl.nonveg }} />
                          </View>

                          <View style={{ flexDirection: 'column', paddingHorizontal: 5, paddingVertical: 5 }}>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={{ width: 200, fontSize: 10, color: '#898c8b', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, }}>{item.itemDescription}</Text>
                            <Text style={styles.itemName}>{ConstantValues.rupee} {item.basePrice}</Text>
                          </View>

                        </View>

                      </View>
                      {/* Incrementor starts here */}
                      <View style={{ flexDirection: 'column', paddingVertical: 5, justifyContent: 'center', alignItems: 'flex-end', width: 150, paddingRight: 15 }}>
                        {/* <Fade visible={item.image != null}>
                          <Image style={styles.itemImage} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.menu }} />
                        </Fade> */}
                        <View>

                          {/* Adding item to cart button */}
                          <View
                            style={{ alignItems: 'center', width: 90, borderColor: '#d4d4d4', borderRadius: 6, borderWidth: 1 }} key={index}>
                            <TouchableOpacity onPress={() => { this.addItemToCart(item, index) }} disabled={item.itemCount == 0 ? false : true}>
                              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => { this.removeItemFromCart(item, index) }} disabled={item.itemCount == 0 ? true : false}>
                                  <View style={[styles.plusminus, { opacity: item.itemCount == 0 ? 0 : 100 }]}>
                                    <Icon name='minus' size={10} color='#60b246' />
                                  </View>

                                </TouchableOpacity>

                                <Text style={{ fontFamily: 'Poppins-Medium', color: '#60b246', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'ADD' : item.itemCount}</Text>


                                <TouchableOpacity onPress={() => {
                                  this.addItemToCart(item, index)
                                }}>
                                  <View style={[styles.plusminus, { opacity: item.itemCount == 0 ? 0 : 100 }]}>
                                    <Icon name='plus' size={10} color='#60b246' />
                                  </View>
                                </TouchableOpacity>

                              </View>
                            </TouchableOpacity>
                          </View>
                          {/* Adding item to cart button ends */}
                        </View>
                      </View>
                      {/* Incrementor ends here */}

                    </View>
                  </View>
                </View>

              }
              keyExtractor={(item) => item.itemId.toString()}
            />

          </View>

          {/* Headerhighlighter starts */}
          <View style={{ flex: 1 }}>
            <Modal
              isVisible={this.state.visibleModal === 'bottom'}
              onBackButtonPress={() => this.setState({ visibleModal: null })}
              onSwipeComplete={() => this.setState({ visibleModal: null })}
              swipeDirection={['left', 'right', 'down']}
              style={styles.bottomModal}
            >
              <View style={styles.modalView}>
                {
                  this.state.OutletMenuInfo.map((item) => {

                    //to avoid duplicate enteries in array
                    if (uniqueTags.indexOf(item.typeName) === -1) {
                      uniqueTags.push(item.typeName)
                    }

                  })
                }
                {
                  uniqueTags.map((item, index) => {
                    return (
                      <View style={styles.modalItemView} key={index}>
                        <TouchableOpacity onPress={() => this.scrollToTag(index)}>
                          <Text style={styles.headerTextmodal}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </View>
            </Modal>
          </View>

          {/* Headerhighlighter ends */}


        </ScrollView>
        {/* Floating FAB starts */}
        {/* <View >
          <TouchableOpacity onPress={() => { this.setState({ visibleModal: 'bottom' }) }} style={styles.fab}>
            <Icons name={'utensils'} size={15} color={'#ffffff'} />
            <Text style={styles.fabIcon}>MENU</Text>
          </TouchableOpacity>
        </View> */}
        {/* Floating FAB ends */}
        {/*  Footer  */}
        <Fade visible={visible}>
          <TouchableOpacity onPress={() => this.checkCart()}
            disabled={false}>
            <View style={[styles.footer]}>

              <View style={styles.itemCountShow}>
                <Text style={{ marginLeft: 5, fontSize: 18, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>{this.state.totalCartCount} {this.state.inCart.length == 1 ? 'Item' : 'Items'} |  {ConstantValues.bigrupee} {this.state.totalPrice}</Text>
              </View>
              <View style={styles.viewcart}>
                <Text style={{ marginRight: 5, fontSize: 18, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>VIEW CART</Text>
                <Icon name={'shopping-bag'} color={'#ffffff'} size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </Fade>
        {/* <Overlay
          isVisible={this.state.isVisible}
          width="auto"
          height="auto"
          // windowBackgroundColor='rgba(255, 255, 255, .5)'
          // overlayBackgroundColor='#ffffff'
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <ZoopLoader isVisible={true} text={'Loading...'} />

        </Overlay> */}
      </SafeAreaView>
    );
  }
}

export default connect(null, { addToCart })(Menu);