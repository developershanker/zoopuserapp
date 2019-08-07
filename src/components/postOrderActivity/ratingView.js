import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Button,Platform,Image  } from 'react-native';
import ConstantValues from '../constantValues';


export default class RatingView extends Component {
    constructor() {
        super();
        this.state = {
          Default_Rating: 2,
          //To set the default Star Selected
          Max_Rating: 5,
          //To set the max number of Stars
        };
        //Filled Star. You can also give the path from local
        this.Star = 'https://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://aboutreact.com/wp-content/uploads/2018/08/star_corner.png';
      }
      UpdateRating(key) {
        this.setState({ Default_Rating: key });
        ConstantValues.orderRating=key
        console.log('ConstantValues.orderRating: '+ConstantValues.orderRating)
        //Keeping the Rating Selected in state
      }
      render() {
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar.push(
            <TouchableOpacity
              activeOpacity={0.7}
              key={i}
              onPress={this.UpdateRating.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
        return (
          <View style={styles.MainContainer}>
           <Text>Rate Your Food</Text>
            {/*View to hold our Stars*/}
            <View style={styles.childView}>{React_Native_Rating_Bar}</View>
           
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => alert(this.state.Default_Rating)}>
              
              <Text>Get Selected Value</Text>
            </TouchableOpacity> */}
          </View>
        );
      }
    }
     
    const styles = StyleSheet.create({
      MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
      },
      childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
      },
      button: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#8ad24e',
      },
      StarImage: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
      },
      textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
      },
      textStyleSmall: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginTop: 15,
      },
    });