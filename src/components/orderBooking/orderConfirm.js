import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomButton } from '../assests/customButtonLarge.js';

export default class OrderConfirm extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <ScrollView>
          <View>
            {/* header view */}
            <View style={{ justifyContent: 'flex-start', paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
            </View>
            {/* header view ends */}
            <View style={ styles.contentView}>
              <View style={styles.imageView}>
                <Image style={styles.image} source={require('../images/placed.png')} />
              </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:15,color:'#000000',fontFamily:'Poppins-Bold'}}>Your Order has been placed successfully</Text>
                <Text style={{fontSize:20,color:'#FF3D00',fontFamily:'Poppins-Bold'}}>Enjoy the meal :)</Text>
              </View>
              <CustomButton
                style={{ backgroundColor: '#1fc44e', alignSelf: 'center', marginBottom: 20, }}
                onPress={() => this.props.navigation.navigate('TrackingOrder')}
                title='Track Your Order'
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
    height: Dimensions.get('screen').height-200,
    justifyContent:'space-around'
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',

  }
});