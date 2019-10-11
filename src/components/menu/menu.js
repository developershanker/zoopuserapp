import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions,  SectionList, ScrollView, Image, TouchableOpacity, ActivityIndicator, BackHandler, Alert } from 'react-native';
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
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';
import { Switch } from 'react-native-paper';




export default class Menu extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getMenu()
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
      vegOnly:false,
      loading: false,
      count: 0,
      show: 'Add',
      visibleModal: null,
      totalPrice: 0,
      RecommendedMenuInfo: [],
      OutletMenuInfo: [],
      inCart: [],
      totalCartCount: 0,
      isVisible: true,
      onlyVegMenu:[]
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
          isVisible: false
        })
        if (this.state.OutletMenuInfo && this.state.OutletMenuInfo.length) {
          this.setState({
            gstin: response.data.outlet.gstin,
            fssaiNo: response.data.outlet.fssaiNo,
            offer: response.data.offer,
            RecommendedMenuInfo: response.data.recommendedItems,
            OutletMenuInfo: response.data.items,
            isVisible: false
          })
          this.setState({
            onlyVegMenu: this.state.OutletMenuInfo.filter((item) => {
              //console.log('item`s categoryType are:   ' + item.categoryType)
              return item.categoryType == 'Veg'
            })
          })
           // console.log('Veg Items are:' + JSON.stringify(this.state.onlyVegMenu))
          
        } else {
          return(
            
            Alert.alert(
              'Alert!!',
              'No Items to display.Select another station',
              [
                {
                  text: 'OK',onPress: () => this.props.navigation.navigate('Station') ,
                  style:'cancel'
                },
              ],
              { cancelable: false },
            )
          )
        }


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
      if(ConstantValues.customerId != ''){
        ConstantValues.walletBalanceUsed = 0
        ConstantValues.couponValue = 0
        this.props.navigation.navigate('Cart')
      console.log('neither minimumorder issue nor login issue')
      }else{
        ConstantValues.navigationChannel = 'Cart'
        return (
          // ToastAndroid.show(response.error, ToastAndroid.LONG),
         
            Alert.alert(
              'Alert!!',
              'Please LOGIN to Proceed.',
              [
                {
                  text: 'OK',onPress: () => this.props.navigation.navigate('Welcome') ,
                  style:'cancel'
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
              'Order should be atleast Rs.'+ConstantValues.minimumOrderValue,
              [
                {
                  text: 'OK',
                  style:'cancel'
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
      this.flatListRef.scrollToEnd({animated: true});
      console.log("Item scrolled is....." + item)
    }
  

  

  render() {
    const visible = this.state.inCart.length == 0 ? false : true
    // const fssaiVisible = this.state.fssaiNo == null ? false : true
    const uniqueTags = []
    return (
      <SafeAreaView style={styles.slide}>
        {/* <ZoopLoader show={this.state.loading}/> */}
        <View style={{ width: Dimensions.get('window').width,alignItems: 'center',justifyContent: 'center',backgroundColor: '#ffffff'}}>
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
            <Text style={{ fontFamily: 'Poppins-Regular' }}>Veg. Only</Text>
            <Switch
              value={this.state.vegOnly}
              onValueChange={
                (vegOnly) => this.setState({ vegOnly })
               }
              
            />
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
            <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Medium', color: '#000000' }}>Recommended Items</Text>
              {/* <Image style={{ alignSelf: 'center', height: 15 }} source={require('../images/line.png')} /> */}
            </View>
            <FlatList
              style={{ width: Dimensions.get('window').width }}
              onContentSizeChange={() => this.flatListRef.scrollToEnd({animated: true})}
              onLayout={() => this.flatListRef.scrollToEnd({animated: true})}
              ref={(ref) => { this.flatListRef = ref; }}
              data={this.state.vegOnly == true ? this.state.onlyVegMenu : this.state.OutletMenuInfo}
              extraData={this.state}
              renderItem={({ item, index }) =>
                <View>
                  <View style={styles.menuCardContainer}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                      <View style={{ flexDirection: 'column', paddingHorizontal: 5, paddingVertical: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 5, paddingHorizontal: 5 }}>

                          <View style={{ paddingTop: 8}}>
                            <Image style={{ width: 15, height: 15, }} source={{ uri: item.categoryType == 'Veg' ? ConstantValues.IconUrl + ConstantValues.imgurl.veg : ConstantValues.IconUrl + ConstantValues.imgurl.nonveg }} />
                          </View>

                          <View style={{ flexDirection: 'column', paddingHorizontal: 5, paddingVertical: 5 }}>
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={{ width: 200, fontSize: 10, color: '#898c8b', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, }}>{item.itemDescription}</Text>
                            <Text style={styles.itemName}>{ConstantValues.rupee} {item.basePrice}</Text>
                          </View>

                        </View>

                      </View>
                      {/* Incrementor starts here */}
                      <View style={{ flexDirection: 'column', paddingVertical: 5, justifyContent: 'center', alignItems: 'center', width: 150 }}>
                        {/* <Fade visible={item.image != null}>
                          <Image style={styles.itemImage} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.menu }} />
                        </Fade> */}
                        <View>

                          {/* Adding item to cart button */}
                          <View
                            style={{ alignItems: 'center', width: 90, borderColor: '#d4d4d4', borderRadius: 6, borderWidth: 1 }} key={index}>
                            <TouchableOpacity onPress={() => { this.addItemToCart(item, index) }} disabled={item.itemCount == 0 ? false : true}>
                              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => { this.removeItemFromCart(item,index) }} disabled={item.itemCount == 0 ? true : false}>
                                  <View style={[styles.plusminus,{opacity: item.itemCount == 0 ? 0 : 100}]}>
                                    <Icon name='minus' size={10} color='#60b246' />
                                  </View>

                                </TouchableOpacity>

                                <Text style={{ fontFamily: 'Poppins-Medium', color: '#60b246', margin: 5, paddingLeft: 5, paddingRight: 5}}>{item.itemCount == 0 ? 'ADD' : item.itemCount}</Text>


                                <TouchableOpacity onPress={() => {
                                  this.addItemToCart(item, index)
                                }}>
                                  <View style={[styles.plusminus, { opacity: item.itemCount == 0 ? 0 : 100}]}>
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
                }{
                  uniqueTags.map((item, index) => {
                    return (
                      <View style={styles.modalItemView} key={index}>
                        <TouchableOpacity onPress={()=>this.scrollToTag(index)}>
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
              //     <Text style={{ fontSize: 20, fontFamily:'Poppins-Medium', color: '#000000' }}>{section.title}</Text>
              //     <Image style={{ alignSelf: 'center', height: 15 }} source={require('../images/line.png')} />
              //   </View>
              // )}
              // Section Item rendering
              renderItem={({ item ,index }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                  <View style={{ width: Dimensions.get('window').width - 200 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Icons name={'carrot'} size={15} color={item.categoryType == 'Veg' ? '#60b246' : '#eb0909'} />
                      <Text style={{ fontSize: 15, color: '#000000', fontFamily : 'Poppins-Medium'}}>{item.itemName}</Text>
                    </View>
                    <Text style={{ fontSize: 15, color: '#000000',fontFamily : 'Poppins-Medium' }}>{ConstantValues.rupee} {item.basePrice}</Text>
                    <Text style={{ fontSize: 10, color: '#c7c3c3',fontFamily : 'Poppins-Regular' }}>{item.itemDescription}</Text>
                  </View>
                  <View>


                    <View
                      style={{ alignItems: 'center', width: 80, borderColor: '#60b246', borderRadius:  100 / 10, borderWidth : 1 }}>
                      <TouchableOpacity onPress={() => { this.addItemToCart(item,index), this.state.totalPrice = item.basePrice }} disabled={item.itemCount == 0 ? false : true}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                          <TouchableOpacity onPress={() => { this.removeItemFromCart(item,index) }} disabled={item.itemCount == 0 ? true : false}>
                            <Icon style={[styles.plusminus,{opacity: item.itemCount == 0 ? 0 : 100}]}} name='minus' size={15} color='#60b246' />
                          </TouchableOpacity>

                          <Text style={{ fontFamily:'Poppins-Medium', color: '#60b246', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{item.itemCount == 0 ? 'Add' : item.itemCount}</Text>


                          <TouchableOpacity onPress={() => {
                            this.addItemToCart(item,index)
                          }}>
                            <Icon style={[styles.plusminus,{opacity: item.itemCount == 0 ? 0 : 100}]}} name='plus' size={15} color='#60b246' />
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
        {/* <View >
          <TouchableOpacity onPress={() => { this.setState({ visibleModal: 'bottom' }) }} style={styles.fab}>
            <Icons name={'utensils'} size={15} color={'#ffffff'} />
            <Text style={styles.fabIcon}>MENU</Text>
          </TouchableOpacity>
        </View> */}
        {/* Floating FAB ends */}
        {/*  Footer  */}
        <Fade visible={visible}>
          <TouchableOpacity onPress={() => this.checkCart() }
            disabled={false}>
            <View style={[styles.footer]}>

              <View style={styles.itemCountShow}>
                <Text style={{ marginLeft: 5, fontSize: 18, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>{this.state.totalCartCount} {this.state.inCart.length == 1 ? 'Item' : 'Items'} |  {ConstantValues.bigrupee}{this.state.totalPrice}</Text>
              </View>
              <View style={styles.viewcart}>
                <Text style={{ marginRight: 5, fontSize: 18, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>VIEW CART</Text>
                <Icon name={'shopping-bag'} color={'#ffffff'} size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </Fade>
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
    textAlign:'center',
    alignSelf:'center',
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Poppins-Medium',
  },
  card: {
    width: Dimensions.get('window').width,
    height: 60,
    borderRadius: 6,
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
    borderBottomWidth: 2,
  },
  // OFFER BOARD STYLES
  offerText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
    fontSize: 15
  },
  plusminus: {
    width: 30,
    justifyContent:'center',
    alignItems:'center',
    height:30,
    borderRadius:6
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
  menuCardContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: Dimensions.get('window').width - 10,
    borderRadius: 6,
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    // borderColor: '#e4e4e4',
    // borderWidth: 1,
    shadowOpacity: 0.4,
  },
  itemImage: {
    marginVertical: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 95,
    height: 95,
    borderRadius: 5,
  },
  itemName: {
    paddingHorizontal: 5,
    width: 200,
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    color: '#000000'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: '#60b246',
    alignContent: 'center',
    alignItems:'center'

  },
  viewcart: {
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 15,
    alignSelf: 'flex-end'
  
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
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
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