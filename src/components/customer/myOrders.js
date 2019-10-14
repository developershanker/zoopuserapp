import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButton } from '../assests/customButtonLarge.js';
import { Fade } from '../assests/fade.js';
import walletApi from '../customer/walletApi.js';
import { CheckBox } from 'react-native-elements';
import orderApi from '../orderBooking/orderApi.js';
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';
import moment from "moment";
import loginApi from '../customer/walletApi.js';



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
              text: 'OK', onPress: () => this.props.navigation.navigate('Welcome'),
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
    if (orderStatus == '') {
      return (
        <Text> - </Text>
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
                    <TouchableWithoutFeedback>
                      <View style={styles.card}>
                        <View style={styles.tile}>
                          <View style={{width:100,alignItems:'flex-end'}}>
                          <Text style={styles.tiletext}>Ordered On :</Text>
                          </View>
                          
                          
                          <Text style={styles.tiletext}>{item.bookingDate == null ? 'Date not available' : moment(item.bookingDate).format('DD-MM-YYYY HH:mm')}</Text>
                        </View>


                        <View>
                          <View style={styles.tile}>
                          <View style={{width:100,alignItems:'flex-end'}}>
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
                          </View>
                        </View>
                        <View style={styles.tile}>
                        <View style={{width:100,alignItems:'flex-end'}}>
                          <Text style={styles.tiletext}>Total Amount :</Text>
                          </View>
                          
                          <Text style={[styles.tiletext, { color: '#60b246' }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View>
                        <View style={styles.tile}>
                        <View style={{width:100,alignItems:'flex-end'}}>
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
                      </View>
                      
                    </TouchableWithoutFeedback>
                  </View>
                }
                keyExtractor={(item) => item.orderId.toString()}
              />
            </View>
          </View>
        </ScrollView>
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
    paddingVertical: 10
  },
  tiletext: {
    fontFamily: 'Poppins-Regular',
    color: '#000000'
  },
  tiletextitem: {
    fontFamily: 'Poppins-Regular',
    color: '#6a6e6c',
    fontSize: 12
  }
});