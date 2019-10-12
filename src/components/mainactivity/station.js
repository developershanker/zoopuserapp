import React, { Component } from 'react';
import { Text, Dimensions, View, ScrollView, StyleSheet, Alert, ToastAndroid, Image, SectionList, TouchableOpacity, TouchableWithoutFeedback, FlatList, TextInput, CheckBox, ActivityIndicator } from 'react-native';
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


export default class station extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.showStation(ConstantValues.searchString);
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
      CuisinesList: [],
      checked: [],
      isVisible: true
    };
  }


  handleChange = (index,cuisine) => {
    let checked = [...this.state.checked];
    checked[index] = !checked[index];
    this.setState({ checked });
    console.log('Cuisines selected:' + cuisine )
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
        this.setState({
          StationList: response.data.trainRoutes,
        })
        //console.log('Stations are : ' + JSON.stringify(this.state.StationList) + '\n' + 'Station length is : ' + this.state.StationList.length)
        if (this.state.StationList && this.state.StationList.length) {
          this.setState({
            StationList: response.data.trainRoutes,
          })
        } else {
          return (
            Alert.alert(
              'Alert!!',
              'No Stations to display!!',
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

        if (ConstantValues.searchString.length == 10) {
          ConstantValues.seat = response.data.seatInfo.berth
          ConstantValues.coach = response.data.seatInfo.coach
          ConstantValues.passengerInfo = response.data.passengerInfo
        } else {
          ConstantValues.seat = ''
          ConstantValues.coach = ''
        }
          this.setState({
            isVisible: false
          })
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

  gotoMenu = (stationId, outletId, stationName, stationCode,arrivalTime,haltTime, arrDate, arrival, outletName, outletRating, minimumOrderValue,cutOffTime,zoopCustomerDeliveryCharge,zoopCustomerDeliveryChargeGstRate,zoopCustomerDeliveryChargeGst,eta,openTime,closeTime,weeklyOff) => {
    const momemtHaltTime = moment(haltTime, 'HHmmss').format('mm')
      ConstantValues.stationId = stationId,
      ConstantValues.outletId = outletId,
      ConstantValues.stationName = stationName,
      ConstantValues.stationCode = stationCode
      ConstantValues.ata = arrivalTime
      ConstantValues.outletName = outletName,
      ConstantValues.haltTime = momemtHaltTime,
      ConstantValues.deliveryDate = (ConstantValues.searchString == 10 ? arrDate : this.state.date), //actual date of arraival
      ConstantValues.deliveryTime = (ConstantValues.searchString == 10 ? arrival : arrivalTime), //expected date of arraival
      ConstantValues.outletRating = outletRating,
      ConstantValues.minimumOrderValue = minimumOrderValue
      ConstantValues.cuttoff = cutOffTime
      ConstantValues.deliveryCharge = (zoopCustomerDeliveryCharge == null ? 0 : zoopCustomerDeliveryCharge)
      ConstantValues.deliveryChargegst = (zoopCustomerDeliveryChargeGst == null ? 0 : zoopCustomerDeliveryChargeGst)
      ConstantValues.deliveryChargegstRate = (zoopCustomerDeliveryChargeGstRate == null ? 0 : zoopCustomerDeliveryChargeGstRate)
      ConstantValues.eta = eta
      ConstantValues.openTime = openTime
      ConstantValues.closeTime = closeTime
      ConstantValues.weeklyOff = weeklyOff
      
    console.log('ConstantValues.stationId : ' + ConstantValues.stationId),
      console.log('ConstantValues.outletId : ' + ConstantValues.outletId),
      console.log('ConstantValues.haltTime : ' + ConstantValues.haltTime),
      console.log('ConstantValues.deliveryCharge : ' + ConstantValues.deliveryCharge + '\n' + 'ConstantValues.deliveryChargegst : ' + ConstantValues.deliveryChargegst + '\n' + 'ConstantValues.deliveryChargegstRate : ' + ConstantValues.deliveryChargegstRate )
      this.props.navigation.navigate('Menu')
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
    return (
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
        <View style={{ flex: 1 }}>
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
                          onValueChange={() => this.handleChange(index ,item.cuisineName)}
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
        </View>
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
                data={this.state.StationList}
                // data={this.state.data}
                horizontal={true}
                renderItem={({ item, index }) =>
                  <Fade visible={item.isVisible && item.outlets.length != 0}>
                    <View style={styles.stationView}>
                      {/* activeOpacity = {this.state.scrollBegin == true ? 1 : 0.5 } */}
                      <TouchableOpacity>
                        <Image style={styles.roundImage} source={item.stationImage == null ? require('../images/1.png') : { uri: item.stationImage }} />
                        <View style={styles.name}>
                          <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular', alignSelf: 'center' }}>{item.stationName}</Text>
                          <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular', alignSelf: 'center' }}>{moment(item.arrivalTime, 'HHmmss').format('hh:mm A')}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </Fade>
                }
                keyExtractor={(item) => item.stationId.toString()}
              />
            </ScrollView>
          </View>
        </View>
        {/* OutletView starts */}
        <ScrollView>
          <View style={styles.slide}>
            {/* Station Header */}
            {/* <StationHeader /> */}
            <FlatList
              data={this.state.StationList}
              // ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({ item, index }) =>
                <Fade visible={item.isVisible && item.outlets.length != 0}>
                  <View style={{ borderRadius: 5, borderColor: '#e7e7e7', borderWidth: 1, marginVertical: 10, marginHorizontal: 10 }}>
                    <Text style={styles.textheader}>{item.stationName}</Text>
                    <View style={styles.stextview}>
                      <Text style={styles.stext}>Halt : {moment(item.haltTime, 'HHmmss').format('mm')} mins | </Text>
                      <Text style={styles.stext}> S.T.A : {moment(item.arrivalTime, 'HHmmss').format('hh:mm A')} | </Text>
                      <Text style={styles.stext}> E.T.A : {moment(item.expectedTime, 'HHmmss').format('hh:mm A')}</Text>
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
                                  outlets.weeklyOff
                                )
                              }}>
                              <View style={styles.card}>
                                <Image source={{ uri: outlets.outletImage }} style={styles.outletimage} />
                                <View style={styles.detail}>
                                  <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center'}}>
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
                                
                                  {/* <View style={{flexDirection:'row'}}> */}
                                    <Text style={styles.cuisine}>
                                      {temp.slice(0,-2)} 
                                    </Text>
                                  {/* </View> */}
                                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                      <Text style={styles.minorder}>
                                      Min. Order : {ConstantValues.rupee} {outlets.minimumOrderValue}
                                    </Text>
                                    <View style={{flexDirection:'row',justifyContent:'flex-end',alignContent:'flex-end',paddingLeft:30}}>
                                    <Image source={{uri : ConstantValues.IconUrl + ConstantValues.imgurl.veg}} style={{width:15,height:15,alignSelf:'center'}}/>
                                   
                                    <Image source={{uri : ConstantValues.IconUrl + ConstantValues.imgurl.nonveg}} style={{width:15,height:15,alignSelf:'center',opacity:outlets.isPureVeg == 0 ? 1 : 0}}/>
                                    
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
                </Fade>
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
        <Overlay
          isVisible={this.state.isVisible}
          width="auto"
          height="auto"
          // windowBackgroundColor='rgba(255, 255, 255, .5)'
          // overlayBackgroundColor='#ffffff'
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <ZoopLoader isVisible={true} />

        </Overlay>
        {/* </Fade> */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  stationContainer: {
    margin: 5,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5
  },
  outletContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // backgroundColor: '#ffffff',
  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5
  },
  card: {
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    width: '96%', //can change as we move to various pages
    // borderColor: '#e4e4e4',
    // borderRadius: 100 / 9,
    // borderWidth: 1,
    // shadowOpacity: 0.4,
    // borderBottomColor: '#e4e4e4',
    // borderBottomWidth: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  fab: {
    flexDirection: 'row',
    position: 'absolute',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 100,
    elevation: 8
  },
  scroll: {
    height: 'auto',
    flexDirection: 'column'
    // marginLeft: 10,
  },
  name: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 5,
  },
  outletimage: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 100 / 4,
  },
  fabIcon: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
    fontSize: 15,
    color: 'white'
  },
  contentContainer: {
    paddingVertical: 25,
    justifyContent: 'space-around',
  },
  text: {
    alignItems: 'center',
    fontSize: 15,
    // justifyContent:'center'
  },
  detail: {
    width: Dimensions.get('screen').width - 100,
    height: 120,
    flexDirection: 'row'
  },
  outletname: {
    width: 130,
    paddingTop: 10,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    justifyContent: 'center',
  },
  roundImage: {
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
    marginLeft: 20,
    backgroundColor: '#ff5819'
  },
  ratingView: {
    backgroundColor: '#a5ce39',
    marginLeft: 20,
    marginTop: 5,
    width: 35,
    height: 20,   //#0e8341
    alignItems: 'center',
    borderRadius: 5
  },
  rating: {
    textAlign:'center',
    fontSize: 13,
    justifyContent: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff'
  },
  stationView: {
    width: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  cuisine: {
    width:150,
    // flexDirection:'row',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    marginLeft: 10
  },
  minorder: {
    fontFamily: 'Poppins-Light',
    color: '#b32120',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
  },
  modalViewHeading: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    paddingVertical: 5,
    width: Dimensions.get('screen').width
  },
  filterCard: {
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginVertical: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    width: 50,
    height: 50,
    borderColor: '#e4e4e4',
    borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'space-around'
    // flexDirection: 'row',
  },
  filterCardRow: {
    width: Dimensions.get('screen').width - 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  cuisineText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15, color: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  textheader: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    justifyContent: 'center',
  },
  stext: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#898c8b',
    alignItems: 'center'
  },
  stextview: {
    marginLeft: 20,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }

})
