import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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



export default class myOrders extends Component {
  componentDidMount() {
    SplashScreen.hide();
    // this.checkRegister()
    this.tokenAsync()
    // this.orderHistory()
  }
  constructor(props) {
    super(props);
    this.state = {
      orderHistory: [],
      isVisible: true,
      detailViewModal: null,
      detailItem: [],
      isRefreshing:false,
      page:1,
      seed:1
    };
  }

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
        this.orderHistory(userToken, customerId)
      } else {
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


  // checkRegister() {
  //   if (ConstantValues.customerId == '') {
  //     return (
  //       Alert.alert(
  //         'Need Login!!',
  //         'Please LOGIN to Proceed.',
  //         [
  //           {
  //             text: 'OK', onPress: () => {
  //               this.setState({ isVisible: false })
  //               this.props.navigation.navigate('Welcome')
  //             },
  //             style: 'cancel'
  //           },
  //         ],
  //         { cancelable: false },
  //       )
  //     )
  //   } else {
  //     this.orderHistory()
  //   }
  // }

  // onRefresh() {
  //   this.setState({
  //     isRefreshing: true,
  //     page: 1,
  //     seed: this.state.seed + 1
  //   }, () => {
  //     this.tokenAsync()
  //   }
  //   ); // true isRefreshing flag for enable pull to refresh indicator

  // }

  async orderHistory(userToken, customerId) {
    try {
      let response = await orderApi.orderHistory(userToken, customerId);
      if (response.status == true) {
        this.setState({
          orderHistory: response.data,
          isVisible: false
        })
        if (this.state.orderHistory && this.state.orderHistory.length) {
          this.setState({
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

  renderOrderDetail = (item) => {

    OrderDetailConstants.data = item
    OrderDetailConstants.zoopTransactionNo = item.zoopTransactionNo
    OrderDetailConstants.irctcOrderId = item.irctcOrderId
    OrderDetailConstants.orderType = item.paymentTypeName
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
    OrderDetailConstants.deliveryCharge = item.deliveryCharge + item.deliveryChargeGst
    OrderDetailConstants.gst = item.gst
    OrderDetailConstants.discount = item.discount
    OrderDetailConstants.eta = item.eta
    OrderDetailConstants.status = item.status
    OrderDetailConstants.orderStatus = item.orderStatus
    OrderDetailConstants.items = item.items

    OrderDetailConstants.pnr = item.pnr
    OrderDetailConstants.trainName = item.trainName
    OrderDetailConstants.trainNumber = item.trainNumber
    OrderDetailConstants.stationName = item.stationName
    OrderDetailConstants.stationCode = item.stationCode
    OrderDetailConstants.outletName = item.outletName

    OrderDetailConstants.seat = item.berth
    OrderDetailConstants.coach = item.coach
    
    OrderDetailConstants.paidAmount = (item.paidAmount === null ? 0 : item.paidAmount)
    
    this.setState({
      detailItem: item.items,
    })
    this.props.navigation.navigate('MyOrderDetail')
  }
  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 20, color: '#000000' }}> Order History </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ width: Dimensions.get('screen').width }}>
              <FlatList
                style={{ width: Dimensions.get('screen').width }}
                data={this.state.orderHistory}
                extraData={this.state}
                // refreshing={this.state.isRefreshing}
                // onRefresh={() => this.onRefresh()}
                renderItem={({ item }) =>
                  <View>
                    <View>
                      <View style={styles.card}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                          <Text style={styles.tiletext}>Station</Text>
                          <Text style={styles.tiletext}>({item.stationCode}) {item.stationName}</Text>
                        </View>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                          <View style={{ width: 100, alignItems: 'flex-end' }}>
                            <Text style={styles.tiletext}>Ordered On :</Text>
                          </View>
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Date not available' : moment(item.bookingDate).format('DD-MM-YYYY HH:mm')}</Text>
                        </View> */}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Delivery Date </Text>
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Date not available' : moment(item.eta).format('DD-MM-YYYY')}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Delivery Time </Text>
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Date not available' : moment(item.eta).format('HH:mm')}</Text>
                        </View>



                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                          <Text style={styles.tiletext}>Total Amount</Text>
                          <Text style={[styles.tiletext, { color: '#60b246' }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={[styles.tiletext, { color: '#000000' }]}>Status </Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: ConstantValues.orderStatus[item.status] }}>{item.orderStatus}</Text>
                        </View>

                        <CustomButtonShort
                          onPress={() => this.renderOrderDetail(item)}
                          title='View Details'
                          style={{ alignSelf: 'center', backgroundColor: '#fff' }}
                          textStyle={{ color: '#F15926' }}
                        />
                      </View>

                    </View>
                  </View>
                }
                keyExtractor={(item) => item.orderId.toString()}
              />
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: '#ffffff',
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
  tileM: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    paddingVertical:5,
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
    fontFamily: 'Poppins-Regular',
    color: '#000000'
  },
  tiletextH: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 18
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