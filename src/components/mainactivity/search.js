import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Button, ScrollView, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RadioButton, Text } from 'react-native-paper';
import { CustomButton } from '../assests/customButtonLarge';
import { CustomGridIcon } from '../assests/customGridIcon';
import { SafeAreaView } from 'react-navigation';
import searchApi from './searchApi';
import DeliveryMark from '../postOrderActivity/deliveryMark';
import ConstantValues from '../constantValues';
import { Fade } from '../assests/fade';
// import  Autocomplete  from 'react-native-autocomplete-input';
import { InputAutoSuggest } from 'react-native-autocomplete-search';



export default class Search extends Component {
  componentDidMount() {
    SplashScreen.hide();
    // this.showTrain()
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: 'Enter PNR',
      placeholder: '',
      email: '',
      query: '',
      trains:[],
    };
  }

  findTrain(query) {
    if (query === '') {
      return [];
    }
  }

  trainList = (value) => {
    if (value == 'Enter PNR') {
      return (
        <View style={styles.inputView}>
          <TextInput
            // ref={component => this._textInput = component}
            style={styles.input}
            placeholder={this.state.value}
            keyboardType='number-pad'
            maxLength={10}
            onValueChange={placeholder => this.setState({ placeholder })}
            onChangeText={text => this.setState({ text })}
          />
        </View>
      )
    } else {
      const { query } = this.state;
      const trains = this.findTrain(query);
      return(
      <View style={styles.inputView}>
        <TextInput
          // ref={component => this._textInput = component}
          style={styles.input}
          placeholder={this.state.value}
          keyboardType='number-pad'
          maxLength={10}
          onValueChange={placeholder => this.setState({ placeholder })}
          onChangeText={text => this.setState({ text })}
        />
      </View>
      )
    }
  }

  async showTrain() {
    try {
      let response = await searchApi.showTrain();
      // console.log('data received in search.js : ' + JSON.stringify(response))
      if (response.status == true) {
          console.log('data : ' + JSON.stringify(response.data))
          this.setState({ 
            trains : response.data
          })
        // return (
        //   ToastAndroid.show(response.message, ToastAndroid.LONG)
        // )
      } else {
        return (
          ToastAndroid.show(response.error, ToastAndroid.LONG),
          console.log(response.error)
        )
      }
    } catch (error) {
      console.log('Data received in search.js catch: ' + error)
    }

  }

  searchBy(text) {
    ConstantValues.searchString = text,
      console.log('ConstantValues.searchString is ....' + ConstantValues.searchString)
      this.props.navigation.navigate('Station')
  }
  //   try {
  //     let response = await searchApi.searchBy(text);
  //     // console.log('data received in search.js : ' + JSON.stringify(response))
  //     if (response.status == true) {
  //       return (
  //         ConstantValues.searchResponse = response,
  //         ConstantValues.searchString = text,
  //         // console.log('ConstantValues.searchResponse is ....'+ConstantValues.searchResponse),
  //         console.log('The searchString is: ' + ConstantValues.searchString),
  //         // console.log('The train name is: ' + response.data.trainDetails.trainName),
  //         ToastAndroid.show(response.message, ToastAndroid.LONG),
  //         this.props.navigation.navigate('Station')
  //       )
  //     } else {
  //       return (
  //         ToastAndroid.show(response.error, ToastAndroid.LONG),
  //         console.log(response.error)
  //       )
  //     }
  //   } catch (error) {
  //     console.log('Data received in search.js catch: ' + error)
  //   }
  // }

  render() {

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.slide} >

            <View>
              <Image style={styles.image} source={require('../images/ad.png')} />
            </View>
            <Text style={{ fontFamily: 'Poppins-Bold', paddingHorizontal: 10, paddingVertical: 10 }}>Search By</Text>
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
                <Text style={styles.text}>Train No.</Text>
              </View>
            </RadioButton.Group>
            <View style={styles.input}>

            </View>
            <View style={styles.main}>
              {this.trainList(this.state.value)}
              {/* <View style={styles.inputView}>
                {
                <TextInput
                  // ref={component => this._textInput = component}
                  style={styles.input}
                  placeholder={this.state.value}
                  keyboardType='number-pad'
                  maxLength={10}
                  onValueChange={placeholder => this.setState({ placeholder })}
                  onChangeText={text => this.setState({ text })}
                />
                }
              </View> */}
              <CustomButton
                onPress={() => {
                  // this.showTrain(),
                  this.searchBy(this.state.text)
                  // this.props.navigation.navigate('Station')
                }}
                title='Search'
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
                <Image style={styles.img} source={require('../images/promo.png')} />
                <Image style={styles.img} source={require('../images/promo1.png')} />
                <Image style={styles.img} source={require('../images/promo4.jpg')} />
                <Image style={styles.img} source={require('../images/promo5.png')} />
                <Image style={styles.img} source={require('../images/promo1.png')} />
              </ScrollView>
            </View>
          </View>
        </ScrollView>
        {/* <DeliveryMark/> */}
      </SafeAreaView>
    );
  }

}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',

  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  scroll: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10
  },
  img: {
    width: Dimensions.get('window').width - 120,
    height: 150,
    marginLeft: 5
  },
  image: {
    width: Dimensions.get('window').width,
    height: 150,
    marginLeft: 5

  },
  contentContainer: {
    paddingVertical: 25,
    justifyContent: 'space-around',
  },
  radioButton: {
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 25 // justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'monospace',
  },
  inputView: {
    marginLeft: 5,
    borderRadius: 100 / 10,
    borderColor: '#9B9B9B',
    borderWidth: 2,
    paddingVertical: 5

  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  input: {
    fontSize: 15,
    color: '#000000',
    width: Dimensions.get('window').width - 50,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center'
  },
  inputAuto:{
    // width:Dimensions.get('window').width - 50,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    // zIndex: 1
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },

})
