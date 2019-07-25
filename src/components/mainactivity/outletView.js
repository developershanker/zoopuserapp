import React, { Component } from 'react';
import { View, Text ,StyleSheet,Image,Dimensions,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import CardView from 'react-native-cardview';
import { StationHeader } from './stationHeader.js';


export class OutletView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListItems:[
        {key:"1",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",price:"150"},
        {key:"2",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",price:"150"},
        {key:"3",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",price:"150"},
        {key:"4",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",price:"150"},
        {key:"5",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",price:"150"},
        {key:"6",name:"MOTI MAHAL RESTURENT",rating:"4.5",cuisine:"North Indian,Chinese",price:"150"},
        
      ]
    };
  }

  render() {
    return (
      
      <ScrollView>
      <View style={styles.slide}>
         {/* Station Header */}
        <StationHeader/>
        <FlatList
        data={this.state.ListItems}
        renderItem={({item}) =>
        <View style={styles.outletContainer}>
          <TouchableOpacity>
        <CardView
        style={styles.card}
          cardElevation={4}
          cardMaxElevation={4}
          cornerRadius={5}>
            <Image source={require('../images/roundimg3.jpg')} style={styles.image}/>
            <View  style={styles.detail}>
              <View style={{flexDirection:'row'}}>
             <Text style={styles.text}>
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
            Minimum Order: Rs. {item.price}
          </Text>
          </View>
</CardView>
</TouchableOpacity>
</View>}
    
        />
</View>
</ScrollView>
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
  image: {
        margin:10,
        width:100,
        height:100,
        borderRadius: 100 / 4,
      },
  detail:{
        width:Dimensions.get('screen').width -100,
        height:120,
      },
  text:{
        paddingTop:10,
        marginLeft:10,
        fontSize:15,
        fontWeight:'bold',
        color:'#000000',
        justifyContent:'center',
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

