import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet,ToastAndroid, ScrollView, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import { CouponCodeView } from './couponCodeView.js';
import cartApi from './cartApi.js';
import ConstantValues from '../constantValues.js';
import Cart from './cart.js';


export default class CouponPage extends Component {
    componentDidMount() {
        SplashScreen.hide();
        this.getCoupons();
    }
    constructor(props) {
        super(props);
        this.state = {
            couponCode: '',
            CouponDetail: []
        };
    }

    async getCoupons() {
        try {
            let response = await cartApi.getCoupons();

            if (response.status == true) {
                this.setState({
                    CouponDetail: response.data
                })
            } else {
                ToastAndroid.show(response.error, ToastAndroid.LONG),
                    console.log(response.error)
            }
        } catch (error) {
            console.log('Data received in menu.js catch: ' + error)
        }
    }

    applyCoupons = (couponDetail) => {
        // console.log('couponCode : ' + JSON.stringify(couponDetail))
        ConstantValues.couponCode = couponDetail.couponCode
        ConstantValues.couponValue = couponDetail.couponValue
        ConstantValues.discount = couponDetail.couponValue
        ConstantValues.couponType = couponDetail.type
        ConstantValues.couponId = couponDetail.couponId
        console.log('couponCode : ' + ConstantValues.couponCode + ' couponValue : ' + ConstantValues.couponValue + ' type : ' + ConstantValues.couponType)
        // Cart.changeCode(ConstantValues.couponCode)
        cartApi.billDetail()
        this.props.navigation.navigate('Cart')
    }

    applyCouponsFromInput = (couponCode,couponDetail) => {

        if (couponCode != '') {
            if (couponCode == 'ZOOP100') {
                ConstantValues.couponCode = couponCode
                // ConstantValues.discount = ConstantValues.couponValue
                console.log('couponCode : ' + ConstantValues.couponCode)
                this.props.navigation.navigate('Cart')
            } else {
                return(
                    ToastAndroid.show('Invalid Promo Code',ToastAndroid.LONG)
                )
            }
        } else {
            ToastAndroid.show('Please Enter Promo Code',ToastAndroid.LONG)
        }
    }

    


    render() {

        return (
            <SafeAreaView>
                <ScrollView style={styles.slide}>
                    <View>
                        {/* header view */}
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
                            </TouchableOpacity>
                        </View>
                        {/* header view ends */}
                        {/* Conpon textInput begins here */}
                        <View style={styles.promocodeInput}>
                            <TextInput
                                style={{ fontSize: 15, textTransform: 'uppercase', fontFamily: 'Poppins-SemiBold', width: 200 }}
                                placeholder='Enter Promo Code'
                                keyboardType='default'
                                autoCapitalize='characters'
                                onChangeText={couponCode => this.setState({ couponCode })}
                            />
                            <TouchableOpacity onPress={() => { this.applyCouponsFromInput(this.state.couponCode,this.state.CouponDetail) }}>
                                <Text style={{ color: '#1e8728', fontSize: 15, fontFamily: 'Poppins-Bold', }}>APPLY</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Conpon textInput ends here */}
                        <View style={{ width: Dimensions.get('window').width - 10, flexDirection: 'row', paddingTop: 10 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', }}>Available Coupons</Text>
                            <Image style={{ height: 15, alignSelf: 'center' }} source={require('../images/line.png')} />
                        </View>
                        {/* CouponDetail Card begin Here */}
                        <View>
                            <FlatList
                                data={this.state.CouponDetail}
                                renderItem={({ item, index }) =>

                                    <View style={styles.card}>
                                        <View>
                                            <CouponCodeView
                                                title={item.couponCode}
                                            />
                                            <Text style={{ paddingTop: 10, color: '#000000', fontFamily: 'Poppins-Bold', }}>{item.discription}</Text>
                                            <Text style={{ paddingTop: 5, fontFamily: 'Poppins-Regular', }}>Validity of this coupon is: {item.validityStartDate}</Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => {
                                                this.applyCoupons(item)
                                            }}
                                        >
                                            <Text style={{ color: '#1e8728', fontSize: 15, fontFamily: 'Poppins-Bold', alignSelf: 'flex-start', marginRight: 10 }}>APPLY</Text>
                                        </TouchableOpacity>

                                    </View>

                                }
                                keyExtractor={item => item.couponId.toString()}
                            />
                        </View>
                        {/* CouponDetail Card ends Here  */}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    slide: {
        width: Dimensions.get('screen').width,
        // marginLeft: 5
        marginHorizontal: 5
    },
    promocodeInput: {
        borderRadius: 100 / 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        width: '96%',
        borderColor: '#626663',
    },
    couponContainer: {
        width: '96%',
        alignContent: 'flex-start'

    },
    card: {
        width: Dimensions.get('screen').width - 10,
        justifyContent: 'space-around',
        // alignItems: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',//can change as we move to various pages
        marginBottom: 10,//can change as we move to various page
        borderColor: '#e4e4e4',
        borderRadius: 100 / 9,
        borderWidth: 1,
        shadowOpacity: 0.4,
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 4,
    },
})