import React, { Component } from 'react';
import { View, Text,Button } from 'react-native';
import Login from '../login/login.js';
import Slider from '../login/slider.js';
import Register from '../login/register.js';
import Search from './search.js';
import Welcome from '../login/welcome.js';
import Station from '../mainactivity/station.js';
import SplashScreen from 'react-native-splash-screen';
import Demo from '../login/ButtonExample.js';

import { createStackNavigator, createAppContainer } from "react-navigation";

export  class App extends Component{
  componentDidMount() {
    SplashScreen.hide();
}
  render(){
    return(
      <AppNavigator/>
    )
  }
}

const AppNavigator= createStackNavigator({
  Login:{
      screen:Login,
      navigationOptions: {
                header: null,
              }
  },
  Slider:{
    screen:Slider,
    navigationOptions:{
      header:null,
    }

  },
  Welcome:{
    screen:Welcome,
    navigationOptions:{
      header:null,
    }
  },
  
  Search:{
    screen:Search,
    navigationOptions:{
      header:null,
    }
  },
  Register:{
    screen:Register,
    navigationOptions:{
      header:null,
    }
},
Demo:{
screen:Demo,
navigationOptions:{
  header:null,
}
},
  Station:{
    screen:Station,
    navigationOptions:{
      header:null,
    }
},
},
{

  initialRouteName:'Welcome'
}


);
export default createAppContainer(AppNavigator);


