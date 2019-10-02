import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert, TouchableOpacity, FlatList, Image, ToastAndroid ,TouchableWithoutFeedback} from 'react-native';
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



export default class myOrders extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.orderHistory()
  }
  constructor(props) {
    super(props);
    this.state = {
      orderHistory: [],
      isVisible:true,
    };
  }

  async orderHistory() {
    try {
      let response = await orderApi.orderHistory();
      if (response.status == true) {
        this.setState({
          orderHistory: response.data,
          isVisible:false
        })
      }
    } catch (error) {
      console.log('Data received in myOrder.js catch: ' + error)
    }
  }

  // gotoDetail(item){
  //   item.items.map((items,index) =>{
  //     ConstantValues.orderedItems = items
  //     console.log('ConstantValues.orderedItems : ' + ConstantValues.orderedItems)
  //   })
  // }

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
                renderItem={({ item }) =>
                  <View>
                    <TouchableWithoutFeedback>
                      <View style={styles.card}>
                                 <View style={styles.tile}>
                                <Text style={styles.tiletext}>Ordered On</Text>
                                <Text style={styles.tiletext}>{ item.bookingDate == null ? 'Date not available' : moment(item.bookingDate).format('DD-MM-YYYY HH:mm A')}</Text>
                              </View>
                            
                          
                              <View>
                              <View style={styles.tile}>
                                <Text style={styles.tiletext}>Item</Text>
                        {item.items.map((items,index) => {
                          // const itemName = items.itemName.join()
                          return (
                              <View style={{width:150,justifyContent:'center'}} key={index}>
                                  <Text style={styles.tiletextitem}>{items.itemName},</Text>
                              </View>
                          )
                        })}
                         </View>
                            </View>
                        <View style={styles.tile}>
                          <Text style={styles.tiletext}>Total Amount</Text>
                          <Text style={[styles.tiletext, { color: '#60b246' }]}> {ConstantValues.rupee} {item.totalPayableAmount}</Text>
                        </View>
                        <View style={styles.tile}>
                            <Text style={[styles.tiletext, { color: '#000000' }]}>Status :</Text>
                          <Text style={[styles.tiletext, { color: item.orderStatus == 'Delivered' ? '#000000' : '#60b246' }]}>{item.orderStatus}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  tiletext: {
    fontFamily: 'Poppins-Regular',
    color: '#000000'
  },
  tiletextitem:{
    fontFamily: 'Poppins-Regular',
    color: '#6a6e6c',
    fontSize:12
  }
});