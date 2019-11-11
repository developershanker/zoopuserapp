import React, { Component } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButtonShort } from '../assests/customButtonShort';
import { Fade } from '../assests/fade.js';
import walletApi from '../customer/walletApi.js';
import { CheckBox } from 'react-native-elements';
import orderApi from '../orderBooking/orderApi.js';
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';
import moment from "moment";
import loginApi from '../customer/walletApi.js';
import Modal from 'react-native-modal';
import OrderDetailConstants from '../orderDetailConstants.js';



export default class myOrders extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.checkRegister()
  }
  // shouldComponentUpdate(){
  //   this.checkRegister()
  // }
  constructor(props) {
    super(props);
    this.state = {
      orderHistory: [],
      isVisible: true,
      detailViewModal: null,
      detailItem: []
    };
  }


  checkRegister() {
    if (ConstantValues.customerId == '') {
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
    } else {
      this.orderHistory()
    }
  }


  async orderHistory() {
    try {
      let response = await orderApi.orderHistory();
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
          )
        }
      }
    } catch (error) {
      console.log('Data received in myOrder.js catch: ' + error)
    }
  }

  showStatus(orderStatus) {
    console.log('Status is : ' + orderStatus)
    if (orderStatus == '') {
      return (
        <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}> Getting Status... </Text>
      )
    }
    else if (orderStatus == 'Payment Failed') {
      return (
        ConstantValues.paymentFailed
      )
    }
    else if (orderStatus == 'Payment Pending') {
      return (ConstantValues.paymentFailed)
    }
    else if (orderStatus == 'Booked') {
      return (ConstantValues.booked)
    }
    else if (orderStatus == 'Sent to Outlet') {
      return (ConstantValues.sentToOutlet)
    }
    else if (orderStatus == 'Under Preparation') {
      return (ConstantValues.underPreparation)
    }
    else if (orderStatus == 'Out for Delivery') {
      return (ConstantValues.outForDelivery)
    }
    else if (orderStatus == 'Deliverd') {
      return (ConstantValues.delivered)
    }
    else if (orderStatus == 'Not Delivered') {
      return (ConstantValues.notDelivered)
    }
    else if (orderStatus == 'Bad Delivery') {
      return (ConstantValues.badDelivery)
    }
    else if (orderStatus == 'Cancelled') {
      return (ConstantValues.cancelled)
    }

  }

  // gotoDetail(item){
  //   item.items.map((items,index) =>{
  //     ConstantValues.orderedItems = items
  //     console.log('ConstantValues.orderedItems : ' + ConstantValues.orderedItems)
  //   })
  // }
  renderOrderDetail = (item) => {
    OrderDetailConstants.zoopOrderId = item.orderId
    OrderDetailConstants.irctcOrderId = item.irctcOrderId
    OrderDetailConstants.totalPayableAmount = item.totalPayableAmount
    OrderDetailConstants.couponValue = item.couponValue
    OrderDetailConstants.walletAmount = item.walletAmount
    OrderDetailConstants.paidAmount = item.paidAmount
    OrderDetailConstants.eta = item.eta
    OrderDetailConstants.orderStatus = item.orderStatus
    OrderDetailConstants.items = item.items
    console.log('OrderDetailConstants.items : ' + JSON.stringify(OrderDetailConstants.items) + '\n' + 'item.items' + JSON.stringify(item.items))
    this.setState({
      detailItem: item.items,
      detailViewModal: 'bottom'
    })
  }
  render() {
    let temp = ''
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
                renderItem={({ item }) =>
                  <View>
                    <View onPress={() => this.renderOrderDetail(item)}>
                      <View style={styles.card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                          <View style={{ width: 100, alignItems: 'flex-end' }}>
                            <Text style={styles.tiletext}>Ordered On :</Text>
                          </View>


                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Date not available' : moment(item.bookingDate).format('DD-MM-YYYY HH:mm')}</Text>
                        </View>


                        <View>
                          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                            <View style={{ width: 100, alignItems: 'flex-end' }}>
                              <Text style={styles.tiletext}>Item :</Text>
                            </View>
                            {item.items.map((items, index) => {
                              // const itemName = items.itemName.join()
                              temp = items.itemName + ', '
                            }
                            )
                            }
                            <View style={{ width: 150, alignItems: 'flex-end' }}>

                              <Text style={styles.tiletextitem}>{temp.slice(0, -2)}</Text>
                            </View>
                          </View> */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                          <View style={{ width: 100, alignItems: 'flex-end' }}>
                            <Text style={styles.tiletext}>Total Amt :</Text>
                          </View>

                          <Text style={[styles.tiletext, { color: '#60b246' }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                          <View style={{ width: 100, alignItems: 'flex-end' }}>
                            <Text style={[styles.tiletext, { color: '#000000' }]}>Status :</Text>
                          </View>
                          {/* <Text style={[styles.tiletext, { color: orderStatus == 'Delivered' ? '#000000' : '#60b246' }]}>{orderStatus}</Text> */}
                          <View>
                            {
                              this.showStatus(item.orderStatus)
                            }
                          </View>


                          {/* <Text style={[styles.tiletext, { color: '#f15926' }]}>Repeat Order</Text> */}
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
        <KeyboardAvoidingView enabled>
          <Modal
            isVisible={this.state.detailViewModal === 'bottom'}
            onBackButtonPress={() => this.setState({ detailViewModal: null })}
            // onSwipeComplete={() => this.setState({ detailViewModal: null })}
            // swipeDirection={['left', 'right']}
            style={styles.bottomModal}
          >
            <View style={styles.modalView}>

              {/* orderId's details */}
              <View style={{ height: '10%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                <Text style={styles.tiletextH}>Order Detail</Text>
              </View>

              <View style={styles.card}>

                <View style={styles.tileM}>
                  <View style={{ width: 110, alignItems: 'flex-end' }}>
                    <Text style={styles.tiletext}>IRCTC Order Id :</Text>
                  </View>
                  <View style={{ width: 100, alignItems: 'flex-start' }}>
                    <Text style={styles.tiletext}>{OrderDetailConstants.irctcOrderId}</Text>
                  </View>
                </View>

                <View style={styles.tileM}>
                  <View style={{ width: 110, alignItems: 'flex-end' }}>
                    <Text style={styles.tiletext}>ZOOP Order Id :</Text>
                  </View>
                  <View style={{ width: 100, alignItems: 'flex-start' }}>
                    <Text style={styles.tiletext}>{OrderDetailConstants.zoopOrderId}</Text>
                  </View>
                </View>

                <View style={styles.tileM}>
                  <View style={{ width: 110, alignItems: 'flex-end' }}>
                    <Text style={styles.tiletext}>Status :</Text>
                  </View>

                  {/* <Text style={styles.tiletext}>{OrderDetailConstants.irctcOrderId}</Text> */}
                  <View style={{ width: 100, alignItems: 'flex-start' }}>
                    {
                      this.showStatus(OrderDetailConstants.orderStatus)
                    }
                  </View>
                </View>

              </View>
              {/* Bill Details */}
              <View style={{ width: ConstantValues.deviceWidth - 20, height: '30%', marginTop: 10, marginBottom: 5 }}>
                <View style={styles.card}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={styles.tiletext}>Order Total</Text>
                    <Text style={styles.tiletext}>{ConstantValues.rupee} {OrderDetailConstants.totalPayableAmount}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={styles.tiletext}>Coupon Discount</Text>
                    <Text style={styles.tiletext}>{ConstantValues.rupee} {OrderDetailConstants.couponValue}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text style={styles.tiletext}>Wallet Amount Used</Text>
                    <Text style={styles.tiletext}>{ConstantValues.rupee} {OrderDetailConstants.walletAmount}</Text>
                  </View>

                </View>
              </View>
              {/* Item List starts */}
              <View style={{ width: ConstantValues.deviceWidth - 20, marginBottom: 10 }}>
                <View style={styles.card}>
                  <FlatList
                    data={this.state.detailItem}
                    extraData={this.state}
                    scrollEnabled={true}
                    renderItem={({ item }) =>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', fontSize: 15 }}>{item.itemName}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', fontSize: 15 }}>Qty : {item.quantity} | </Text>
                          <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', fontSize: 15 }}>{OrderDetailConstants.rupee} {item.basePrice}</Text>
                        </View>
                      </View>
                    }
                    keyExtractor={(item) => item.itemId.toString()}
                  />
                </View>
              </View>
            </View>

          </Modal>
        </KeyboardAvoidingView>
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
    //height: Dimensions.get('screen').height/2,
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