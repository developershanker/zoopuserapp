import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { InputAutoSuggest } from 'react-native-autocomplete-input';
import ConstantValues from '../constantValues.js';
import SplashScreen from 'react-native-splash-screen';

export default class autoCompleteTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    SplashScreen.hide();
    // fetch(ConstantValues.apiUrl + 'trains')
    //   .then(response => response.json())
    //   .then((responseJson) => {
    //     this.setState({
    //       loading: false,
    //       dataSource: responseJson,

    //     })
    //     console.log(responseJson)
    //   })
    //   .catch(error => console.log(error))
  }
  async showTrain(query) {
    try {
      let response = await searchApi.showTrain();
      // console.log('data received in search.js : ' + JSON.stringify(response))
      if (response.status == true) {
        this.setState({
                loading: false,
                dataSource: response,
              })
        return (
          console.log('The status is: ' + response.status),
          console.log('The train name is: ' + response.data.trainNumberAndName),
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
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }
    const { query } = this.state;
    const data = this.showTrain(query);
    return (
      <View style={styles.container}>
        <Autocomplete
          data={data}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          renderItem={({ item, i }) => (
            <TouchableOpacity onPress={() => this.setState({ query: item })}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#0c9"
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  }
});