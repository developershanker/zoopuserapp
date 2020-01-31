import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import { Fade } from '../assests/fade.js';
import OrderDetailConstants from '../orderDetailConstants.js';
import Colors from '../colors.js';
import moment from "moment";
import orderApi from '../orderBooking/orderApi.js';
import { ErrorView } from '../assests/errorView.js';
import { Overlay } from 'react-native-elements';
import { ZoopLoader } from '../assests/zoopLoader.js';

export default class myOrderDetail extends Component {
    componentDidMount() {
        SplashScreen.hide();
        this.orderHistoryDetail(OrderDetailConstants.orderId, ConstantValues.customerId)
        // this.setState({
        //     detailItem: this.state.data.items
        // })
        // this.handleDiscountLabel()
        // this.handleBalanceToPay()
    }
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            detailItem: [],
            discountLabel: '',
            balanceToPay: 0,
            errorVisible: false,
            isVisible:true,
            paidAmount:0,
            balanceToPay:0,
        };
    }

    async orderHistoryDetail(orderId, customerId) {
        try {
            let response = await orderApi.orderHistoryDetail(orderId, customerId);
            // console.log('Data in order history Detail:::' + JSON.stringify(response.data))
            if (response.status == true) {
                this.setState({
                    data: response.data,
                    detailItem: response.data.items,
                    paidAmount:response.data.paidAmount,
                    isVisible:false
                })
                this.handleDiscountLabel()
                this.handleBalanceToPay()
            }
            else {
                this.setState({
                    isVisible:false,
                    errorVisible:true,
                })
            }
        } catch (error) {
            this.setState({
                isVisible:false,
                errorVisible:true,
            })
            console.log('Data received in myOrderDetail.js catch: ' + error)
        }
    }

    handleDiscountLabel() {
        if (this.state.data.couponId != null && this.state.data.couponId > 0) {
            this.setState({
                discountLabel: 'Discount (' + this.state.data.couponCode + ')'
            })
        } else if (this.state.data.walletAmount != null && this.state.data.walletAmount > 0) {
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
        // this.state.paidAmount = this.state.data.paidAmount === null ? 0 : this.state.data.paidAmount
        this.setState({
            paidAmount: this.state.data.paidAmount === null ? 0 : this.state.data.paidAmount
        })
        console.log('this.state.paidAmount:::' + this.state.paidAmount)
        if (this.state.data.paymentTypeId == 1) {
            this.state.balanceToPay = this.state.data.totalPayableAmount - (this.state.paidAmount ? this.state.paidAmount : 0);
        } else if (this.state.data.paymentTypeId == 2) {
            // zero for Prepaid order
            this.state.balanceToPay = 0;
        } else {
            this.state.balanceToPay = this.state.data.totalPayableAmount - (this.state.paidAmount ? this.state.paidAmount : 0);
        }
        console.log('this.state.balanceToPay:::' + this.state.balanceToPay)
    }

    render() {
        return (
            <SafeAreaView style={styles.slide}>
                {this.state.errorVisible === true ?
                    <ErrorView onPress={() => this.props.navigation.navigate('Search')} />
                    : <ScrollView>
                        {/* header view */}
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                                <IconA style={{ margin: 20 }} name={'arrowleft'} size={25} color={Colors.black} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> Order Details </Text>
                            </View>
                        </View>
                        {/* header view ends */}

                        <View style={styles.card}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Order Id</Text>
                                <Text style={styles.tiletext}>{this.state.data.irctcOrderId}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>ZOOP Txn. No.</Text>
                                <Text style={styles.tiletext}>{this.state.data.zoopTransactionNo}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Status</Text>
                                <Text style={{ fontFamily: 'Poppins-Medium', color: ConstantValues.orderStatus[this.state.data.status] }}>{this.state.data.orderStatus}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Order Type</Text>
                                <Text style={[styles.tiletext], { fontFamily: 'Poppins-Bold', color: Colors.newgGreen1 }}>{this.state.data.paymentTypeName}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Booking Date</Text>
                                <Text style={styles.tiletext}>{this.state.data.bookingDate === null ? 'Date not available' : moment(this.state.data.bookingDate).format('DD-MM-YYYY')}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Booking Time</Text>
                                <Text style={styles.tiletext}>{(this.state.data.bookingDate === null ? 'Time not available' : moment(this.state.data.bookingDate).format('HH:mm'))}</Text>
                            </View>

                        </View>

                        <View style={styles.card}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Passenger Name</Text>
                                <Text style={styles.tiletext}>{this.state.data.passengerName}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Passenger Mobile No.</Text>
                                <Text style={styles.tiletext}>{this.state.data.passengerMobile}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Passenger Alt. Mobile No.</Text>
                                <Text style={styles.tiletext}>{this.state.data.passengeAlternateMobile}</Text>
                            </View>

                            <Fade visible={this.state.data.suggestions !== ''}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <Text style={styles.tiletext}>Suggestions</Text>
                                    <Text style={{ width: 100, fontFamily: 'Poppins-Regular', color: '#000000', textAlign: 'right', fontSize: 12 }}>"{this.state.data.suggestions}"</Text>
                                </View>
                            </Fade>

                        </View>


                        <View style={styles.card}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>PNR</Text>
                                <Text style={styles.tiletext}>{this.state.data.pnr}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Station Name</Text>
                                <Text style={styles.tiletext}>({this.state.data.stationCode}) {this.state.data.stationName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Outlet Name</Text>
                                <Text style={styles.tiletext}>{this.state.data.outletName}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Train Name/No.</Text>
                                <Text style={styles.tiletext}>{this.state.data.trainName}/ {this.state.data.trainNumber}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Coach/Seat No.</Text>
                                <Text style={styles.tiletext}>{this.state.data.coach} / {this.state.data.berth}</Text>
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
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#000000', width: 200 }}>{item.itemName}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 100, alignContent: 'center', }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', color: Colors.newgGreen1, width: 40, textAlign: 'right' }}> {item.quantity} </Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', color: '#000', fontSize: 10, }}> X </Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', width: 50, textAlign: 'right', fontSize: 12, }}> {this.state.data.rupee} {item.basePrice}</Text>
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
                                <Text style={styles.tiletext}>{ConstantValues.rupee} {this.state.data.totalAmount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>+ GST on food</Text>
                                <Text style={styles.tiletext}>{ConstantValues.rupee} {this.state.data.gst}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>+ Delivery Charge (Inc. GST)</Text>
                                <Text style={styles.tiletext}>{ConstantValues.rupee} {this.state.data.deliveryCharge + this.state.data.deliveryChargeGst}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>(-) {this.state.discountLabel}</Text>
                                <Text style={[styles.tiletext, { color: Colors.newgGreen1 }]}>  {ConstantValues.rupee} {this.state.data.discount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Order Total </Text>
                                <Text style={[styles.tiletext, { color: Colors.newgGreen1 }]}>  {ConstantValues.rupee} {this.state.data.totalPayableAmount}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>(-) Paid Online </Text>
                                <Text style={styles.tiletext}>  {ConstantValues.rupee} {this.state.data.paymentTypeId === 2 ? this.state.data.totalPayableAmount : this.state.paidAmount}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <Text style={styles.tiletext}>Balance To Pay</Text>
                                <Text style={styles.tiletext}>  {ConstantValues.rupee} {this.state.balanceToPay}</Text>
                            </View>

                        </View>

                        {/* </View> */}



                    </ScrollView>}
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
        fontSize: 12,
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