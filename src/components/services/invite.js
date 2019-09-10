import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';

export default class invite extends Component {
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
        <Text> invite </Text>
      </View>
    );
  }
}
