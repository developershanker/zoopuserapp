import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert, TouchableOpacity, FlatList, Image, ToastAndroid } from 'react-native';
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


export default class myOrders extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.orderHistory()
  }
  constructor(props) {
    super(props);
    this.state = {
      orderHistory: [
        // { id: 1, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '150', status: 'Delivered' },
        // { id: 2, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '120', status: 'Upcoming' },
        // { id: 3, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '130', status: 'Delivered' },
        // { id: 4, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '200', status: 'Upcoming' },
        // { id: 5, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '150', status: 'Delivered' },
        // { id: 6, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '150', status: 'Upcoming' },
        // { id: 7, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '150', status: 'Upcoming' },
        // { id: 8, orderedOn: '15/06/2019', item: 'Special Thali', totalAmount: '150', status: 'Delivered' },
      ]
    };
  }

  async orderHistory() {
    try {
      let response = await orderApi.orderHistory();
      if (response.status == true) {
        this.setState({
          orderHistory: response.data
        })
      }
    } catch (error) {
      console.log('Data received in myOrder.js catch: ' + error)
    }
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
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 25, color: '#000000' }}> Order History </Text>
              </View>
            </View>
            {/* header view ends */}
            <View>
              <FlatList
                data={this.state.orderHistory}
                extraData={this.state}
                renderItem={({ item }) =>
                  <View>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('DeliveryMark') }}>
                      <View style={styles.card}>
                        <View style={styles.tile}>
                          <Text style={styles.tiletext}>Ordered On</Text>
                          <Text style={styles.tiletext}>{item.deliveryDate}</Text>
                        </View>
                        <View style={styles.tile}>
                          <Text style={styles.tiletext}>Item</Text>
                          <Text style={styles.tiletext}>{item.item}</Text>
                        </View>
                        <View style={styles.tile}>
                          <Text style={styles.tiletext}>Total Amount</Text>
                          <Text style={[styles.tiletext, { color: '#1fc44e' }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View>
                        <View style={styles.tile}>
                          <Text style={[styles.tiletext, { color: item.status == 'Upcoming' ? '#1fc44e' : '#000000' }]}>{item.status}</Text>
                          <Text style={[styles.tiletext, { color: '#f15926' }]}>Repeat Order</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                }
                keyExtractor={(item) => item.orderId.toString()}
              />
            </View>
          </View>
        </ScrollView>
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