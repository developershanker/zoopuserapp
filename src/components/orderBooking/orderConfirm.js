import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Share } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import { CustomButton } from '../assests/customButtonLarge.js';
import ConstantValues from '../constantValues.js';

export default class OrderConfirm extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Order Detail from Zoop: \n Order Id:'+ConstantValues.irctcId,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };




  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ justifyContent: 'flex-start', paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
              <IconA style={{ margin: 20 }} name={'arrowleft'} size={25} color={Colors.black} />
              </TouchableOpacity>
            </View>
            {/* header view ends */}
            <View style={styles.contentView}>
              <View style={styles.imageView}>
                <Image style={styles.image} source={require('../images/placed.png')} />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' ,flexDirection:'column',paddingVertical:5}}>
                <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Medium' }}>Your Order has been placed successfully</Text>
                <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Medium' }}>Zoop Order Id : {ConstantValues.zoopOrderId}</Text>
                <Text style={{ fontSize: 20, color: '#FF3D00', fontFamily: 'Poppins-Medium' }}>Enjoy the meal :)</Text>
              </View>
              {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { this.onShare() }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={'share-alt'} size={30} color={'#000'} />
                    <Text style={{ fontSize: 15, color: '#000000', fontFamily: 'Poppins-Medium', paddingVertical: 10 }}>Share Details</Text>
                  </View>
                </TouchableOpacity>
              </View> */}
              <CustomButton
                style={{ backgroundColor: '#60b246', alignSelf: 'center', marginBottom: 20, }}
                onPress={()=>{this.props.navigation.navigate('OrderDetail')}}
                title='View Details'
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
    alignContent: 'space-between'

  },
  image: {
    width: 100,
    height: 100,

  },
  contentView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 200,
    justifyContent: 'space-around'
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',

  }
});