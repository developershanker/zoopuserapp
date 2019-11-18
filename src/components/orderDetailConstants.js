import React, { Component } from 'react';
import Device from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';


export default class OrderDetailConstants {
    static data = []
    static zoopTransactionNo = ''
    static irctcOrderId = ''
    static status = ''
    static orderStatus = ''
    static orderType = ''
    static bookingDate = ''
    static bookingTime = ''
    //passenger journey info
    static eta = ''
    static pnr = ''
    static trainName = ''
    static trainNumber = ''
    static stationName = ''
    static stationCode = ''
    static outletName = ''
    static coach = ''
    static seat = ''
    //passenger info
    static name = ''
    static passengerName = ''
    static passengerMobile = ''
    static passengeAlternateMobile = ''
    static suggestions = ''
    //bill info
    static paymentTypeId = 0
    static totalAmount = 0
    static deliveryCharge = 0
    static gst = 0
    static totalPayableAmount = ''
    static paidAmount = 0
    static balanceToPay = 0
    static discount = 0

    static couponId = 0
    static couponCode = ''
    static couponValue = 0
    static walletAmount = 0
    //item Detail
    static items = []
    //extra
    static rupee = <Icon size={15} name={'rupee'} />
}

