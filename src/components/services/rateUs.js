import React, { Component } from 'react';
import { View, Text , Linking,TouchableOpacity,StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';



export default class rateUs extends Component {
  componentDidMount() {
    SplashScreen.hide();
  
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
      <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
       <TouchableOpacity onPress={()=>this.gotoLink()}>
         <Text style={styles.text}>Rate Us</Text>
       </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text:{
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  }
})