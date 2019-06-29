import React, { Component } from 'react';
import { View, Text,Image,StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Login from './login.js';
import Register from './register.js';
import AppIntroSlider from 'react-native-app-intro-slider';





export default class Slider extends Component {
  componentDidMount() {
    SplashScreen.hide();
    
    }
    constructor(props) {
      super(props);
      this.state = {
        showRealApp: false,
      showSkipButton:false
      };
    }
  
  
     _showSkip=()=>{
       this.setState({showSkipButton:true});
     }
    
     _renderItem = (item) => {
      return (
        <View style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} />
        </View>
      );
    }
    _onDone = () => {
      this.setState({ showRealApp: true });
    }
     
  

  render() {
    if (this.state.showRealApp) {
      return  <Register  />
      ;
    } else {
      return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} showSkipButton={this._showSkip}/>;
    }
      // <View>
      //   <Text> Slider </Text>
      // </View>
    
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width:100,
    height:100,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 40,
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  }
});
const slides = [
  {
    key: 'somethun',
    title: 'Welcome to Zoop',
    image: require('../images/creative2.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Order food on the trains',
    image: require('../images/creative3.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Order food for friends and family',
    image: require('../images/creative8.jpg'),
    backgroundColor: '#22bcb5',
  }
];
