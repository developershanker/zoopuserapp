import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,TextInput} from 'react-native';
import RNAccountKit from 'react-native-facebook-account-kit';
import SplashScreen from 'react-native-splash-screen';


export default class Register extends Component {
  componentDidMount() {
    SplashScreen.hide();
    RNAccountKit.getCurrentAccount()
     .then((account)=>{
       if(!account){
         console.log('Unable to get account')
       }
       else{
         console.log(`Logged in.Account: ${JSON.stringify(account)}`)
         console.log(account)
         AsyncStorage.setItem('akaccount',JSON.stringify(account))
       }
     })
}
constructor(props) {
  super(props);
  this.state = {
    text:''
  };
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
        <Button
            title="Login Here"
            color="#1abc9c"
            onPress={()=>this.props.navigation.navigate('Search')}
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

