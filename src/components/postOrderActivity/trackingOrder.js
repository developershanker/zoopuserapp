import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Platform, Linking, ScrollView, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomButton } from '../assests/customButtonLarge.js';

export default class TrackingOrder extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      updateValue: 0,
      showdetail: true,
      status: [
        { key: "1", status: 'Booked', value: 0 },
        { key: "2", status: 'Verified', value: 1 },
        { key: "3", status: 'Prepared', value: 2 },
        { key: "4", status: 'Delivery', value: 3 },
      ],
      statusRoute: [
        { id: "1", iconName: 'check-circle', status: 'Order Booked', statusDescription: 'You order is booked.Please wait for the resturent to accept it.' },
        { id: "2", iconName: 'cart-plus', status: 'Order is Verified', statusDescription: 'You order is booked.Please wait for the resturent to accept it.' },
        { id: "3", iconName: 'shopping-basket', status: 'Accepted by Resturent', statusDescription: 'You order is booked.Please wait for the resturent to accept it.' },
        { id: "4", iconName: 'fire', status: 'Food is being prepared', statusDescription: 'You order is booked.Please wait for the resturent to accept it.' },
        { id: "5", iconName: 'truck', status: 'Sent to Railway Station', statusDescription: 'You order is booked.Please wait for the resturent to accept it.' },
        { id: "6", iconName: 'archive', status: 'Delivered', statusDescription: 'You order is booked.Please wait for the resturent to accept it.' },

      ]
    };
  }
  updateStatus(value) {
    this.setState({ updateValue: value + 1 })
  }
  dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', paddingTop: 20 }}>
                <Text style={{ fontFamily:'Poppins-Bold', fontSize: 20, color: '#000000' }}> ORDER ID </Text>
                <Text style={{ fontFamily:'Poppins-Bold', fontSize: 20, color: '#000000' }}> 242559 </Text>
              </View>
              <TouchableOpacity>
                <View style={styles.call}>
                  <Icon name={'phone'} color={'#16a8b5'} size={15} />
                  <Text style={{ fontFamily:'Poppins-Bold', color: '#16a8b5' }}>Resturent</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.call}>
                  <Icon name={'phone'} color={'#16a8b5'} size={15} />
                  <Text style={{ fontFamily:'Poppins-Bold', color: '#16a8b5' }}>Delivery Boy</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* header view ends */}
            <View style={styles.statusView}>
              <Text style={{ fontFamily:'Poppins-Bold', color: '#000000', fontSize: 15 }}>Status</Text>
              <FlatList
                contentContainerStyle={styles.status}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={this.state.status}
                renderItem={({ item }) =>
                  <View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 }}>
                    <Icon name={'check-square'} size={20} color={item.value == this.state.updateValue ? '#16b538' : '#abb8ad'} />
                    <Text style={{ fontFamily:'Poppins-Bold', color: '#000000', fontSize: 15 }}>{item.status}</Text>
                  </View>
                }

              />
            </View>
            {/* Summary Time time ends here */}
            {/* Expanded Order summary starts */}
            <View>
              <FlatList
                contentContainerStyle={styles.status}
                data={this.state.statusRoute}
                renderItem={({ item }) =>
                  <View style={styles.detailStatus}>
                    <Icon style={{ alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 10 }} name={item.iconName} size={25} color={item.id == 1 ? '#147d2e' : '#747875'} />
                    <View style={styles.statusContentView}>
                      <Text style={{ fontFamily:'Poppins-Bold', color: item.id == 1 ? '#000000' : '#b6bab7', fontSize: 15 }}>{item.status}</Text>
                      <Text style={{ opacity: item.id == 1 ? 100 : 0 }}>{item.statusDescription}</Text>
                    </View>
                  </View>
                }
                keyExtractor={(item) => item.id}
              />
            </View>
            {/* Expanded Order summary ends */}
            <CustomButton
              style={{ backgroundColor: '#1fc44e', alignSelf: 'center', }}
              onPress={() => { this.props.navigation.navigate('OrderDetail') }}
              title='View Order Details'
            />
            <View style={styles.ZoopCallView}>
              <Text style={{ fontFamily:'Poppins-Bold', color: '#000000', fontSize: 15 }}>Call ZOOP for more support</Text>
              <TouchableOpacity onPress={this.dialCall}>
                <View style={styles.zoopCall}>
                  <Icon name={'phone'} size={15} color={'#ffffff'} />
                  <Text style={{ color: '#ffffff', fontFamily:'Poppins-Bold', margin: 5 }}>Call</Text>
                </View>
              </TouchableOpacity>
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
  call: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
    width: 110,
    borderColor: '#16a8b5',
    borderRadius: 100 / 6,
    borderWidth: 2
  },
  statusView: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  status: {
    // // paddingHorizontal: 10,
    // paddingVertical: 10,
    // // marginHorizontal: 10,
    // marginVertical: 10
  },
  detailStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#e3d8d8',
    borderWidth: 1
  },
  statusContentView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20
  },
  zoopCall: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: '#147d2e',
    backgroundColor: '#147d2e',
    borderRadius: 100 / 6,
    borderWidth: 2
  },
  ZoopCallView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e3d8d8'
  }
});