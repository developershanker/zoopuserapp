import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Platform, TouchableNativeFeedback, Linking, Alert, KeyboardAvoidingView, PixelRatio, Button, Animated, Image, ScrollView, TextInput, TouchableOpacity, ToastAndroid, FlatList, BackHandler } from 'react-native';
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
import IconA from 'react-native-vector-icons/AntDesign';
import loginApi from '../login/loginApi.js';
import otpVerify from '../login/otpVerify';
import trainData from './trainData';
import styles from '../assests/css';
import { Header } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import Colors from '../colors';


const { width, height } = Dimensions.get('window');
export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height
export const calcHeight = x => PixelRatio.roundToNearestPixel((deviceHeight * x) / 100)
export const calcWidth = x => PixelRatio.roundToNearestPixel((deviceWidth * x) / 100)

export default class Search extends Component {
  componentDidMount() {
    SplashScreen.hide();
    // this.getRecentItem()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.checkCopiedtext()
    this.showTrain()
    this.onRegister()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);
    this.state = {
      text: '',
      value: 'Enter PNR Number',
      placeholder: '',
      email: '',
      query: '',
      backClickCount: 0,
      isVisible: false,
      visibleModal: null,
      visibleModalDrawer: null,
      visibleModalProfile: null,
      recentSearchArray: [],
      trains: [],

    };
  }
  //double tap to exit
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  _spring() {
    this.setState({ backClickCount: 1 }, () => {
      Animated.sequence([
        Animated.spring(
          this.springValue,
          {
            toValue: -.15 * height,
            friction: 5,
            duration: 300,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          this.springValue,
          {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }
        ),

      ]).start(() => {
        this.setState({ backClickCount: 0 });
      });
    });

  }


  handleBackButton = () => {
    console.log('I am back on Search')
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
  };

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

  async checkCopiedtext() {
    try {
      let reg = /^[0-9]+$/;
      let copiedText = await Clipboard.getString();
      if (copiedText.length === 10 && reg.test(copiedText)) {
        console.log('Copied text after validation ::::  >>' + copiedText)
        this.changePnrText(copiedText)
        // return (
        //   Alert.alert(
        //     'Confirm!!',
        //     'Do you want to paste the copied content ' + copiedText + ' as PNR ?',
        //     [
        //       {
        //         text: 'Cancel', onPress: () => console.log('Copied text but not pasted :::' + copiedText + "Pressed Cancel"),
        //         style: 'cancel'
        //       },
        //       {
        //         text: 'OK', onPress: () => this.changePnrText(copiedText),
        //         style: 'cancel'
        //       },
        //     ],
        //     { cancelable: false },
        //   )
        // )
      } else {
        console.log('Copied text in else part :::' + copiedText)
      }
    } catch (error) {
      console.log('Data received in checkCopiedtext catch: ' + error)
    }
  }


  changePnrText = (copiedText) => {
    this.setState({
      text: copiedText
    })
  }

  //function to render dropdown while search by train no.
  findTrain(query) {
    if (query === '') {
      return [];
    }
    const { trains } = this.state;
    //making a case insensitive regular expression to get similar value from the train json
    // const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered train array according the query from the input
    // return trains.filter(train => train.trainNumberAndName.search(regex) >= 0);
    return trains.filter(train => train.trainNumberAndName.toLowerCase().includes(query.toLowerCase().trim()));
  }


  trainList = (value) => {

    if (value == 'Enter PNR Number') {
      // console.log('value of radio button pnr is::::' + value)
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
            value={this.state.text}
            onValueChange={placeholder => this.setState({ placeholder })}
            onChangeText={text => this.setState({ text })}
          />
        </View>
      )
    }
    else if (value == 'Enter Train Name/No.') {
      // console.log('value of radio button train is::::' + value)
      const { query } = this.state;
      const trains = this.findTrain(query);
      // console.log('trains are' + trains)
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

      return (
        <TouchableNativeFeedback onPress={() => this.setState({ visibleModal: 'bottom' })}>
          <View style={{ width: Dimensions.get('window').width - 20, marginLeft: 5, borderRadius: 10, borderColor: '#cfc7c4', borderWidth: 1, paddingVertical: 5 }}>
            <Text style={{ margin: 5, fontSize: 15, color: '#9b9b9b', width: Dimensions.get('window').width - 20, fontFamily: 'Poppins-Regular', }}>Enter Train Name/No.</Text>
          </View>
        </TouchableNativeFeedback>

        // {/* <TextInput
        //   // ref={component => this._textInput = component}
        //   style={styles.input}
        //   clearButtonMode={'always'}
        //   // onTouchStart={() => this.handleModalOpen(ConstantValues.getRecentSearch) }
        //   onTouchStart={() => this.setState({ visibleModal: 'bottom' })}
        //   enablesReturnKeyAutomatically={true}
        //   placeholder="Enter Train Name/No."
        //   onChangeText={text => this.setState({ query: text })}
        // /> */}

        // </View>
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




  searchBy(text, query, value) {
    let reg = /^[0-9]+$/;
    if (text != '' && reg.test(text)) {
      if (text.length == 10 || text.length == 5) {
        if (value == 'Enter PNR Number' && text.length == 10 || value == 'Enter Train Name/No.' && text.length == 5) {
          console.log('query.length in success: ' + query.length + '\n' + 'query : ' + query + '\n' + 'text : ' + text + '\n' + 'text.length' + text.length)
          ConstantValues.searchString = text
          if (text.length === 5) {
            this.pushingItem(text, query)
          }
          console.log('ConstantValues.searchString is ....' + ConstantValues.searchString)
          this.props.navigation.navigate('Station')
        } else {
          /////pnr length issue
          console.log('query.length in error: ' + query.length + '\n' + 'query : ' + query + '\n' + 'text : ' + text + '\n' + 'text.length:' + text.length + '\n' + 'value:::::' + value)
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
        console.log('query.length in error: ' + query.length + '\n' + 'query : ' + query + '\n' + 'text : ' + text + '\n' + 'text.length' + text.length + '\n' + 'value:::::' + value)
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
      console.log('query.length in error: ' + query.length + '\n' + 'query : ' + query + '\n' + 'text : ' + text + '\n' + 'text.length' + text.length + '\n' + 'value:::::' + value)
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

  rightComponentView() {
    return (
      <TouchableOpacity onPress={() => this.setState({ visibleModalProfile: 'bottom' })}>
        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <Icon
            name='user-circle'
            size={25}
          />
        </View>
      </TouchableOpacity>
    )
  }

  centerComponentView() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <Image source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
          style={{ width: 80, height: 50 }}
        />
      </View>
    )
  }

  leftComponentView() {
    return (
      <TouchableOpacity onPress={() => this.setState({ visibleModalDrawer: 'right' })}>
        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <Icon
            name='bars'
            size={25}
          />
        </View>
      </TouchableOpacity>
    )
  }

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
            {/* <Header
              placement='left'
              barStyle="light-content" // or directly
              leftComponent={this.leftComponentView()}
              centerComponent={this.centerComponentView()}
              // rightComponent={this.rightComponentView()}
              // rightContainerStyle={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
              leftContainerStyle={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
              centerContainerStyle={{ justifyContent: 'center', alignContent: 'center' }}
              containerStyle={{
                width: ConstantValues.deviceWidth,
                height: '8%',
                backgroundColor: '#fff',
              }}
            /> */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.setState({ visibleModalDrawer: 'right' })}>
                <View style={{ width: 60, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon
                    name='bars'
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Image source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
                  style={{ width: 60, height: 30 }}
                />
              </View>
            </View>

            <View style={{ width: deviceWidth, height: '20%' }}>
              <Image style={styles.imageTop} source={require('../images/Home.jpg')} />
            </View>

            <View style={{ alignItems: 'center', width: deviceWidth, height: '5%', justifyContent: 'center'}}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, }}>Search By</Text>
            </View>

            <RadioButton.Group
              onValueChange={value => this.setState({ value, text: '', query: '' })}
              value={this.state.value}
            >
              <View style={styles.radioButton}>
                <View style={styles.radioView}>
                  <RadioButton
                    value="Enter PNR Number"
                    color='#757271'

                  />
                  <Text style={styles.text}>PNR Number</Text>
                </View>


                <View style={styles.radioView}>
                  <RadioButton
                    value="Enter Train Name/No."
                    color='#757271'
                  // onPress={this.showTrain()}     
                  />
                  <Text style={styles.text}>Train Name/No.</Text>
                </View>

              </View>
            </RadioButton.Group>
            {/* <View style={styles.input}>

            </View> */}
            <View style={styles.main}>
              {this.trainList(this.state.value)}
            </View>
            <View style={{ justifyContent: 'center', alignContent: 'center', width: deviceWidth, height: '8%' }}>
              <CustomButton
                style={{ alignSelf: 'center' }}
                onPress={() => {

                  this.searchBy(this.state.text, this.state.query, this.state.value)
                }}
                title='SEARCH RESTAURANTS'
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
              <SliderBox
                images={photos}
                autoplay
                circleLoop
                sliderBoxHeight={120}
                dotColor={Colors.darkGrey}
                inactiveDotColor={Colors.lightGrey}
                ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
                imageLoadingColor={Colors.newOrange}
                dotStyle={{
                  width: 5,
                  height: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  padding: 0,
                  margin: 0
                }}
              // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
              />
              {/* <ScrollView
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
              </ScrollView> */}
            </View>
            {/* <View
              style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',height:'2%', backgroundColor: Colors.white}} // this will layout our dots horizontally (row) instead of vertically (column)
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
            </View> */}

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

              <View style={[styles.autocompleteContainer,{flexDirection:'row'}]}>
                <Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode={'while-editing'}
                  enablesReturnKeyAutomatically={true}
                  listContainerStyle={{ height: '80%' }}
                  data={trains.length === 1 && comp(query, trains[0].trainNumberAndName) ? [] : trains}
                  defaultValue={query}
                  style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: '#635c5a', }}
                  onChangeText={text => this.setState({ query: text })}
                  // placeholder="Enter Train Name/No."
                  placeholder={this.state.value}
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
                      renderItem={({ item, i }) => (
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
                    this.searchBy(this.state.text, this.state.query, this.state.value)
                  }}
                  title='SEARCH RESTAURANTS'
                />
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
        {/* drawerModal */}
        <KeyboardAvoidingView>
          <Modal
            isVisible={this.state.visibleModalDrawer === 'right'}
            onBackButtonPress={() => this.setState({ visibleModalDrawer: null })}
            onSwipeComplete={() => this.setState({ visibleModalDrawer: null })}
            swipeDirection={['left']}
            style={styles.bottomModal}
          >
            <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
              <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.modalViewDrawer}>

                  <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <Image
                      style={{ width: 150, height: 80 }}
                      source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
                    ></Image>
                  </View>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('Search')
                  }}>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.homeScreen }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Home</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('Register')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myProfile }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Profile</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('MyOrders')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myorders }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>My Orders</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('MyWallet')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myWallet }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>My Wallet</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('Contact')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.contactus }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Contact Us</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('Invite')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.invite }} />
                      <View style={{ width: 150, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Invite & Earn</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('FAQ')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.faq }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>FAQ</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('Feedback')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.feedback }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Feedback</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('RateUs')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.rate }} />
                      <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Rate Us</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    this.setState({ visibleModalDrawer: null })
                    this.props.navigation.navigate('TermsActivity')
                  }
                  }>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                      <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.tnc }} />
                      <View style={{ width: 160, height: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Terms & Conditions</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </KeyboardAvoidingView>
        {/* <DeliveryMark/> */}
        <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
          <Text style={styles.exitTitleText}>Press back again to exit the app</Text>

          {/* <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text style={styles.exitText}>Exit</Text>
                    </TouchableOpacity> */}

        </Animated.View>
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