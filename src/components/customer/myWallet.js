import React, { Component } from 'react';
import { View, Alert, CheckBox, Text, StyleSheet, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, FlatList, RefreshControl, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButton } from '../assests/customButtonLarge.js';
import { Fade } from '../assests/fade.js';
import walletApi from './walletApi.js'
import { Overlay } from 'react-native-elements';
import loginApi from '../login/loginApi.js';
import moment from 'moment';
import Colors from '../colors.js';
import { ZoopLoader } from '../assests/zoopLoader.js';

export default class MyWallet extends Component {
  componentDidMount() {
    SplashScreen.hide();
    // this.checkRegister()
    // this.onRegister()
    this.tokenAsync()
  }
  // componentDidUpdate(){
  //   this.checkRegister()
  // }
  constructor(props) {
    super(props);
    this.state = {
      walletBalance: null,
      refreshing: false,
      isVisible: true,
      data: [],

    };
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    console.log('I am back on MyWallet.js')
    // this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
    this.props.navigation.navigate('Search')
    return true;
  };
  tokenAsync = async () => {
    try {
      const storedValues = await AsyncStorage.getItem('userInfo')
      // console.log('JSON.stringify(storedValues) : ' + JSON.stringify(storedValues))
      console.log('storedValues : ' + storedValues)
      //  storedValues : {"userToken":"pbkdf2_sha256$55000$UxLacxq6kwQ=$GqbBXFV+Kircxzvwf14je+wWpWa8+fxNnvcTaItB2xY=","customerId":2}
      let userInfo = JSON.parse(storedValues)
      let userToken = userInfo.userToken
      let customerId = userInfo.customerId
      console.log('Getting token from localstorage : ' + userToken)
      console.log('Getting CustomerId from localstorage : ' + customerId)
      if (userToken != '') {
        this.getWalletInfo(userToken, customerId)
      } else {
        return (
          Alert.alert(
            'Need Login!!',
            'Please LOGIN to Proceed.',
            [
              {
                text: 'OK', onPress: () => {
                  this.setState({ isVisible: false })
                  ConstantValues.navigationChannel = 'Search'
                  this.props.navigation.navigate('Welcome')
                },
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      }

    } catch (error) {
      // this.props.navigation.navigate('App')
      console.log('Error in getting stored value from asyncstorage: ' + error)
      return (
        Alert.alert(
          'Need Login!!',
          'Please LOGIN to Proceed.',
          [
            {
              text: 'OK', onPress: () => {
                this.setState({ isVisible: false })
                this.props.navigation.navigate('Welcome')
              },
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      )
    }

  };

  // checkRegister(){
  //   if ( ConstantValues.customerId == '') {
  //     return(
  //       Alert.alert(
  //         'Need Login!!',
  //         'Please LOGIN to Proceed.',
  //         [
  //           {
  //             text: 'OK', onPress: () => this.props.navigation.navigate('Welcome'),
  //             style: 'cancel'
  //           },
  //         ],
  //         { cancelable: false },
  //       )
  //     ),
  //     this.setState({
  //       refreshing: false
  //     })
  //   } else {
  //     this.onRegister()
  //   }
  // }
  // async onRegister() {
  //   try {
  //     let response = await loginApi.getUserRegister();
  //     console.log('data received in register.js : ' + JSON.stringify(response))
  //     ConstantValues.loginCount = response.data.loginCount
  //     ConstantValues.customerPhoneNo = response.data.mobile
  //     ConstantValues.customerName = response.data.fullName
  //     ConstantValues.customerRefferalCode = response.data.referralCode

  //     this.getWalletInfo();
  //   } catch (error) {
  //     console.log('Data received in register.js catch: ' + error)
  //   }
  // }

  async getWalletInfo(userToken, customerId) {
    try {
      let response = await walletApi.myWalletInfo(userToken, customerId)
      console.log('data received in mywallet.js : ' + JSON.stringify(response))
      if (response.status == true) {
        ConstantValues.walletBalance = response.data.balance
        this.setState({
          walletBalance: ConstantValues.walletBalance,
          data: response.data.histories,
          isVisible: false
        })
        // console.log('data array is : '+ JSON.stringify(this.state.data))
      } else {
        return (
          Alert.alert(
            'Alert!',
            'Something Went Wrong',
            [
              {
                text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        ),
          this.setState({
            isVisible: false
          })
      }
    } catch (error) {
      console.log('Data received in mywallet.js catch: ' + error)
      return (
        Alert.alert(
          'Alert!',
          'Something Went Wrong',
          [
            {
              text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      ),
        this.setState({
          isVisible: false
        })
    }
  }
  // async handleWalletRefresh(){
  //   try {
  //     let response = await walletApi.getWalletInfo();
  //     console.log('data received in mywallet.js : ' + JSON.stringify(response))
  //     if (response.status == true) {
  //       ConstantValues.walletBalance = response.data.balance
  //       this.setState({
  //         walletBalance: ConstantValues.walletBalance,
  //         data: response.data.histories,
  //       })
  //       // console.log('data array is : '+ JSON.stringify(this.state.data))
  //     } else {
  //       return (

  //         ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG)

  //       )
  //     }
  //   } catch (error) {
  //     console.log('Data received in mywallet.js catch: ' + error)
  //   }
  // }

  render() {
    return (
      <SafeAreaView style={styles.slide}>

        {this.state.isVisible === true ?
          <View style={{ width: ConstantValues.deviceWidth, height: ConstantValues.deviceHeight, justifyContent: 'center', alignment: 'center',alignContent:'center',alignItems:'center',alignSelf:'center' }}>
            <ZoopLoader />
          </View>
          : <View>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <IconA style={{ margin: 20 }} name={'arrowleft'} size={25} color={Colors.black} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> My Wallet Statement </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10 }}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 15 }}>Zoop Wallet Balance : </Text>
              <Text style={{ color: Colors.newgGreen1, fontFamily: 'Poppins-Medium', fontSize: 15 }}>{ConstantValues.bigrupee} {this.state.walletBalance}</Text>
            </View>

            <View style={{ width: ConstantValues.deviceWidth, flexDirection: 'row', height: 40, backgroundColor: Colors.lightGrey }}>
              <View style={{ width: '22%', height: '100%', justifyContent: 'center',paddingLeft:10 }}>
                <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12,textAlign: 'left' }}>Date</Text>
              </View>
              <View style={{ width: '20%', height: '100%',  justifyContent: 'center' ,paddingRight:5}}>
                <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12,textAlign: 'right' }}>Amount</Text>
              </View>
              <View style={{ width: '38%', height: '100%',  justifyContent: 'center' ,paddingLeft:5}}>
                <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12,textAlign: 'left'  }}>Particulars</Text>
              </View>
              <View style={{ width: '20%', height: '100%', justifyContent: 'center' ,paddingRight:10}}>
                <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12, textAlign: 'right'}}>Balance</Text>
              </View>
            </View>
            {/* Wallet summary Card  */}
            <View>
              <FlatList
                data={this.state.data}
                // refreshing={this.state.refreshing}
                // onRefresh={this.handleWalletRefresh()}
                extraData={this.state}
                renderItem={({ item }) =>
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width }}>
                    <View style={styles.card}>
                      <View style={{ width: '22%', height: '100%', backgroundColor: Colors.white,paddingLeft:10 ,paddingTop:2}}>
                        <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12, textAlign: 'left'}}>{moment(item.created).format('DD MMM YYYY')}</Text>
                      </View>
                      <View style={{ width: '20%', height: '100%', backgroundColor: Colors.white ,paddingRight:5,paddingTop:2}}>
                        <Text style={{ color: item.transactionType == 'CREDIT' ? Colors.newgGreen1 : '#b32120', fontFamily: 'Poppins-Regular', fontSize: 12,textAlign: 'right' }}>{ConstantValues.rupee} {item.amount}</Text>
                      </View>
                      <View style={{ width: '38%', height: '100%', backgroundColor: Colors.white  ,paddingLeft:5,paddingTop:2}}>
                        <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 10, textAlign: 'left' }}>{item.particulars}</Text>
                      </View>
                      <View style={{ width: '20%', height: '100%', backgroundColor: Colors.white  ,paddingRight:10,paddingTop:2}}>
                        <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12,textAlign: 'right' }}> {ConstantValues.rupee} {item.balance}</Text>
                      </View>
                    </View>
                  </View>
                }
                keyExtractor={(item) => item.walletId.toString()}
              />
            </View>


          </View>}
        {/* <Overlay
          isVisible={this.state.isVisible}
          width="auto"
          height="auto"
          // windowBackgroundColor='rgba(255, 255, 255, .5)'
          // overlayBackgroundColor='#ffffff'
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <ZoopLoader isVisible={true} text={'Loading...'} />

        </Overlay> */}

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#fff'
  },
  card: {
    flexDirection: 'row',
    width: '98%',
    borderRadius: 6,
    backgroundColor: '#ffffff',//can change as we move to various pages
    paddingVertical:2,
    marginVertical: 2,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    shadowOpacity: 0.4,
    // borderBottomColor: '#e4e4e4',
    // borderBottomWidth: ,
  },
})