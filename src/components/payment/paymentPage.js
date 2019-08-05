import React, { Component } from 'react';
import { View, Picker, ToastAndroid, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, CheckBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { CustomButton } from '../assests/customButtonLarge.js';
import { CustomTextInput } from '../assests/customTextInput.js';
import ConstantValues from '../constantValues.js';
import BillDetailCard from '../cart/billDetailCard.js';
import { RadioButton } from 'react-native-paper';
import { Fade } from '../assests/fade.js';

export default class PaymentPage extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      value: 'Paytm',
      codActive: false,
      checked:false,
    };
  }

  render() {
    const { navigation } = this.props;
    const altMobileNo = navigation.getParam('altMobileNo', '');
    return (
      <SafeAreaView>
        <ScrollView style={styles.slide}>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('PassengerDetail')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25, color: '#000000' }}> Payment Detail </Text>
              </View>
            </View>
            {/* header view ends */}
            <View>
              <BillDetailCard />
            </View>
            {/* passengerDetail view begin here */}
            <View style={{ width: Dimensions.get('window').width - 10, flexDirection: 'row', paddingTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Passenger Details</Text>
              {/* <Image style={{ height: 15, alignSelf: 'center' }} source={require('../images/line.png')} /> */}
            </View>
            <View style={{ width: Dimensions.get('window').width, paddingVertical: 15, paddingHorizontal: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>Seat no. 51</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>Coach no. S9</Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>Name : {ConstantValues.customerName}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>Contact No - {ConstantValues.customerPhoneNo}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>Alternate No. - {altMobileNo}</Text>
            </View>
            {/* passengerDetail view ends here */}
            {/* Payment Mode View Starts */}
            <View>
              <View style={{ width: Dimensions.get('window').width - 10, alignItems: 'center', paddingVertical: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Choose Payment Mode</Text>
              </View>
              <RadioButton.Group
                onValueChange={value => this.setState({ value })}
                value={this.state.value}
              >
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginHorizontal: 20 }}>
                  <View style={styles.paytmView}>
                    <RadioButton
                      value="Paytm"
                      color='#000000'
                    />
                    <Image style={{ marginHorizontal: 20 }} source={require('../images/paytmnew.png')} />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                    <RadioButton
                      value="Other"
                      color='#000000'
                    />
                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>Other Payment Option</Text>
                  </View>
                  <Fade visible={this.state.value == "Other" ? true : false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <CheckBox
                        value={this.state.codActive}
                        disabled={false}
                        onValueChange={codActive => this.setState({ codActive })}
                      />
                      <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>Cash On Delivery</Text>
                    </View>
                  </Fade>
                </View>
              </RadioButton.Group>
              <View style={{ flexDirection: 'row', justifyContent:'flex-start', alignItems: 'center' }}>
                <CheckBox
                  value={this.state.checked}
                  disabled={false}
                  onValueChange={checked => this.setState({ checked })}
                />
                <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold' }}>I Agree to </Text>
                <TouchableOpacity>
                <Text style={{ color: '#000000', fontSize: 15, fontWeight: 'bold', textDecorationLine:'underline' }}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Payment Mode View Ends */}

          </View>
        </ScrollView>
        <CustomButton
          style={{ backgroundColor: '#1fc44e', alignSelf: 'center', }}
          onPress={()=>{this.props.navigation.navigate('PaymentPaytm')}}
          title='Proceed To Pay'
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    width: Dimensions.get('window').width - 5,
    marginLeft: 5,
    
  },
  radioButton: {
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 25 // justifyContent: 'space-between',
  },
  paytmView: {
    borderRadius: 100 / 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebe8e8',
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});
