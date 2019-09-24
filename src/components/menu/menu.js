import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Switch, SectionList, ScrollView,Image, TouchableOpacity, ActivityIndicator, BackHandler , Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomMenuFAB from '../assests/customMenuFAB.js';
import { Fade } from '../assests/fade.js';
import Modal from "react-native-modal";
import menuApi from './menuApi.js';
import ConstantValues from '../constantValues.js';
import cartApi from '../cart/cartApi.js';



export default class Menu extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getMenu()
    //this.backHandler = BackHandler.addEventListener('hardwareBackPress',this.handleBackPress);    
  }

  constructor(props) {
    super(props);
    this.state = {
      text: 'Add',
      offer: '',
      gstin: '',
      fssaiNo: '',
      loading: false,
      count: 0,
      show: 'Add',
      visibleModal: null,
      totalPrice: 0,
      RecommendedMenuInfo: [],
      OutletMenuInfo: [],
      inCart: [],
      totalCartCount: 0
    };
  }
  // handleBackPress = () => {
  //   return (
  //     Alert.alert(
  //       'Confirm!!',
  //       'Are you sure you want to go back? All items from the cart will be removed.',
  //       [// { text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
  //         {
  //           text: 'NO',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'YES', onPress: () => {
  //             cartApi.resetCart();
  //             console.log('ConstantValues.inCart : ' + ConstantValues.inCart + '\n' + 'ConstantValues.finalCart : ' + ConstantValues.finalCart)
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
    //console.log('ConstantValues.incart items are [when added] : ' + JSON.stringify(ConstantValues.inCart))
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
    //console.log('ConstantValues.incart items are [when added] : ' + JSON.stringify(ConstantValues.inCart))
  }

  cartCalculate = (item) => {
    let totalCartCount = 0
    this.state.inCart.forEach(i => {
      totalCartCount = totalCartCount + i.itemCount
    })
    this.state.totalCartCount = totalCartCount
    console.log('totalCartCount is :  ' + totalCartCount)
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
    );
  };

  //getting menudetails
  async getMenu() {
    this.setState({
      loading: true
    })
    try {
      let response = await menuApi.getMenu();
      // console.log('data received in menu.js : ' + JSON.stringify(response))
      if (response.status == true) {
        this.setState({
          gstin: response.data.outlet.gstin,
          fssaiNo: response.data.outlet.fssaiNo,
          offer: response.data.offer,
          RecommendedMenuInfo: response.data.recommendedItems,
          OutletMenuInfo: response.data.items,
          loading: false
        })


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




  render() {
    const visible = this.state.inCart.length == 0 ? false : true
    // const fssaiVisible = this.state.fssaiNo == null ? false : true
    const uniqueTags = []
    return (
      <SafeAreaView style={styles.slide}>
        {/* <ZoopLoader show={this.state.loading}/> */}
        <ScrollView>
          <View >
            {/* go back navigator icon */}
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Station')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
            </View>
            {/* go back navigator icon ends here */}

            <View style={styles.topContainer}>
              <Text style={styles.outletName}> {ConstantValues.outletName} </Text>
              <Text style={{ fontFamily: 'Poppins-SemiBold', paddingBottom: 10, fontSize: 15 }}>{ConstantValues.stationName}</Text>
              <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                <Text style={{ fontFamily: 'Poppins-Medium'}}>Veg. Only</Text>
                <Switch />
              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: 30, height: 15 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.fssai }} />
                  <Text style={{ fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>Lic No. {this.state.fssaiNo}</Text>
                </View>
                <Text style={{ fontSize: 10, fontFamily: 'Poppins-SemiBold', marginRight: 10 }}>GST No. {this.state.gstin}</Text>
              </View>


              <View
                style={styles.card}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                  <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, marginLeft: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Icon name='star' size={15} color='#ff9214' />
                      <Text style={{ fontFamily: 'Poppins-SemiBold' }}> {ConstantValues.outletRating} </Text>
                    </View>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Rating</Text>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{ConstantValues.rupee} {ConstantValues.minimumOrderValue}</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Min. Order</Text>
                  </View>
                  <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, marginRight: 20 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }}>{ConstantValues.haltTime}</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Halt Time</Text>
                  </View>

                </View>
              </View>
              {/* Offer text label */}
              <Fade visible={this.state.offer.length != 0}>
                <View style={styles.offerboard}>
                  <Text style={styles.offerText}>Offer:- {this.state.offer}</Text>
                </View>
              </Fade>
            </View>
          </View>
          {/*  MENU ITEM STYLES{GRID} */}
          <View style={{ width: Dimensions.get('window').width }}>
            <View style={{ backgroundColor: '#ffffff', flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Recommended Items</Text>
              <Image style={{ alignSelf: 'center', height: 15 }} source={require('../images/line.png')} />
            </View>
            <FlatList
              style={{ width: Dimensions.get('window').width }}
              data={this.state.OutletMenuInfo}
              extraData={this.state}
              renderItem={({ item, index }) =>
                <View>
                  <View style={styles.menuGridCardContainer}>
                    <View>
                      <Image style={styles.itemImage} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.menu }} />
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icons name={'carrot'} size={15} color={item.categoryType == 'Veg' ? '#1e8728' : '#eb0909'} />
                        <Text style={styles.itemName}>{item.itemName}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>
                        <Text style={styles.itemName}>{ConstantValues.rupee} {item.basePrice}</Text>
                        {/* Incrementor starts here */}
                        <View>
                          {/* Adding item to cart button */}
                          <View
                            style={{ alignItems: 'center', width: 80, borderColor: '#1e8728', borderRadius: 100 / 10, borderWidth: 1 }} key={index}>
                            <TouchableOpacity onPress={() => { this.addItemToCart(item, index) }} disabled={item.itemCount == 0 ? false : true}>
                              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { this.removeItemFromCart(item) }} disabled={item.itemCount == 0 ? true : false}>
                                  <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='minus' size={15} color='#1e8728' />
                                </TouchableOpacity>

                                <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#1e8728', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'Add' : item.itemCount}</Text>


                                <TouchableOpacity onPress={() => {
                                  this.addItemToCart(item, index)
                                }}>
                                  <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='plus' size={15} color='#1e8728' />
                                </TouchableOpacity>

                              </View>
                            </TouchableOpacity>
                          </View>
                          {/* Adding item to cart button ends */}
                        </View>
                        {/* Incrementor ends here */}
                      </View>
                    </View>
                  </View>
                </View>
              }
              numColumns={2}
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
                    //to avoid duplicate interies in array
                    if (uniqueTags.indexOf(item.typeName) === -1) {
                      uniqueTags.push(item.typeName)
                    }

                  })
                }{
                  uniqueTags.map((item, index) => {
                    return (
                      <View style={styles.modalItemView} key={index}>
                        <TouchableOpacity>
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

          {/* MENU ITEM STYLES{LIST} */}
          {/* <View style={{ width: Dimensions.get('window').width }}>
            <FlatList
              style={{ margin: 10 }}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              data={this.state.OutletMenuInfo}
              extraData={this.state}
              //  Section Header Rendering
              // renderSectionHeader={({ section }) => (
              //   <View style={{ backgroundColor: '#ffffff', flexDirection: 'row' }}>
              //     <Text style={{ fontSize: 20, fontFamily:'Poppins-SemiBold', color: '#000000' }}>{section.title}</Text>
              //     <Image style={{ alignSelf: 'center', height: 15 }} source={require('../images/line.png')} />
              //   </View>
              // )}
              // Section Item rendering
              renderItem={({ item ,index }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                  <View style={{ width: Dimensions.get('window').width - 200 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Icons name={'carrot'} size={15} color={item.categoryType == 'Veg' ? '#1e8728' : '#eb0909'} />
                      <Text style={{ fontSize: 15, color: '#000000', fontFamily : 'Poppins-SemiBold'}}>{item.itemName}</Text>
                    </View>
                    <Text style={{ fontSize: 15, color: '#000000',fontFamily : 'Poppins-SemiBold' }}>{ConstantValues.rupee} {item.basePrice}</Text>
                    <Text style={{ fontSize: 10, color: '#c7c3c3',fontFamily : 'Poppins-Regular' }}>{item.itemDescription}</Text>
                  </View>
                  <View>


                    <View
                      style={{ alignItems: 'center', width: 80, borderColor: '#1e8728', borderRadius:  100 / 10, borderWidth : 1 }}>
                      <TouchableOpacity onPress={() => { this.addItemToCart(item,index), this.state.totalPrice = item.basePrice }} disabled={item.itemCount == 0 ? false : true}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                          <TouchableOpacity onPress={() => { this.removeItemFromCart(item,index) }} disabled={item.itemCount == 0 ? true : false}>
                            <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='minus' size={15} color='#1e8728' />
                          </TouchableOpacity>

                          <Text style={{ fontFamily:'Poppins-SemiBold', color: '#1e8728', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'Add' : item.itemCount}</Text>


                          <TouchableOpacity onPress={() => {
                            this.addItemToCart(item,index)
                          }}>
                            <Icon style={{ opacity: item.itemCount == 0 ? 0 : 100 }} name='plus' size={15} color='#1e8728' />
                          </TouchableOpacity>

                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>


                </View>
              )}

              keyExtractor={item => item.itemId.toString()}
            />
          </View> */}
        </ScrollView>
        {/* Floating FAB starts */}
        <View >
          <TouchableOpacity onPress={() => { this.setState({ visibleModal: 'bottom' }) }} style={styles.fab}>
            <Icons name={'utensils'} size={15} color={'#ffffff'} />
            <Text style={styles.fabIcon}>MENU</Text>
          </TouchableOpacity>
        </View>
        {/* Floating FAB ends */}
        {/*  Footer  */}
        <Fade visible={visible}>
          <TouchableOpacity onPress={() => {

            this.props.navigation.navigate('Cart', {
              count: this.state.inCart.length,
              totalPrice: this.state.totalPrice
            })
          }}
            disabled={false}>
            <View style={[styles.footer]}>

              <View style={styles.itemCountShow}>
                <Text style={{ marginLeft: 5, fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#ffffff' }}>{this.state.totalCartCount} {this.state.inCart.length == 1 ? 'Item' : 'Items'} |  {ConstantValues.rupee}{this.state.totalPrice}</Text>
              </View>
              <View style={styles.viewcart}>
                <Text style={{ marginRight: 5, fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#ffffff' }}>VIEW CART</Text>
                <Icon name={'shopping-bag'} color={'#ffffff'} size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </Fade>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  topContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  outletName: {
    // paddingTop: 15,
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  card: {
    width: Dimensions.get('window').width,
    height: 100,
    borderRadius: 100 / 4,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    // borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
  },
  // OFFER BOARD STYLES
  offerText: {
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15
  },
  offerboard: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#ff9214',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5
  },
  //  MENU ITEM STYLES{GRID}
  menuGridCardContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: 100 / 5,
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
  },
  itemImage: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2 - 15,
    height: Dimensions.get('window').width / 2 - 100,
    borderRadius: 100 / 5,
  },
  itemName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#0e8341',
    alignContent: 'center',

  },
  viewcart: {
    flexDirection: 'row',
    marginBottom: 15,
    marginRight: 15,
    alignSelf: 'flex-end',

  },
  itemCountShow: {
    flexDirection: 'row',
    marginTop: 15,
    marginRight: 15,
    alignSelf: 'flex-start',
  },
  fab: {
    flexDirection: 'row',
    position: 'absolute',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 100,
    elevation: 8
  },
  fabIcon: {
    marginLeft: 10,
    fontSize: 15,
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
  headerTextmodal: {
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000000',
    paddingVertical: 10
  },
  modalItemView: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
  }
});