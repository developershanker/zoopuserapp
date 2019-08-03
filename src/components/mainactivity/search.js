import React, { Component } from 'react';
import { View,Dimensions,StyleSheet,Clipboard,Button,ScrollView,Image,TextInput,TouchableOpacity} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RadioButton, Text } from 'react-native-paper';
import { CustomButton } from '../assests/customButtonLarge';
import {CustomGridIcon} from '../assests/customGridIcon';
import { SafeAreaView } from 'react-navigation';
import searchApi from './searchApi';

export default class Search extends Component {
  componentDidMount() {
    SplashScreen.hide();
}
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      value:'Enter PNR',
      placeholder:'',
      email:''
    };
  }

  async showTrain(){
    try {
      let response = await searchApi.showTrain();
      console.log('data received in search.js : '+ JSON.stringify(response))
    } catch (error) {
      console.log( 'Data received in search.js catch: '+ error)
    }

  }
 
  render() {
      
    return (
      <SafeAreaView>
      <ScrollView>
      <View style={styles.slide} >

        <View>
        <Image style={styles.image} source={require('../images/ad.png')}/>
        </View>
       
      <RadioButton.Group
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
      >
        <View style={styles.radioButton}>
          
          <RadioButton 
          value="Enter PNR" 
          color='#000000'
          />
          <Text style={styles.text}>PNR</Text>
         
          
          <RadioButton 
          value="Enter Train No."  
          color='#000000' 
          // onPress={this.showTrain()}     
           />
           <Text>Train No.</Text>
        </View>
        </RadioButton.Group>
        <View style={styles.input}> 
      
      </View>
      <View style={styles.main}>
      <TextInput
      style={styles.input}
      placeholder={this.state.value}
       keyboardType='number-pad'
       maxLength={10}
       underlineColorAndroid='#000000'
      onValueChange={placeholder=>this.setState({placeholder})}
       onChangeText={text => this.setState({ text })}
       
      />
      <CustomButton
    onPress={()=>{
      // this.showTrain(),
      this.props.navigation.navigate('Station')}}
    title='SEARCH'
    
    />
    </View>
    {/* <CustomTextInput
    placeholder="test@gmail.com"
    label="Email"
    mode='outlined'
    value={this.state.email}
    onChangeText={email => this.setState({ email })}
    /> */}
    <CustomGridIcon
    />
    
    <View style={styles.scroll}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        contentContainerStyle={styles.contentContainer}
        >
          <Image style={styles.img} source={require('../images/promo.png')}/>
          <Image style={styles.img} source={require('../images/promo1.png')}/>
          <Image style={styles.img} source={require('../images/promo4.jpg')}/>
          <Image style={styles.img} source={require('../images/promo5.png')}/>
          <Image style={styles.img} source={require('../images/promo1.png')}/>
        </ScrollView>
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
    alignItems:'stretch',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    flexDirection:'column',

  },
 main: {
  
    alignItems:'center',
    justifyContent:'center',
   
  },
  scroll:{
    alignItems:'stretch',
    justifyContent:'center',
    marginLeft: 10,
    marginBottom:10
  },
  img:{
    width:Dimensions.get('window').width - 120,
    height:150,
    marginLeft:5
  },
  image: {
    width:Dimensions.get('window').width,
    height:150,
    marginLeft:5

  },
  contentContainer:{
    paddingVertical: 25,
    justifyContent: 'space-around',
  },  
  radioButton:{
    alignItems:'center',
    flexDirection: 'row',
    alignContent: 'center',   
    marginLeft:25 // justifyContent: 'space-between',
  },
  text:{
    fontFamily:'monospace',
  },
  input:{
    fontSize:20,
    color:'#000000',
    width:Dimensions.get('window').width - 50,
  },
  heading:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
})
