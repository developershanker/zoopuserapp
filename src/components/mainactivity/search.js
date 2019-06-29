import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,Clipboard,Button } from 'react-native';
import {RadioButton} from 'native-base';


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      value:'Enter PNR'|'Enter Train no.',
      status:'',
      placeholder:'',

      
    };
  }
  render() {
      
    return (
      
      <View style={styles.slide}>
        <Text style={styles.heading}>Kindly provide the details</Text>
      <RadioButton.Group
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
        onValueChange={placeholder=>this.setState({ placeholder })}
        
        
           
      >
        <View style={styles.radioButton}>
          <Text>PNR</Text>
          <RadioButton
          value="Enter PNR"
            />

          <Text>Train No.</Text>
          <RadioButton 
          value="Enter Train no."
           />
        </View>
        
      </RadioButton.Group>
      <TextInput
       
       placeholder={this.state.placeholder}
      //  value={this.state.placeholder}
       keyboardType='number-pad'
       maxLength={10}
       onChangeText={text => this.setState({ text })}
       
      />
      
    <Button
    onPress={()=>this.props.navigation.navigate('Station')}
    >
      Submit
    </Button>
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
  }
})
