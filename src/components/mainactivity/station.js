import React, { Component } from 'react';
import { Text,Dimensions, View,ScrollView,Image,StyleSheet,Animated,Easing,TouchableOpacity,FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import CardView from 'react-native-rn-cardview';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StationHeader } from './stationHeader.js';


export default class station extends Component {
  componentDidMount() {
    SplashScreen.hide();
}
  constructor(props) {
    super(props);
    this.state = {
      firstQuery:'',
      ListItems:[
        {key:"1",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150"},
        {key:"2",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150"},
        {key:"3",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150"},
        {key:"4",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150"},
        {key:"5",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150"},
        {key:"6",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150"},
        ],
      StationList:[
        {key:"1",stationName:"New Delhi",arrTime:"12:50",image:require('../images/1.png')},
        {key:"2",stationName:"New Delhi",arrTime:"12:50",image:require('../images/2.png')},
        {key:"3",stationName:"New Delhi",arrTime:"12:50",image:require('../images/3.png')},
        {key:"4",stationName:"New Delhi",arrTime:"12:50",image:require('../images/4.png')},
        {key:"5",stationName:"New Delhi",arrTime:"12:50",image:require('../images/5.png')},
        {key:"6",stationName:"New Delhi",arrTime:"12:50",image:require('../images/6.png')},
        {key:"7",stationName:"New Delhi",arrTime:"12:50",image:require('../images/1.png')}
      ]
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
            <FlatList
            data={this.state.StationList}
            horizontal={true}
            renderItem={({item})=>
            <View>
            <TouchableOpacity>
          <Image style={styles.roundImage} source={item.image} />
          <View style={styles.name}>
          <Text style={{fontSize:10}}>{item.stationName}</Text>
          <Text style={{fontSize:10}}>{item.arrTime}</Text>
          </View>
          </TouchableOpacity>
            </View>
          }
            />   
          </ScrollView>
        </View>  
        </View>
  
        {/* OutletView starts */}
        <ScrollView>
      <View style={styles.slide}>
         {/* Station Header */}
        <StationHeader/>
        <FlatList
        data={this.state.ListItems}
        renderItem={({item}) =>
        <View style={styles.outletContainer}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Menu')}>
        <CardView
        style={styles.card}
          cardElevation={4}
          maxCardElevation={4}
          radius={5}>
            <Image source={require('../images/roundimg3.jpg')} style={styles.outletimage}/>
            <View  style={styles.detail}>
              <View style={{flexDirection:'row'}}>
             <Text style={styles.outletname}>
              {item.name}
          </Text>
          <View style={styles.ratingView}>
          <Text style={styles.rating}>
            {item.rating}
          </Text>
          </View>
          </View>
          <Text style={styles.cuisine}>
            {item.cuisine}
          </Text>
          
          {/* <Text>
            Order before "date" and "time"
          </Text> */}
          <Text style={styles.minorder}>
            Minimum Order: Rs. {item.minorder}
          </Text>
          </View>
</CardView>
</TouchableOpacity>
</View>}
    
        />
</View>
</ScrollView>
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
  outletContainer:{
    alignItems:'stretch',
    justifyContent:'flex-start',
    backgroundColor:'#ffffff',
  },
  card:{
    width:Dimensions.get('window').width - 10,
   height:120,
   borderRadius: 100 / 4,
   margin: 5,
   alignItems:'center',
   flexDirection: 'row',   
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
  outletimage: {
    margin:10,
    width:100,
    height:100,
    borderRadius: 100 / 4,
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
  detail:{
    width:Dimensions.get('screen').width -100,
    height:120,
  },
  outletname:{
    paddingTop:10,
    marginLeft:10,
    fontSize:15,
    fontWeight:'bold',
    color:'#000000',
    justifyContent:'center',
  },
  roundImage:{
    width: 75,
    height:75,
    borderRadius: 100 / 2,
    marginLeft: 10,
    backgroundColor:'#f2c744'
  },
  ratingView:{
    backgroundColor:'#30ba57',
    marginLeft:20,
    marginTop:5,
    width:35,
    height:25,
   alignItems:'center',
  },
rating:{
fontSize:15,
justifyContent:'center',
fontWeight:'bold',
color:'#ffffff'
},
cuisine:{
fontFamily:'Arial',
marginLeft:10
},
minorder:{
  fontFamily:'Arial',
  color:'#eb2f2f',
  marginLeft:10,
 marginTop:20,
}
})
