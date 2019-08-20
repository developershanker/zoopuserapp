import React, { Component } from 'react';
import Device from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
export default class ConstantValues {
  static apiUrl = 'http://10.5.48.206:3000/'
  static customer = { name: '', mobileNo: '' }
  static customerName = ''
  static customeralternateMobile = ''
  static customerPhoneNo = ''
  static customerEmailId = ''
  static customerId = ''
  static token = ''
  static loginCount = null
  static couponCode = 'ZOOP50'
  static walletBalance = 200
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


  //order constant module
  static stationId = '5884'
  static outletId = '1'
}
