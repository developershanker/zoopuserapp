import React, { Component } from 'react';
import { View, Text,ScrollView,Image,StyleSheet,Animated,Easing,TouchableOpacity,FlatList } from 'react-native';

export default class station extends Component {
  constructor(props) {
    super(props);
      this.spinValue = new Animated.Value(0)
  }
  componentDidMount () {
    this.spin()
  }
  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    
    return (
      <View style={styles.slide}>
        <View style={styles.scroll}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
        {/* <Animated.Image
        style={{
          width: 50,
          height: 50,
          transform: [{rotate: spin}] }}
          source={require('../images/train.png')}
      /> */}
      <View style={styles.scroll}>
          <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      alwaysBounceHorizontal={true}
      contentContainerStyle={styles.contentContainer}>
        
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/1.png')}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/2.png')}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/3.png')}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/4.png')}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/5.png')}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/6.png')}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/1.png')}/>
          </TouchableOpacity> 
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/2.png')}/>
          </TouchableOpacity>    
          </ScrollView>
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
    width:100,
    height:100,
    marginLeft: 10,
  },
  contentContainer:{
    paddingVertical: 25,
    justifyContent: 'space-around',
  },  
  roundImage:{
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    marginTop:10,
    marginLeft: 10,
    backgroundColor:'#f2c744'
  }
})
