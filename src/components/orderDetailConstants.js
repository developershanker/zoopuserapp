import React, { Component } from 'react';
import Device from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';


export default class OrderDetailConstants {
static zoopOrderId = ''
static irctcOrderId = ''
static eta = ''
static totalAmount = 0
static deliveryCharge = 0
static gst = 0
static totalPayableAmount = ''
static couponValue = 0
static walletAmount = 0
static paidAmount = 0
static status = ''
static orderStatus = ''
static discount = 0
static items = []
static rupee = <Icon size={15} name={'rupee'}/>
}

