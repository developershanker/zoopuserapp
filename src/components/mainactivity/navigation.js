import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Image, Platform, ScrollView, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Device from 'react-native-device-info';
//////-------LOGIN RELATED VIEWS-----------//////
import AuthLoadingScreen from '../mainactivity/AuthLoadingScreen.js'
import SignUp from '../login/signUp.js';
import Authenticated from '../login/authenticated.js'
import NotAuthenticated from '../login/notAuthenticated.js'
// import Slider from '../login/slider.js';
import Register from '../login/register.js';
import OtpVerify from '../login/otpVerify.js';
import DeviceInfo from '../assests/deviceInfo.js';

//////-------INITIAL SEARCH RELATED VIEWS-----------//////
import Search from './search.js';
import Welcome from '../login/welcome.js';
import Station from '../mainactivity/station.js';
import SearchOption from '../mainactivity/searchOption.js';
import Notifications from '../services/notifications.js';
import Menu from '../menu/menu.js';
import Cart from '../cart/cart.js';
import CouponPage from '../cart/couponPage.js';
import PassengerDetail from '../customer/passengerDetail.js';
///////------Payment Process Files-------//////
import PaymentPage from '../payment/paymentPage.js';
import PaymentPaytm from '../payment/paymentPaytm.js';
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
import MyWallet from '../customer/myWallet';
import Profile from '../customer/profile';
import RateUs from '../services/rateUs';
import LogOut from '../login/logout';
import TermsActivity from '../services/termsActivity.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerItems, SafeAreaView } from 'react-navigation';
////////-------Extra Services Screens------////////
import CheckPNR from '../services/checkPnr';
import SpotTrain from '../services/spotTrain';
import TrainTimeTable from '../services/trainTimeTable';
import CoachSequence from '../services/coachSequence';
import PlatformLocator from '../services/platformLocator';


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
    if (Platform.OS === 'android' && Device.hasNotch()) {
      SafeAreaView.setStatusBarHeight(
        /* Some value for status bar height + notch height */
        30

      );
    }
  };
  render() {

    return (
      <SafeAreaView style={{ flexDirection: 'row' }}>
        <View>

          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            {/*Donute Button Image */}

            <Icon
              name='bars'
              size={20}
              style={{ marginLeft: 15 }}
            />
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
      <TouchableOpacity onPress={this.openNotification.bind(this)}>

        <Icon
          name='bell'
          size={20}
          style={{ marginRight: 15 }}
        />
      </TouchableOpacity>
    )
  }

}
class HeaderIcon extends Component {
  render() {
    return (
      <View>
        <Image source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
          style={{ width: 50, height: 30 }}
        />
      </View>
    )
  }
}

const CustomDrawerComponent = (props) => (

  <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
    <ScrollView>
      <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
        <Image
          style={{ width: 150, height: 60 }}
          source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
        ></Image>
      </View>

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
      drawerLabel: 'Home',
      drawerIcon: <Icon
        name='home'
        size={20}

      />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: <Icon
        name='user'
        size={20}

      />
    }
  },
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      drawerLabel: 'My Order',
      drawerIcon: <Icon
        name='shopping-basket'
        size={20}

      />
    }
  },
  MyWallet: {
    screen: MyWallet,
    navigationOptions: {
      drawerLabel: 'My Wallet',
      header: null,
      drawerIcon: <Icon
        name='plus'
        size={20}

      />
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      drawerLabel: 'Contact',
      drawerIcon: <Icon
        name='phone'
        size={20}

      />
    },
  },
  FAQ: {
    screen: FAQ,
    navigationOptions: {
      drawerLabel: 'FAQ',
      drawerIcon: <Icon
        name='question'
        size={20}

      />
    }
  },
  Feedback: {
    screen: Feedback,
    navigationOptions: {
      drawerLabel: 'Feedback',
      drawerIcon: <Icon
        name='pencil-square'
        size={20}

      />
    }
  },
  RateUs: {
    screen: RateUs,
    navigationOptions: {
      drawerLabel: 'Rate Us',
      drawerIcon: <Icon
        name='star'
        size={20}

      />
    }
  },
  TermsActivity: {
    screen: TermsActivity,
    navigationOptions: {
      drawerLabel: 'Terms & Conditions',
      drawerIcon: <Icon
        name='book'
        size={20}
      />
    }
  },
  Login: {
    screen: Welcome,
    navigationOptions: {
      drawerLabel: 'Login',
      drawerIcon: <Icon
        name='user'
        size={20}
      />
    }
  },
  LogOut: {
    screen: LogOut,
    navigationOptions: {
      drawerLabel: 'LogOut',
      drawerIcon: <Icon
        name='user'
        size={20}
      />
    }
  },

}, {
  contentComponent: CustomDrawerComponent,
  drawerWidth: Dimensions.get('window').width - 120,


}
);
const AppNavigator = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    }
  },
  Authenticated: {
    screen: Authenticated,
    navigationOptions: {
      header: null,
    }
  },
  NotAuthenticated: {
    screen: NotAuthenticated,
    navigationOptions: {
      header: null,
    }
  },
  // Contact: {
  //   screen: Contact,
  //   navigationOptions: {
  //     header: null,
  //   }

  // },
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
  LogOut: {
    screen: LogOut,
    navigationOptions: {
      header: null,
    }
  },

  Search: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderIcon />,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <NotificationSection navigationProps={navigation} />,
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
  SearchOption: {
    screen: SearchOption,
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
  CouponPage: {
    screen: CouponPage,
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
  // MyWallet: {
  //   screen: MyWallet,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
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
