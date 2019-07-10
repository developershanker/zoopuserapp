import React, { Component } from 'react';
import { View, Text,Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
//////-------LOGIN RELATED VIEWS-----------//////
import Login from '../login/login.js';
import Authenticated from '../login/authenticated.js'
import NotAuthenticated from '../login/notAuthenticated.js'
import Slider from '../login/slider.js';
import Register from '../login/register.js';
//////-------INITIAL SEARCH RELATED VIEWS-----------//////
import Search from './search.js';
import Welcome from '../login/welcome.js';
import Station from '../mainactivity/station.js';
import SearchOption from '../mainactivity/searchOption.js';
import AutoCompleteTrain from '../mainactivity/autoCompleteTrain.js'
//////-------DRAWER ITEMS RELATED VIEWS-----------//////
import Contact from '../services/contact';
import FAQ from '../services/faq';
import Feedback from '../services/feedback';
import MyOrders from '../services/myOrders';
import MyWallet from '../services/myWallet';
import Profile from '../services/profile';
import RateUs from '../services/rateUs'; 


import { createStackNavigator, createAppContainer,createDrawerNavigator} from "react-navigation";

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

const DrawerNavigator=createDrawerNavigator({
  Search:{
    screen:Search,
    navigationOptions:{
      headerTitle:'ZOOP',
    }
  },
  Contact:{
    screen:Contact,
  },
  FAQ:{
    screen:FAQ,
  },
  Feedback:{
    screen:Feedback,
  },
  MyOrders:{
    screen:MyOrders,
  },
  MyWallet:{
    screen:MyWallet,
  },
  Profile:{
    screen:Profile,
  },
  RateUs:{
    screen:RateUs,
  }
  
},
{
  initialRouteName:'Search',
    drawerWidth: 300,
    drawerPosition: 'right'
},
)
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
      headerTitle:'ZOOP',
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
// export default createAppContainer(DrawerNavigator);

