import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Dimensions,Switch,Image,ToastAndroid, ScrollView, TouchableOpacity} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomMenuFAB from '../assests/customMenuFAB.js';

export default class Menu extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
  constructor(props) {
    super(props);
    this.state = {
      text:'Add',
        OutletInfo:[
            {key:"1",name:"MOTI MAHAL RESTURENT",station:"(Kanpur)",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150",haltTime:"05 Minutes",fssai:"22005587474",gstno:"245871688",offer:"20% Off on orders above Rs.99 upto Rs.50"}
        ],
        OutletMenuInfo:[
          {key:"1",itemName:"Special Thali",itemImage:require('../images/thali.png'),itemPrice:"175",itemCategory:"Thali",itemType:"veg",itemMarking:"",itemDescription:""},
          {key:"2",itemName:"Chicken Curry",itemImage:require('../images/chickencurry.png'),itemPrice:"200",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:""},
          {key:"3",itemName:"Hot Dog",itemImage:require('../images/roundimg1.jpg'),itemPrice:"150",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:""},
          {key:"4",itemName:"Veg Burger",itemImage:require('../images/roundimg2.jpg'),itemPrice:"80",itemCategory:"Fast Food",itemType:"veg",itemMarking:"",itemDescription:""},
          {key:"5",itemName:"Mini Non-Thali",itemImage:require('../images/roundimg3.jpg'),itemPrice:"120",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:""},
          {key:"6",itemName:"Jain Thali",itemImage:require('../images/roundimg4.jpg'),itemPrice:"140",itemCategory:"Main Course",itemType:"veg",itemMarking:"",itemDescription:""},
         

        ]
    };
  }


 
  render() {
    const vegIcon=<Icons name={'carrot'} size={15} color='#1e8728'/>
    const nonvegIcon=<Icons name={'carrot'} size={15} color='#eb0909'/>
  
    return (
        <SafeAreaView style={styles.slide}>
          <ScrollView>
      <View >
        <FlatList
        data={this.state.OutletInfo}
        renderItem={({item})=>
        <View style={styles.topContainer}>
        <Text style={styles.outletName}> {item.name} </Text>
        <Text style={{fontWeight:'bold',paddingBottom:10,fontSize:15}}>{item.station}</Text>
        <View style={{flexDirection:'row',paddingBottom:20}}>
        <Text>Veg. Only</Text>
      <Switch/>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:Dimensions.get('window').width}}>
        <View style={{flexDirection:'row'}}>
        <Image style={{width:30,height:15}} source={require('../images/fssai.png')}/>
        <Text style={{fontSize:10,fontWeight:'bold'}}>Lic No. {item.fssai}</Text>
        </View>
        <Text style={{fontSize:10,fontWeight:'bold',marginRight:10}}>GST No. {item.gstno}</Text>
        </View>
      <CardView
      style={styles.card}
      cardElevation={4}
      cardMaxElevation={4}
      cornerRadius={5}
      >
          <View style={{flexDirection:'row',justifyContent:'space-between',width:Dimensions.get('window').width}}>
              <View style={{flexDirection:'column',alignItems:'center',margin:10,marginLeft:20}}>
                <View style={{flexDirection:'row'}}>
              <Icon name='star' size={15} color='#ff9214'/>
              <Text style={{fontWeight:'bold'}}> {item.rating}</Text>
              </View>
              <Text style={{fontWeight:'bold'}}>Rating</Text>
              </View>
            <View style={{flexDirection:'column',alignItems:'center',margin:10}}>
            <Text style={{fontWeight:'bold'}}>Rs. {item.minorder}</Text>
            <Text style={{fontWeight:'bold'}}>Min. Order</Text>
            </View>
            <View style={{flexDirection:'column',alignItems:'center',margin:10,marginRight:20}}>
            <Text style={{fontWeight:'bold'}}>{item.haltTime}</Text>
            <Text style={{fontWeight:'bold'}}>Halt Time</Text>
            </View>
            
          </View>
      </CardView>
      {/* Offer text label */}
        <View style={styles.offerboard}>
          <Text style={styles.offerText}>Offer:- {item.offer}</Text>
        </View>
        </View>
    }
        />
      </View>
                                       {/*  MENU ITEM STYLES{GRID} */}
      <View style={{width:Dimensions.get('window').width}}>
        <FlatList
        style={{width:Dimensions.get('window').width}}
        data={this.state.OutletMenuInfo}
        renderItem={({item})=>
          <View>
            <CardView
            style={styles.menuGridCardContainer}
           cardElevation={5}
            cardMaxElevation={5}
             cornerRadius={5}
            >
            <View>
              <Image style={styles.itemImage} source={item.itemImage}/>
              <View style={{flexDirection:'row'}}>
              <Icons name={'carrot'} size={15} color={item.itemType=='nonveg'?'#eb0909':'#1e8728'}/>
              <Text style={styles.itemName}>{item.itemName}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={styles.itemName}>Rs. {item.itemPrice}</Text>
              <View>
                {/* Adding item to cart button */}
              <TouchableOpacity>
                <View style={{flexDirection:'row',alignSelf:'flex-end',marginRight:10}}>
              <Icon name='plus-circle' size={15} color='#1e8728'/>
              <Text style={{fontWeight:'bold',color:'#1e8728'}}>{this.state.text}</Text>
              </View>
              </TouchableOpacity>
              </View>
                </View>
            </View>
            </CardView>
          </View>
      }
      numColumns={2}
        />
       
      </View>
      <CustomMenuFAB/>
                                      {/* MENU ITEM STYLES{LIST} */}
      <View style={{width:Dimensions.get('window').width}}>
      <Text style={{fontSize:20}}>LIST MENU WILL BE SHOWN HERE</Text>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
      flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ffffff',
      }, 
  topContainer:{
      width:Dimensions.get('window').width,
    alignItems:'center',
    justifyContent:'center',
        backgroundColor:'#ffffff',
      },
  outletName:{
      paddingTop:15,
    fontSize:20,
    color:'#000000',
    fontWeight:'bold',
},
card:{
    width:Dimensions.get('window').width,
   height:100,
   borderRadius: 100 / 4,
   margin: 5,
   alignItems:'center',
   flexDirection: 'row',   
  },
      // OFFER BOARD STYLES
  offerText:{
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:15
  },
  offerboard:{
    height:35 ,
    justifyContent:'center',
    alignItems:'center',
    width:Dimensions.get('window').width,
    backgroundColor:'#ff9214',
  },
  //  MENU ITEM STYLES{GRID}
  menuGridCardContainer:{
    flexDirection:'column',
    marginTop:10,
    padding:5,
    marginLeft:5,
    marginBottom:5,
    width:Dimensions.get('window').width/2-5,
    height:Dimensions.get('window').width/2-5,
    borderRadius: 100 / 4,
  },
  itemImage:{
    marginTop:5,
    marginBottom:5,
    alignSelf:'center',
    width:Dimensions.get('window').width/2-15,
    height:Dimensions.get('window').width/2-80,
    borderRadius: 100 / 9,
  },
  itemName:{
    fontWeight:'bold',
    fontSize:15,
  },

});