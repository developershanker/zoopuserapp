import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class CustomGridIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      GridListItems: [
        { key: "truck", text: "Spot Your train" },
        { key: "flash", text: "Train Time Table" },
        { key: "medkit", text: "Coach Layout" },
        { key: "compass", text: "Check PNR" },
        { key: "building", text: "Platform" },
        { key: "cab", text: "HelpLine" },
      ]
    };
  }
  GetGridViewItem(item) {
    Alert.alert(item);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.GridListItems}
          renderItem={({ item }) =>
            <View style={styles.GridViewContainer}>
              <TouchableOpacity style={styles.icon} onPress={this.GetGridViewItem.bind(this, item.key)}>
                {/* <Text style={styles.GridViewTextLayout} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text> */}
                <Icon name={item.key} size={30} color="#000000" />
                <Text>{item.text}</Text>

              </TouchableOpacity>
            </View>}
          numColumns={3}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#ffffff"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 100,
    height: 100,
    backgroundColor: '#ffffff'
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontFamily:'Poppins-Bold',
    justifyContent: 'center',
    color: '#fff',
    padding: 10,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 80,
    backgroundColor: '#ffffff',//can change as we move to various pages
    marginBottom: 10,//can change as we move to various pages
    marginLeft: '2%', //can change as we move to various pages
    // width: '96%', //can change as we move to various pages
    borderColor: '#e4e4e4',
    borderRadius: 100 / 9,
    borderWidth: 1,
    shadowOpacity: 0.4,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 4,
  }
});