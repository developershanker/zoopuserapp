import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ToastAndroid, Image, ImageBackground, Dimensions, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { CustomButton } from '../assests/customButtonLarge';

export default class LogOut extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.removetoken()
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  removetoken = async () => {
    try {
      // await AsyncStorage.removeItem('x-authtoken')
      // await AsyncStorage.removeItem('customerId')
      // AsyncStorage.removeItem('userInfo')
      console.log('Token and customerId Removed!!')
    } catch (e) {
      console.log('Error in removetoken in logout.js: ' + error)
    }

  }

  render() {
    return (
      <View style={styles.slide}>
        <Text style={styles.text1}>!! Logged Out Successfully !! </Text>
        <CustomButton
          title="Go to Signup"
          onPress={() => {
            this.props.navigation.navigate('SignUp')
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text1: {
    fontSize: 25,
    paddingTop: 10,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
