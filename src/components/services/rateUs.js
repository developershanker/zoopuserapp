import React, { Component } from 'react';
import { View, Text , Linking,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';
import Modal from 'react-native-modal';
import { CustomButtonShort } from '../assests/customButtonShort';



export default class rateUs extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.appearDialog()
  
}
  constructor(props) {
    super(props);
    this.state = {
      showVersionUpdateModal : 'center'
    };
  }


  gotoLink = () => {
    let link = 'https://play.google.com/store/apps/details?id=com.zoop.zoopindiaservice'
    Linking.openURL(link);
  }
  appearDialog(){
    this.setState({showVersionUpdateModal : 'center'})
  }
  dismiss(){
    this.setState({showVersionUpdateModal : null})
    this.props.navigation.navigate('Search')
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Modal
                    isVisible={this.state.showVersionUpdateModal === 'center'}
                    // onBackButtonPress={() => this.setState({ visibleModal: null })}
                    // onSwipeComplete={() => this.setState({ visibleModal: null })}
                    // swipeDirection={['left', 'right', 'down']}
                    style={styles.centerModal}
                   >
                       <View style={styles.modalView}>
                            <Text style={{fontSize: 20,color:'#F15926',fontFamily: 'Poppins-Medium'}}>Enjoying Zoop?</Text>
                            <Text style={{fontSize: 15,color:'#696b6a',fontFamily: 'Poppins-Regular',textAlign:'center',alignSelf:'center'}}>Please rate us if you like our services it will help us to serve better.</Text>
                            <View style={{flexDirection:'row',paddingHorizontal:10}}>
                               <CustomButtonShort
                               style={{backgroundColor:'#60b246'}}
                               title='Rate Us'
                                onPress={() => this.gotoLink()}
                               />
                               <CustomButtonShort
                               style={{backgroundColor:'#696b6a'}}
                               title='Not Now'
                               onPress = {() => this.dismiss()}
                               />
                            </View>
                       </View>
                   </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
},
  text:{
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  centerModal:{
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
    // margin: 0,
},
modalView: {
    width: Dimensions.get('screen').width - 20,
    height:200,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    
  }
})