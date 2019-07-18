import React, { Component } from 'react';
import { View,StyleSheet,Clipboard,Button,ScrollView,Image,TextInput,TouchableOpacity} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RadioButton, Text } from 'react-native-paper';
import { CustomButton } from '../assests/customButtonLarge';
import {CustomGridIcon} from '../assests/customGridIcon';

export default class Search extends Component {
  componentDidMount() {
    SplashScreen.hide();
}
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      value:'Enter PNR',
      placeholder:''
      
    };
  }
 
  render() {
      
    return (
      <View style={styles.slide} >
        {/* <DrawerNavigation/> */}
        <View>
        <Image style={styles.img} source={require('../images/r.jpg')}/>
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
           />
           <Text>Train No.</Text>
        </View>
        </RadioButton.Group>
        <View style={styles.input}> 
      
      </View>
      <View style={styles.main}>
      <TextInput
      placeholder={this.state.value}
       keyboardType='number-pad'
       maxLength={10}
      onValueChange={placeholder=>this.setState({placeholder})}
       onChangeText={text => this.setState({ text })}
       
      />
      <CustomButton
    onPress={()=>this.props.navigation.navigate('Station')}
    title='SEARCH'
    />
    </View>
    <CustomGridIcon
    />
    
    <View style={styles.scroll}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        contentContainerStyle={styles.contentContainer}
        >
          <Image style={styles.image} source={require('../images/promo.png')}/>
          <Image style={styles.image} source={require('../images/promo1.png')}/>
          <Image style={styles.image} source={require('../images/promo4.jpg')}/>
          <Image style={styles.image} source={require('../images/promo5.png')}/>
          <Image style={styles.image} source={require('../images/promo1.png')}/>
        </ScrollView>
        </View>
    </View>
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
    width:400,
    height:150,
  },
  image: {
    width:200,
    height:100,
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
    width:200,
    color:'#000000'
  },
  heading:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
})
