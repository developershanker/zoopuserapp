import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, FlatList, Dimensions, Switch, Image, SectionList, ToastAndroid, ScrollView, Button, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import CardView from 'react-native-rn-cardview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomMenuFAB from '../assests/customMenuFAB.js';
import { Fade } from '../assests/fade.js';

export default class TrackingOrder extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      updateValue: 0,
      status: [
        { key: "1", status: 'Booked', value: 0 },
        { key: "2", status: 'Verified', value: 1 },
        { key: "3", status: 'Prepared', value: 2 },
        { key: "4", status: 'Delivery', value: 3 },
      ]
    };
  }
  updateStatus(value) {
    this.setState({ updateValue: value + 1 })
  }

  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', paddingTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000000' }}> ORDER ID </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000000' }}> 242559 </Text>
              </View>
              <TouchableOpacity>
                <View style={styles.call}>
                  <Icon name={'phone'} color={'#16a8b5'} size={15} />
                  <Text style={{ fontWeight: 'bold', color: '#16a8b5' }}>Resturent</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.call}>
                  <Icon name={'phone'} color={'#16a8b5'} size={15} />
                  <Text style={{ fontWeight: 'bold', color: '#16a8b5' }}>Delivery Boy</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* header view ends */}
            <View style={styles.statusView}>
              <Text style={{ fontWeight: 'bold', color: '#000000' }}>Status</Text>
              <FlatList
                contentContainerStyle={styles.status}
                horizontal={true}
                data={this.state.status}
                renderItem={({ item }) =>
                  <View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 }}>
                    <Icon name={'check-square'} size={20} color={item.value == this.state.updateValue ? '#16b538' : '#abb8ad'} />
                    <Text>{item.status}</Text>
                  </View>
                }

              />
              {/* Summary Time time ends here */}
              {/* Expanded Order summary starts */}
              {/* Expanded Order summary ends */}


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
  call: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
    width: 110,
    borderColor: '#16a8b5',
    borderRadius: 100 / 6,
    borderWidth: 2
  },
  statusView: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10
  }
});