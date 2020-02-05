import React, { Component } from 'react';
import { View, Text, Alert, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity, FlatList, RefreshControl, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import { CustomButtonShort } from '../assests/customButtonShort';
import orderApi from '../orderBooking/orderApi.js';
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';
import moment from "moment";
import OrderDetailConstants from '../orderDetailConstants.js';
import Colors from '../colors.js';
import { Separator } from '../../components/separator'



export default class MyOrders extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.tokenAsync()
  }
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      orderHistory: [],
      rawData: [],
      isVisible: true,
      detailViewModal: null,
      detailItem: [],
      isRefreshing: false,
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      userToken: '',
      customerId: ''
    };
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    console.log('I am back on My Orders')
    // this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
    this.props.navigation.navigate('Search')
    return true;
  };
  // Fetch the token from storage then navigate to our appropriate place
  tokenAsync = async () => {
    try {
      const storedValues = await AsyncStorage.getItem('userInfo')
      // console.log('JSON.stringify(storedValues) : ' + JSON.stringify(storedValues))
      console.log('storedValues : ' + storedValues)
      //  storedValues : {"userToken":"pbkdf2_sha256$55000$UxLacxq6kwQ=$GqbBXFV+Kircxzvwf14je+wWpWa8+fxNnvcTaItB2xY=","customerId":2}
      let userInfo = JSON.parse(storedValues)
      let userToken = userInfo.userToken
      let customerId = userInfo.customerId
      console.log('Getting token from localstorage : ' + userToken)
      console.log('Getting CustomerId from localstorage : ' + customerId)
      if (userToken != '') {
        this.setState({ userToken: userToken, customerId: customerId })
        this.orderHistory(userToken, customerId, this.page)
      } else {
        return (
          Alert.alert(
            'Need Login!!',
            'Please LOGIN to Proceed.',
            [
              {
                text: 'OK', onPress: () => {
                  this.setState({ isVisible: false })
                  ConstantValues.navigationChannel = 'Search'
                  this.props.navigation.navigate('Welcome')
                },
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      }

    } catch (error) {
      // this.props.navigation.navigate('App')
      console.log('Error in getting stored value from asyncstorage: ' + error)
      return (
        Alert.alert(
          'Need Login!!',
          'Please LOGIN to Proceed.',
          [
            {
              text: 'OK', onPress: () => {
                this.setState({ isVisible: false })
                this.props.navigation.navigate('Welcome')
              },
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      )
    }

  };

  async onRefresh(userToken, customerId, page) {
    this.setState({ isRefreshing: true });
    try {
      let response = await orderApi.orderHistory(userToken, customerId, page);
      if (response.status == true) {
        this.setState({
          orderHistory: response.data,
          rawData:response.data,
          isRefreshing: false
        })
        if (this.state.orderHistory && this.state.orderHistory.length) {
          this.setState({
            orderHistory: response.data,
            rawData:response.data,
            isRefreshing: false
          })
        } else {
          return (
            Alert.alert(
              'No Order Found!',
              'Please Book Order!!',
              [
                {
                  text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                  style: 'cancel'
                },
              ],
              { cancelable: false },
            )
          ),
            this.setState({
              isRefreshing: false
            })
        }
      }
    } catch (error) {
      this.setState({
        isRefreshing: false
      });
      console.log('Data received in myOrder.js catch: ' + error)
    }
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator color={Colors.newOrange} size={20} />
    );
  };

  async handleLoadMore() {
    if (!this.state.loading) {
      this.page = this.page + 1; // increase page by 1
      // method for API call 
      if (this.state.rawData.length !== 0) {
        try {
          let response = await orderApi.orderHistory(this.state.userToken, this.state.customerId, this.page);
          if (response.status === true) {
            if (this.state.orderHistory && this.state.orderHistory.length) {
              let listData = this.state.orderHistory
              let data = listData.concat(response.data)
              this.setState({
                orderHistory: data,
                isVisible: false,
                rawData: response.data
              })
              console.log('this.state.rawData.length::::' + this.state.rawData.length)
              // if (this.state.rawData.length === 0) {
              //   return 0;
              // }
            } else {
              return (
                <Text style={styles.tiletext}>
                  List Ends
              </Text>
              )
              // return (
              //   Alert.alert(
              //     'No Order Found!',
              //     'Please Book Order!!',
              //     [
              //       {
              //         text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
              //         style: 'cancel'
              //       },
              //     ],
              //     { cancelable: false },
              //   )
              // ),
              //   this.setState({
              //     isVisible: false
              //   })
            }
          }
        } catch (error) {
          console.log('Data received in myOrder.js catch: ' + error)
        }
      } else {
        console.log('Empty Array found')
      }
    }
  };

  async orderHistory(userToken, customerId, page) {
    try {
      let response = await orderApi.orderHistory(userToken, customerId, page);
      if (response.status == true) {
        this.setState({
          orderHistory: response.data,
          isVisible: false
        })
        if (this.state.orderHistory && this.state.orderHistory.length) {
          this.setState({
            rawData:response.data,
            orderHistory: response.data,
            isVisible: false
          })
        } else {
          return (
            Alert.alert(
              'No Order Found!',
              'Please Book Order!!',
              [
                {
                  text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                  style: 'cancel'
                },
              ],
              { cancelable: false },
            )
          ),
            this.setState({
              isVisible: false
            })
        }
      }
    } catch (error) {
      console.log('Data received in myOrder.js catch: ' + error)
    }
  }

  viewOrderDetail = (item) => {
    OrderDetailConstants.orderId = item.orderId
    this.props.navigation.navigate('MyOrderDetail')
  }

  renderOrderDetail = (item) => {

    OrderDetailConstants.data = item
    OrderDetailConstants.zoopTransactionNo = item.zoopTransactionNo
    OrderDetailConstants.irctcOrderId = (item.irctcOrderId === null ? 'N/A' : item.irctcOrderId)
    OrderDetailConstants.orderType = item.paymentTypeName
    OrderDetailConstants.bookingDate = (item.bookingDate === null ? 'Date not available' : moment(item.bookingDate).format('DD-MM-YYYY'))
    OrderDetailConstants.bookingTime = (item.bookingDate === null ? 'Time not available' : moment(item.bookingDate).format('HH:mm'))

    //passenger detail
    OrderDetailConstants.passengerName = item.passengerName
    OrderDetailConstants.passengerMobile = item.passengerMobile
    OrderDetailConstants.passengeAlternateMobile = item.passengeAlternateMobile
    OrderDetailConstants.suggestions = item.suggestions
    //order bill
    OrderDetailConstants.totalPayableAmount = item.totalPayableAmount
    OrderDetailConstants.paymentTypeId = item.paymentTypeId
    OrderDetailConstants.couponValue = item.couponValue
    OrderDetailConstants.walletAmount = item.walletAmount
    OrderDetailConstants.couponCode = item.couponCode
    OrderDetailConstants.couponId = item.couponId
    OrderDetailConstants.totalAmount = item.totalAmount
    // OrderDetailConstants.deliveryCharge = item.deliveryCharge + item.deliveryChargeGst
    // OrderDetailConstants.gst = item.gst
    OrderDetailConstants.discount = item.discount
    // OrderDetailConstants.eta = item.eta
    // OrderDetailConstants.status = item.status
    // OrderDetailConstants.orderStatus = item.orderStatus
    // OrderDetailConstants.items = item.items

    // OrderDetailConstants.pnr = item.pnr
    // OrderDetailConstants.trainName = item.trainName
    // OrderDetailConstants.trainNumber = item.trainNumber
    // OrderDetailConstants.stationName = item.stationName
    // OrderDetailConstants.stationCode = item.stationCode
    // OrderDetailConstants.outletName = item.outletName

    // OrderDetailConstants.seat = item.berth
    // OrderDetailConstants.coach = item.coach

    OrderDetailConstants.paidAmount = (item.paidAmount === null ? 0 : item.paidAmount)

    this.setState({
      detailItem: item.items,
    })
    // this.props.navigation.navigate('MyOrderDetail')
  }

  render() {
    let img = require('../images/roundimg1.jpg')
    return (
      <SafeAreaView style={styles.slide}>
        {/* header view */}
        <View style={{ flexDirection: 'row', width: '100%', height: '8%', backgroundColor: Colors.white, justifyContent: 'center', }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
            <View style={{ justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', backgroundColor: Colors.white }}>
              <IconA name={'arrowleft'} size={28} color={Colors.black} />
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', width: '80%', alignItems: 'center' }}>
            <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> Order History </Text>
          </View>
        </View>
        {/* header view ends */}
        {/* <ScrollView>
          <View> */}
        <View style={{ width: Dimensions.get('screen').width, height: '90%' }}>
          <FlatList
            style={{ width: Dimensions.get('screen').width }}
            data={this.state.orderHistory}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.onRefresh(this.state.userToken, this.state.customerId, this.page = 1)}
              />
            }
            renderItem={({ item }) =>
              <View>
                <View>
                  <View style={styles.card}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <Image source={item.outletImage === null ? img : { uri: item.outletImage }} style={styles.img} />
                      <View style={styles.titleArea}>
                        <Text style={styles.tiletextH}>{item.outletName}</Text>
                        <View style={{ flexDirection: 'row', backgroundColor: Colors.white, justifyContent: 'space-between' }}>
                          <Text style={styles.tiletext}>({item.stationCode}) {item.stationName}</Text>
                          <Text style={[styles.tiletext, { color: Colors.newgGreen1, fontFamily: 'Poppins-Medium', fontSize: 12 }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View>
                      </View>
                    </View>
                    <Separator />
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                          <Text style={styles.tiletext}>Station</Text>
                          <Text style={styles.tiletext}>({item.stationCode}) {item.stationName}</Text>
                        </View> */}

                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 }}>
                      <Text style={[styles.tiletext, { color: Colors.darkGrey, fontSize: 12 }]}>Booking Date :</Text>
                      <Text style={[styles.tiletext, { fontSize: 12 }]}> {item.bookingDate == null ? 'Date not available' : moment(item.bookingDate).format('DD MMM YYYY')} at {item.bookingDate == null ? 'Time not available' : moment(item.bookingDate).format('hh:mm A')}</Text>
                    </View>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                          <Text style={styles.tiletext}>Delivery Date </Text>
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Date not available' : moment(item.eta).format('DD-MM-YYYY')}</Text>
                        </View> */}
                    {/* 
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10,paddingVertical:5 }}>
                          <Text style={styles.tiletext}>Delivery Time </Text>
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Time not available' : moment(item.eta).format('HH:mm')}</Text>
                        </View> */}



                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                          <Text style={styles.tiletext}>Total Amount</Text>
                          <Text style={[styles.tiletext, { color: '#60b246' }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View> */}

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                          <Text style={[styles.tiletext, { color: '#000000' }]}>Status </Text>
                          <Text style={{ fontFamily: 'Poppins-Medium', color: ConstantValues.orderStatus[item.status] }}>{item.orderStatus}</Text>
                        </View> */}
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 }}>
                      <Text style={[styles.tiletext, { color: Colors.darkGrey, fontSize: 12 }]}>Delivery Date :</Text>
                      <Text style={[styles.tiletext, { fontSize: 12 }]}> {item.eta == null ? 'Date not available' : moment(item.eta).format('DD MMM YYYY')} at {item.eta == null ? 'Time not available' : moment(item.eta).format('hh:mm A')}</Text>
                    </View>
                    {/* <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                          <Text style={[styles.tiletext,{color:Colors.darkGrey}]}>Delivery Date </Text>
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Date not available' : moment(item.eta).format('DD MMM YYYY')}</Text>
                        </View>

                        <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                          <Text style={[styles.tiletext,{color:Colors.darkGrey}]}>Delivery Time </Text>
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Time not available' : moment(item.eta).format('hh:mm a')}</Text>
                        </View> */}



                    {/* <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                          <Text style={[styles.tiletext, { color: Colors.darkGrey, fontSize: 12 }]}>Total Amount</Text>
                          <Text style={[styles.tiletext, { color: Colors.newgGreen1, fontFamily: 'Poppins-Medium', fontSize: 12 }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View> */}
                    <Separator />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <CustomButtonShort
                        disabled={true}
                        // onPress={() => this.renderOrderDetail(item)}
                        title={item.orderStatus}
                        style={{ backgroundColor: Colors.white, width: 150, height: 0, paddingVertical: 10 }}
                        textStyle={{ color: ConstantValues.orderStatus[item.status], fontFamily: 'Poppins-Regular', fontSize: 14 }}
                      />
                      <CustomButtonShort
                        // onPress={() => this.renderOrderDetail(item)}
                        onPress={() => {
                          // this.renderOrderDetail(item),
                          this.viewOrderDetail(item)
                        }}
                        title='View Details'
                        style={{ backgroundColor: Colors.white, width: 150, height: 0, paddingVertical: 10 }}
                        textStyle={{ color: Colors.newOrange, fontFamily: 'Poppins-Regular', fontSize: 14 }}
                      />
                    </View>
                  </View>

                </View>
              </View>
            }
            // keyExtractor={(item,index) => item.orderId.toString()}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => this.renderFooter.bind(this)}
            onEndReachedThreshold={1}
            onEndReached={() => this.handleLoadMore()}
          />
        </View>
        {/* </View>
        </ScrollView> */}
        {/* Order Details Modal */}
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
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    // backgroundColor: Colors.newOrange,
  },
  img: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 100 / 10,
    // backgroundColor: Colors.darkGreen,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height - 100,
    backgroundColor: '#fff',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5
  },
  // orderIdDetail: {
  //   width: Dimensions.get('screen').width - 20,
  //   height: '30%',
  //   backgroundColor: '#fff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   borderTopStartRadius: 100 / 5,
  //   borderTopEndRadius: 100 / 5,
  //   borderStyle: 'dashed',
  //   borderColor: '#9b9b9b',
  //   borderWidth: 2,
  //   marginTop: 10
  // },
  titleArea: {
    // justifyContent: 'space-between',
    // alignContent:'space-around',
    // alignSelf: 'center',
    // backgroundColor: '#9b9b9b',//can change as we move to various pages
    // marginBottom: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    flexDirection: 'column',
    borderColor: Colors.lightGrey,
    // borderRadius: 10,
    // borderWidth: 0.5,
    width: '80%',
    // elevation: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  tileM: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: Colors.white,//can change as we move to various pages
    marginBottom: 5,//can change as we move to various pages
    paddingVertical: 5,
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
    // paddingHorizontal: 10,
    paddingVertical: 5
  },
  tiletext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000000'
  },
  tiletextH: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 16
  },
  tiletextM: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: 18
  },
  tiletextitem: {
    fontFamily: 'Poppins-Regular',
    color: '#6a6e6c',
    fontSize: 12
  }
});