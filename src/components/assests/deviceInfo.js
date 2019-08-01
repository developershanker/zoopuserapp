import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Device from 'react-native-device-info';
import {CustomButton} from '../assests/customButtonShort';

export default class deviceInfo extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
       <CustomButton
            title="SHOW INFO"
            onPress={
              () => {
                console.log('deviceapi: '+deviceapi),
                console.log('baseOs: '+JSON.stringify(baseOs)),
                console.log('applicationName: '+applicationName),
                console.log('batteryLevel: '+JSON.stringify(batteryLevel)),
                console.log('model: '+model),
                console.log('brand: '+brand),
                console.log('camera: '+JSON.stringify(camera)),
                console.log('carrier: '+carrier),
                console.log('codeName: '+codeName),
                console.log('device: '+device),
                console.log('deviceCountry: '+deviceCountry),
                console.log('deviceId: '+deviceId),
                console.log('display: '+display),
                console.log('deviceName: '+deviceName),
                console.log('firstInstallTime: '+firstInstallTime),
                console.log('freeDiskStaorage: '+freeDiskStorage),
                console.log('hardware: '+hardware),
                console.log('ip: '+JSON.stringify(ip)),
                console.log('installreferrer: '+referrer),
                console.log('lastUpdateTime: '+lastUpdateTime),
                console.log('macAddress: '+JSON.stringify(macAddress)),
                console.log('maxMemory: '+maxMemory),
                console.log('phoneNumber: '+phoneNumber),
                console.log('product: '+product),
                console.log('readableVersion: '+readableVersion),
                console.log('systemName: '+systemName),
                console.log('systemVersion: '+systemVersion),
                console.log('osBuildId: '+osBuildId),
                console.log('storageSize: '+storageSize),
                console.log('totalMemory: '+totalMemory),
                console.log('appVersion: '+appVersion),
                console.log('airplaneMode: '+JSON.stringify(airplane)),
                console.log('isTablet: '+isTablet),
                console.log('deviceType: '+deviceType),
                console.log('locationEnabled: '+JSON.stringify(locationEnable))

               
              }
            }
            />
      </View>
    );
  }
}
const deviceapi=Device.getAPILevel();
const baseOs=Device.getBaseOS();
const applicationName=Device.getApplicationName();
const batteryLevel= Device.getBatteryLevel();
const brand=Device.getBrand();
const camera=Device.getCameraPresence();
const carrier = Device.getCarrier();
const codeName = Device.getCodename();
const device = Device.getDevice();
const deviceCountry = Device.getDeviceCountry();
const deviceId = Device.getDeviceId();
const display = Device.getDisplay();
const deviceName = Device.getDeviceName();
const firstInstallTime = Device.getFirstInstallTime();
const freeDiskStorage = Device.getFreeDiskStorage();
const hardware = Device.getHardware();
// const ip =Device.getIPAddress();
const ip = Device.getIPAddress().then(ip => {
   return ip
  });
const referrer = Device.getInstallReferrer();
const lastUpdateTime = Device.getLastUpdateTime();
const macAddress= Device.getMACAddress();
const maxMemory = Device.getMaxMemory();
const model = Device.getModel();
const phoneNumber = Device.getPhoneNumber();
const product = Device.getProduct();
const readableVersion = Device.getReadableVersion();
const systemName = Device.getSystemName();
const systemVersion = Device.getSystemVersion();
const osBuildId = Device.getBuildId();
const storageSize = Device.getTotalDiskCapacity();
const totalMemory = Device.getTotalMemory();
const appVersion = Device.getVersion();
const airplane= Device.isAirPlaneMode();
const isTablet = Device.isTablet(); 
const deviceType = Device.getDeviceType();
const locationEnable = Device.isLocationEnabled();
