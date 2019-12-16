import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Image,Linking, Platform, ScrollView, Dimensions ,StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Device from 'react-native-device-info';
//////-------LOGIN RELATED VIEWS-----------//////
import AuthLoadingScreen from '../mainactivity/AuthLoadingScreen.js'
import SignUp from '../login/signUp.js';
// import Slider from '../login/slider.js';
import Register from '../login/register.js';
import OtpVerify from '../login/otpVerify.js';
import DeviceInfo from '../assests/deviceInfo.js';

//////-------INITIAL SEARCH RELATED VIEWS-----------//////
import Search from './search.js';
import Welcome from '../login/welcome.js';
import Station from '../mainactivity/station.js';
import Notifications from '../services/notifications.js';
import Menu from '../menu/menu.js';
import Cart from '../cart/cart.js';
import ReduxMenu from '../menu/reduxMenu.js';
import ReduxCart from '../cart/reduxCart.js'
import PassengerDetail from '../customer/passengerDetail.js';
///////------Payment Process Files-------//////
import PaymentPage from '../payment/paymentPage.js';
import PaymentPaytm from '../payment/paymentPaytm.js';
import IrctcConfirmation from '../payment/irctcConfirmation.js';
import IrctcConfirmationCod from '../payment/irctcConfirmationCod.js';
///////------Order Process Files-------//////
import OrderConfirm from '../orderBooking/orderConfirm.js';
import DeliveryMark from '../postOrderActivity/deliveryMark.js';
import OrderFeedback from '../postOrderActivity/orderFeedback.js';
import TrackingOrder from '../postOrderActivity/trackingOrder.js';
import OrderDetail from '../orderBooking/orderDetail.js';
import RatingView from '../postOrderActivity/ratingView.js';
//////-------DRAWER ITEMS RELATED VIEWS-----------//////
import Contact from '../services/contact';
import FAQ from '../services/faq';
import Feedback from '../services/feedback';
import MyOrders from '../customer/myOrders';
import MyOrderDetail from '../customer/myOrderDetail';
import Invite from '../services/invite.js';
import MyWallet from '../customer/myWallet';
import Profile from '../customer/profile';
import RateUs from '../services/rateUs';
import LogOut from '../login/logout';
import TermsActivity from '../services/termsActivity.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { DrawerItems, SafeAreaView } from 'react-navigation';
////////-------Extra Services Screens------////////
import CheckPNR from '../services/checkPnr';
import SpotTrain from '../services/spotTrain';
import TrainTimeTable from '../services/trainTimeTable';
import CoachSequence from '../services/coachSequence';
import PlatformLocator from '../services/platformLocator';
import Helpline from '../services/helpline.js';
import BulkOrder from '../services/bulkOrder.js';

/////-----------Redux Imports-----------///////////
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from '../../store'


import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
import { Footer } from 'native-base';
import { Fade } from '../assests/fade.js';
import ConstantValues from '../constantValues.js';




export class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <AppNavigator />
    )
  }
}

const AuthStack = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    }
  }
})
 class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
    // if (Platform.OS === 'android' && Device.hasNotch()) {
    //   SafeAreaView.setStatusBarHeight(
    //     /* Some value for status bar height + notch height */
    // onPress={this.toggleDrawer.bind(this)}
    //     30

    //   );
    // }
  };
  render() {

    return (
      <SafeAreaView style={{ flexDirection: 'row' }}>
        <View>

          <TouchableOpacity onPress={()=>this.props.navigationProps.toggleDrawer()}>
            {/*Donute Button Image */}
            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                name='bars'
                size={20}
                style={{ marginLeft: 15 }}
              />
            </View>
            
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }
}
class NotificationSection extends Component {
  openNotification = () => {
    this.props.navigationProps.navigate('Notifications')
  }
  render() {
    return (
      <TouchableOpacity 
      // onPress={this.openNotification.bind(this)}
      >
          <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Icon
          name='bell'
          size={20}
          style={{ marginRight: 15 }}
        />
          </View>
        
      </TouchableOpacity>
    )
  }

}
class HeaderIcon extends Component {
  gotoHome() {
    this.props.navigationProps.navigate('Search')
  }
  render() {
    return (
      <TouchableOpacity onPress={this.gotoHome.bind(this)}>
      <View>
        <Image source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
          style={{ width: 50, height: 30 }}
        />
      </View>
      </TouchableOpacity>
    )
  }
}
gotoLink = () => {
  let link = 'https://play.google.com/store/apps/details?id=com.zoop.zoopindiaservice'
  Linking.openURL(link);
}

const CustomDrawerComponent = (props) => (

  <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
    <ScrollView>
      
        <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
          <Image
            style={{ width: 150, height: 80 }}
            source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
          ></Image>
        </View>
     
      

      <View style={{justifyContent:'center',alignItems:'center'}}></View>
      <DrawerItems {...props} />

      

      
 {/* <Icon name='sign-in' size={10} style={{color:'#000000'}}/> */}
      {/* <TouchableOpacity>
        <Footer style={{ backgroundColor: '#FF9800' }}>
          <View style={{ justifyContent: 'space-around' }}>
           
            <Text style={{ fontSize: 25, fontFamily: 'Poppins-Bold', color: '#000000', justifyContent: 'center' }}>LOGOUT</Text>
          </View>
        </Footer>
      </TouchableOpacity> */}
    </ScrollView>
  </SafeAreaView>

)
const DrawerNavigator = createDrawerNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.homeScreen}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>Home</Text>
         </View>
      </View>
     
    }
  },
  Profile: {
    screen: Register,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.myProfile}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>Profile</Text>
         </View>
      </View>
    }
  },
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.myorders}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>My Orders</Text>
         </View>
      </View>
    }
  },
  MyWallet: {
    screen: MyWallet,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.myWallet}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>My Wallet</Text>
         </View>
      </View>
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.contactus}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>Contact Us</Text>
         </View>
      </View>
    },
  },
  Invite: {
    screen: Invite,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.invite}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>Invite & Earn</Text>
         </View>
      </View>

     
    },
  },
  FAQ: {
    screen: FAQ,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.faq}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>FAQ</Text>
         </View>
      </View>
    }
  },
  Feedback: {
    screen: Feedback,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
        
        <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.feedback}}/>
      <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>Feedback</Text>
         </View>
      </View>
    }
  },
  RateUs: {
    screen: RateUs,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.rate}}/>
         <View style={{width:100,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:14,color:'#000000'}}>Rate Us</Text>
         </View>
      </View>
    }
  },
  TermsActivity: {
    screen: TermsActivity,
    navigationOptions: {
      drawerLabel:
      <View style={{width: Dimensions.get('window').width - 120,justifyContent:'flex-start',flexDirection:'row',paddingLeft:20,paddingVertical:10,backgroundColor:'#ffffff'}}>
         <Image style={{width:25,height:25}} source={{uri:ConstantValues.IconUrl+ConstantValues.imgurl.tnc}}/>
         <View style={{width:120,height:25,backgroundColor:'#ffffff',justifyContent:'center',alignItems:'flex-start',paddingLeft:15}}>
         <Text style={{fontFamily:'Poppins-Medium',fontSize:13,color:'#000000'}}>Terms & Conditions</Text>
         </View>
      </View>
    }
  },

}, {
  contentComponent: CustomDrawerComponent,
  drawerWidth: Dimensions.get('window').width - 140,
}
);
const AppNavigator = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    }
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      header: null,
    }

  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    }
  },
  OtpVerify: {
    screen: OtpVerify,
    navigationOptions: {
      header: null,
    }
  },
  DeviceInfo: {
    screen: DeviceInfo,
    navigationOptions: {
      header: null,
    }
  },
  Helpline: {
    screen: Helpline,
    navigationOptions: {
      header: null,
    }
  },
  BulkOrder: {
    screen: BulkOrder,
    navigationOptions: {
      header: null,
    }
  },
  LogOut: {
    screen: LogOut,
    navigationOptions: {
      header: null,
    }
  },

  Search: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderIcon navigationProps={navigation}/>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      // headerRight: <NotificationSection navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#ffffff',
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    }
  },
  Station: {
    screen: Station,
    navigationOptions: {
      header: null,
    }

  },
  Menu: {
    screen: Menu,
    navigationOptions: {
      header: null,
    }
  },
  ReduxMenu: {
    screen: ReduxMenu,
    navigationOptions: {
      header: null,
    }

  },
  ReduxCart: {
    screen: ReduxCart,
    navigationOptions: {
      header: null,
    }

  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }

  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      header: null,
    }
  },
  PassengerDetail: {
    screen: PassengerDetail,
    navigationOptions: {
      header: null,
    }
  },
  PaymentPage: {
    screen: PaymentPage,
    navigationOptions: {
      header: null,
    }
  },
  PaymentPaytm: {
    screen: PaymentPaytm,
    navigationOptions: {
      header: null,
    }
  },
  OrderConfirm: {
    screen: OrderConfirm,
    navigationOptions: {
      header: null,
    }
  },
  MyOrderDetail: {
    screen: MyOrderDetail,
    navigationOptions: {
      header: null,
    }
  },
  DeliveryMark: {
    screen: DeliveryMark,
    navigationOptions: {
      header: null,
    }
  },
  OrderFeedback: {
    screen: OrderFeedback,
    navigationOptions: {
      header: null,
    }
  },
  IrctcConfirmation: {
    screen: IrctcConfirmation,
    navigationOptions: {
      header: null,
    }
  },
  TrackingOrder: {
    screen: TrackingOrder,
    navigationOptions: {
      header: null,
    }
  },
  OrderDetail: {
    screen: OrderDetail,
    navigationOptions: {
      header: null,
    }
  },
  IrctcConfirmationCod: {
    screen: IrctcConfirmationCod,
    navigationOptions: {
      header: null
    }
  },
  CheckPNR: {
    screen: CheckPNR,
    navigationOptions: {
      header: null
    }
  },
  SpotTrain: {
    screen: SpotTrain,
    navigationOptions: {
      header: null
    }
  },
  TrainTimeTable: {
    screen: TrainTimeTable,
    navigationOptions: {
      header: null
    }
  },
  CoachSequence: {
    screen: CoachSequence,
    navigationOptions: {
      header: null
    }
  },
  PlatformLocator: {
    screen: PlatformLocator,
    navigationOptions: {
      header: null
    }
  }

},
  {
    initialRouteName: 'Search'
  }


);
const styles = StyleSheet.create({
  drawerLabel:{

  }
});
// export default createAppContainer(AppNavigator);
// export default createAppContainer(DrawerNavigator);
export default createAppContainer(
  createSwitchNavigator(
    
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
