import React, { Component } from 'react';
import { Text, View,ScrollView,Image,StyleSheet,Animated,Easing,TouchableOpacity,FlatList } from 'react-native';
import CardView from 'react-native-cardview';

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
          <Image style={styles.roundImage} source={require('../images/1.png')} />
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
        
        <CardView
        style={styles.card}
          cardElevation={0}
          cardMaxElevation={2}
          cornerRadius={5}>
            <Image source={require('../images/roundimg3.jpg')} style={styles.image}/>
            <View style={styles.text}>
          <Text >
              MOTI MAHAL RESTURENT
          </Text>
          </View>
</CardView>
        
 </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems:'stretch',
    justifyContent:'flex-start',
    backgroundColor:'#d0d0d0',
   
  },
  scroll:{
    height:150,
    // marginLeft: 10,
  },
  image: {
    width:100,
    height:100,
    marginLeft: 5,
  },
  contentContainer:{
    paddingVertical: 25,
    justifyContent: 'space-around',
  },  
  text:{
    alignItems:'center',
    fontSize: 15,
    // justifyContent:'center'
  },
  card:{
   width: '100%',
   height:100,
   marginLeft: 5,
  },
  roundImage:{
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    marginLeft: 10,
    backgroundColor:'#f2c744'
  }
})
