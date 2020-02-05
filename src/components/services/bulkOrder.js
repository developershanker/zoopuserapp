import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions,BackHandler, TextInput, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomButton } from '../assests/customButtonLarge';
import IconA from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker';
import servicesApi from './servicesApi';
import moment from 'moment';
import Colors from '../colors.js';

export default class bulkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      mobile: '',
      email: '',
      totalPassenger: '',
      journeyDate: '',
      pnr: '',
      comment: '',
      buttonColor:'#9b9b9b',
      clicked: false,
      buttonText:'SUBMIT'
    };
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    console.log('I am back on BulkOrder.js')
    // this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
    this.props.navigation.navigate('Search')
    return true;
  };



  onSubmitBulkOrder = (fullName, mobile, email, totalPassenger, journeyDate, pnr, comment) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let reg = /^[0-9]+$/;
    let regexName = /^[a-zA-Z ]*$/;
    if (fullName != '' && regexName.test(fullName)) {
      if (mobile != '' && mobile.length == 10) {
        if (reg.test(mobile)) {
          if (email != '') {
            if (re.test(email)) {
              if (totalPassenger != '' && reg.test(totalPassenger)) {
                if (journeyDate != '') {
                  console.log('fullName : ' + fullName + '\n' + 'mobile: ' + mobile + '\n' + 'email : ' + email + '\n' + 'totalPassenger : ' + totalPassenger + '\n' + 'journeyDate : ' + journeyDate + '\n' + 'pnr : ' + pnr + '\n' + 'comment : ' + comment)
                  this.sendBulkRequest(fullName, mobile, email, totalPassenger, journeyDate, pnr, comment)

                } else {
                  return (
                    ToastAndroid.show('Enter date of journey!', ToastAndroid.LONG)
                  )
                }
              } else {
                return (
                  ToastAndroid.show('Enter number of passenger!', ToastAndroid.LONG)
                )
              }

            } else {
              return (
                ToastAndroid.show('Enter valid email Id!', ToastAndroid.LONG)
              )
            }

          } else {
            return (
              ToastAndroid.show('Enter email Id!', ToastAndroid.LONG)
            )
          }
        } else {
          return (
            ToastAndroid.show('Enter valid mobile no.!', ToastAndroid.LONG)
          )
        }
      } else {
        return (
          ToastAndroid.show('Enter mobile no.!', ToastAndroid.LONG)
        )
      }
    } else {
      return (
        ToastAndroid.show('Enter Full Name!', ToastAndroid.LONG)
      )
    }
  }

  async sendBulkRequest(fullName, mobile, email, totalPassenger, journeyDate, pnr, comment) {
    this.setState({ clicked: true, buttonColor: '#9b9b9b' ,buttonText:'Sending Request...'})
    try {
      let response = await servicesApi.sendBulkRequest(fullName, mobile, email, totalPassenger, journeyDate, pnr, comment)
      if (response.status == true) {
        this.setState({ clicked: true, buttonColor: '#9b9b9b' ,buttonText:'Request Sent'})
        return (
          Alert.alert(
            'Request Submitted Successfully',
            'Thanks for sharing your information.' + '\n' + ' We will work on your request and contact you in next 48 hours.',
            [
              {
                text: 'OK', onPress: () => {this.setState({
                  fullName: '',
                  mobile: '',
                  email: '',
                  totalPassenger: '',
                  journeyDate: '',
                  pnr: '',
                  comment: '',
                  clicked: true,
                })
                this.props.navigation.navigate('Search')},
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      } else {
        this.setState({ clicked: false, buttonColor: '#60b246' ,buttonText:'SUBMIT'})
        return (
          ToastAndroid.show('Something went wrong!! Try again later!!', ToastAndroid.LONG)
        )
      }
    } catch (error) {
      this.setState({ clicked: false, buttonColor: '#60b246' ,buttonText:'SUBMIT'})
      console.log('Data received in bulkOrder.js catch: ' + error)
    }
  }



  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <IconA style={{ margin: 20 }} name={'arrowleft'} size={25} color={Colors.black} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color:Colors.newOrange }}> Bulk Order Request </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ paddingVertical: 10 }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Enter your name*'
                  editable={true}
                  value={this.state.fullName}
                  autoCapitalize='words'
                  onChangeText={fullName => this.setState({ fullName })}
                />
              </View>
            </View>

            <View style={{ paddingVertical: 10 }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Enter your mobile number*'
                  editable={true}
                  keyboardType='number-pad'
                  value={this.state.mobile}
                  maxLength={10}
                  onChangeText={mobile => this.setState({ mobile })}
                />
              </View>
            </View>

            <View style={{ paddingVertical: 10 }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Enter your email address*'
                  editable={true}
                  keyboardType='email-address'
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                />
              </View>
            </View>

            <View style={{ paddingVertical: 10 }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Enter the number of passengers.*'
                  editable={true}
                  keyboardType='numeric'
                  value={this.state.totalPassenger}
                  maxLength={4}
                  onChangeText={totalPassenger => this.setState({ totalPassenger })}
                />
              </View>
            </View>

            <View style={{ paddingVertical: 10 }}>
              {/* <View style={styles.inputView}> */}
              {/* <TextInput
                    style={styles.input}
                    placeholder='Choose your journey date'
                    editable={true}
                    keyboardType='number-pad'
                    value={this.state.totalPassenger}
                    // autoCapitalize='words'
                    onChangeText={totalPassenger => this.setState({ totalPassenger })}
                  /> */}
              <DatePicker
                style={{ width: Dimensions.get('window').width - 10 }}
                date={this.state.journeyDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Choose your journey date*"
                format="DD-MM-YYYY"
                minDate={moment().toDate()}
                maxDate={moment().add(120, 'days').format("DD-MM-YYYY")}         //"01-01-2030"
                confirmBtnText="Confirm"
                cancelBtnText="CANCEL"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 10
                  },
                  dateInput: {
                    marginLeft: 65,
                    width: Dimensions.get('window').width - 10,
                    borderRadius: 5,
                    borderColor: '#e7e7e7',
                    borderWidth: 1,
                  },
                  dateText: {
                    fontSize: 15,
                    textAlign: 'center',
                    color: '#000000',

                    fontFamily: 'Poppins-Regular',
                  },
                  placeholderText: {
                    textAlign: 'center',
                    fontSize: 15,
                    color: '#',
                    color: '#989c9a',
                    fontFamily: 'Poppins-Regular',
                  }
                }}
                onDateChange={(journeyDate) => { this.setState({ journeyDate: journeyDate , buttonColor: '#60b246'}) }}
              />
              {/* </View> */}
            </View>

            <View style={{ paddingVertical: 10 }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder='Enter PNR number'
                  editable={true}
                  keyboardType='number-pad'
                  maxLength={10}
                  value={this.state.pnr}
                  // autoCapitalize='words'
                  onChangeText={pnr => this.setState({ pnr })}
                />
              </View>
            </View>


            <View style={{ paddingVertical: 10, flexDirection: 'column' }}>
              <Text style={{ paddingHorizontal: 10, alignSelf: 'flex-start', fontFamily: 'Poppins-Regular', fontSize: 15, color: '#000000' }}>Message</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  placeholder='Tell us about the type of food you are looking for(e.g. Thali,Biryani,etc.) and whether you need breakfast,lunch or dinner.'
                  editable={true}
                  keyboardType='default'
                  numberOfLines={3}
                  value={this.state.comment}
                  multiline={true}
                  // autoCapitalize='words'
                  onChangeText={comment => this.setState({ comment })}
                />
              </View>
            </View>


          </View>
        </ScrollView>
        <CustomButton
          disabled={this.state.clicked}
          style={{ backgroundColor: this.state.buttonColor , alignSelf: 'center', marginBottom: 10, }}
          onPress={() => this.onSubmitBulkOrder(this.state.fullName, this.state.mobile, this.state.email, this.state.totalPassenger, this.state.journeyDate, this.state.pnr, this.state.comment)}
          title={this.state.buttonText}
        />
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputView: {
    marginLeft: 5,
    width: Dimensions.get('window').width - 10,
    borderRadius: 5,
    borderColor: '#e7e7e7',
    borderWidth: 1,
  },
  input: {
    fontSize: 15,
    color: '#000000',
    width: Dimensions.get('window').width - 50,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center'
  },
});
