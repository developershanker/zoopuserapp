import React, { Component } from 'react';
import { View, Text , Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';


export default class rateUs extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.gotoLink()
}
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  gotoLink = () => {
    let link = 'https://play.google.com/store/apps/details?id=com.zoop.zoopindiaservice'
    Linking.openURL(link);
  }

  render() {
    return (
      <View>
        <Text>  </Text>
      </View>
    );
  }
}
