import React, { Component } from 'react';
import Device from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
export default class ConstantValues {
  static apiUrl = 'https://appapi.zoopindia.in/'
  //  static apiUrl = 'http://13.126.232.146:3000/'
  //static apiUrl = 'http://10.5.48.206:3000/'
  // http://10.5.48.206:3000/ local          //http://13.126.232.146:3000/ main
  static customer = { name: '', mobileNo: '' }
  static customerName = ''
  static customeralternateMobile = ''
  static customerPhoneNo = ''
  static customerEmailId = ''
  static customerId = ''
  static token = ''
  static isAgent = 0
  static loginCount = null

  static walletBalance = null
  // static walletSummary = { }
  static rupee = <Icon name={'rupee'} size={15} />
  static orderRating = ''
  static source = 'APP'
  static device = {
    apiLevel: Device.getAPILevel(),
    ip: Device.getIPAddress().then(ip => { return ip }),
    deviceId: Device.getDeviceId(),
    carrier: Device.getCarrier(),
    firstInstallTime: Device.getFirstInstallTime(),
    macAddress: Device.getMACAddress(),
    systemVersion: Device.getSystemVersion(),
    systemName: Device.getSystemName(),
    appVersion: Device.getVersion(),
    deviceType: Device.getDeviceType(),
    osBuildId: Device.getBuildId(),
  }

  //station and outlet
  static searchString = ''

  //order constant module
  static stationId = ''
  static stationName = ''
  static stationCode = ''
  static outletId = ''
  static outletName = ''
  static haltTime = ''
  static outletRating = null
  static minimumOrderValue = null
  static suggestions = ''

  //passenger detail
  static pnr = ''
  static coach = ''
  static seat = ''
  static eta = ''
  static ata = ''
  static trainId = 0
  static trainNumber = ''
  static trainName = ''
  static orderDate = ''
  static orderTime = ''
  static deliveryDate = ''
  static deliveryTime = ''
  static schArrivalDate = ''
  static seatInfo = []
  static passengerDetail = []


  //payment variables
  static paymentMode = '' //paytm   cod   payu
  static paymentType = ''  //online //cod
  static refNo = ''
  static paymentTypeId = ''
  static paymentDetails = []

    //ZoopWE12498126199605
  // <string name="merchant_key">klbGlV59135347348753</string>
  // <string name="website">APP_STAGING</string>
  //   <string name="website_live">ZoopWEWAP</string>
   //static CALLBACK_URL = 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' + this.zoopOrderId



//paytm variables staging
static MID = 'FIjIdu58691666399235'
  static WEBSITE = 'APP_STAGING'
  static CHANNEL_ID = 'WAP'
  static INDUSTRY_TYPE_ID = 'Retail' //Retail109
  static checkSum = ''
  static txnId = ''
  static paymentOrderId = ''
  static paymentStatus = true
  static gatewayResponse = {}


  //production paytm
  // static MID = 'ZoopWE12498126199605'
  // static WEBSITE = 'ZoopWEWAP'
  // static CHANNEL_ID = 'WAP'
  // static INDUSTRY_TYPE_ID = 'Retail109' //Retail109

  //irctc constants
  static textPayment = ''
  static paymentLoading = true
  static irctcId = ''
  static textIrctc = ''
  static irctcLoading = true

  //cart management module
  static couponCode = ''
  static isWalletUsed = false
  static couponValue = 0
  static couponType = ''
  static totalBasePrice = 0
  static totalBasePrice = 0
  static minimumPriceRequired = 0
  static couponId = 0
  static discount = 0
  static walletBalanceUsed = 0
  static gst = 0
  static deliveryCharge = 0
  static totalPayableAmount = 0
  static inCart = []
  static finalCart = []
  static billDetail = []

  //zoopsocials
  static zoopFacebook = 'https://www.facebook.com/zoopindia2014/'
  static zoopInstagram = 'https://www.instagram.com/zoopindia/'
  static zoopTwitter = 'https://twitter.com/zoopindia'


  //zoopOrderId
  static zoopOrderId = 0

  //paytm credentials
  static merchant_key = 'klbGlV59135347348753'
  //Icon set in app
  // https://zoop.s3.ap-south-1.amazonaws.com/app-Icon-set/AC+Coach.svg
  static bucket = 'zoop-dev-local'
  static region = 's3.ap-south-1'
  static url = 'amazonaws.com/'
  static IconUrl = 'https://' + this.bucket + '.' + this.region + '.' + this.url
  static imgurl = {
    facebook: 'app-Icon-set/Facebook.svg',
    twitter: 'app-Icon-set/Twitter.svg',
    location: 'app-Icon-set/location.svg',
    fssai: 'app-Icon-set/fssai.png',
    paytm: 'app-Icon-set/paytmnew.png',
    outlet: 'app-Icon-set/Biryani.jpg',
    menu: 'app-Icon-set/Idli_Sambhar.jpg',
    deliveryboy: 'app-Icon-set/Delivery+Boy.svg',
    deliveryboypng: 'app-Icon-set/deliveryboy.png',
    //logos
    zooporange: 'app-Icon-set/zooplogoorange.png',
    zoopwhite: 'app-Icon-set/zooplogowhite.png',
    zoopblack: 'app-Icon-set/zooplogoblack.png',
    //banners
    home: 'app-Icon-set/Home.jpg',
    banner1: 'app-Icon-set/banner1.jpg',
    banner2: 'app-Icon-set/banner2.jpg',
    banner3: 'app-Icon-set/banner3.jpg',
    banner4: 'app-Icon-set/banner4.jpg',


  }

}
