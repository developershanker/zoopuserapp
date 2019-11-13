import React, { Component } from 'react';
import {Dimensions,Text,PixelRatio} from 'react-native'
import Device from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-spinkit';

export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height
export const calcHeight = x => PixelRatio.roundToNearestPixel((deviceHeight * x) / 100)
export const calcWidth = x => PixelRatio.roundToNearestPixel((deviceWidth * x) / 100)
export default class ConstantValues {
static apiUrl = 'https://appapi.zoopindia.in/'
//static apiUrl = 'http://10.5.51.106:3000/'
//static apiUrl = 'http://192.168.1.7:3000/'



  
  static customer = { name: '', mobileNo: '' }
  static customerName = ''
  static customeralternateMobile = ''
  static customerPhoneNo = ''
  static customerEmailId = ''
  static tempCustomerId = ''
  static customerId = ''
  static customerRefferalCode = ''
  static token = ''
  static isAgent = 0
  static loginCount = null

  static walletBalance = null
  // static walletSummary = { }
  static rupee = <Icon name={'rupee'}/>
  static bigrupee = <Icon name={'rupee'} size={15}/>
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
  static deviceWidth = Dimensions.get('screen').width
  static deviceHeight = Dimensions.get('screen').height

  //station and outlet
  static searchString = ''
  static navigationChannel = ''

  //order constant module
  static stationId = ''
  static stationName = ''
  static stationCode = ''
  static outletId = ''
  static outletName = ''
  static cuttoff = ''
  static haltTime = ''
  static outletRating = null
  static minimumOrderValue = null
  static suggestions = ''

  static orderStatus = ['#e95225','#cc1b1b','#f52a2a','#e95225','#71e3e3','#f52a2a','#e0e643','#27cfbb','#43d12a','#393e59','#4f4e4e','#252629','#6c7293'];

  //passenger detail
  static pnr = ''
  static coach = ''
  static seat = ''
  static eta = ''
  static ata = ''
  static openTime = ''
  static closeTime = ''
  static weeklyOff = ''
  static dateOfOrder = ''
  static timeOfOrder = ''
  static trainId = ''
  static trainNumber = ''
  static trainName = ''
  static orderDate = ''
  static orderTime = ''
  static deliveryDate = ''
  static deliveryTime = ''
  static schArrivalDate = ''
  static seatInfo = []
  static passengerInfo = []
  static passengerDetail = []
  static rateDiscount = 0

  //payment variables
  static paymentMode = '' //paytm   cod   payu
  static paymentType = ''  //online //cod
  static refNo = ''
  static paymentTypeId = ''
  static paymentDetails = []
  static zooptransactionId = ''

  //agent cred
  static agentAction = []
  static skipSms = 0
  static skipIrctc = 0
  static skipPnr = 0

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
  static paymentOrderId = ''  // orderid which is pused from zoop to paytm
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
  static appliedCode = 'Apply Coupon Code'
  static isCouponApplied = false
  static totalBasePrice = 0
  static totalBasePrice = 0
  static totalZoopPrice = 0
  static minimumPriceRequired = 0
  static couponId = 0
  static discount = 0
  static walletBalanceUsed = 0
  static gst = 0
  static deliveryCharge = 0
  static deliveryChargegst= 0
  static deliveryChargegstRate = 0
  static basePriceGstRate= 0
  static totalPayableAmount = 0
  static arrayCoupon = []
  static inCart = []
  static finalCart = []
  static billDetail = []

  //zoopsocials
  static zoopFacebook = 'https://www.facebook.com/zoopindia2014/'
  static zoopInstagram = 'https://www.instagram.com/zoopindia/'
  static zoopTwitter = 'https://twitter.com/zoopindia'


  //zoopOrderId
  static zoopOrderId = 0
  static orderedItems = []

  //paytm credentials
  static merchant_key = 'klbGlV59135347348753'
  //Icon set in app
  // https://zoop.s3.ap-south-1.amazonaws.com/app-Icon-set/AC+Coach.png
  static bucket = 'zoop-dev-local'
  static region = 's3.ap-south-1'
  static url = 'amazonaws.com/'
  static IconUrl = 'https://' + this.bucket + '.' + this.region + '.' + this.url
  static imgurl = {
    facebook: 'app-Icon-set/Facebook.png',
    twitter: 'app-Icon-set/Twitter.png',
    instagram:'app-Icon-set/Instagram.png',
    location: 'app-Icon-set/location.png',
    call:'app-Icon-set/Call.png',
    email:'app-Icon-set/Email.png',
    fssai: 'app-Icon-set/fssai.png',
    paytm: 'app-Icon-set/paytmnew.png',
    outlet: 'app-Icon-set/Biryani.jpg',
    menu: 'app-Icon-set/Idli_Sambhar.jpg',
    deliveryboy: 'app-Icon-set/Delivery+Boy.png',
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

    //Ac coach png
    acCoach: 'app-Icon-set/AC+Coach.png',
    sleeperCoach:'app-Icon-set/Sleeper+Coach.png',
    trainEngine:'app-Icon-set/Train+Engine.png',
    
    //icon set
    helpline: 'app-Icon-set/Helpline.png',
    coachSequence: 'app-Icon-set/Coach+Sequence.png',
    platformLocator: 'app-Icon-set/Platform+Locator.png',
    spotYourTrain: 'app-Icon-set/Spot+your+train.png',
    trainTimeTable:'app-Icon-set/Train+Timetable.png',
    pnrCheck:'app-Icon-set/PNR+Status.png',
    bulkOrder:'app-Icon-set/Banner+Icon.png',
    veg:'app-Icon-set/Veg.png',
    nonveg:'app-Icon-set/Non-Veg.png',
    myorders:'app-Icon-set/My+Orders.png',
    myProfile:'app-Icon-set/Profile.png',
    homeScreen:'app-Icon-set/Home.png',
    myWallet:'app-Icon-set/Wallet.png',
    contactus:'app-Icon-set/Contact+Us.png',
    invite:'app-Icon-set/Invite+&+earn.png',
    faq:'app-Icon-set/FAQ.png',
    rate:'app-Icon-set/Rate+us.png',
    tnc:'app-Icon-set/Terms+&+Condition.png',
    feedback:'app-Icon-set/edit.png',
    outletVeg:'app-Icon-set/veg.png',
    outletNonveg:'app-Icon-set/nonveg.png'
    
  }

}
