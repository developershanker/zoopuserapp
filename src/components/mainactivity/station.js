import React, { Component } from 'react';
import { Text,Dimensions, View,ScrollView,Image,StyleSheet,Animated,Easing,TouchableOpacity,FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import {OutletView} from '../mainactivity/outletView.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class station extends Component {
  componentDidMount() {
    SplashScreen.hide();
}
  constructor(props) {
    super(props);
    this.state = {
      firstQuery:'',
    };
  }
 

  render() {
    return (
      <SafeAreaView style={styles.slide}>
        <View style={styles.topContainer}>
        <Searchbar
        placeholder="What would you like to have today?"
        onChangeText={firstQuery => this.setState({firstQuery})}
        value={this.state.firstQuery}
        />
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
        </View>
      <View style={styles.stationContainer}>
      <View style={styles.scroll}>
          <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      alwaysBounceHorizontal={true}
      contentContainerStyle={styles.contentContainer}>
      
          {/* <Icon name='train' size={20}/> */}
          <TouchableOpacity>
          <Image style={styles.roundImage} source={require('../images/1.png')} />
          <View style={styles.name}>
          <Text style={{fontSize:10}}>New Delhi</Text>
          <Text style={{fontSize:10}}>12:50</Text>
          </View>
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
       
        {/* Outlet View */}
        <OutletView/>
 </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems:'stretch',
    justifyContent:'flex-start',
    backgroundColor:'#f5f0f0',
  },
  topContainer:{
    alignItems:'stretch',
    justifyContent:'flex-start',
    backgroundColor:'#ffffff',
  },
  stationContainer:{
    margin:5,
    alignItems:'stretch',
    justifyContent:'center',
    backgroundColor:'#ffffff',
  },
  
  scroll:{
    height:'auto',
    flexDirection:'column'
    // marginLeft: 10,
  },
  name:{
    flexDirection:'column',
    alignItems:'center',
    margin:5
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
  roundImage:{
    width: 75,
    height:75,
    borderRadius: 100 / 2,
    marginLeft: 10,
    backgroundColor:'#f2c744'
  }
})
