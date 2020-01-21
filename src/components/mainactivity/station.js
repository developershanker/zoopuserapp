import React, { Component } from 'react';
import { Text, Dimensions, View, ScrollView, StyleSheet, Alert, ToastAndroid, Image, SectionList, TouchableOpacity, TouchableWithoutFeedback, FlatList, TextInput, CheckBox, ActivityIndicator, BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { StationHeader } from './stationHeader.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import { CustomButtonShort } from '../assests/customButtonShort.js';
import Search from './search.js';
import searchApi from './searchApi.js';
import ConstantValues from '../constantValues.js';
import { Fade } from '../assests/fade.js';
import Spinner from 'react-native-spinkit';
import { Overlay } from 'react-native-elements';
import { ZoopLoader } from '../assests/zoopLoader.js';
import moment from "moment";
import styles from './stationCss.js';
import { StationLoader } from './stationLoader.js';


export default class station extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.showStation(ConstantValues.searchString);
    ConstantValues.inCart = []
    ConstantValues.finalCart = []
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    that.setState({
      //  date : date + '/' + month + '/' + year,
      date: year + '-' + month + '-' + date,
      time: hours + ':' + min + ':' + sec
    })
    // console.log('Todays date is...............................................' + date)
  }
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: '',
      visibleModal: null,
      loading: true,
      stationOpacity: 0.5,
      scrollBegin: false,
      OutletList: [],
      FilteredOutletList: [],
      StationList: [],
      FilteredStationList: [],
      CuisinesList: [],
      checked: [],
      isVisible: true
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton = () => {
  console.log('I am back on Station.js')
    this.props.navigation.navigate('Search')

    return true;
};
  handleChange = (index, cuisine) => {
    let checked = [...this.state.checked];
    checked[index] = !checked[index];
    this.setState({ checked });
    console.log('Cuisines selected:' + cuisine)
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} /> ,
      <View style={{ height: 1, width: '100%', backgroundColor: '#999999' }} />
    );
  };



  async showCuisines() {
    try {
      let response = await searchApi.showCuisines();
      if (response.status == true) {
        this.setState({
          CuisinesList: response.data
        })
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

  async showStation(text) {
    try {
      let response = await searchApi.searchBy(text);
      if (response.status == true) {
        // console.log('data received in station.js : ' + JSON.stringify(response)),
        ConstantValues.trainId = response.data.trainDetails.trainId
        ConstantValues.trainNumber = response.data.trainDetails.trainNumber
        ConstantValues.trainName = response.data.trainDetails.trainName
        if (ConstantValues.searchString.length == 10) {
          ConstantValues.seat = response.data.seatInfo.berth
          ConstantValues.coach = response.data.seatInfo.coach
          ConstantValues.passengerInfo = response.data.passengerInfo
        } else {
          ConstantValues.seat = ''
          ConstantValues.coach = ''
        }
        this.setState({
          StationList: response.data.trainRoutes,
        })
        //console.log('Stations are : ' + JSON.stringify(this.state.StationList) + '\n' + 'Station length is : ' + this.state.StationList.length)
        if (this.state.StationList && this.state.StationList.length) {
          this.setState({
            // StationList: response.data.trainRoutes,
            FilteredStationList: this.state.StationList.filter((item) => {
              return item.isVisible && item.outlets.length > 0
            })
          })
          if (this.state.FilteredStationList && this.state.FilteredStationList.length) {
            this.setState({
              isVisible: false
            })
            return this.state.FilteredStationList

          } else {
            return (
              Alert.alert(
                'Alert!!',
                'Sorry! Bookings closed currently for this route.',
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
              'Sorry! Bookings closed currently for this route.',
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
            'Invalid Input!!',
            response.error,
            [
              {
                text: 'OK', onPress: () => this.props.navigation.navigate('Search'),
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
        ),
          console.log(response.error)

      }
    } catch (error) {
      console.log('Data received in station.js catch: ' + error)
    }
  }

  gotoMenu = (stationId, outletId, stationName, stationCode, arrivalTime, schArrivalTime, haltTime, arrDate, arrival, outletName, outletRating, minimumOrderValue, cutOffTime, zoopCustomerDeliveryCharge, zoopCustomerDeliveryChargeGstRate, zoopCustomerDeliveryChargeGst, eta, openTime, closeTime, weeklyOff, gstin, fssaiNo, offer, items,outletImage) => {
    const momemtHaltTime = moment(haltTime, 'HHmmss').format('mm')
    const checkedArrival = ((arrival === '--' || arrival === null) ? schArrivalTime : arrival)
    ConstantValues.stationId = stationId,
      ConstantValues.outletId = outletId,
      ConstantValues.outletImage = outletImage
      ConstantValues.stationName = stationName,
      ConstantValues.stationCode = stationCode
    // ConstantValues.ata = '07:50'
    ConstantValues.ata = (schArrivalTime === null ? arrivalTime : schArrivalTime)
    ConstantValues.outletName = outletName,
      ConstantValues.haltTime = momemtHaltTime,
      ConstantValues.deliveryDate = (ConstantValues.searchString.length === 10 ? arrDate : this.state.date), //actual date of arraival
      ConstantValues.deliveryTime = (ConstantValues.searchString.length === 10 ? checkedArrival : arrivalTime), //expected date of arraival
      ConstantValues.outletRating = outletRating,
      ConstantValues.minimumOrderValue = minimumOrderValue
    ConstantValues.cuttoff = cutOffTime
    ConstantValues.deliveryCharge = (zoopCustomerDeliveryCharge == null ? 0 : zoopCustomerDeliveryCharge)
    ConstantValues.zoopdeliveryCharge = (zoopCustomerDeliveryCharge == null ? 0 : zoopCustomerDeliveryCharge)
    ConstantValues.deliveryChargegst = (zoopCustomerDeliveryChargeGst == null ? 0 : zoopCustomerDeliveryChargeGst)
    ConstantValues.zoopdeliveryChargegst = (zoopCustomerDeliveryChargeGst == null ? 0 : zoopCustomerDeliveryChargeGst)
    ConstantValues.deliveryChargegstRate = (zoopCustomerDeliveryChargeGstRate == null ? 0 : zoopCustomerDeliveryChargeGstRate)
    ConstantValues.eta = eta
    ConstantValues.openTime = openTime
    ConstantValues.closeTime = closeTime
    ConstantValues.weeklyOff = weeklyOff
    //getting items
    ConstantValues.gstIn = gstin
    ConstantValues.fssaiNo = fssaiNo
    ConstantValues.offer = offer
    ConstantValues.OutletMenuInfo = items
    //add delivery charge and delivery charge gst
    ConstantValues.deliveryCharge = (zoopCustomerDeliveryCharge == null ? 0 : zoopCustomerDeliveryCharge + ConstantValues.deliveryChargegst)
    console.log('ConstantValues.stationId : ' + ConstantValues.stationId),
      console.log('ConstantValues.outletId : ' + ConstantValues.outletId),
      console.log('ConstantValues.deliveryCharge : ' + ConstantValues.deliveryCharge + '\n' + 'ConstantValues.deliveryChargegst : ' + ConstantValues.deliveryChargegst + '\n' + 'ConstantValues.deliveryChargegstRate : ' + ConstantValues.deliveryChargegstRate)
    if (ConstantValues.OutletMenuInfo && ConstantValues.OutletMenuInfo.length) {
      // this.props.navigation.navigate('Menu')
      this.props.navigation.navigate('ReduxMenu')
    } else {
      return (
        Alert.alert(
          'Alert!!',
          'No Items to display.Select another outlet',
          [
            {
              text: 'OK', onPress: () => console.log('no items'),
              style: 'cancel'
            },
          ],
          { cancelable: false },
        )
      )
    }
  }

  selectedStation = (item, index) => {
    this.setState({
      stationOpacity: 1
    })
  }
  scrollStart = () => this.setState({ scrollBegin: true })
  scrollEnd = () => this.setState({ scrollBegin: false })

  render() {
    const width = Dimensions.get('window').width
    let temp = ''
    return (this.state.isVisible === true ? <StationLoader visible={this.state.isVisible} /> :
      <SafeAreaView style={styles.slide}>
        {/* <View style={{flexDirection:'column',alignItems:'center'}}>
        <Spinner size={100} type={'FadingCircleAlt'} color={'#FF5819'} isVisible={this.state.loading}/>
        </View> */}

        {/* <Fade visible={this.state.loading == false}> */}
        <View style={styles.topContainer}>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
              <Icon style={{ margin: 15 }} name={'chevron-left'} size={20} color={'#000000'} />
            </TouchableOpacity>
          </View>
          {/* Searchbar begins */}

          <View style={styles.searchBarView}>
            <Text style={{ fontSize: 18, fontFamily: 'Poppins-Medium', }}>Pick Station & Restaurant</Text>
          </View>

          {/* Searchbar ends */}
        </View>
        {/* FilterModal begins */}
        {/* <View style={{ flex: 1 }}>
          <Modal
            isVisible={this.state.visibleModal === 'bottom'}
            onBackButtonPress={() => this.setState({ visibleModal: null })}
            onSwipeComplete={() => this.setState({ visibleModal: null })}
            swipeDirection={['left', 'right',]}
            style={styles.bottomModal}
          >
            <View style={styles.modalView}>
              <View>
                <Text style={styles.cuisineText}>Cuisines</Text>
              </View>
              <View style={{ height: 250, width: Dimensions.get('screen').width, paddingHorizontal: 10 }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                >
                  <FlatList
                    data={this.state.CuisinesList}
                    extraData={this.state}
                    renderItem={({ item, index }) =>

                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <CheckBox
                          value={this.state.checked[index]}
                          disabled={false}
                          onValueChange={() => this.handleChange(index, item.cuisineName)}
                        />
                        <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-Regular' }}>{item.cuisineName}</Text>
                      </View>
                    }
                    keyExtractor={(item) => item.cuisineId.toString()}
                  />
                </ScrollView>
              </View>
              <CustomButtonShort
                style={{ backgroundColor: '#1fc44e', alignSelf: 'flex-end' }}
                onPress={() => { this.setState({ visibleModal: null }) }}
                title='Apply'
              />
            </View>
          </Modal>
        </View> */}
        {/* FilterModal ends */}



        <View style={styles.stationContainer}>
          <View style={styles.scroll}>
            <ScrollView
              //  onScrollBeginDrag={this.scrollStart}
              //  onScrollEndDrag={this.scrollEnd}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={true}
              contentContainerStyle={styles.contentContainer}>
              <FlatList
                data={this.state.FilteredStationList}
                // data={this.state.data}
                horizontal={true}
                renderItem={({ item, index }) =>
                  // <Fade visible={item.isVisible && item.outlets.length != 0}>
                  <View style={styles.stationView}>
                    {/* activeOpacity = {this.state.scrollBegin == true ? 1 : 0.5 } */}
                    <TouchableOpacity>
                      <Image style={styles.roundImage} source={item.stationImage == null ? require('../images/1.png') : { uri: item.stationImage }} />
                      <View style={styles.name}>
                        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular', alignSelf: 'center' }}>{item.stationName}</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular', alignSelf: 'center' }}>{item.arrival === null || item.arrival === '--' ? moment(item.arrivalTime, 'HHmmss').format('hh:mm A') : item.arrival}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  // </Fade>
                }
                keyExtractor={(item) => item.stationId.toString()}
              />
            </ScrollView>
          </View>
        </View>
        {/* OutletView starts */}
        <ScrollView>
          <View>
            {/* Station Header */}
            {/* <StationHeader /> */}
            <FlatList
              data={this.state.FilteredStationList}
              // ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item, index }) =>
                // <Fade visible={item.isVisible && item.outlets.length != 0}>
                <View style={{ borderRadius: 5, borderColor: '#e7e7e7', borderWidth: 1, marginVertical: 5, marginHorizontal: 10 }}>
                  <Text style={styles.textheader}>{item.stationName}</Text>
                  <View style={styles.stextview}>
                    {/* <Text style={styles.stext}>Halt : {moment(item.haltTime, 'HHmmss').format('mm')} mins | </Text>
                    <Text style={styles.stext}> S.T.A : {moment(item.arrivalTime, 'HHmmss').format('hh:mm A')} | </Text>
                    <Text style={styles.stext}> E.T.A : {moment(item.expectedTime, 'HHmmss').format('hh:mm A')}</Text> */}
                    <Text style={styles.stext}>Halt : {item.halt === null ? moment(item.haltTime, 'HH:mm:ss').format('mm') : moment(item.halt, 'mm:ss').format('mm')} mins | </Text>
                    <Text style={styles.stext}> S.T.A : {item.schArrivalTime === null || item.arrival === '--' ? moment(item.expectedTime, 'HHmmss').format('hh:mm A') : moment(item.schArrivalTime, 'HHmmss').format('hh:mm A')}  | </Text>
                    <Text style={styles.stext}> E.T.A : {item.arrival === null || item.arrival === '--' ? moment(item.arrivalTime, 'HHmmss').format('hh:mm A') : moment(item.arrival,'HHmmss').format('hh:mm A')}</Text>
                  </View>

                  {/* OutletView starts */}



                  {
                    item.outlets.map((outlets, index) => {

                      temp = ''
                      return (
                        <View style={styles.outletContainer} key={index} >
                          <TouchableWithoutFeedback style={styles.card}
                            // disabled = {!item.isVisible} 
                            onPress={() => {
                              this.gotoMenu(
                                item.stationId,
                                outlets.outletId,
                                item.stationName,
                                item.stationCode,
                                item.arrivalTime,
                                item.schArrivalTime,
                                item.haltTime,
                                item.arrDate, //actual date of arraival
                                item.arrival,//actual time of arraival
                                outlets.outletName,
                                outlets.outletRating,
                                outlets.minimumOrderValue,
                                //outlets
                                outlets.cutOffTime,
                                outlets.zoopCustomerDeliveryCharge,
                                outlets.zoopCustomerDeliveryChargeGstRate,
                                outlets.zoopCustomerDeliveryChargeGst,
                                item.expectedTime,
                                outlets.openTime,
                                outlets.closeTime,
                                outlets.weeklyOff,
                                outlets.gstin,
                                outlets.fssaiNo,
                                outlets.offer,
                                outlets.items,
                                outlets.outletImage
                              )
                            }}>
                            <View style={styles.card}>
                              <Image source={{ uri: outlets.outletImage }} style={styles.outletimage} />
                              <View style={styles.detail}>
                                <View style={{ flexDirection: 'column' }}>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                                    <Text style={styles.outletname}>
                                      {outlets.outletName}
                                    </Text>
                                    <View style={styles.ratingView}>
                                      <Text style={styles.rating}>
                                        {outlets.outletRating}
                                      </Text>
                                    </View>
                                  </View>


                                  {
                                    outlets.cuisines.map((cuisines, index) => {

                                      temp += cuisines.cuisineName + ', ';

                                    }
                                    )
                                  }

                                  {/* <View style={{width:'60%',}}> */}
                                  <Text style={styles.cuisine}>
                                    {temp.slice(0, -2)}
                                  </Text>
                                  {/* </View> */}
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.minorder}>
                                      Min. Order : {ConstantValues.rupee} {outlets.minimumOrderValue}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'flex-end', paddingLeft: 30 }}>
                                      <Image source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.veg }} style={{ width: 15, height: 15, alignSelf: 'center' }} />

                                      <Image source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.nonveg }} style={{ width: 15, height: 15, alignSelf: 'center', opacity: outlets.isPureVeg == 0 ? 1 : 0 }} />

                                    </View>
                                  </View>

                                </View>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      )
                    }

                      //  }
                    )
                  }
                </View>
                // </Fade>
              }
              keyExtractor={(item, index) => item.stationId.toString()}
            />
          </View>

        </ScrollView>
        {/* Floating FAB starts */}
        {/* <View>
          <TouchableOpacity style={styles.fab} onPress={() => {
            this.showCuisines();
            this.setState({ visibleModal: 'bottom' })

          }} >
            <Icon name={'filter'} size={20} color={'#ffffff'} />
            <Text style={styles.fabIcon}>Filter</Text>
          </TouchableOpacity>
        </View> */}
        {/* Floating FAB ends */}



        {/* <Overlay
          isVisible={this.state.isVisible}
          width="auto"
          height="auto"
          // windowBackgroundColor='rgba(255, 255, 255, .5)'
          // overlayBackgroundColor='#ffffff'
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <ZoopLoader isVisible={true} />
          

        </Overlay> */}


        {/* </Fade> */}
      </SafeAreaView>
    );
  }
}
