import React, { Component } from 'react';
import { Text, Dimensions, View, ScrollView, Image, StyleSheet, ToastAndroid, TouchableOpacity, FlatList, TextInput, CheckBox, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { StationHeader } from './stationHeader.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import { CustomButton } from '../assests/customButtonShort.js';
import Search from './search.js';
import searchApi from './searchApi.js';

export default class station extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: '',
      visibleModal: null,
      animating: true,
      ListItems: [
        { key: "1", name: "MOTI MAHAL RESTURENT", rating: "4.5", cuisine: "North Indian,Chinese", minorder: "150" },
        { key: "2", name: "MOTI MAHAL RESTURENT", rating: "4.5", cuisine: "North Indian,Chinese", minorder: "150" },
        { key: "3", name: "MOTI MAHAL RESTURENT", rating: "4.5", cuisine: "North Indian,Chinese", minorder: "150" },
        { key: "4", name: "MOTI MAHAL RESTURENT", rating: "4.5", cuisine: "North Indian,Chinese", minorder: "150" },
        { key: "5", name: "MOTI MAHAL RESTURENT", rating: "4.5", cuisine: "North Indian,Chinese", minorder: "150" },
        { key: "6", name: "MOTI MAHAL RESTURENT", rating: "4.5", cuisine: "North Indian,Chinese", minorder: "150" },
      ],
      StationList: [
        { key: "1", stationName: "New Delhi", arrTime: "12:50", image: require('../images/1.png') },
        { key: "2", stationName: "New Delhi", arrTime: "12:50", image: require('../images/2.png') },
        { key: "3", stationName: "New Delhi", arrTime: "12:50", image: require('../images/3.png') },
        { key: "4", stationName: "New Delhi", arrTime: "12:50", image: require('../images/4.png') },
        { key: "5", stationName: "New Delhi", arrTime: "12:50", image: require('../images/5.png') },
        { key: "6", stationName: "New Delhi", arrTime: "12:50", image: require('../images/6.png') },
        { key: "7", stationName: "New Delhi", arrTime: "12:50", image: require('../images/1.png') }
      ],
      CuisinesList: [
        { key: "1", CuisineName: "South Indian", },
        { key: "2", CuisineName: "Chinese", },
        { key: "3", CuisineName: "Mughlai", },
        { key: "4", CuisineName: "Punjabi", },
      ],
      checked: []
    };
  }


  handleChange = (index) => {
    let checked = [...this.state.checked];
    checked[index] = !checked[index];
    this.setState({ checked });
  }

  async showCuisines() {
    try {
      let response = await searchApi.showCuisines();

      if (response.status == true) {
        console.log('The status is: ' + response.status)
        response.data.forEach(element => {
          const cuisineList = element.cuisineName;
          return (
            console.log('The Cuisine name is: ' + cuisineList)
          )

        });
        // ToastAndroid.show(response.message, ToastAndroid.LONG)  
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

  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <View style={styles.topContainer}>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
              <Icon style={{ margin: 15 }} name={'chevron-left'} size={20} color={'#000000'} />
            </TouchableOpacity>
          </View>
          {/* Searchbar begins */}
          <View style={styles.searchBarView}>
            <TextInput
              style={{ fontSize: 15, fontFamily: 'Poppins-Regular', width: '80%' }}
              placeholder="What would you like to have today?"
              onChangeText={firstQuery => this.setState({ firstQuery })}
              value={this.state.firstQuery}
            />
            <TouchableOpacity onPress={() => { alert(this.state.firstQuery) }}>
              <Icon name={'search'} size={20} />
            </TouchableOpacity>
          </View>
          {/* Searchbar ends */}
        </View>
        {/* FilterModal begins */}
        <View style={{ flex: 1 }}>
          <Modal
            isVisible={this.state.visibleModal === 'bottom'}
            onSwipeComplete={() => this.setState({ visibleModal: null })}
            swipeDirection={['left', 'right',]}
            style={styles.bottomModal}
          >
            <View style={styles.modalView}>
              <View style={styles.modalViewHeading}>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000000' }}>Filter</Text>
              </View>
              <View style={styles.filterCardRow}>
                {/* box and title */}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <View style={styles.filterCard}>
                      <Icon name={'star'} size={25} color={'#ffcc12'} />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#000' }}>Ratings</Text>
                </View>

                {/* box and title */}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <View style={styles.filterCard}>
                      <Icon name={'percent'} size={25} color={'#000'} />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#000' }}>Discount</Text>
                </View>

                {/* box and title */}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <View style={styles.filterCard}>
                      <Icon name={'rupee'} size={25} color={'#6ea83e'} />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#000' }}>High Cost</Text>
                </View>

                {/* box and title */}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <View style={styles.filterCard}>
                      <Icon name={'rupee'} size={25} color={'#fe0006'} />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#000' }}>Low Cost</Text>
                </View>

                {/* box and title */}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <View style={styles.filterCard}>
                      <Icon name={'clock-o'} size={25} color={'#000'} />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#000' }}>Time</Text>
                </View>

                {/* box and title */}
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <View style={styles.filterCard}>
                      <Icons name={'carrot'} size={25} color={'#6ea83e'} />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#000' }}>Veg.</Text>
                </View>


              </View>
              <View>
                <Text style={styles.cuisineText}>Cuisines</Text>
              </View>
              <ScrollView>
                <FlatList
                  data={this.state.CuisinesList}
                  extraData={this.state}
                  renderItem={({ item, index }) =>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <CheckBox
                        value={this.state.checked[index]}
                        disabled={false}
                        onValueChange={() => this.handleChange(index)}
                      />
                      <Text style={{ color: '#000000', fontSize: 15, fontFamily: 'Poppins-Bold' }}>{item.CuisineName}</Text>
                    </View>
                  }
                // keyExtractor={(item)=>item.cuisineId}
                />
              </ScrollView>
              <CustomButton
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
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={true}
              contentContainerStyle={styles.contentContainer}>
              <FlatList
                data={this.state.StationList}
                horizontal={true}
                renderItem={({ item }) =>
                  <View>
                    <TouchableOpacity>
                      <Image style={styles.roundImage} source={item.image} />
                      <View style={styles.name}>
                        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular' }}>{item.stationName}</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'Poppins-Regular', }}>{item.arrTime}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }
              />
            </ScrollView>
          </View>
        </View>

        {/* OutletView starts */}
        <ScrollView>
          <View style={styles.slide}>
            {/* Station Header */}
            <StationHeader />
            <FlatList
              data={this.state.ListItems}
              renderItem={({ item }) =>
                <View style={styles.outletContainer}>
                  <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('Menu')}>
                    <Image source={require('../images/roundimg3.jpg')} style={styles.outletimage} />
                    <View style={styles.detail}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.outletname}>
                          {item.name}
                        </Text>
                        <View style={styles.ratingView}>
                          <Text style={styles.rating}>
                            {item.rating}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.cuisine}>
                        {item.cuisine}
                      </Text>

                      {/* <Text>
            Order before "date" and "time"
          </Text> */}
                      <Text style={styles.minorder}>
                        Minimum Order: Rs. {item.minorder}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>}

            />
          </View>

        </ScrollView>
        {/* Floating FAB starts */}
        <View>
          <TouchableOpacity style={styles.fab} onPress={() => { this.setState({ visibleModal: 'bottom' }) }} >
            <Icon name={'filter'} size={20} color={'#ffffff'} />
            <Text style={styles.fabIcon}>Filter</Text>
          </TouchableOpacity>
        </View>
        {/* Floating FAB ends */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f0f0',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  stationContainer: {
    margin: 5,
    alignItems: 'stretch',
    justifyContent: 'center',
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
    backgroundColor: '#ffffff',
  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    borderRadius: 100 / 20,
    borderWidth: 1,
    borderColor: '#9B9B9B',
    marginHorizontal: 5
  },
  card: {
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
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
    margin: 5
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
    fontFamily: 'Poppins-Bold',
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
  },
  outletname: {
    paddingTop: 10,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    justifyContent: 'center',
  },
  roundImage: {
    width: 75,
    height: 75,
    borderRadius: 100 / 2,
    marginLeft: 10,
    backgroundColor: '#f2c744'
  },
  ratingView: {
    backgroundColor: '#30ba57',
    marginLeft: 20,
    marginTop: 5,
    width: 35,
    height: 25,
    alignItems: 'center',
  },
  rating: {
    fontSize: 15,
    justifyContent: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#ffffff'
  },
  cuisine: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 10
  },
  minorder: {
    fontFamily: 'Poppins-Regular',
    color: '#eb2f2f',
    marginLeft: 10,
    marginTop: 20,
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
    fontFamily: 'Poppins-Bold',
    fontSize: 15, color: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 10
  },

})
