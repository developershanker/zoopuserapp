import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'

export default class notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notificationData: [
        { id: "1", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
        { id: "2", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
        { id: "3", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
        { id: "4", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
        { id: "5", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
        { id: "6", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
        { id: "7", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
        { id: "8", name: 'car', description: 'Your Order is picked up from the resturent.Please be on your seat for better service', date: '03/08/2019', time: '15:25' },
      ]
    };
  }
  componentDidMount() {
    SplashScreen.hide();
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
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 25, color: '#000000' }}> Notifications </Text>
              </View>
            </View>
            {/* header view ends */}
            {/* Notification Card Starts */}
            <View>
              <FlatList
                data={this.state.notificationData}
                renderItem={({ item }) =>
                  <View>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Search') }}>
                      <View
                        style={styles.card}
                      >
                        <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', alignContent: 'stretch', alignItems: 'center' }}>
                            <Icon name={item.name} size={20} color={'#fc0808'} />
                            <Text style={styles.notiText}>{item.description}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', }}>
                            <Text>{item.date}</Text>
                            <Text>{item.time}</Text>
                          </View>
                        </View>


                      </View>
                    </TouchableOpacity>
                  </View>
                }
                keyExtractor={item => item.id}
              />
            </View>

          </View>
        </ScrollView>
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
  card: {
    width: Dimensions.get('window').width - 5,
    borderRadius: 100 / 4,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    // marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    // borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
  },
  notiText: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
})