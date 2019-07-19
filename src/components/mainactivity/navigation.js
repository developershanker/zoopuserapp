import React, { Component } from 'react';
import { View, Text,Button,TouchableOpacity,Image,Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Device from 'react-native-device-info';
//////-------LOGIN RELATED VIEWS-----------//////
import Login from '../login/login.js';
import Authenticated from '../login/authenticated.js'
import NotAuthenticated from '../login/notAuthenticated.js'
import Slider from '../login/slider.js';
import Register from '../login/register.js';
import OtpVerify from '../login/otpVerify.js';
import DeviceInfo from '../assests/deviceInfo.js';
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
import LogOut from '../login/logout';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerItems, SafeAreaView } from 'react-navigation';
////////-------Extra Services Screens------////////
import CheckPNR from '../services/checkPnr';
import SpotTrain from '../services/spotTrain';
import TrainTimeTable from '../services/trainTimeTable';
import CoachSequence from '../services/coachSequence';
import PlatformLocator from '../services/platformLocator';


import { createStackNavigator, createAppContainer,createDrawerNavigator} from "react-navigation";


export  class App extends Component{
  componentDidMount()  {
    SplashScreen.hide();
}
  render(){
    return(

      <AppNavigator/>
      
    )
  }
}
class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
    if (Platform.OS === 'android' && Device.hasNotch()) {
      SafeAreaView.setStatusBarHeight(
        /* Some value for status bar height + notch height */
      );
    }
  };
  render() {
    return (
      <SafeAreaView style={{ flexDirection: 'row' }}>
      <View>
        
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
         
          <Image
            source={require('../images/menu.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }
}


const DrawerConfig={
  drawerWidth:250,
}
const DrawerNavigator=createDrawerNavigator({
  Search:{
    screen:Search,
    navigationOptions:{
      drawerLabel:'Home'
    }
  },
  Contact:{
    screen:Contact,
    navigationOptions: {
      drawerLabel: 'Contact',
    },
  },
  FAQ:{
    screen:FAQ,
    navigationOptions:{
      drawerLabel:'FAQ'
    }
  },
  Login:{
screen:Login,
navigationOptions:{
  drawerLabel:'Login'
}
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
  },
  LogOut:{
    screen:LogOut,
  }
},
DrawerConfig
);
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
  OtpVerify:{
    screen:OtpVerify,
    navigationOptions:{
      header:null,
    }
  },
  DeviceInfo:{
    screen:DeviceInfo,
    navigationOptions:{
      header:null,
    }
  },
  
  Search:{
    screen:DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'ZOOP',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
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
},
CheckPNR:{
  screen:CheckPNR,
  navigationOptions:{
    header:null
  }
},
SpotTrain:{
  screen:SpotTrain,
  navigationOptions:{
    header:null
  }
},
TrainTimeTable:{
  screen:TrainTimeTable,
  navigationOptions:{
    header:null
  }
},
CoachSequence:{
  screen:CoachSequence,
  navigationOptions:{
    header:null
  }
},
PlatformLocator:{
  screen:PlatformLocator,
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

