import React, { Component } from 'react';
import { View,StyleSheet,Clipboard,Button,ScrollView,Image,TextInput } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { CustomButton } from '../assests/customButtonLarge';
import { Grid } from 'native-base';


export default class Search extends Component {
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
      <View style={styles.slide}>
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
    
    </View>

      
   
    );
  }
  
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems:'stretch',
    justifyContent:'flex-start',
    backgroundColor:'#ffffff',
   
  },
 main: {
    alignItems:'stretch',
    justifyContent:'center',
   
   
  },
  scroll:{
    height:150,
    marginLeft: 10,
  },
  image: {
    width:200,
    height:100,
    margin:10

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
