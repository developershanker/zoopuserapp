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
  static customerId = ''
  static token = ''
  static loginCount = null
  static couponCode = 'ZOOP50'
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

  //cart management module
  
  //zoopsocials
  static zoopFacebook = 'https://www.facebook.com/zoopindia2014/'
  static zoopInstagram = 'https://www.instagram.com/zoopindia/'
  static zoopTwitter = 'https://twitter.com/zoopindia'
}
