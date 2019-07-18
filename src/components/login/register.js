import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,TextInput,ToastAndroid} from 'react-native';
// import RNAccountKit from 'react-native-facebook-account-kit';
import { CustomButton } from '../assests/customButtonShort.js';
import SplashScreen from 'react-native-splash-screen';


export default class Register extends Component {
  componentDidMount() {
    SplashScreen.hide();
    
}
constructor(props) {
  super(props);
  this.state = {
    text:''
  };
}
  
entryMsg(){
  ToastAndroid.show('Congratulations!! Registeration Successfull',ToastAndroid.LONG)
}
  render() {
    
    return (
      
      <View style={styles.slide}>
        <Text style={styles.heading}> Register To Zoop </Text>
        <TextInput
        placeholder='Enter Name'
        keyboardType='default'
        onChangeText={text => this.setState({ text })}
        
        />
        <TextInput
        placeholder='Enter Email id'
        keyboardType='email-address'
        onChangeText={text => this.setState({ text })}
        />
        <TextInput
        placeholder='Enter Mobile No.'
        keyboardType='number-pad'
        onChangeText={text => this.setState({ text })}
        
        />
        <CustomButton
            title="Register"
            color="#1abc9c"
            onPress={()=>{
              this.entryMsg()
              this.props.navigation.navigate('Search')
            }}
            />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor:'#ffffff'
  },
  radioButton:{
    
    alignItems:'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  heading:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent:'center',
  }
})

