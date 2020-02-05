import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ToastAndroid, Image ,BackHandler} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/FontAwesome5";
import { CustomButton } from "../assests/customButtonLarge.js";
import ConstantValues from "../constantValues.js";
import paymentApi from '../payment/paymentApi.js';
import { Fade } from "../assests/fade.js";
import Spinner from 'react-native-spinkit';
import Colors from "../colors.js";
import OrderDetailConstants from "../orderDetailConstants.js";

export default class irctcConfirmationCod extends Component {
    componentDidMount() {
        SplashScreen.hide();
        this.getIrctcId()
    }
    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('Search'));
      console.log('Back Pressed')
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.navigate('Search'));
      console.log('Back Pressed Unmount')
    }
  constructor(props) {
    super(props);
    this.state = {
        processingirctc: true,
        irctc_text: "Getting IRCTC Id, please wait...",
        irctc_result_icon: 'check',
        overallStatus: 'Your Order has been placed successfully!!'
    };
  }



  async getIrctcId() {
    try {
      let response = await paymentApi.getIrctc();
      if (response.status == true) {
        ConstantValues.irctcId = response.data.irctcOrderId
        console.log('Got IRCTC ID...' + ConstantValues.irctcId)
        this.setState({
          irctc_text: 'Your IRCTC ID : ' + ConstantValues.irctcId,
          overallStatus: 'Your Order has been placed successfully!!',
          processingirctc: false,
          irctc_result_icon: 'check'
        })
      } else if (response.status == false) {
        this.setState({
          processingirctc: false,
          irctc_text: 'Processing for IRCTC Id',
          overallStatus: 'Processing for IRCTC Id',
          irctc_result_icon: 'exclamation'
        })
        console.log(response.error)
      } else  {
        this.setState({
          processingirctc: false,
          irctc_text: 'Processing for IRCTC Id',
          overallStatus: 'Processing for IRCTC Id',
          irctc_result_icon: 'exclamation'
        })
        console.log(response.error)
      }
    } catch (error) {
      console.log('Data received in paymentPaytm.js catch: ' + error)
    }
  }

  viewDetails(){
    OrderDetailConstants.orderId = ConstantValues.zoopOrderId, // insert orderid
    this.props.navigation.navigate('OrderDetail')
  }


  render() {
    return (
     <View style={styles.slide}>
        {/* header view */}
        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          <View style={{ flexDirection: "column", justifyContent: "center", width: Dimensions.get("window").width, alignItems: "center" }}>
            <Image style={{ width: 150, height: 150 ,alignSelf:'center'}} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }} />
            <Spinner size={100} type={'FadingCircleAlt'} color={Colors.newOrange} isVisible={this.state.processingirctc} />
            <Fade visible={this.state.processingirctc == false}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Image style={styles.image} source={require('../images/placed.png')} />
              </View>
            </Fade>
            <View style={{alignItems:'center',justifyContent:'center',width:Dimensions.get('screen').width}}>
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-Medium', paddingVertical: 20, alignSelf:'center' }}>{this.state.overallStatus}</Text>
            </View>
          </View>
        </View>
        {/* header view ends */}

        <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

          {/* <View style={styles.statusView}>
            <Text style={styles.statusText} >{this.state.payment_text}</Text>
            <Fade visible={this.state.processingpayment}>
              <ActivityIndicator color={Colors.newOrange} size={20} animating={this.state.processingpayment} />
            </Fade>

            <Fade visible={this.state.processingpayment == false}>
              <Icons name={this.state.payment_result_icon} size={20} color={Colors.newOrange} />
            </Fade>
          </View> */}

          <View style={styles.statusView}>
            <Text style={styles.statusText} >{this.state.irctc_text}</Text>
            <Fade visible={this.state.processingirctc}>
              <ActivityIndicator color={Colors.newOrange} size={20} animating={this.state.processingirctc} />
            </Fade>
            <Fade visible={this.state.processingirctc == false}>
              <Icons name={this.state.irctc_result_icon} size={20} color={Colors.newOrange} />
            </Fade>
          </View>

        </View>
        <Fade visible={this.state.processingirctc == false}>
          <CustomButton
            style={{ backgroundColor: Colors.newgGreen3, alignSelf: 'center', marginBottom: 20, }}
            // onPress={()=>{this.props.navigation.navigate('OrderDetail')}}
            onPress={()=>this.viewDetails()}
            title='VIEW DETAILS'
          />
           <CustomButton
            style={{ backgroundColor: '#fff', alignSelf: 'center', marginBottom: 20, }}
            onPress={() => { this.props.navigation.navigate('Search') }}
            textStyle = {{color:Colors.darkGrey}}
            title='Go To Home'
          />
        </Fade>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // marginLeft: 5,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center'
      },
      text: {
        alignSelf: "center",
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: "#FF5819",
        paddingVertical: 10,
      },
      image: {
        width: 100,
        height: 100,
      },
      statusText: {
        fontSize: 15,
        color: '#000000',
        fontFamily: 'Poppins-Regular',
        paddingHorizontal: 10
      },
      statusView: {
        width: Dimensions.get('screen').width - 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 10,
        borderColor: '#cfc7c4',
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: '#ffffff',
        marginVertical: 10
      }
})