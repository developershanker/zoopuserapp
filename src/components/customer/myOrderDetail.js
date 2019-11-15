import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import { Fade } from '../assests/fade.js';
import OrderDetailConstants from '../orderDetailConstants.js';

export default class myOrderDetail extends Component {
    componentDidMount() {
        SplashScreen.hide();
        this.setState({
            detailItem: OrderDetailConstants.items
        })
        this.handleDiscountLabel()
        this.handleBalanceToPay()
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            detailItem: [],
            discountLabel: '',
            balanceToPay: 0
        };
    }

    handleDiscountLabel() {
        if (OrderDetailConstants.couponId != null && OrderDetailConstants.couponId > 0) {
            this.setState({
                discountLabel: 'Discount (' + OrderDetailConstants.couponCode + ')'
            })
        } else if (OrderDetailConstants.walletAmount != null && OrderDetailConstants.walletAmount > 0) {
            this.setState({
                discountLabel: 'Discount (Wallet)'
            })
        } else {
            this.setState({
                discountLabel: 'Discount'
            })
        }

    }

    handleBalanceToPay() {
        if (OrderDetailConstants.paymentTypeId == 1) {
            OrderDetailConstants.balanceToPay = OrderDetailConstants.totalPayableAmount - (OrderDetailConstants.paidAmount ? OrderDetailConstants.paidAmount : 0);
        } else if (OrderDetailConstants.paymentTypeId == 2) {
            // zero for Prepaid order
            OrderDetailConstants.balanceToPay = 0;
        } else {
            OrderDetailConstants.balanceToPay = OrderDetailConstants.totalPayableAmount - (OrderDetailConstants.paidAmount ? OrderDetailConstants.paidAmount : 0);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.slide}>
                <ScrollView>
                    {/* header view */}
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyOrders')}>
                            <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 20, color: '#000000' }}> Order Details </Text>
                        </View>
                    </View>
                    {/* header view ends */}

                    <View style={styles.card}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Order Id</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.irctcOrderId}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>ZOOP Txn. No.</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.zoopTransactionNo}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Status</Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: ConstantValues.orderStatus[OrderDetailConstants.status] }}>{OrderDetailConstants.orderStatus}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Order Type</Text>
                            <Text style={[styles.tiletext], { fontFamily: 'Poppins-Bold', color: '#000' }}>{OrderDetailConstants.orderType}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Booking Date</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.bookingDate}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Booking Time</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.bookingTime}</Text>
                        </View>

                    </View>

                    <View style={styles.card}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Passenger Name</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.passengerName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Passenger Mobile No.</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.passengerMobile}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Passenger Alt. Mobile No.</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.passengeAlternateMobile}</Text>
                        </View>

                        <Fade visible={OrderDetailConstants.suggestions !== ''}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Suggestions</Text>
                                <Text style={{ width: 100, fontFamily: 'Poppins-Regular', color: '#000000', textAlign: 'right' }}>"{OrderDetailConstants.suggestions}"</Text>
                            </View>
                        </Fade>

                    </View>


                    <View style={styles.card}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>PNR</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.pnr}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Station Name</Text>
                            <Text style={styles.tiletext}>({OrderDetailConstants.stationCode}) {OrderDetailConstants.stationName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Outlet Name</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.outletName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Train Name/No.</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.trainName}/ {OrderDetailConstants.trainNumber}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Coach/Seat No.</Text>
                            <Text style={styles.tiletext}>{OrderDetailConstants.coach} / {OrderDetailConstants.seat}</Text>
                        </View>

                    </View>

                    {/* <View style={{ width: ConstantValues.deviceWidth - 10, marginBottom: 5, marginTop: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}> */}
                    <View style={styles.card}>
                        <FlatList
                            data={this.state.detailItem}
                            extraData={this.state}
                            scrollEnabled={true}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', }}>{item.itemName}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 100, alignContent: 'center', }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: '#6dcc5a', width: 40, textAlign: 'right' }}> {item.quantity} </Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: '#000', fontSize: 10, }}> X </Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', width: 50, textAlign: 'right' }}> {OrderDetailConstants.rupee} {item.basePrice}</Text>
                                    </View>
                                </View>
                            }
                            keyExtractor={(item) => item.itemId.toString()}
                        />
                    </View>
                    {/* </View> */}

                    {/* <View style={{ width: ConstantValues.deviceWidth - 10, marginTop: 5, marginBottom: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}> */}
                    <View style={styles.card}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Item Total</Text>
                            <Text style={styles.tiletext}>{ConstantValues.rupee} {OrderDetailConstants.totalAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>(+) GST on food</Text>
                            <Text style={styles.tiletext}>{ConstantValues.rupee} {OrderDetailConstants.gst}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>(+) Delivery Charge (Inc. GST)</Text>
                            <Text style={styles.tiletext}>{ConstantValues.rupee} {OrderDetailConstants.deliveryCharge}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>(-) {this.state.discountLabel}</Text>
                            <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {OrderDetailConstants.discount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Order Total </Text>
                            <Text style={[styles.tiletext, { color: '#60b246' }]}>  {ConstantValues.rupee} {OrderDetailConstants.totalPayableAmount}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>(-) Paid Online </Text>
                            <Text style={styles.tiletext}>  {ConstantValues.rupee} {OrderDetailConstants.paymentTypeId == 2 ? OrderDetailConstants.totalPayableAmount : OrderDetailConstants.paidAmount}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <Text style={styles.tiletext}>Balance To Pay</Text>
                            <Text style={styles.tiletext}>  {ConstantValues.rupee} {OrderDetailConstants.balanceToPay}</Text>
                        </View>

                    </View>

                    {/* </View> */}



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
        backgroundColor: '#fff',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    tileM: {
        width: Dimensions.get('screen').width - 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: '#ffffff',//can change as we move to various pages
        paddingVertical: 5,
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
        // paddingHorizontal: 10,
        paddingVertical: 5
    },
    tiletext: {
        fontFamily: 'Poppins-Regular',
        color: '#000000'
    },
    tiletextH: {
        fontFamily: 'Poppins-Medium',
        color: '#000000',
        fontSize: 18
    },
    tiletextM: {
        fontFamily: 'Poppins-Regular',
        color: '#000000',
        fontSize: 18
    },
    tiletextitem: {
        fontFamily: 'Poppins-Regular',
        color: '#6a6e6c',
        fontSize: 12
    }
});