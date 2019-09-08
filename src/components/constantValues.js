import React, { Component } from 'react';
import Device from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
export default class ConstantValues {
  static apiUrl = 'http://13.126.232.146:3000/'
  // static apiUrl = 'http://10.5.48.206:3000/'
  // http://10.5.48.206:3000/ local          //http://13.126.232.146:3000/ main
  static customer = { name: '', mobileNo: '' }
  static customerName = ''
  static customeralternateMobile = ''
  static customerPhoneNo = ''
  static customerEmailId = ''
  static customerId = '1'
  static token = '123'
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
  static orderDate = ''
  static orderTime = ''
  static seatInfo = []
  static passengerDetail = []


  //payment variables
  static paymentMode = '' //paytm   cod   payu
  static paymentType = ''  //online //cod
  static refNo = ''
  static paymentDetails = []

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
  static billDetail = []

  //zoopsocials
  static zoopFacebook = 'https://www.facebook.com/zoopindia2014/'
  static zoopInstagram = 'https://www.instagram.com/zoopindia/'
  static zoopTwitter = 'https://twitter.com/zoopindia'

  //Icon set in app
  // https://zoop.s3.ap-south-1.amazonaws.com/app-Icon-set/AC+Coach.svg
  static bucket = 'zoop-dev-local'
  static region = 's3.ap-south-1'
  static url = 'amazonaws.com/'
  static IconUrl = 'https://' + this.bucket + '.' + this.region + '.' + this.url
  static imgurl = {
    facebook: 'app-Icon-set/Facebook.svg',
    location: 'app-Icon-set/location.svg',
    fssai: 'app-Icon-set/fssai.png',
    paytm: 'app-Icon-set/paytmnew.png',
    outlet: 'app-Icon-set/Biryani.jpg',
    menu: 'app-Icon-set/Idli_Sambhar.jpg'
  }

}
