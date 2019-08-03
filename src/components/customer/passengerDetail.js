import React, { Component } from 'react';
import { View, Picker, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { CustomButton } from '../assests/customButtonLarge.js';
import { CustomTextInput } from '../assests/customTextInput.js';
import ConstantValues from '../constantValues.js';

export default class passengerDetail extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      enterPnr: '',
      pnrEditable: true,
      altMobileNo: '',
      name: '',
      emailId: '',
      addMessage: ''
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 25, color: '#000000' }}> Add Passenger Detail </Text>
              </View>
            </View>
            {/* header view ends */}
            {/* Input view starts */}
            <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
              <CustomTextInput
                style={{ fontSize: 20, color: '#000000', fontWeight: 'bold', }}
                placeholder='Enter PNR'
                editable={this.state.pnrEditable}
                keyboardType='number-pad'
                autoCapitalize='none'
                onChangeText={enterPnr => this.setState({ enterPnr })}
              />
              <View style={{ width: Dimensions.get('window').width, paddingVertical: 15, paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>Seat - 51</Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>Coach - S9</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>Station - Kanpur</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>Expected Date & Time of Delivery - 07/09/2019  08:35 PM</Text>
              </View>
              <CustomTextInput
                style={{ fontSize: 20, color: '#000000', fontWeight: 'bold', }}
                placeholder='Passenger`s name'
                editable={true}
                keyboardType='default'
                autoCapitalize='characters'
                onChangeText={name => this.setState({ name })}
              />
              <View style={{ width: Dimensions.get('window').width, paddingVertical: 15, paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>Contact No - {ConstantValues.customerPhoneNo}</Text>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <CustomTextInput
                  style={{ fontSize: 20, color: '#000000', fontWeight: 'bold', }}
                  placeholder='Passenger`s Alt. Contact No.'
                  editable={true}
                  keyboardType='number-pad'
                  autoCapitalize='none'
                  onChangeText={altMobileNo => this.setState({ altMobileNo })}
                />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <CustomTextInput
                  style={{ fontSize: 20, color: '#000000', fontWeight: 'bold', }}
                  placeholder='Passenger`s Email Id.'
                  editable={true}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={emailId => this.setState({ emailId })}
                /></View>
              <View style={{ paddingVertical: 20 }}>
                <CustomTextInput
                  style={{ fontSize: 15, color: '#000000', fontWeight: 'bold', }}
                  placeholder='Any request for the resturent? Please write here'
                  editable={true}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  onChangeText={addMessage => this.setState({ addMessage })}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <CustomButton
          style={{ backgroundColor: '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
          onPress={() => this.props.navigation.navigate('PaymentPage')}
          title='Proceed To Pay'
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
