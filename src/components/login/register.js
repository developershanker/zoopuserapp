import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,TextInput,ToastAndroid} from 'react-native';
// import RNAccountKit from 'react-native-facebook-account-kit';
import { CustomButton } from '../assests/customButtonShort.js';
import CustomTouchableOpacity from '../assests/customTouchableOpacity';
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues.js';
import LoginApi from '../login/loginApi.js';


export default class Register extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      referralCode:'',
      altmobile:''
    };
  }
  ///checking Input Validation
  async isEmpty(name,email,referralCode){
    try {
      if (name!=''){
          if(email!=''){
            this.onRegister(name,email,referralCode)
          }else{
            ToastAndroid.show('Please Enter Email Id',ToastAndroid.LONG)
          }
      }else{
        ToastAndroid.show('Please Enter Name',ToastAndroid.LONG)
      }
    } catch (error) {
      console.log( 'Data received in register.js catch: '+ error)
    }
  }

  //getting User register
  async onRegister()  {
    try {
      let response = await LoginApi.getUserRegister();
      console.log('data received in register.js : '+ JSON.stringify(response))

      ToastAndroid.show('Congratulations!! Registeration Successfull',ToastAndroid.LONG)
      this.props.navigation.navigate('Search')
      
    } catch (error) {
      console.log( 'Data received in register.js catch: '+ error)
    }
 }

  render() {
    const { navigation } = this.props;
    const mobile = navigation.getParam('mobile','');
    
    return (      
      <View style={styles.slide}>
        <Text style={styles.heading}> My Profile </Text>
        <TextInput style={styles.input}
        placeholder='Full Name'
        keyboardType='default'
        onChangeText={name => this.setState({ name})}
        underlineColorAndroid='#000000'
        autoCapitalize="words"
        />
        <TextInput style={styles.input}
        placeholder='Email id'
        keyboardType='email-address'
        onChangeText={email => this.setState({ email })}
        underlineColorAndroid='#000000'
        />
        <TextInput style={styles.input}
        placeholder='Alternate Mobile No.'
        keyboardType='number-pad'
        onChangeText={altmobile => this.setState({ altmobile})}
        underlineColorAndroid='#000000'
        />
        <TextInput style={styles.input}
        placeholder='Referral Code (if any)'
        keyboardType='default'
        onChangeText={referralCode => this.setState({ referralCode })}
        underlineColorAndroid='#000000'
        />
        <CustomButton
            title="Register"
            color="#1abc9c"
            onPress={()=>{
              this.isEmpty(this.state.name,this.state.email,this.state.referralCode)
              // this.props.navigation.navigate('Search')
            }}
            />
            <CustomTouchableOpacity
            text="Skip >>"
            color="#1abc9c"
            onPress={()=>{
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
    alignItems:'center',
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
    fontSize: 30,
    marginBottom:10,
    justifyContent:'center',
  },
  input:{
    width:'80%',
    marginBottom:5,
    fontSize:20
  }
})

