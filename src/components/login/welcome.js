import React, { Component } from 'react';
import { View ,Button, Text,Icon,TouchableOpacity,StyleSheet,Alert,Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {LoginButton} from 'react-native-facebook-account-kit';
import { CustomButton } from '../assests/customButton.js';
import {FadeInView} from '../assests/fadeInView.js';


export default class Welcome extends Component {
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
      <View style={styles.slide}>
        <FadeInView style={styles.anim}>
        <Image
        style={styles.image}
         source={require('../images/zooplogo.png')}
        />
<CustomButton
            title="LOGIN"
            onPress={
              () => this.props.navigation.navigate('Login')}
            style={styles.button}
            textStyle={styles.text}
        />

<CustomButton
            title="SKIP"
            onPress={() => this.props.navigation.navigate('Search')}
            style={styles.button}
            textStyle={styles.text}
        />
        </FadeInView>

      </View>

    );
  }
}
const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#ffffff'
    },
   anim: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#ffffff'
    },
    image: {
      width:200,
      height:200,
      justifyContent:'flex-start'
    },
    button: {
      display: 'flex',
      width: 100,
      height: 30,
      borderRadius: 5,
      justifyContent:'center',
      paddingVertical: 20,
      alignItems: 'center',
      backgroundColor: '#000000',
      shadowColor: '#000000',
      shadowOpacity: 0.4,
      shadowOffset: { height: 10, width: 10 },
      shadowRadius: 20,
      margin: 10,
  },

    skip:{
      alignItems: 'baseline',
      justifyContent: 'center',
      backgroundColor:'#ffffff'
    },
    text: {
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Times New Roman',
    },  
  });
