import React, { Component } from 'react';
import { View, Text,Button } from 'react-native';
import Login from '../login/login.js';
import Authenticated from '../login/authenticated.js'
import NotAuthenticated from '../login/notAuthenticated.js'
import Slider from '../login/slider.js';
import Register from '../login/register.js';
import Search from './search.js';
import Welcome from '../login/welcome.js';
import Station from '../mainactivity/station.js';
import SearchOption from '../mainactivity/searchOption.js';
import AutoCompleteTrain from '../mainactivity/autoCompleteTrain.js'
import SplashScreen from 'react-native-splash-screen';
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
  Authenticated:{
    screen:Authenticated,
    navigationOptions: {
              header: null,
            }
},
NotAuthenticated:{
  screen:NotAuthenticated,
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
      headerTitle:'Zoop',
    }
  },
  Register:{
    screen:Register,
    navigationOptions:{
      header:null,
    }
},
SearchOption:{
  screen:SearchOption,
  navigationOptions:{
    header:null,
  }
},
  Station:{
    screen:Station,
    navigationOptions:{
      headerTitle:'12196   Lko-Agra Intercity',
    }
   
},
AutoCompleteTrain:{
  screen:AutoCompleteTrain,
  navigationOptions:{
    header:null
  }
}
},
{

  initialRouteName:'Welcome'
}


);
export default createAppContainer(AppNavigator);


