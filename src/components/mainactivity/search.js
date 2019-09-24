import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Clipboard, Button,Image, ScrollView, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { RadioButton, Text } from 'react-native-paper';
import { CustomButton } from '../assests/customButtonLarge';
import { CustomGridIcon } from '../assests/customGridIcon';
import { SafeAreaView } from 'react-navigation';
import searchApi from './searchApi';
import DeliveryMark from '../postOrderActivity/deliveryMark';
import ConstantValues from '../constantValues';
import { Fade } from '../assests/fade';
import Autocomplete from 'react-native-autocomplete-input';
import loginApi from '../login/loginApi.js';



export default class Search extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.showTrain(),
      this.onRegister()
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      value: 'Enter PNR',
      placeholder: '',
      email: '',
      query: '',
      trains: [],
    };
  }

  async onRegister() {
    try {
      let response = await loginApi.getUserRegister();
      console.log('data received in register.js : ' + JSON.stringify(response))
      ConstantValues.loginCount = response.data.loginCount
      this.state.loginCount = response.data.loginCount
      ConstantValues.customerPhoneNo = response.data.mobile
      ConstantValues.customerName = response.data.fullName
      ConstantValues.customerRefferalCode = response.data.referralCode
      this.setState({
        name: ConstantValues.customerName
      })
      console.log('ConstantValues.customerName :' + ConstantValues.customerName + '\n' +' ConstantValues.customerRefferalCode : ' +  ConstantValues.customerRefferalCode)
      ConstantValues.customerEmailId = response.data.email
      this.setState({
        emailId: ConstantValues.customerEmailId
      })
      ConstantValues.customeralternateMobile = response.data.alternateMobile
      this.setState({
        altmobile: ConstantValues.customeralternateMobile
      })


    } catch (error) {
      console.log('Data received in register.js catch: ' + error)
    }
  }


  //function to render dropdown while search by train no.
  findTrain(query) {
    if (query === '') {
      return [];
    }
    const { trains } = this.state;
    //making a case insensitive regular expression to get similar value from the train json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered train array according the query from the input
    return trains.filter(train => train.trainNumberAndName.search(regex) >= 0);
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
    }
    else if (value == 'Enter Train No.') {
      const { query } = this.state;
      const trains = this.findTrain(query);
      // console.log('trains are' + trains)
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

      return (
        <View style={styles.inputViewD}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            data={trains.length === 1 && comp(query, trains[0].trainNumberAndName) ? [] : trains}
            defaultValue={query}
            // listContainerStyle={styles.autocompleteContainer}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Enter Train No."
            renderItem={({ item }) => (
              <View>
                <ScrollView contentContainerStyle={styles.dropdown}>
                  <TouchableOpacity onPress={() => this.setState({
                    query: item.trainNumberAndName,
                    text: item.trainNumber
                  })}>
                    <Text style={styles.itemText}>
                      {item.trainNumberAndName}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}
            keyExtractor={(item) => item.trainId.toString()}
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
        // console.log('data : ' + JSON.stringify(response.data))
        this.setState({
          trains: response.data
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
    if (text != '') {
      ConstantValues.searchString = text,
        console.log('ConstantValues.searchString is ....' + ConstantValues.searchString)
      this.props.navigation.navigate('Station')
    } else {
      return (
        ToastAndroid.show('Invalid Input', ToastAndroid.LONG)
      )
    }

  }

  render() {

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.slide} >

            <View>
              <Image style={styles.image} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.home }} />
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
                <Image style={styles.img} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner1 }} />
                <Image style={styles.img} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner2 }} />
                <Image style={styles.img} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner3 }} />
                <Image style={styles.img} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.banner4 }} />
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
    width: Dimensions.get('window').width,
    height: 150,
    marginLeft: 5,
    flexWrap: 'wrap'
  },
  image: {
    width: Dimensions.get('window').width,
    height: 150,
    flexWrap: 'wrap'
    // marginLeft: 5

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
    paddingVertical: 5,

  },
  inputViewD: {
    marginLeft: 5,
    borderRadius: 100 / 10,
    borderColor: '#9B9B9B',
    borderWidth: 2,
    paddingVertical: 5,
    width: Dimensions.get('window').width - 50,
  },
  itemText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold'
    // margin: 2
  },
  input: {
    fontSize: 15,
    color: '#000000',
    width: Dimensions.get('window').width - 50,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center'
  },
  inputAuto: {
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
  dropdown: {
    height: 50,
    justifyContent: 'center',
    fontSize: 15,
    color: '#000000',
    width: Dimensions.get('window').width - 50,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    borderBottomColor: '#000000'
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
})

//export default withKeyboardAwareScrollView(Search);