import React, { Component } from 'react';
import { View,StyleSheet,TextInput,Clipboard,Button,ScrollView,Image } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { CustomButton } from '../assests/customButton';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      value:'first',
      
    };
  }
  onTrain(){
    
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
          <Image style={styles.image} source={require('../images/promo3.png')}/>
          <Image style={styles.image} source={require('../images/promo5.png')}/>
          <Image style={styles.image} source={require('../images/promo4.jpg')}/>
        </ScrollView>
        </View>
        <Text>Kindly provide the details</Text>
      <RadioButton.Group
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
        
      >
        <View style={styles.radioButton}>
          <Text>PNR</Text>
          <RadioButton 
          value="first" 
          />
       
          <Text>Train No.</Text>
          <RadioButton 
          value="second"        
           />
        </View>
        </RadioButton.Group>
        <View style={styles.radioButton}>
        
     <TextInput
       keyboardType='number-pad'
       maxLength={10}
      onValueChange={placeholder=>this.setState({placeholder})}
       onChangeText={text => this.setState({ text })}
       
      />
      
    <CustomButton
    onPress={()=>this.props.navigation.navigate('Station')}
    title='Submit'
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
  scroll:{
    height:150,
    marginLeft: 10,
  },
  image: {
    width:180,
    height:100,
    marginLeft: 10,
  },
  contentContainer:{
    paddingVertical: 25,
    justifyContent: 'space-around',
  },  
  radioButton:{
    alignItems:'center',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  heading:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
})
