import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Fade } from '../assests/fade.js';
import styles from './cartCss.js';
import ConstantValues from '../constantValues.js';
import { CheckBox } from 'react-native-elements';

export const CouponPanel = (props) => {

    const { disabledWallet, onPressRemove, removeVisible, textStyle = {}, onPressCoupon, couponColor, appliedCode, disabledCoupon, checked, onPressCheckBox, walletBalance } = props;
    
    return (

        <View style={styles.couponcard}>
            <Fade visible={ConstantValues.customerId == '' ? true : false}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 15 }}>Enjoy Offers</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Welcome')}>
                        <Text style={styles.removetext}>Click here to login</Text>
                    </TouchableOpacity>
                </View>
            </Fade>
            <Fade visible={ConstantValues.customerId == '' ? false : true}>
                <View style={{ flexDirection: 'column', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <CheckBox
                                // disabled={this.state.textPromoCode == ConstantValues.couponCode ? true : false}
                                // textStyle={{ fontFamily: 'Poppins-Regular' }}
                                // checked={this.state.walletUsed}
                                // onPress={() => {
                                //   this.setState({ walletUsed: !this.state.walletUsed }),
                                //     this.walletUsed(this.state.walletUsed)
                                // }}
                                disabled={disabledWallet}
                                textStyle={textStyle}
                                checked={checked}
                                onPress={onPressCheckBox}
                            />
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 180 }}>
                                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#000000' }}>Use Wallet Balance</Text>
                                <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light', color: '#000000', alignSelf: 'center' }}>(Rs.50 per order can be used)</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 10, fontFamily: 'Poppins-Light' }}>Available Balance</Text>
                            {/* <Text style={{ fontSize: 20, fontFamily: 'Poppins-Regular', color: '#000000' }}>{ConstantValues.rupee} {this.state.walletUsed == true ? ConstantValues.walletBalance - 50 : ConstantValues.walletBalance}</Text> */}
                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Regular', color: '#000000' }}>{ConstantValues.rupee} {walletBalance}</Text>
                        </View>
                    </View>
                    {/* {ConstantValues.rupee} {this.state.walletUsed == true ? ConstantValues.walletBalance - 50 : ConstantValues.walletBalance} */}

                    <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>OR</Text>



                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        {/* <TouchableOpacity onPress={() => { this.changeCode(ConstantValues.couponCode) }} disabled={this.state.walletUsed == true ? true : false}> */}
                        <TouchableOpacity onPress={onPressCoupon} disabled={disabledCoupon}>
                            {/* <Text style={[styles.coupontext, { color: this.state.walletUsed == true ? '#636666' : '#149db5' }]}>
                                    {ConstantValues.appliedCode}
                                  </Text> */}
                            <Text style={[styles.coupontext, { color: couponColor }]}>
                                {appliedCode}
                            </Text>
                        </TouchableOpacity>

                        {/* <Fade visible={ConstantValues.appliedCode == ConstantValues.couponCode ? true : false}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', paddingHorizontal: 10 }}>Applied!!</Text>
                                <TouchableOpacity onPress={() => this.removeCoupon()}>
                                    <Text style={styles.removetext}>REMOVE</Text>
                                </TouchableOpacity>
                            </View>

                        </Fade> */}

                        <Fade visible={removeVisible}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', paddingHorizontal: 10 }}>Applied!!</Text>
                                <TouchableOpacity onPress={onPressRemove}>
                                    <Text style={styles.removetext}>REMOVE</Text>
                                </TouchableOpacity>
                            </View>

                        </Fade>
                    </View>




                </View>
            </Fade>
        </View>
    )

}

