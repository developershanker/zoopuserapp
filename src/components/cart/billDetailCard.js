import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import cartApi from './cartApi';
import ConstantValues from '../constantValues'

class billDetailCard extends Component {
  componentDidMount() {
    cartApi.billDetail();
}
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <View>
          <View style={{ backgroundColor: '#ffffff', flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontFamily: 'Poppins-SemiBold', color: '#000000' }}>Bill Details</Text>
            <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} />
          </View>
          <View
                  style={styles.billcard}
                >
                  <View>
                    {/* <Text style={{fontSize:15,fontWeight:'bold',padding:5}}></Text> */}
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Item Total</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.totalBasePrice}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Delivery Charges</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.deliveryCharge}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Discount</Text>
                      <Text style={[styles.tiletext, { color: '#1fc44e' }]}> {ConstantValues.rupee} {ConstantValues.couponValue}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Used Wallet Balance</Text>
                      <Text style={[styles.tiletext, { color: '#1fc44e' }]}>{ConstantValues.rupee} {ConstantValues.walletBalanceUsed}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Add GST 5%</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.gst).toFixed(2)}</Text>
                    </View>

                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>To Pay</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.totalPayableAmount).toFixed(2)}</Text>
                    </View>

                  </View>
                </View>
        </View>
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
  billcard: {
    // width: Dimensions.get('window').width,
    // borderRadius: 100 / 4,
    // // marginLeft: 5,
    // // marginRight: 10,
    // // marginTop: 10,
    // alignItems: 'center',
    // flexDirection: 'row',
    // // paddingTop: 10,
    // // paddingBottom: 10,
    // // paddingLeft: 10,
    // // paddingRight: 10
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
    fontFamily: 'Poppins-SemiBold',
    color: '#000000'
  }
})

export default billDetailCard;
