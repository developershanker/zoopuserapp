import React, { Component } from 'react';
import { View, Text,ScrollView,Image,StyleSheet } from 'react-native';

export default class station extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.slide}>
        <View style={styles.scroll}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        alwaysBounceHorizontal={true}
        contentContainerStyle={styles.contentContainer}
        >
          <Image style={styles.image} source={require('../images/roundimg2.jpg')}/>
          <Image style={styles.image} source={require('../images/roundimg3.jpg')}/>
          <Image style={styles.image} source={require('../images/roundimg4.jpg')}/>
          <Image style={styles.image} source={require('../images/roundimg5.jpg')}/>
          <Image style={styles.image} source={require('../images/roundimg6.jpg')}/>
        </ScrollView>
        </View>
        <Text> station </Text>
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
    width:100,
    height:100,
    marginLeft: 10,
  },
  contentContainer:{
    paddingVertical: 25,
    justifyContent: 'space-around',
  },  
})
