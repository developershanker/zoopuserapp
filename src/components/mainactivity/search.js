import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Button, ScrollView, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RadioButton, Text } from 'react-native-paper';
import { CustomButton } from '../assests/customButtonLarge';
import { CustomGridIcon } from '../assests/customGridIcon';
import { SafeAreaView } from 'react-navigation';
import searchApi from './searchApi';
import DeliveryMark from '../postOrderActivity/deliveryMark';


export default class Search extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: 'Enter PNR',
      placeholder: '',
      email: ''
    };
  }

  async showTrain() {
    try {
      let response = await searchApi.showTrain();
      console.log('data received in search.js : ' + JSON.stringify(response))
    } catch (error) {
      console.log('Data received in search.js catch: ' + error)
    }

  }

  async searchBy(text) {
    try {
      let response = await searchApi.searchBy(text);
      // console.log('data received in search.js : ' + JSON.stringify(response))
      if (response.status == true) {
        return (
          console.log('The status is: ' + response.status),
          console.log('The train name is: ' + response.data.trainDetails.trainName),
          ToastAndroid.show(response.message, ToastAndroid.LONG),
          this.props.navigation.navigate('Station')
        )
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
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder={this.state.value}
                  keyboardType='number-pad'
                  maxLength={10}
                  onValueChange={placeholder => this.setState({ placeholder })}
                  onChangeText={text => this.setState({ text })}

                />
              </View>
              <CustomButton
                onPress={() => {
                  // this.showTrain(),
                  // this.searchBy(this.state.text)
                  this.props.navigation.navigate('Station')
                }}
                title='Search'

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
  input: {
    fontSize: 15,
    color: '#000000',
    width: Dimensions.get('window').width - 50,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center'
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },

})
