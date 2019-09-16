import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/FontAwesome5";
import { CustomButton } from "../assests/customButtonLarge.js";
import ConstantValues from "../constantValues.js";

export default class irctcConfirmation extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      processingpayment: true,
      payment_text: "Getting Payment Status, please wait...",
      processingirctc: true,
      irctc_text: "Getting Irctc Id, please wait...",

    };
  }

  render() {
    return (
      <View style={styles.slide}>
        {/* header view */}
        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("PassengerDetail")}>
                <Icon style={{ margin: 20 }} name={"chevron-left"} size={20} color={"#000000"} />
              </TouchableOpacity> */}
          <View style={{ flexDirection: "column", justifyContent: "center", width: Dimensions.get("window").width, alignItems: "center" }}>
            <Text style={{ alignSelf: "center", fontFamily: "Poppins-Bold", fontSize: 25, color: "#000000" }}> Payment Summary </Text>
          </View>
        </View>
        {/* header view ends */}
        <View style={{ justifyContent: 'center', alignItems: 'stretch', paddingVertical: 20 }}>
          <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 20 }}>
            {/* <ActivityIndicator
              color={"#FF5819"}
              size={40}
              animating={this.state.processingpayment} /> */}
            <Text style={styles.text}> {ConstantValues.textPayment}</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 20 }}>
            <Text style={styles.text}> {ConstantValues.textIrctc}</Text>
            <ActivityIndicator
              color={"#FF5819"}
              size={40}
              animating={ConstantValues.irctcLoading} />
          </View>
        </View>
        {/* <CustomButton
          disable={ConstantValues.irctcLoading}
          style={{ backgroundColor: ConstantValues.irctcId == '' ? '#cfcccc' : '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
          onPress={() => this.props.navigation.navigate('TrackingOrder')}
          title='Track Your Order'
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width - 5,
    marginLeft: 5,
    justifyContent:'center',
    alignContent:'center'
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    fontFamily: "Poppins-Bold",
    color: "#FF5819",
    paddingVertical: 10,
  }
});

