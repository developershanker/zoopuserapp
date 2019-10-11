import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import cartApi from './cartApi';
import ConstantValues from '../constantValues'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';

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
            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>Bill Details</Text>
            {/* <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} /> */}
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
                      <Text style={styles.tiletext}>Add GST 5%</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.gst).toFixed(2)}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Delivery Charges</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {ConstantValues.deliveryCharge}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Add GST 18%</Text>
                      <Text style={styles.tiletext}>{ConstantValues.rupee} {(ConstantValues.deliveryChargegst.toFixed(2))}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Discount</Text>
                      <Text style={[styles.tiletext, { color: '#60b246' }]}> {ConstantValues.rupee} {ConstantValues.couponValue}</Text>
                    </View>
                    <View style={styles.tile}>
                      <Text style={styles.tiletext}>Used Wallet Balance</Text>
                      <Text style={[styles.tiletext, { color: '#60b246' }]}>{ConstantValues.rupee} {ConstantValues.walletBalanceUsed}</Text>
                    </View>

                    <View style={styles.tile}>
                      <Text style={[styles.tiletext,{fontFamily:'Poppins-Medium',fontSize:16}]}>Order Total</Text>
                      <View style={{flexDirection:'row'}}>
                      <Icon name={'rupee'} size={20} />
                      <Text style={[styles.tiletext,{fontFamily:'Poppins-Medium',fontSize:16}]}> {(ConstantValues.totalPayableAmount).toFixed(2)}</Text>
                      </View>
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
    paddingVertical: 5
  },
  tiletext: {
    fontFamily: 'Poppins-Regular',
    color: '#000000'
  }
})

export default billDetailCard;
