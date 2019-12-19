import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './cartCss'
import ConstantValues from '../constantValues'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';

export const BillCard = (props) => {

        const { totalBasePrice , gst , deliveryCharge , discount ,totalPayableAmount} = props

    return (
        <View>
            <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Poppins-Regular', color: '#000000' }}>Bill Details</Text>
                {/* <Image style={{ alignSelf: 'center', height: 15, width: Dimensions.get('screen').width - 100 }} source={require('../images/line.png')} /> */}
            </View>
            <View
                style={styles.billcard}
            >
                <View>
                    {/* <Text style={{fontSize:15,fontWeight:'bold',padding:5}}></Text> */}
                    <View style={styles.tile}>
                        <Text style={styles.tiletext}>Item Total</Text>
                        <Text style={styles.tiletext}>{ConstantValues.rupee} {totalBasePrice}</Text>
                    </View>
                    <View style={styles.tile}>
                        <Text style={styles.tiletext}>(+) GST on food</Text>
                        <Text style={styles.tiletext}>{ConstantValues.rupee} {gst}</Text>
                    </View>
                    <View style={styles.tile}>
                        <Text style={styles.tiletext}>(+) Delivery Charge (Inc. GST)</Text>
                        <Text style={styles.tiletext}>{ConstantValues.rupee} {deliveryCharge}</Text>
                    </View>
                    {/* <View style={styles.tile}>
                    <Text style={styles.tiletext}>Add GST 18%</Text>
                    <Text style={styles.tiletext}>{ConstantValues.rupee} {Math.round(ConstantValues.deliveryChargegst)}</Text>
                </View>
                <View style={styles.tile}>
                    <Text style={styles.tiletext}>(-) Discounts  </Text>
                    <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {ConstantValues.couponValue}</Text>
                </View> */}
                    <View style={styles.tile}>
                        <Text style={styles.tiletext}>(-) Discounts  </Text>
                        <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {discount}</Text>
                    </View>
                    {/* <View style={styles.tile}>
                    <Text style={styles.tiletext}>Wallet Balance Used</Text>
                    <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {ConstantValues.walletBalanceUsed}</Text>
                </View> */}


                    <View style={styles.tile}>
                        <Text style={[styles.tiletext, { fontFamily: 'Poppins-Medium', fontSize: 16 }]}>Order Total</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name={'rupee'} size={20} color={'#000000'} />
                            <Text style={[styles.tiletext, { fontFamily: 'Poppins-Medium', fontSize: 16 }]}> {totalPayableAmount}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}


export default BillCard
