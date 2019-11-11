import React, { Component } from 'react';
import { View, Alert,CheckBox, Text, StyleSheet, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButton } from '../assests/customButtonLarge.js';
import { Fade } from '../assests/fade.js';
import walletApi from '../customer/walletApi.js'
import { Overlay } from 'react-native-elements';
import loginApi from '../login/loginApi.js';
import moment from 'moment';

export default class myWallet extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.checkRegister()
    this.onRegister()
  }
  // componentDidUpdate(){
  //   this.checkRegister()
  // }
  constructor(props) {
    super(props);
    this.state = {
      walletBalance: null,
      refreshing:false,
      data: [],
      
    };
  }
  checkRegister(){
    if ( ConstantValues.customerId == '') {
      return(
        Alert.alert(
          'Need Login!!',
          'Please LOGIN to Proceed.',
          [
            {
              text: 'OK', onPress: () => this.props.navigation.navigate('Welcome'),
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      ),
      this.setState({
        refreshing: false
      })
    } else {
      this.onRegister()
    }
  }
  async onRegister() {
    try {
      let response = await loginApi.getUserRegister();
      console.log('data received in register.js : ' + JSON.stringify(response))
      ConstantValues.loginCount = response.data.loginCount
      ConstantValues.customerPhoneNo = response.data.mobile
      ConstantValues.customerName = response.data.fullName
      ConstantValues.customerRefferalCode = response.data.referralCode
    
      this.getWalletInfo();
    } catch (error) {
      console.log('Data received in register.js catch: ' + error)
    }
  }

  async getWalletInfo() {
    try {
      let response = await walletApi.getWalletInfo();
      console.log('data received in mywallet.js : ' + JSON.stringify(response))
      if (response.status == true) {
        ConstantValues.walletBalance = response.data.balance
        this.setState({
          walletBalance: ConstantValues.walletBalance,
          data: response.data.histories,
        })
        // console.log('data array is : '+ JSON.stringify(this.state.data))
      } else {
        return (

          ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG)

        )
      }
    } catch (error) {
      console.log('Data received in mywallet.js catch: ' + error)
    }
  }
  async handleWalletRefresh(){
    try {
      let response = await walletApi.getWalletInfo();
      console.log('data received in mywallet.js : ' + JSON.stringify(response))
      if (response.status == true) {
        ConstantValues.walletBalance = response.data.balance
        this.setState({
          walletBalance: ConstantValues.walletBalance,
          data: response.data.histories,
        })
        // console.log('data array is : '+ JSON.stringify(this.state.data))
      } else {
        return (

          ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG)

        )
      }
    } catch (error) {
      console.log('Data received in mywallet.js catch: ' + error)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.slide}>
      
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 20, color: '#000000' }}> My Wallet Statement </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10 }}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 15 }}>ZOOP WALLET : </Text>
              <Text style={{ color: '#60b246', fontFamily: 'Poppins-Regular', fontSize: 15 }}>{ConstantValues.rupee} {this.state.walletBalance}</Text>
            </View>

            <View style={{ flexDirection: 'row', height: '15%', backgroundColor: '#e4e4e4', justifyContent: 'space-around', alignItems: 'center' }}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 10 ,textAlign:'left'}}>Date</Text>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 10 ,textAlign:'right'}}>Amount</Text>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 10 ,textAlign:'left'}}>Particular</Text>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 10 ,textAlign:'right' }}>Balance</Text>
            </View>
            {/* Wallet summary Card  */}
            <View>
              <FlatList
                data={this.state.data}
                // refreshing={this.state.refreshing}
                // onRefresh={this.handleWalletRefresh()}
                extraData={this.state}
                renderItem={({ item }) =>
                  <View>
                    <View style={styles.card}>
                      <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 20 , justifyContent: 'space-between', alignItems: 'center',}}>
                      <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12 ,textAlign:'left'}}>{moment(item.created).format('DD-MM-YYYY')}</Text>
                        <Text style={{ color: item.transactionType == 'CREDIT' ? '#60b246' : '#b32120', fontFamily: 'Poppins-Regular', fontSize: 15,textAlign:'right' }}>{ConstantValues.rupee} {item.amount}</Text>
                        <Text style={{ width: 150,color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 12,textAlign:'left' }}>{item.particulars}</Text>
                        <Text style={{ color: '#000000', fontFamily: 'Poppins-Regular', fontSize: 15 ,textAlign:'right'}}> {ConstantValues.rupee} {item.balance}</Text>
                      </View>

                    </View>
                  </View>
                }
                keyExtractor={(item) => item.walletId.toString()}
              />
            </View>
               

          </View>
       
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex:1,
    width: Dimensions.get('screen').width,
    height:Dimensions.get('screen').height,
    backgroundColor:'#fff'
  },
  card: {
    width: Dimensions.get('window').width - 5,
    borderRadius: 100 / 9,
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginVertical:10,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
  },
})