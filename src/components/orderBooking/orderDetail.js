import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, ScrollView, TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConstantValues from '../constantValues';
import BillDetailCard from '../cart/billDetailCard.js';

export default class OrderDetail extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.getOrderDetails()
  }
  constructor(props) {
    super(props);
    this.state = {
      orderedItem: [
        // { id: '1', itemName: 'Special Thali', itemPrice: '175', itemQuantity: 0 },
        // { id: '2', itemName: 'Special Non Veg Thali', itemPrice: '175', itemQuantity: 0 },
      ]
    };
  }

  getOrderDetails(){
    this.setState({
      orderedItem:ConstantValues.finalCart
    })
  }
  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: Dimensions.get('window').width - 100, alignItems: 'flex-start' }}>
                <Text style={{ fontFamily:'Poppins-Medium', fontSize: 15, color: '#000000' }}> ORDER ID </Text>
                <Text style={{ fontFamily:'Poppins-Medium', fontSize: 15, color: '#000000' }}> {ConstantValues.irctcId}</Text>
                <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width, paddingTop: 10 }}>
                  <Text style={styles.infoView}> 08/08/2019 </Text>
                  <Text style={styles.infoView}> 12:35 AM </Text>
                </View>
                {/* <Text style={{ fontSize: 15, color: '#000000' }}>Order will reach in 20 minutes</Text> */}
              </View>
            </View>
            {/* header view ends */}
            <View>
              <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 10 }}>
                <Text style={{fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}> Order Details </Text>
                <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} />
              </View>
              <View
                style={styles.card}>
                <FlatList
                  data={this.state.orderedItem}
                  renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
                      <Text style={{ fontFamily:'Poppins-Regular', color: '#000000', fontSize: 15 }}>{item.itemName}</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Icon name={'rupee-sign'} size={15}/> */}
                        <Text style={{ fontFamily:'Poppins-Regular', color: '#000000', fontSize: 15 }}>{ConstantValues.rupee} {item.basePrice}</Text>
                      </View>
                    </View>
                  }
                  keyExtractor={(item) => item.itemId.toString()}
                />
              </View>

            </View>
            <View>
            <BillDetailCard/>
            </View>
          
            {/* <View>
             
              <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontFamily:'Poppins-Regular', color: '#000000' }}> Bill Details </Text>
                <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} />
              </View>
              <View
                style={styles.card}
              >
                <View>
                
                  <View style={styles.tile}>
                    <Text style={styles.tiletext}>ITEM TOTAL</Text>
                    <Text style={styles.tiletext}>Rs. 200</Text>
                  </View>
                  <View style={styles.tile}>
                    <Text style={styles.tiletext}>TOTAL DISCOUNT</Text>
                    <Text style={styles.tiletext}>Rs. 200</Text>
                  </View>
                  <View style={styles.tile}>
                    <Text style={styles.tiletext}>DELIVERY FEE</Text>
                    <Text style={styles.tiletext}>Rs. 200</Text>
                  </View>
                  <View style={styles.tile}>
                    <Text style={styles.tiletext}>TOTAL</Text>
                    <Text style={styles.tiletext}>Rs. 200</Text>
                  </View>
                  <View style={styles.tile}>
                    <Text style={{fontFamily:'Poppins-Regular',color: '#4ce065',fontSize:20}}>Total Paid</Text>
                    <Text style={{fontFamily:'Poppins-Regular',color: '#4ce065',fontSize:20}}>Rs. 200</Text>
                  </View>

                </View>
              </View>
            </View> */}

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
  infoView: {
    color: '#e39494',
    fontSize: 15,
    fontFamily:'Poppins-Regular',

  },
  card: {
    width: Dimensions.get('window').width,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical:5,
    paddingHorizontal:5,
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    // borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 2,
  },
  tile: {
    width: Dimensions.get('screen').width - 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  tiletext: {
    fontFamily:'Poppins-Regular',
    color: '#000000'
  }
})