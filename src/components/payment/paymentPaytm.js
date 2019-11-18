import React, { Component } from 'react';
import { View, Text, WebView, ActivityIndicator, StyleSheet, Dimensions, ToastAndroid, BackHandler, Alert } from 'react-native';
import ConstantValues from '../constantValues.js';
import { Overlay } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

export default class paymentPaytm extends Component {
  // componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     return (
  //       Alert.alert(
  //         'Alert!!',
  //         'Are you sure ?? Pressing the back button would cancel the payment process. Press "Ok" if you wish to cancel.',
  //         [
  //           {
  //             text: 'Ok',
  //             onPress: () => this.props.navigation.navigate('Search'),
  //             style: 'cancel',
  //           },
  //           {
  //             text: 'cancel', onPress: () => console.log('Waiting for Payment to Proceed.......'),
  //             style: 'cancel'
  //           }
  //         ],
  //         { cancelable: false },
  //       )
  //     )
  //   }
  //   );
  //   console.log('Back Pressed')
  // }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', () => {
  //     return (
  //       Alert.alert(
  //         'Alert!!',
  //         'Are you sure ?? Pressing the back button would cancel the payment process. Press Ok if you wish to cancel.',
  //         [
  //           {
  //             text: 'Ok',
  //             onPress: () => this.props.navigation.navigate('Search'),
  //             style: 'cancel',
  //           },
  //           {
  //             text: 'cancel', onPress: () => console.log('Waiting for Payment to Proceed.......'),
  //             style: 'cancel'
  //           }
  //         ],
  //         { cancelable: false },
  //       )
  //     )
  //   });
  //   console.log('Back Pressed Unmount')
  // }
  state = {
    isVisible: true,
    loadingHeader: '',
    loadingContent: '',
    TXN_AMOUNT: ConstantValues.totalPayableAmount.toString(),
    ORDER_ID: ConstantValues.zooptransactionId,
    // INDUSTRY_TYPE_ID: 'Retail',
    CUST_ID: ConstantValues.customerId,
    // CHANNEL_ID: 'WEB',
    // TXN_AMOUNT: '1',
    // WEBSITE: 'WEBSTAGING',
    // MID: 'KUWvPg16478930006146',
    // PAYTM_MERCHANT_KEY: 'FpX3qfcBtFDz&6kr',
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }
  // renderOpening(){
  //   let { isVisible } = this.state;
  //   return(
  //     <Overlay
  //       isVisible={isVisible}
  //       width="auto"
  //       height="auto"
  //     // windowBackgroundColor='rgba(255, 255, 255, .5)'
  //     // overlayBackgroundColor='#ffffff'
  //     // onBackdropPress={() => this.setState({ isVisible: false })}
  //     >
  //       <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
  //         <Spinner size={50} type={'FadingCircleAlt'} color={'#FF5819'} isVisible={isVisible} />
  //         <Text style={styles.textP}>Requesting payment, please wait...</Text>
  //         <Text style={styles.text}>Please do not press back.. Transaction is being processed</Text>
  //       </View>


  //     </Overlay>
  //   )
  // }
  handleResponse = async (data) => {

    try {
      let response = JSON.parse(data.title)
      console.log('response : ' + JSON.stringify(response))
      ConstantValues.gatewayResponse = response
      if (response.hasOwnProperty('RESPCODE')) {
        ConstantValues.txnId = response.TXNID
        ConstantValues.paymentOrderId = response.ORDERID
        if (response.STATUS == 'TXN_SUCCESS') {
          ConstantValues.paymentStatus = true
        } else {
          ConstantValues.paymentStatus = false
        }
        if (response.RESPCODE == '01') {
          ToastAndroid.show('Transaction Successfull', ToastAndroid.LONG)
          console.log('response.RESPCODE : ' + response.RESPCODE)
        } else {
          ToastAndroid.show('OOPS!! something went wrong!!!', ToastAndroid.LONG)
          // console.log('response.RESPCODE : ' + response.RESPCODE)
        }
      }
      console.log('ConstantValues.txnId :' + ConstantValues.txnId + '\n' + 'ConstantValues.paymentOrderId : ' + ConstantValues.paymentOrderId + '\n' + 'ConstantValues.paymentStatus: ' + ConstantValues.paymentStatus + '\n' + 'ConstantValues.gatewayResponse : ' + ConstantValues.gatewayResponse)
      this.gotoIrctc()
    } catch (error) {
      console.log('result : ' + JSON.stringify(data))
      if (data.title === "Document") {
        this.setState({
          isVisible: true,
          loadingHeader: 'Requesting payment, please wait...',
          loadingContent: 'Please do not press back.. Payment is under process'

        })
      } else {
        this.setState({
          isVisible: false
        })
      }
    }
  }

  gotoIrctc = () => {
    ConstantValues.textPayment = 'Payment is received by Zoop \n Your amount is safe with us..'
    // ConstantValues.irctcLoading = true
    // ConstantValues.textIrctc = 'Fetching IRCTC ID...'
    this.props.navigation.navigate('IrctcConfirmation')
  }

  render() {
    //let { ORDER_ID, CUST_ID, TXN_AMOUNT, INDUSTRY_TYPE_ID, CHANNEL_ID, WEBSITE, MID, PAYTM_MERCHANT_KEY ,processing,payment_text} = this.state;
    let { ORDER_ID, CUST_ID, TXN_AMOUNT, processing, payment_text, isVisible, loadingContent, loadingHeader } = this.state;

    return (
      <View style={styles.slide}>
        <Overlay
          isVisible={isVisible}
          width={ConstantValues.deviceWidth - 40}
          height="auto"
        // windowBackgroundColor='rgba(255, 255, 255, .5)'
        // overlayBackgroundColor='#ffffff'
        // onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Spinner size={50} type={'FadingCircleAlt'} color={'#FF5819'} isVisible={isVisible} />
            <Text style={styles.textP}>{loadingHeader}</Text>
            <Text style={styles.text}>{loadingContent}</Text>
          </View>


        </Overlay>

        <WebView
          // source={{ uri: 'http://13.126.232.146:3001/api/paytm/response' }}
          // source={{ uri: 'http://10.5.48.206:3001/api/paytm/request' }}
          source={{ uri: 'https://paytmapi.zoopindia.in/api/paytm/request' }}
          injectedJavaScript={`
          document.getElementById("ORDER_ID").value = "${ORDER_ID}";
          document.getElementById("CUST_ID").value = "${CUST_ID}";
          document.getElementById("TXN_AMOUNT").value = "${TXN_AMOUNT}";
          document.f1.submit();`}

          onNavigationStateChange={(data) => this.handleResponse(data)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width - 5,
    marginLeft: 5,
  },
  text: {
    alignSelf: "center",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#000",
    paddingVertical: 5,
    textAlign: 'center'
  },
  textP: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#FF5819',
    paddingVertical: 5
  }
});


// document.getElementById("INDUSTRY_TYPE_ID").value = "${INDUSTRY_TYPE_ID}";
// document.getElementById("CHANNEL_ID").value = "${CHANNEL_ID}";
// document.getElementById("WEBSITE").value = "${WEBSITE}";
// document.getElementById("MID").value = "${MID}";
// document.getElementById("PAYTM_MERCHANT_KEY").value = "${PAYTM_MERCHANT_KEY}";
