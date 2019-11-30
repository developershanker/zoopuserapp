import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Platform, TouchableNativeFeedback, Linking, Alert, KeyboardAvoidingView, PixelRatio, Button, Animated, Image, ScrollView, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RadioButton, Text } from 'react-native-paper';
import Modal from "react-native-modal";
import { CustomButton } from '../assests/customButtonLarge';
import { CustomGridIcon } from '../assests/customGridIcon';
import { SafeAreaView } from 'react-navigation';
import searchApi from './searchApi';
import DeliveryMark from '../postOrderActivity/deliveryMark';
import ConstantValues from '../constantValues';
import AsyncStorage from '@react-native-community/async-storage';
import { Fade } from '../assests/fade';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import loginApi from '../login/loginApi.js';
import otpVerify from '../login/otpVerify';
import trainData from './trainData';
import styles from '../assests/css';


const { width } = Dimensions.get('window');
export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height
export const calcHeight = x => PixelRatio.roundToNearestPixel((deviceHeight * x) / 100)
export const calcWidth = x => PixelRatio.roundToNearestPixel((deviceWidth * x) / 100)

export default class Search extends Component {
  componentDidMount() {
    SplashScreen.hide();
    console.log(' I am in search.js componentdidmount')
    // this.getRecentItem()
    this.showTrain()
    this.onRegister()
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: 'Enter PNR',
      placeholder: '',
      email: '',
      query: '',
      isVisible:false,
      visibleModal: null,
      recentSearchArray: [],
      trains: [],

    };
  }
  scrollX = new Animated.Value(0)
  async onRegister() {
    try {
      let response = await loginApi.getUserRegister();
      console.log('data received in register.js : ' + JSON.stringify(response))
      ConstantValues.loginCount = response.data.loginCount
      this.state.loginCount = response.data.loginCount
      ConstantValues.isAgent = response.data.isAgent
      ConstantValues.customerPhoneNo = response.data.mobile
      ConstantValues.customerName = response.data.fullName
      ConstantValues.customerRefferalCode = response.data.referralCode
      this.setState({
        name: ConstantValues.customerName
      })
      console.log('ConstantValues.customerName :' + ConstantValues.customerName + '\n' + ' ConstantValues.customerRefferalCode : ' + ConstantValues.customerRefferalCode)
      ConstantValues.customerEmailId = response.data.email
      this.setState({
        emailId: ConstantValues.customerEmailId
      })
      ConstantValues.customeralternateMobile = response.data.alternateMobile
      this.setState({
        altmobile: ConstantValues.customeralternateMobile
      })
    } catch (error) {
      console.log('Data received in register.js catch: ' + error)
    }
  }


  //function to render dropdown while search by train no.
  findTrain(query) {
    if (query === '') {
      return [];
    }
    const { trains } = this.state;
    //making a case insensitive regular expression to get similar value from the train json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered train array according the query from the input
    return trains.filter(train => train.trainNumberAndName.search(regex) >= 0);
  }


  trainList = (value) => {

    if (value == 'Enter PNR') {
      return (
        <View style={styles.inputView}>
          <TextInput
            // ref={component => this._textInput = component}
            style={styles.input}
            placeholder={this.state.value}
            clearButtonMode={'always'}
            enablesReturnKeyAutomatically={true}
            keyboardType='number-pad'
            maxLength={10}
            onValueChange={placeholder => this.setState({ placeholder })}
            onChangeText={text => this.setState({ text })}
          />
        </View>
      )
    }
    else if (value == 'Enter Train No.') {
      const { query } = this.state;
      const trains = this.findTrain(query);
      // console.log('trains are' + trains)
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

      return (
        <View style={styles.inputView}>
          <TextInput
            // ref={component => this._textInput = component}
            style={styles.input}
            clearButtonMode={'always'}
            // onTouchStart={() => this.handleModalOpen(ConstantValues.getRecentSearch) }
            onTouchStart={() => this.setState({ visibleModal: 'bottom' })}
            enablesReturnKeyAutomatically={true}
            placeholder="Enter Train Name/No."
            onChangeText={text => this.setState({ query: text })}
          />
        </View>
        // <View style={styles.mainD}>
        // <Autocomplete
        //   autoCapitalize="none"
        //   autoCorrect={false}
        //   clearButtonMode={'always'}
        //   enablesReturnKeyAutomatically={true}
        //   data={trains.length === 1 && comp(query, trains[0].trainNumberAndName) ? [] : trains}
        //   defaultValue={query}
        //   inputContainerStyle={styles.inputViewD}
        //   //listContainerStyle={styles.autocompleteContainer}
        //   style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#635c5a', }}
        //   onChangeText={text => this.setState({ query: text })}
        //   placeholder="Enter Train Name/No."
        //   renderItem={({ item }) => (
        //     <View>
        //       <ScrollView contentContainerStyle={styles.dropdown}>
        //         <TouchableOpacity onPress={() => this.setState({
        //           query: item.trainNumberAndName,
        //           text: item.trainNumber
        //         })}>
        //           <View style={{ width: Dimensions.get('window').width - 20,paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center' }}>
        //             <Text style={styles.itemText}>
        //               {item.trainNumberAndName}
        //             </Text>
        //           </View>

        //         </TouchableOpacity>
        //       </ScrollView>
        //     </View>
        //   )}
        //   keyExtractor={(item) => item.trainId.toString()}
        // />
        // </View>
      )
    }
  }




  async showTrain() {
    try {
      let response = await searchApi.showTrain();
      // console.log('data received in search.js : ' + JSON.stringify(response))
      if (response.status == true) {
        // console.log('data : ' + JSON.stringify(response.data))
        this.setState({
          trains: response.data,
          recentSearchArray: ConstantValues.getRecentSearch
        })
        console.log('data in ::::Show Train : ' + this.state.recentSearchArray)
        // return (
        //   ToastAndroid.show(response.message, ToastAndroid.LONG)
        // )
        //  this.getRecentItem()
      } else {
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG),
          console.log(response.error)
        )
      }
    } catch (error) {
      console.log('Data received in search.js catch: ' + error)
    }

  }




  searchBy(text, query) {
    let reg = /^[0-9]+$/;
    if (text != '' && reg.test(text)) {
      if (text.length == 10 || text.length == 5) {
        console.log('query.length : ' + query.length + '\n' + 'query : ' + query)
        ConstantValues.searchString = text
        if (text.length === 5) {
          this.pushingItem(text, query)
        }
        console.log('ConstantValues.searchString is ....' + ConstantValues.searchString)
        this.props.navigation.navigate('Station')
      } else {
        return (
          Alert.alert(
            'Alert!!',
            'Incorrect Input length!!',
            [
              {
                text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        )
      }
    } else {
      return (
        Alert.alert(
          'Alert!!',
          'Invalid Input!!',
          [
            {
              text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      )
    }
  }

  handleModalOpen(getRecentSearch) {
    console.log('ConstantValues.getRecentSearch ::::handleModalOpen : ' + ConstantValues.getRecentSearch)
    this.setState({
      recentSearchArray: getRecentSearch,
      visibleModal: 'bottom'
    })
    console.log('recentSearchArray ::::handleModalOpen : ' + JSON.stringify(this.state.recentSearchArray))
  }

  pushingItem = async (text, query) => {
    try {
      // ConstantValues.recentSearch.unshift({
      //   'trainNumber': text,
      //   'trainNumberAndName': query
      // })
      let rec = {
        'trainNumber': text,
        'trainNumberAndName': query
      }
      // const recentSearch = new Array()
      // recentSearch = await AsyncStorage.getItem('recentSearch') || '[]'
      // recentSearch = JSON.parse(recentSearch)
      ConstantValues.recentSearch.unshift(rec);
      await AsyncStorage.setItem('recentSearch', JSON.stringify(ConstantValues.recentSearch));
      console.log('Storing this in local storage recentSearch : ' + JSON.stringify(ConstantValues.recentSearch))
    } catch (error) {
      console.log('Error in storing asyncstorage: ' + error)
    }
  }

  dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${8010802222}';
    }
    else {
      phoneNumber = 'telprompt:${8010802222}';
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    let position = Animated.divide(this.scrollX, width);
    let { query } = this.state;
    let trains = this.findTrain(query);
    // let getRecentSearch = ConstantValues.getRecentSearch
    // // let recentSearch = ConstantValues.getRecentSearch
    // console.log('getRecentSearch ::::: in render : ' + getRecentSearch)
    let comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <SafeAreaView >
        <ScrollView keyboardShouldPersistTaps='handled'>
          <KeyboardAvoidingView enabled style={styles.slide}>

            <View style={{ width: deviceWidth, height: '20%' }}>
                <Image style={styles.imageTop} source={require('../images/Home.jpg')} />
            </View>

            <View style={{ alignItems: 'center', width: deviceWidth, height: '5%', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, }}>Search By</Text>
            </View>

            <RadioButton.Group
              onValueChange={value => this.setState({ value, text: '', query: '' })}
              value={this.state.value}
            >
              <View style={styles.radioButton}>
                <View style={styles.radioView}>
                  <RadioButton
                    value="Enter PNR"
                    color='#757271'

                  />
                  <Text style={styles.text}>PNR on Ticket</Text>
                </View>


                <View style={styles.radioView}>
                  <RadioButton
                    value="Enter Train No."
                    color='#757271'
                  // onPress={this.showTrain()}     
                  />
                  <Text style={styles.text}>Train Name/No.</Text>
                </View>

              </View>
            </RadioButton.Group>
            <View style={styles.input}>

            </View>
            <View style={styles.main}>
              {this.trainList(this.state.value)}
            </View>
            <View style={{ justifyContent: 'center', alignContent: 'center', width: deviceWidth, height: '10%' }}>
              <CustomButton
                style={{ alignSelf: 'center' }}
                onPress={() => {

                  this.searchBy(this.state.text, this.state.query)
                }}
                title='Search Restaurants'
              />
            </View>

            {/* extra services view starts */}
            <View style={styles.gridContainer}>
              <View>
                <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.props.navigation.navigate('BulkOrder')}>
                  <Image style={styles.iconImg} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.bulkOrder }} />
                  <Text style={styles.GridViewTextLayout}>BULK ORDER</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.props.navigation.navigate('CoachSequence')} disabled={true}>
                  <Text style={{ color: '#8c0d0d', fontSize: 8, fontFamily: 'Poppins-Regular', justifyContent: 'center', alignItems: 'center', }}>Coming Soon...</Text>
                  <Image style={{ opacity: 0.2, width: 50, height: 50 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.coachSequence }} />
                  <Text style={[styles.GridViewTextLayout, { opacity: 0.2 }]}>COACH SEQUENCE</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.dialCall()}>
                  <Image style={styles.iconImg} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.helpline }} />
                  <Text style={styles.GridViewTextLayout}>HELPLINE</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.gridContainer}>
                <View>
                <TouchableOpacity style={styles.GridViewContainer} onPress={()=>this.props.navigation.navigate('TrainTimeTable')} disabled={true}>
                <Text style={{color:'#8c0d0d',fontSize: 8,fontFamily:'Poppins-Regular',justifyContent: 'center',alignItems:'center',}}>Coming Soon...</Text>
                  <Image  style={{opacity:0.2,width:50,height:50}} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.trainTimeTable}} />
                  <Text  style={[styles.GridViewTextLayout,{opacity:0.2}]}>TRAIN TIME TABLE</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={styles.GridViewContainer} onPress={()=>this.props.navigation.navigate('CheckPNR')} disabled={true}>
                <Text style={{color:'#8c0d0d',fontSize: 8,fontFamily:'Poppins-Regular',justifyContent: 'center',alignItems:'center',}}>Coming Soon...</Text>
                  <Image  style={{opacity:0.2,width:50,height:50}} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.pnrCheck }} />
                  <Text  style={[styles.GridViewTextLayout,{opacity:0.2}]}>PNR CHECK</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity style={styles.GridViewContainer} onPress={()=>this.props.navigation.navigate('PlatformLocator')} disabled={true}>
                <Text style={{color:'#8c0d0d',fontSize: 8,fontFamily:'Poppins-Regular',justifyContent: 'center',alignItems:'center',}}>Coming Soon...</Text>
                  <Image  style={{opacity:0.2,width:50,height:50}} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.platformLocator}} />
                  <Text  style={[styles.GridViewTextLayout,{opacity:0.2}]}>PLATFORM LOCATOR</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            {/* extra services view starts */}
            <View style={styles.scroll}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
                  [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
                )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
                scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
              >
                {photos.map((source, i) => { // for every object in the photos array...
                  return ( // ... we will return a square Image with the corresponding object as the source
                    <Image
                      key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                      style={styles.img}
                      source={source}
                    />
                  );
                })}
              </ScrollView>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} // this will layout our dots horizontally (row) instead of vertically (column)
            >
              {photos.map((_, i) => { // the _ just means we won't use that parameter
                let opacity = position.interpolate({
                  inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                  outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                  // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                  // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                  extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                });
                return (
                  <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                    key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                    style={{ opacity, height: 5, width: 5, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                  />
                );
              })}
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
        <KeyboardAvoidingView>
          <Modal
            isVisible={this.state.visibleModal === 'bottom'}
            onBackButtonPress={() => this.setState({ visibleModal: null })}
            // onSwipeComplete={() => this.setState({ visibleModal: null })}
            // swipeDirection={['left', 'right']}
            style={styles.bottomModal}
          >
            <View style={styles.modalView}>

              <View style={{ alignItems: 'center', width: deviceWidth, height: '5%', justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, }}>Search By</Text>
              </View>

              <View style={styles.autocompleteContainer}>
                <Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode={'always'}
                  enablesReturnKeyAutomatically={true}
                  listContainerStyle={{ height: '80%' }}
                  data={trains.length === 1 && comp(query, trains[0].trainNumberAndName) ? [] : trains}
                  defaultValue={query}
                  style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#635c5a', }}
                  onChangeText={text => this.setState({ query: text })}
                  placeholder="Enter Train Name/No."
                  renderItem={({ item }) => (
                    <View>
                      <ScrollView contentContainerStyle={styles.dropdown}>
                        <TouchableOpacity onPress={() => this.setState({
                          query: item.trainNumberAndName,
                          text: item.trainNumber
                        })
                        }>
                          <View style={{ width: Dimensions.get('window').width - 20, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center' }}>
                            <Text style={styles.itemText}>
                              {item.trainNumberAndName}
                            </Text>
                          </View>

                        </TouchableOpacity>
                      </ScrollView>
                    </View>
                  )}
                  keyExtractor={(item) => item.trainNumber.toString()}
                />
              </View>
              <Fade style={{ alignItems: 'flex-start', width: deviceWidth - 10, height: '60%', justifyContent: 'flex-start' }} visible={this.state.query === ''}>
                {/* <View style={{ alignItems: 'center', width: deviceWidth - 10, height: '20%', justifyContent: 'center' }}> */}
                <View style={{ alignItems: 'center', width: deviceWidth - 10, height: '5%', justifyContent: 'center', marginVertical: 5 }}>
                  <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, }}>Recent Searches</Text>
                </View>


                <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: deviceWidth - 10, justifyContent: 'flex-start' }}>
                  <ScrollView
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    contentContainerStyle={{ width: deviceWidth - 10 }}
                  >
                    <FlatList
                      data={this.state.recentSearchArray}
                      extraData={this.state}
                      renderItem={({ item , i }) => (
                        <View>
                          <TouchableNativeFeedback key={i} onPress={() => this.setState({
                            query: item.trainNumberAndName,
                            text: item.trainNumber
                          })
                          }>
                            <View style={styles.box}>
                              <Text style={{ color: '#9b9b9b', fontFamily: 'Poppins-Regular', fontSize: 15, textAlign: 'center' }}> {item.trainNumberAndName} </Text>
                            </View>
                          </TouchableNativeFeedback>
                        </View>

                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                    {/* {
                      this.state.recentSearchArray.map((traininfo, i) => {
                        return (
                          <TouchableNativeFeedback key={i} onPress={() => this.setState({
                            query: traininfo.trainNumberAndName,
                            text: traininfo.trainNumber
                          })}>
                            <View style={styles.box}>
                              <Text style={{ color: '#9b9b9b', fontFamily: 'Poppins-Regular', fontSize: 15, textAlign: 'center' }}> {traininfo.trainNumberAndName} </Text>
                            </View>
                          </TouchableNativeFeedback>
                        )
                      })} */}
                  </ScrollView>
                </View>
                {/* </View> */}
              </Fade>

              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: deviceWidth - 20, height: '10%' }}>
                <CustomButton
                  style={{ alignSelf: 'center' }}
                  onPress={() => {
                    this.setState({ visibleModal: null })
                    this.searchBy(this.state.text, this.state.query)
                  }}
                  title='Search Restaurants'
                />
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
        {/* <DeliveryMark/> */}
      </SafeAreaView>
    );
  }

}
const photos = [
  { uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner3 },
  { uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner4 },
  { uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner2 },
  { uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner1 },
]