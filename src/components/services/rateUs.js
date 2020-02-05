import React, { Component } from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet, Dimensions, Image,BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';
import IconA from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { CustomButtonShort } from '../assests/customButtonShort';
import Colors from '../colors';



export default class rateUs extends Component {
  componentDidMount() {
    SplashScreen.hide();
    // this.appearDialog()

  }
  constructor(props) {
    super(props);
    this.state = {
      showVersionUpdateModal: 'center'
    };
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    console.log('I am back on RateUs.js')
    // this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
    this.props.navigation.navigate('Search')
    return true;
  };


  gotoLink = () => {
    let link = 'https://play.google.com/store/apps/details?id=com.zoop.zoopindiaservice'
    Linking.openURL(link);
  }
  // appearDialog() {
  //   this.setState({ showVersionUpdateModal: 'center' })
  // }
  dismiss() {
    // this.setState({ showVersionUpdateModal: null })
    this.props.navigation.navigate('Search')
  }
  backHandler() {
    // this.setState({ showVersionUpdateModal: null })
    this.props.navigation.navigate('Search')
  }

  render() {
    return (
      <View style={styles.slide}>
        {/* header view */}
        <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                {/* <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} /> */}
                <IconA style={{ margin: 20 }} name={'arrowleft'} size={25} color={Colors.black} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> Rate Us </Text>
              </View>
            </View>
            {/* header view ends */}
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}> */}
          {/* <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} /> */}
          {/* <IconA style={{ margin: 20 }} name={'arrowleft'} size={25} color={Colors.black} />
        </TouchableOpacity> */}
        <View style={{ width: ConstantValues.deviceWidth, height: '20%',opacity:0.7, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.zooporange }}
            style={{ width: '80%', height: '100%' }}
          />
        </View>
        <View style={{justifyContent:'center'}}>
          <Text style={{ fontSize: 18, color: Colors.newOrange, fontFamily: 'Poppins-Medium', textAlign: 'center' }}>Enjoying Zoop?</Text>
          <Text style={{ fontSize: 14, color: '#696b6a', fontFamily: 'Poppins-Regular', textAlign: 'center', alignSelf: 'center' }}>Please rate us if you like our services it will help us to serve better.</Text>
          <View style={{ flexDirection: 'row',justifyContent:'center' }}>
            <CustomButtonShort
              style={{ backgroundColor: Colors.darkGrey1 }}
              title='NOT NOW'
              onPress={() => this.dismiss()}
            />
            <CustomButtonShort
              style={{ backgroundColor: Colors.newgGreen3 }}
              title='RATE US'
              onPress={() => this.gotoLink()}
            />
          </View>
        </View>
        {/* <Modal
          isVisible={this.state.showVersionUpdateModal === 'center'}
          onBackButtonPress={() => this.backHandler()}
          // onSwipeComplete={() => this.setState({ visibleModal: null })}
          // swipeDirection={['left', 'right', 'down']}
          style={styles.centerModal}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, color: '#F15926', fontFamily: 'Poppins-Medium' }}>Enjoying Zoop?</Text>
            <Text style={{ fontSize: 15, color: '#696b6a', fontFamily: 'Poppins-Regular', textAlign: 'center', alignSelf: 'center' }}>Please rate us if you like our services it will help us to serve better.</Text>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
              <CustomButtonShort
                style={{ backgroundColor: Colors.newOrange }}
                title='Rate Us'
                onPress={() => this.gotoLink()}
              />
              <CustomButtonShort
                style={{ backgroundColor: '#696b6a' }}
                title='Not Now'
                onPress={() => this.dismiss()}
              />
            </View>
          </View>
        </Modal> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  centerModal: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    // margin: 0,
  },
  modalView: {
    width: Dimensions.get('screen').width - 20,
    height: 200,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,

  }
})