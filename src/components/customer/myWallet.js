import React, { Component } from 'react';
import { View, CheckBox, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButton } from '../assests/customButtonLarge.js';
import { Fade } from '../assests/fade.js';

export default class myWallet extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const walletBalance = ConstantValues.walletBalance
    return (
      <SafeAreaView>
        <ScrollView style={styles.slide}>
          <View>
            {/* header view */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000000' }}> My Wallet Statement </Text>
              </View>
            </View>
            {/* header view ends */}
            <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10 }}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>ZOOP WALLET : </Text>
              <Text style={{ color: '#00c74f', fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>{ConstantValues.rupee} {walletBalance}</Text>
            </View>

            <View style={{flexDirection:'row' , height:50 ,  backgroundColor:'#e4e4e4',justifyContent:'space-around', alignItems:'center',alignContent:'center'}}>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>Date</Text>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>Particular</Text>
              <Text style={{ color: '#000000', fontFamily: 'Poppins-SemiBold', fontSize: 12 }}>Amount</Text>
            </View>
            {/* Wallet summary Card  */}
            

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    width: Dimensions.get('window').width,
  },
  card:{

  }
})