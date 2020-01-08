import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView, TextInput, SectionList, TouchableWithoutFeedback, ScrollView, Image, TouchableOpacity, ActivityIndicator, BackHandler, Alert, ToastAndroid, ImageBackground } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomMenuFAB from '../assests/customMenuFAB.js';
import ToggleSwitch from 'toggle-switch-react-native'
import { Fade } from '../assests/fade.js';
import Modal from "react-native-modal";
import menuApi from './menuApi.js';
import ConstantValues from '../constantValues.js';
import cartApi from '../cart/cartApi.js';
import { ZoopLoader } from '../assests/zoopLoader.js';
import { Overlay } from 'react-native-elements';
import { Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import * as menuAction from '../../actions/menuAction'
import { CustomButton } from '../assests/customButtonLarge.js';
import Items from '../../Items.js';
import styles from './menuCss.js';
import Counter from '../assests/counter.js';
import { ReduxCart } from '../cart/reduxCart.js';
import { CouponPanel } from '../cart/couponPanel.js';
import BillCard from '../cart/billCard.js';
import { CouponPage } from '../cart/couponPage.js';
import walletApi from '../customer/walletApi.js';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';

export class ReduxMenu extends Component {
    componentDidMount() {
        this.props.getMenu()
        if (ConstantValues.customerId === '') {
            console.log('User is Not logged in')
        } else {
            this.getCoupons()
            this.getWalletInfo()
        }
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // return (
            //     // ToastAndroid.show(response.error, ToastAndroid.LONG),

            //     Alert.alert(
            //         'Confirm!!',
            //         'Are you sure you want to go back? All items from the cart will be removed.',
            //         [
            //             {
            //                 text: 'Cancel',
            //                 onPress: () => console.log('Cancel Pressed'),
            //                 style: 'cancel',
            //             },
            //             {
            //                 text: 'OK', onPress: () => {
            //                     this.props.clearCart()
            //                     this.props.navigation.navigate('Station')
            //                     console.log('going back....')
            //                     // this.backHandler.remove()
            //                     return true;
            //                 },
            //                 style: 'cancel'
            //             }
            //         ],
            //         { cancelable: false },
            //     )
            // )
            this.props.clearCart()
            this.props.navigation.navigate('Station')
            console.log('going back....')
            // this.backHandler.remove()
            return true;
        });
        var that = this;

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        that.setState({
            //  date : date + '/' + month + '/' + year,
            date: year + '-' + month + '-' + date,
            time: hours + ':' + min + ':' + sec
        })
    }

    // componentWillUnmount() {
    //     this.backHandler.remove()
    // }
    constructor(props) {
        super(props);
        this.state = {
            vegOnly: false,
            visibleModal: null,
            textPromoCode: 'Apply Coupon Code',
            walletUsed: false,
            inCart: [],
            revisedInCart: [],
            visibleModalCoupon: null,
            CouponDetail: [],
            couponCode: '',
            walletBalance: 0,
            proceedDisabled: false,
            proceedLabel: 'Add Passenger Details',
        }
    }

    async getWalletInfo() {
        try {
            let response = await walletApi.getWalletInfo();
            // console.log('data received in cart.js : ' + JSON.stringify(response))
            if (response.status == true) {
                ConstantValues.walletBalance = response.data.balance
                this.setState({
                    walletBalance: ConstantValues.walletBalance,
                })
                // console.log('data array is : '+ JSON.stringify(this.state.data))
            } else {
                return (

                    ToastAndroid.show('No data Found', ToastAndroid.LONG)

                )
            }
        } catch (error) {
            console.log('Data received in cart.js catch: ' + error)
        }
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

    gobackToMenu() {
        ConstantValues.inCart = []
        ConstantValues.finalCart = []
        this.props.navigation.navigate('ReduxMenu')
    }

    goingBack = () => {
        ConstantValues.inCart = []
        ConstantValues.finalCart = []
        this.setState({
            revisedInCart: [],
            inCart: []
        })
        this.props.clearCart()
        this.props.navigation.navigate('Station')
        console.log('going back....')
    }

    walletUsed = (walletUsed) => {
        // this.setState({
        //   walletUsed: !this.state.walletUsed
        // })
        if (ConstantValues.walletBalance >= 50) {
            if (ConstantValues.totalBasePrice >= 150) {
                if (walletUsed == true) {

                    ConstantValues.walletBalanceUsed = 0,
                        // ConstantValues.discount = 50,
                        ConstantValues.discount = 0
                    this.setState({
                        discount: 0
                    })
                    this.getWalletInfo(),
                        cartApi.billDetail()
                    // console.log('On this.state.walletUsed == true..... this.state.discount : ' + this.state.discount + 'ConstantValues.discount : ' +ConstantValues.discount+ "this.state.walletUsed : "+this.state.walletUsed)
                } else {

                    // ConstantValues.discount = 0,
                    ConstantValues.walletBalanceUsed = 50,
                        ConstantValues.discount = 50
                    this.setState({
                        discount: 50
                    })
                    this.getWalletInfo(),
                        cartApi.billDetail()
                    // console.log('On this.state.walletUsed == false..... this.state.discount : ' + this.state.discount + 'ConstantValues.discount : ' +ConstantValues.discount+ "this.state.walletUsed : "+this.state.walletUsed)
                }
            }
            else {
                return (
                    // ToastAndroid.show(response.error, ToastAndroid.LONG),

                    Alert.alert(
                        'Wallet Alert!!',
                        'Minimum Order Value to use wallet is Rs. 150. Just add a few more items to use.',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    console.log('wallet validation is failed')
                                },
                                style: 'cancel'
                            },
                        ],
                        { cancelable: false },
                    )
                )
            }
        } else {
            return (
                Alert.alert(
                    'Wallet Alert!!',
                    'Wallet amount is low.Enjoy discount with coupons!!',
                    [
                        {
                            text: 'OK', onPress: () => {
                                ConstantValues.walletBalanceUsed = 0,
                                    ConstantValues.discount = 0,
                                    this.setState({
                                        discount: 0,
                                        walletUsed: false
                                    })
                                this.getWalletInfo(),
                                    cartApi.billDetail()
                            },
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false },
                )
            )
        }
    }

    changeCode = (couponCode) => {
        if (couponCode == '') {
            this.setState({
                textPromoCode: 'Apply Coupon Code',
                visibleModalCoupon: 'bottom'
            })
            ConstantValues.appliedCode = 'Apply Coupon Code'
            // console.log('couponCode is : ' + couponCode + 'textPromoCode is : ' + this.state.textPromoCode + '\n' + 'ConstantValues.appliedCode : ' + ConstantValues.appliedCode)

        } else {
            this.setState({
                textPromoCode: couponCode
            })
            ConstantValues.appliedCode = couponCode
            // console.log('couponCode is : ' + couponCode + 'textPromoCode is : ' + this.state.textPromoCode + '\n' + 'ConstantValues.appliedCode : ' + ConstantValues.appliedCode)
        }
    }

    checkCoupon = (couponCode) => {
        if (ConstantValues.isCouponApplied == true) {
            ConstantValues.appliedCode == couponCode
            // this.setState({
            //   textPromoCode: couponCode
            // })
        } else {
            ConstantValues.appliedCode == 'Apply Coupon Code'
        }
    }

    applyCoupons = (couponDetail) => {
        console.log('couponCode : ' + couponDetail)
        if (ConstantValues.totalBasePrice >= couponDetail.minimumOrderValue) {
            if (couponDetail.type == 'RATE') {
                ConstantValues.rateDiscount = ((ConstantValues.totalBasePrice / 100) * couponDetail.couponValue).toFixed(2)
                ConstantValues.couponCode = couponDetail.couponCode
                ConstantValues.couponValue = couponDetail.couponValue
                ConstantValues.discount = ConstantValues.rateDiscount
                ConstantValues.couponType = couponDetail.type
                ConstantValues.couponId = couponDetail.couponId
                ConstantValues.minimumPriceRequired = couponDetail.minimumOrderValue
                ConstantValues.isCouponApplied = true
                console.log('couponCode : ' + ConstantValues.couponCode + ' couponValue : ' + ConstantValues.couponValue + ' type : ' + ConstantValues.couponType)
                console.log('ConstantValues.rateDiscount : ' + ConstantValues.rateDiscount + 'ConstantValues.minimumPriceRequired :' + ConstantValues.minimumPriceRequired)
                cartApi.changeCode(couponDetail.couponCode)
                cartApi.billDetail()
                this.setState({
                    visibleModalCoupon: null,
                    textPromoCode: couponDetail.couponCode
                })
            } else {
                ConstantValues.couponCode = couponDetail.couponCode
                ConstantValues.couponValue = couponDetail.couponValue
                ConstantValues.discount = couponDetail.couponValue
                ConstantValues.couponType = couponDetail.type
                ConstantValues.couponId = couponDetail.couponId
                ConstantValues.minimumPriceRequired = couponDetail.minimumOrderValue
                ConstantValues.isCouponApplied = true
                console.log('couponCode : ' + ConstantValues.couponCode + ' couponValue : ' + ConstantValues.couponValue + ' type : ' + ConstantValues.couponType + 'ConstantValues.minimumPriceRequired :' + ConstantValues.minimumPriceRequired)
                // Cart.changeCode(ConstantValues.couponCode)
                cartApi.changeCode(couponDetail.couponCode)
                cartApi.billDetail()
                this.setState({
                    visibleModalCoupon: null,
                    textPromoCode: couponDetail.couponCode
                })
            }
        } else {
            return (
                // ToastAndroid.show(response.error, ToastAndroid.LONG),

                Alert.alert(
                    'Invalid Coupon',
                    'Minimum Order Value for Promo Code Required. Just add a few more items and Save Big.',
                    [
                        {
                            text: 'OK', onPress: () => this.setState({ visibleModalCoupon: null }),
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false },
                )
            )
        }

    }

    applyCouponsFromInput = (couponCode) => {
        console.log('couponCode [in applyCouponsFromInput]::: ' + couponCode)
        if (couponCode != '') {
            let coupon = this.state.CouponDetail.filter((item) => {
                return item.couponCode == couponCode
            })
            if (coupon.length != 0) {
                coupon.map((coupon) => {
                    console.log('coupon matched//////////////////////' + JSON.stringify(coupon) + 'coupon length : ' + coupon.length)
                    if (ConstantValues.totalBasePrice >= coupon.minimumOrderValue) {
                        if (coupon.type === 'RATE') {
                            ConstantValues.rateDiscount = ((ConstantValues.totalBasePrice / 100) * coupon.couponValue).toFixed(2)
                            ConstantValues.couponCode = coupon.couponCode
                            ConstantValues.couponValue = coupon.couponValue
                            ConstantValues.discount = ConstantValues.rateDiscount
                            ConstantValues.couponType = coupon.type
                            ConstantValues.couponId = coupon.couponId
                            ConstantValues.minimumPriceRequired = coupon.minimumOrderValue
                            ConstantValues.isCouponApplied = true
                            console.log('couponCode : ' + ConstantValues.couponCode + ' couponValue : ' + ConstantValues.couponValue + ' type : ' + ConstantValues.couponType)
                            console.log('ConstantValues.rateDiscount : ' + ConstantValues.rateDiscount + 'ConstantValues.minimumPriceRequired :' + ConstantValues.minimumPriceRequired)
                            cartApi.changeCode(coupon.couponCode)
                            cartApi.billDetail()
                            this.setState({
                                visibleModalCoupon: null,
                                textPromoCode: coupon.couponCode
                            })
                        } else {
                            ConstantValues.couponCode = coupon.couponCode
                            ConstantValues.couponValue = coupon.couponValue
                            ConstantValues.discount = coupon.couponValue
                            ConstantValues.couponType = coupon.type
                            ConstantValues.couponId = coupon.couponId
                            ConstantValues.minimumPriceRequired = coupon.minimumOrderValue
                            ConstantValues.isCouponApplied = true
                            console.log('couponCode : ' + ConstantValues.couponCode + ' couponValue : ' + ConstantValues.couponValue + ' type : ' + ConstantValues.couponType + 'ConstantValues.minimumPriceRequired :' + ConstantValues.minimumPriceRequired)
                            // Cart.changeCode(ConstantValues.couponCode)
                            cartApi.changeCode(coupon.couponCode)
                            cartApi.billDetail()
                            this.setState({
                                visibleModalCoupon: null,
                                textPromoCode: coupon.couponCode
                            })
                        }
                    } else {
                        return (
                            // ToastAndroid.show(response.error, ToastAndroid.LONG),

                            Alert.alert(
                                'Invalid Coupon',
                                'Minimum Order Value for Promo Code Required. Just add a few more items and Save Big.',
                                [
                                    {
                                        text: 'OK', onPress: () => this.setState({ visibleModalCoupon: null }),
                                        style: 'cancel'
                                    },
                                ],
                                { cancelable: false },
                            )
                        )
                    }
                })



            } else {
                return (
                    ToastAndroid.show('Oops !! That\`s an Invalid Code. Please try again.', ToastAndroid.LONG)
                )
            }
        } else {
            ToastAndroid.show('Please Enter Promo Code', ToastAndroid.LONG)
        }
    }

    removeCoupon = () => {
        ConstantValues.couponCode = ''
        ConstantValues.couponValue = 0
        ConstantValues.couponType = ''
        ConstantValues.couponId = 0
        ConstantValues.discount = 0
        ConstantValues.rateDiscount = 0
        ConstantValues.isCouponApplied = false
        ConstantValues.minimumPriceRequired = 0
        this.setState({
            textPromoCode: 'Apply Coupon Code'
        })
        ConstantValues.appliedCode = 'Apply Coupon Code'
        cartApi.billDetail()
    }

    savePassengerDetail = () => {
        ConstantValues.passengerDetail = {
            'pnr': ConstantValues.pnr,
            'berth': ConstantValues.seat,
            'coach': ConstantValues.coach,
            'eta': ConstantValues.eta,
            'deliveryDate': (ConstantValues.isAgent == 1 ? this.state.date : ConstantValues.deliveryDate),
            'deliveryTime': (ConstantValues.isAgent == 1 ? this.state.time : ConstantValues.deliveryTime),
            'trainId': ConstantValues.trainId,
            //  'orderDate' : ConstantValues.orderDate,
            //  'orderTime' : ConstantValues.orderTime,
            'stationId': ConstantValues.stationId,
            'stationCode': ConstantValues.stationCode,
            //'stationName' : ConstantValues.stationName,
            'passengerName': ConstantValues.customerName,
            'passengerMobile': ConstantValues.customerPhoneNo,
            'passengeAlternateMobile': ConstantValues.customeralternateMobile,
            'passengerEmail': ConstantValues.customerEmailId,
            'passengerSeatInfo': ConstantValues.passengerInfo,
            //'suggestions': ConstantValues.suggestions = this.state.addMessage
        }
    }

    confirmCart = () => {
        this.setState({
            proceedDisabled: true,
            proceedLabel: 'Proceeding...'
        })
        if (ConstantValues.totalBasePrice >= ConstantValues.minimumOrderValue) {
            return (
                Alert.alert(
                    'Confirm!!',
                    'Are you sure you want to place this order? No further changes can be made once order is placed.',
                    [
                        {
                            text: 'NO',
                            onPress: () => {
                                console.log('Cancel Pressed')
                                this.setState({
                                    proceedDisabled: false,
                                    proceedLabel: 'Add Passenger Details'
                                })
                            },
                            style: 'cancel',
                        },
                        {
                            text: 'YES', onPress: () => {
                                console.log('Going to passenger Detail')
                                this.savePassengerDetail(),
                                    this.items()
                                this.submitCart()

                            }
                        },
                    ],
                    { cancelable: false },
                )
            )
        }
        else {
            this.setState({
                proceedDisabled: false,
                proceedLabel: 'Add Passenger Details'
            })
            return (
                // ToastAndroid.show(response.error, ToastAndroid.LONG),

                Alert.alert(
                    'Add more items!!',
                    'Order should be atleast Rs.' + ConstantValues.minimumOrderValue,
                    [
                        {
                            text: 'OK',
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false },
                )
            ),
                console.log('minimumorder issue')
        }
    }

    needLogin = () => {
        ConstantValues.navigationChannel = 'ReduxMenu'
        return (
            // ToastAndroid.show(response.error, ToastAndroid.LONG),

            Alert.alert(
                'Alert!!',
                'Please LOGIN to Proceed.',
                [
                    {
                        text: 'OK', onPress: () => this.props.navigation.navigate('Welcome'),
                        style: 'cancel'
                    },
                ],
                { cancelable: false },
            )
        ),
            console.log('Login issue')
    }

    viewCart() {
        if (this.props.totalBasePrice >= ConstantValues.minimumOrderValue) {
            if (ConstantValues.customerId != '') {
                ConstantValues.totalBasePrice = this.props.totalBasePrice
                ConstantValues.walletBalanceUsed = 0
                ConstantValues.couponValue = 0
                this.getCoupons()
                this.getWalletInfo()
                cartApi.removeCoupon()
                this.setState({ walletUsed: false })
                this.setState({ visibleModal: 'bottom' })
                console.log('neither minimumorder issue nor login issue')
            } else {
                ConstantValues.navigationChannel = 'ReduxMenu'
                return (
                    // ToastAndroid.show(response.error, ToastAndroid.LONG),

                    Alert.alert(
                        'Alert!!',
                        'Please LOGIN to Proceed.',
                        [
                            {
                                text: 'OK', onPress: () => this.props.navigation.navigate('Welcome'),
                                style: 'cancel'
                            },
                        ],
                        { cancelable: false },
                    )
                ),
                    console.log('Login issue')
            }
        } else {

            return (
                // ToastAndroid.show(response.error, ToastAndroid.LONG),

                Alert.alert(
                    'Add more items!!',
                    'Order should be atleast Rs.' + ConstantValues.minimumOrderValue,
                    [
                        {
                            text: 'OK',
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false },
                )
            ),
                console.log('minimumorder issue')
        }
    }

    async submitCart() {
        try {
            let response = await cartApi.inCart();
            if (response.status == true) {
                ToastAndroid.show('Added to Cart', ToastAndroid.SHORT)
                this.setState({ visibleModal: null })
                this.props.navigation.navigate('PassengerDetail')
                this.setState({
                    proceedDisabled: false,
                    proceedLabel: 'Add Passenger Details'
                })
            } else {
                this.setState({
                    proceedDisabled: false,
                    proceedLabel: 'Add Passenger Details'
                })
                ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
            }
        } catch (error) {
            this.setState({
                proceedDisabled: false,
                proceedLabel: 'Add Passenger Details'
            })
            console.log('Data received in cart.js catch: ' + error)
        }
    }

    walletOff = () => {
        this.setState({ walletUsed: false })
    }

    expireCart() {
        return (
            Alert.alert(
                'Alert!!',
                'Your cart session is expired. Please try again!!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.setState({ visibleModal: null })
                            this.props.navigation.navigate('Search')
                        },
                        style: 'cancel'
                    },
                ],
                { cancelable: false },
            )
        )
    }
    items = () => {
        ConstantValues.reduxFinalCart = []
        ConstantValues.reduxInCart = this.props.menuResponse
        // this.state.revisedInCart.filter((item) => {
        //     return item.itemCount > 0
        // })
        this.setState({
            revisedInCart: ConstantValues.reduxInCart.filter((item) => {
                return item.itemCount > 0
            })
        })
        console.log('revisedInCart:::' + JSON.stringify(this.state.revisedInCart))
        this.state.revisedInCart.map((item) =>
            ConstantValues.finalCart.push({
                'itemId': item.itemId,
                'itemName': item.itemName,
                'itemDescription': item.itemDescription,
                'categoryId': item.categoryId,
                'typeId': item.typeId,
                'cuisineId': item.cuisineId,
                //billing details
                'zoopPrice': item.zoopPrice,
                //'zoopPrice': item.zoopPrice * item.itemCount,
                'basePrice': item.basePrice,
                'basePriceGstRate': item.basePriceGstRate,
                'basePriceGst': item.basePriceGst,
                'sellingPrice': item.sellingPrice,
                'zoopCustomerDeliveryCharge': item.zoopCustomerDeliveryCharge,
                'zoopCustomerDeliveryChargeGstRate': item.zoopCustomerDeliveryChargeGstRate,
                'zoopCustomerDeliveryChargeGst': item.zoopCustomerDeliveryChargeGst,
                'basePrice': item.basePrice,

                'quantity': item.itemCount,
                'itemTimes': item.itemTimes
            })
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.slide}>
                {/* <ZoopLoader show={this.state.loading}/> */}
                <View style={{ width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
                    <View style={{ flexDirection: 'row', width: Dimensions.get('screen').width }}>
                        <View style={{ justifyContent: 'flex-start', alignContent: 'flex-start', padding: 20 }}>
                            <TouchableOpacity onPress={() => this.goingBack()}>
                                <Icon name={'chevron-left'} size={20} color={'#000000'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width - 80, paddingTop: 10 }}>
                            <Text style={styles.outletName}> {ConstantValues.outletName} </Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', paddingBottom: 10, fontSize: 15 }}>{ConstantValues.stationName}</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                        {/* <Text style={{ fontFamily: 'Poppins-Regular' }}>Veg. Only</Text> */}
                        <ToggleSwitch
                            isOn={this.state.vegOnly}
                            onColor="green"
                            offColor="grey"
                            label="Veg. Only"
                            labelStyle={{ fontFamily: 'Poppins-Regular' }}
                            size="medium"
                            onToggle={
                                vegOnly => {
                                    this.setState({ vegOnly })
                                    if (vegOnly === true) {
                                        this.props.vegMenu()
                                        this.props.clearCart()
                                        console.log("vegOnly === true : ", vegOnly)
                                    } else {
                                        this.props.getMenu()
                                        this.props.clearCart()
                                        console.log("else : ", vegOnly)
                                    }
                                    console.log("normal", vegOnly)
                                }
                            }
                        />
                    </View>
                </View>

                <ScrollView>
                    <View>

                        <View style={styles.topContainer}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* <Image style={{ width: 30, height: 15 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.fssai }} /> */}
                                    <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular' }}> fssai Lic No. {ConstantValues.fssaiNo} </Text>
                                </View>
                                <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular', marginRight: 10 }}>GST No. {ConstantValues.gstIn}</Text>
                            </View>


                            <View
                                style={styles.card}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, marginLeft: 20 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name='star' size={15} color='#ff9214' />
                                            <Text style={{ fontFamily: 'Poppins-Regular' }}> {ConstantValues.outletRating} </Text>
                                        </View>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Rating</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>{ConstantValues.rupee} {ConstantValues.minimumOrderValue}</Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Min. Order</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10, marginRight: 20 }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>{ConstantValues.haltTime} minutes</Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Halt Time</Text>
                                    </View>

                                </View>
                            </View>
                            {/* Offer text label */}
                            {/* <Fade visible={this.state.offer.length != 0}>
                <View style={styles.offerboard}>
                  <Text style={styles.offerText}>Offer:- {this.state.offer}</Text>
                </View>
              </Fade> */}
                        </View>
                    </View>
                    {/*  MENU ITEM STYLES{GRID} */}
                    <View style={{ width: Dimensions.get('window').width }}>
                        {/* <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
              <Text style={{ fontSize: 15, fontFamily: 'Poppins-Medium', color: '#000000' }}>Recommended Items</Text>
            </View> */}

                        <FlatList
                            style={{ width: Dimensions.get('window').width }}
                            data={this.props.menuResponse}
                            // this.state.vegOnly == true ? this.state.onlyVegMenu : this.state.OutletMenuInfo
                            extraData={this.props}
                            renderItem={({ item, index }) =>

                                <View>

                                    <Fade visible={index == 0 ? true : index > 0 && (item.typeName != this.props.menuResponse[index - 1].typeName)}>
                                        <View style={{ width: Dimensions.get('window').width - 10, backgroundColor: '#ffffff', flexDirection: 'row', paddingHorizontal: 15 }} >
                                            {/* <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} /> */}
                                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium', color: '#000000' }}>{item.typeName}</Text>
                                        </View>
                                    </Fade>

                                    <View style={styles.menuCardContainer}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                            <View style={{ flexDirection: 'column', paddingHorizontal: 5, paddingVertical: 5 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 5, paddingHorizontal: 5 }}>

                                                    <View style={{ paddingTop: 8 }}>
                                                        <Image style={{ width: 15, height: 15, }} source={{ uri: item.categoryId === 1 ? ConstantValues.IconUrl + ConstantValues.imgurl.veg : ConstantValues.IconUrl + ConstantValues.imgurl.nonveg }} />
                                                    </View>

                                                    <View style={{ flexDirection: 'column', paddingHorizontal: 5, paddingVertical: 5 }}>
                                                        <Text style={styles.itemName}>{item.itemName}</Text>
                                                        <Text style={{ width: 200, fontSize: 10, color: '#898c8b', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, }}>{item.itemDescription}</Text>
                                                        <Text style={styles.itemName}>{ConstantValues.rupee} {item.basePrice}</Text>
                                                    </View>

                                                </View>

                                            </View>
                                            {/* Incrementor starts here */}
                                            <View style={{ flexDirection: 'column', paddingVertical: 5, justifyContent: 'center', alignItems: 'flex-end', width: 150, paddingRight: 15 }}>
                                                {/* <Fade visible={item.image != null}>
                                                    <Image style={styles.itemImage} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.menu }} />
                                                </Fade> */}
                                                <Counter
                                                    disabledAdd={item.itemCount == 0 ? false : true}
                                                    disabledRemove={item.itemCount == 0 ? true : false}
                                                    itemCount={item.itemCount}
                                                    onPressAdd={() => ConstantValues.customerId != '' ? this.props.addItemToCart(item, index) : this.needLogin()}
                                                    onPressRemove={() => { this.props.removeItemFromCart(item, index) }}
                                                />
                                            </View>
                                            {/* Incrementor ends here */}

                                        </View>
                                    </View>
                                </View>

                            }
                            keyExtractor={(item) => item.itemId.toString()}
                        />

                    </View>
                </ScrollView>

                {/*  Footer  */}
                <Fade visible={this.props.cartLength > 0 ? true : false}>
                    <View style={{ width: ConstantValues.deviceWidth, justifyContent: 'center', height: 65, alignContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate('ReduxCart')}
                            onPress={() => this.viewCart()}
                            disabled={false}>
                            <View style={[styles.reduxFooter]}>

                                <View style={styles.itemCountShow}>
                                    <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>{this.props.cartLength} {this.props.cartLength == 1 ? 'ITEM' : 'ITEMS'}</Text>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                                        <Text style={{ marginLeft: 5, fontSize: 15, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>{ConstantValues.bigrupee} {this.props.totalBasePrice}</Text>
                                        <Text style={{ marginLeft: 5, fontSize: 12, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>plus taxes</Text>
                                    </View>
                                    {/* {this.state.totalCartCount} {this.state.inCart.length == 1 ? 'Item' : 'Items'} |  {ConstantValues.bigrupee} {this.state.totalPrice} */}
                                </View>
                                <View style={styles.viewcart}>
                                    <Text style={{ marginRight: 5, fontSize: 18, fontFamily: 'Poppins-Regular', color: '#ffffff' }}>View Cart</Text>
                                    <Icon style={{ alignSelf: 'center' }} name={'caret-right'} color={'#ffffff'} size={20} />
                                    {/* <Icon name={'shopping-bag'} color={'#ffffff'} size={20} /> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Fade>

                {/* <Overlay
                    isVisible={this.props.loading}
                    width="auto"
                    height="auto"
                // windowBackgroundColor='rgba(255, 255, 255, .5)'
                // // overlayBackgroundColor='#ffffff'
                // onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    <ZoopLoader isVisible={true} text={'Loading...'} />

                </Overlay> */}

                <Modal
                    isVisible={this.state.visibleModal === "bottom"}
                    onBackButtonPress={() => this.setState({ visibleModal: null })}
                    // onSwipeComplete={() => this.setState({ visibleModal: null })}
                    // swipeDirection={['down']}
                    style={styles.bottomModal}
                >
                    {
                        this.props.inCartlength === 0 ?
                            <View style={styles.modalEmptyView}>
                                <Image style={{ width: '100%', height: 300, }} source={require('../images/empty_cart_png.png')} />
                                {/* <Text style={{ alignSelf: 'center', fontSize: 20, color: '#000000', fontFamily: 'Poppins-Medium',textAlign:'center' }}>Cart is Empty</Text> */}
                                <CustomButton
                                    title="Go back to Menu"
                                    onPress={() => this.setState({ visibleModal: null })}
                                    // onPress={() => this.setState({ visibleModal: null })}
                                    style={{ alignSelf: 'center', backgroundColor: '#fff', }}
                                    textStyle={{ color: '#F15926' }}
                                />
                            </View>
                            :
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', width: ConstantValues.deviceWidth - 20, marginVertical: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'column', width: '60%', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ alignSelf: 'center', fontSize: 20, color: '#000000', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>{ConstantValues.outletName}</Text>
                                        <Text style={{ alignSelf: 'center', fontSize: 15, color: '#000000', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>{ConstantValues.stationName}</Text>
                                    </View>
                                </View>
                                <View style={styles.fab}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ alignSelf: 'center', fontSize: 8, color: '#000000', fontFamily: 'Poppins-Medium', }}>Cart Expires in</Text>
                                        <CountDown
                                            until={300}
                                            size={8}
                                            onFinish={() => this.expireCart()}
                                            digitStyle={{ backgroundColor: '#fff', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                                            digitTxtStyle={{ color: '#000', fontFamily: 'Poppins-Medium' }}
                                            timeToShow={['M', 'S']}
                                        // timeLabels={{ m: '', s: '' }}
                                        />
                                    </View>
                                </View>
                                {/* Selected Items list */}
                                {/* <View style={{ width: ConstantValues.deviceWidth}}> */}
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ width: ConstantValues.deviceWidth, alignContent: 'center' }}>
                                    <View style={styles.cartCard}>
                                        <FlatList
                                            style={{ width: ConstantValues.deviceWidth, paddingVertical: 5 }}
                                            scrollEnabled={true}
                                            data={this.props.menuResponse}
                                            extraData={this.props}
                                            renderItem={({ item, index }) =>
                                                <Fade visible={item.itemCount > 0}>
                                                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, width: ConstantValues.deviceWidth - 25, justifyContent: 'space-between', alignContent: "center" }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                            <View style={{ width: 30, alignItems: 'flex-start' }}>
                                                                <Image style={{ width: 15, height: 15 }} source={{ uri: item.categoryId === 1 ? ConstantValues.IconUrl + ConstantValues.imgurl.veg : ConstantValues.IconUrl + ConstantValues.imgurl.nonveg }} />
                                                            </View>
                                                            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', width: 130, color: '#000' }}>{item.itemName}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                                                            <Counter
                                                                style={{ alignItems: 'center', width: 100, height: 32, }}
                                                                itemCount={item.itemCount}
                                                                disabledAdd={item.itemCount == 0 ? false : true}
                                                                disabledRemove={item.itemCount == 0 ? true : false}
                                                                onPressAdd={() => { this.props.addItemToCart(item, index) }}
                                                                onPressRemove={() => { this.props.removeItemFromCart(item, index) }}
                                                            />
                                                            <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Regular', textAlign: 'right', marginRight: 5 }}>{ConstantValues.rupee} {item.basePrice}</Text>
                                                        </View>
                                                    </View>
                                                </Fade>
                                            }
                                            keyExtractor={(item) => item.itemId.toString()}
                                        />

                                    </View>
                                    {/* itemCard ends here */}
                                    <View style={{ marginTop: 10 }}>
                                        <CouponPanel
                                            walletBalance={this.state.walletBalance}
                                            disabledWallet={this.state.textPromoCode == ConstantValues.couponCode ? true : false}
                                            disabledCoupon={ConstantValues.walletBalanceUsed !== 0 ? true : false}
                                            textStyle={{ fontFamily: 'Poppins-Regular' }}
                                            checked={ConstantValues.walletBalanceUsed === 0 ? false : this.state.walletUsed}
                                            appliedCode={ConstantValues.appliedCode}
                                            couponColor={this.state.walletUsed == true || ConstantValues.walletBalanceUsed !== 0 ? '#636666' : '#149db5'}
                                            onPressCoupon={() => { this.changeCode(ConstantValues.couponCode) }}
                                            onPressRemove={() => this.removeCoupon()}
                                            onPressCheckBox={() => {
                                                this.setState({ walletUsed: !this.state.walletUsed }),
                                                    this.walletUsed(this.state.walletUsed)
                                            }}
                                            removeVisible={ConstantValues.appliedCode == ConstantValues.couponCode ? true : false}
                                        />
                                    </View>

                                    <BillCard
                                        totalBasePrice={ConstantValues.totalBasePrice}
                                        gst={(ConstantValues.gst).toFixed(2)}
                                        deliveryCharge={ConstantValues.deliveryCharge}
                                        discount={ConstantValues.discount}
                                        totalPayableAmount={(ConstantValues.totalPayableAmount).toFixed(2)}
                                    />
                                    {/* <View style={{ justifyContent: 'center', width: ConstantValues.deviceWidth, alignContent: 'center',backgroundColor:'#e7e7e7'}}> */}
                                    <CustomButton
                                        disabled={this.state.proceedDisabled}
                                        style={{ backgroundColor: this.state.proceedDisabled === true ? '#9b9b9b' : '#60b246', marginBottom: 20, width: ConstantValues.deviceWidth - 30 }}
                                        onPress={() => this.confirmCart()}
                                        title={this.state.proceedLabel}
                                    />
                                    {/* </View> */}
                                </ScrollView>
                            </View>
                    }
                    {/* </View> */}
                </Modal>


                {/* <CouponPage
                    visibleCouponModal={this.state.visibleModalCoupon === 'bottom'}
                    onBackButtonPress={() => this.setState({ visibleModalCoupon: null })}
                    onChangeCouponText={couponCode => this.setState({ couponCode })}
                    // applyCouponsFromInput={() => { this.applyCouponsFromInput(this.state.couponCode, this.state.CouponDetail) }}
                    couponList={this.state.CouponDetail}
                    // applyCoupons={(item) => { this.applyCoupons(item) }}
                /> */}
                <KeyboardAvoidingView enabled>
                    <Modal
                        isVisible={this.state.visibleModalCoupon === 'bottom'}
                        onBackButtonPress={() => this.setState({ visibleModalCoupon: null })}
                        // onSwipeComplete={() => this.setState({ visibleModal: null })}
                        // swipeDirection={['left', 'right']}
                        style={styles.bottomModal}
                    >

                        <View style={styles.modalView}>
                            <View style={styles.promocodeInput}>
                                <TextInput
                                    style={{ fontSize: 15, textTransform: 'uppercase', fontFamily: 'Poppins-Medium', width: 200 }}
                                    placeholder='Enter Promo Code'
                                    // keyboardType='default'
                                    autoCapitalize='characters'
                                    onChangeText={couponCode => this.setState({ couponCode })}
                                />
                                <TouchableOpacity onPress={() => { this.applyCouponsFromInput(this.state.couponCode, this.state.CouponDetail) }}>
                                    <Text style={{ color: '#60b246', fontSize: 15, fontFamily: 'Poppins-Medium', }}>APPLY</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: Dimensions.get('window').width - 10, flexDirection: 'row', paddingTop: 10 }}>
                                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Medium', paddingHorizontal: 10 }}>Available Coupons</Text>
                                {/* <Image style={{ height: 10, alignSelf: 'center' }} source={require('../images/line.png')} /> */}
                            </View>


                            {/* CouponDetail Card begin Here */}


                            <FlatList
                                data={this.state.CouponDetail}
                                renderItem={({ item }) =>

                                    <View>
                                        <View style={styles.cardCoupon}>
                                            <View>
                                                <TouchableWithoutFeedback onPress={() => this.applyCoupons(item)}>
                                                    <View style={styles.codeView}>
                                                        <Text style={styles.text}>{item.couponCode}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>

                                                <Text style={{ paddingTop: 5, color: '#000000', fontFamily: 'Poppins-Regular', }}>{item.discription}</Text>
                                                <Text style={{ paddingTop: 5, fontFamily: 'Poppins-Regular', }}>Validity of this coupon is: {moment(item.validityEndDate).format('DD-MM-YYYY HH:mm A')}</Text>
                                            </View>

                                            <TouchableOpacity
                                                onPress={() => this.applyCoupons(item)}
                                            >
                                                <Text style={{ color: '#60b246', fontSize: 15, fontFamily: 'Poppins-Medium', alignSelf: 'flex-end', marginRight: 25 }}>APPLY</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                }
                                keyExtractor={item => item.couponId.toString()}
                            />

                        </View>
                        {/* CouponDetail Card ends Here  */}


                    </Modal>
                </KeyboardAvoidingView>

            </SafeAreaView>
        )
    }
}

const mapStateToProp = state => {
    return {
        menuResponse: state.menuResponse,
        loading: state.loading,
        error: state.error,
        cart: state.cart,
        inCartlength: state.inCartlength,
        removeDiscount: state.removeDiscount,
        cartLength: state.cartLength,
        totalBasePrice: state.totalBasePrice,
        showFooter: state.showFooter
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getMenu: () => dispatch(menuAction.getMenu()),
        vegMenu: () => dispatch(menuAction.vegMenu()),
        clearCart: () => dispatch(menuAction.clearCart()),
        addItemToCart: (item) => dispatch(menuAction.addItemToCart(item)),
        removeItemFromCart: (item) => dispatch(menuAction.removeItemFromCart(item))
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(ReduxMenu)