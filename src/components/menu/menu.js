import React, { Component } from 'react';
import {Animated, View, Text, StyleSheet,FlatList,Dimensions,Switch,Image,SectionList,ToastAndroid, ScrollView, TouchableOpacity} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import CardView from 'react-native-rn-cardview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CustomMenuFAB from '../assests/customMenuFAB.js';
import {Fade} from '../assests/fade.js';



const itemDetail=[
  {id:1,itemName:"Special Thali",itemImage:require('../images/thali.png'),itemPrice:"175",itemCategory:"Thali",itemType:"veg",itemMarking:"",itemDescription:"2 Bhature + Chole + Salad + Pickle"},
  {id:2,itemName:"Chicken Curry",itemImage:require('../images/chickencurry.png'),itemPrice:"200",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:"2 Bhature + Chole + Salad + Pickle"},
  {id:3,itemName:"Hot Dog",itemImage:require('../images/roundimg1.jpg'),itemPrice:"150",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:"2 Bhature + Chole + Salad + Pickle"},
  {id:4,itemName:"Veg Burger",itemImage:require('../images/roundimg2.jpg'),itemPrice:"80",itemCategory:"Fast Food",itemType:"veg",itemMarking:"",itemDescription:"2 Bhature + Chole + Salad + Pickle"},
  {id:5,itemName:"Mini Non-Thali",itemImage:require('../images/roundimg3.jpg'),itemPrice:"120",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:"2 Bhature + Chole + Salad + Pickle"},
  {id:6,itemName:"Jain Thali",itemImage:require('../images/roundimg4.jpg'),itemPrice:"140",itemCategory:"Main Course",itemType:"veg",itemMarking:"",itemDescription:"2 Bhature + Chole + Salad + Pickle"},
]
export default class Menu extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    
  constructor(props) {
    super(props);
    this.state = {
      text:'Add',
      count:0,
      show:'Add',
      totalPrice:0,
        OutletInfo:[
            {key:"1",name:"MOTI MAHAL RESTURENT",station:"(Kanpur)",rating:"4.5",cuisine:"North Indian,Chinese",minorder:"150",haltTime:"05 Minutes",fssai:"22005587474",gstno:"245871688",offer:"20% Off on orders above Rs.99 upto Rs.50"}
        ],
        OutletMenuInfo:[
          {key:"1",itemName:"Special Thali",itemImage:require('../images/thali.png'),itemPrice:"175",itemCategory:"Thali",itemType:"veg",itemMarking:"",itemDescription:""},
          {key:"2",itemName:"Chicken Curry",itemImage:require('../images/chickencurry.png'),itemPrice:"200",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:""},
          {key:"3",itemName:"Hot Dog",itemImage:require('../images/roundimg1.jpg'),itemPrice:"150",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:""},
          // {key:"4",itemName:"Veg Burger",itemImage:require('../images/roundimg2.jpg'),itemPrice:"80",itemCategory:"Fast Food",itemType:"veg",itemMarking:"",itemDescription:""},
          // {key:"5",itemName:"Mini Non-Thali",itemImage:require('../images/roundimg3.jpg'),itemPrice:"120",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:""},
          // {key:"6",itemName:"Jain Thali",itemImage:require('../images/roundimg4.jpg'),itemPrice:"140",itemCategory:"Main Course",itemType:"veg",itemMarking:"",itemDescription:""},
         

        ]
    };
  }

  incrementCounter= () => {
    this.setState({
      count:this.state.count+1
    })
  }
  decrementCounter= () => {
    this.setState({
      count:this.state.count-1
    })
  }


 
  render() {
    const visible=this.state.count==0?false:true
    
    return (
        <SafeAreaView style={styles.slide}>
          <ScrollView>
      <View >
        {/* go back navigator icon */}
      <View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Station')}>
          <Icon style={{margin:20}} name={'chevron-left'} size={20} color={'#000000'}/>
          </TouchableOpacity>
          </View>
          {/* go back navigator icon ends here */}
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
      maxCardElevation={4}
      radius={5}
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
           maxCardElevation={5}
           radius={5}
            >
            <View>
              <Image style={styles.itemImage} source={item.itemImage}/>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icons name={'carrot'} size={15} color={item.itemType=='nonveg'?'#eb0909':'#1e8728'}/>
              <Text style={styles.itemName}>{item.itemName}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:20}}>
              <Text style={styles.itemName}>Rs. {item.itemPrice}</Text>
                {/* Adding item to cart button */}
              
              <View>
              
        {/* Adding item to cart button */}
      <View
      style={{alignItems:'center',width:80,borderColor:'#1e8728',borderRadius: 100 / 8,borderWidth:2}}>
        <TouchableOpacity onPress={()=>{this.incrementCounter(),this.state.totalPrice=item.itemPrice}} disabled={this.state.count==0?false:true}>
        <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={this.decrementCounter} disabled={this.state.count==0?true:false}>
      <Icon style={{opacity:this.state.count==0?0:100}} name='minus' size={15} color='#1e8728' />
      </TouchableOpacity>
      
        <Text style={{fontWeight:'bold',color:'#1e8728',margin:5,paddingLeft:5,paddingRight:5}}>{this.state.count==0 ? 'Add':this.state.count}</Text>
       
        
      <TouchableOpacity onPress={()=>{
          this.incrementCounter()
          }}>
        <Icon style={{opacity:this.state.count==0?0:100}} name='plus' size={15} color='#1e8728'/>
        </TouchableOpacity>
      
      </View>
      </TouchableOpacity>
      </View>
      
              </View>
               {/* Incrementor ends here */}
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
        <SectionList
        style={{margin:10}}
         sections={[
           {title:'Thali',data:itemDetail},
          //  {title:'Rice & Biryani',data:itemDetail},
          //  {title:'Sweets',data:itemDetail},
          //  {title:'Breads',data:itemDetail},
          //  {title:'Fast Food',data:itemDetail},
          //  {title:'Rice & Biryani',data:itemDetail},
          //  {title:'Rice & Biryani',data:itemDetail},
          //  {title:'Rice & Biryani',data:itemDetail},
           ]}
                                  // Section Item rendering
           renderItem={({item})=>(
             <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
             <View>
             <View style={{flexDirection:'row'}}>
             <Icons name={'carrot'} size={15} color={item.itemType=='nonveg'?'#eb0909':'#1e8728'}/>
               <Text style={{fontSize:15,color:'#000000'}}>{item.itemName}</Text>
               </View>
               <Text style={{fontSize:15,color:'#000000'}}>Rs. {item.itemPrice}</Text>
               <Text style={{fontSize:10,color:'#c7c3c3'}}>{item.itemDescription}</Text>
             </View>
             <View>
              
              {/* Adding item to cart button */}
            <View
            style={{alignItems:'center',width:80,borderColor:'#1e8728',borderRadius: 100 / 8,borderWidth:2}}>
              <TouchableOpacity onPress={()=>{this.incrementCounter(),this.state.totalPrice=item.itemPrice}} disabled={this.state.count==0?false:true}>
              <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={this.decrementCounter} disabled={this.state.count==0?true:false}>
            <Icon style={{opacity:this.state.count==0?0:100}} name='minus' size={15} color='#1e8728' />
            </TouchableOpacity>
            
              <Text style={{fontWeight:'bold',color:'#1e8728',margin:5,paddingLeft:5,paddingRight:5}}>{this.state.count==0 ? 'Add':this.state.count}</Text>
             
              
            <TouchableOpacity onPress={()=>{
                this.incrementCounter()
                }}>
              <Icon style={{opacity:this.state.count==0?0:100}} name='plus' size={15} color='#1e8728'/>
              </TouchableOpacity>
            
            </View>
            </TouchableOpacity>
            </View>
            
                    </View>

                    {/* Incrementor ends here */}
             </View>
           )}
            //  Section Header Rendering
           renderSectionHeader={({section})=>(
            <View style={{backgroundColor:'#ffffff',flexDirection:'row'}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#000000'}}>{section.title}</Text>
                <Image style={{alignSelf:'center',height:15}} source={require('../images/line.png')}/>
            </View>
           )}
           keyExtractor={item=>item.id}
        />
      </View>
      </ScrollView>
                                           {/*  Footer  */}
      <Fade visible={visible}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')} disabled={false}>
      <View style={[styles.footer]}>
        
        <View style={styles.itemCountShow}>
        <Text style={{marginLeft:5,fontSize:20,fontWeight:'bold',color:'#ffffff'}}>{this.state.count} {this.state.count==1?'Item':'Items'} |  Rs.{this.state.totalPrice}</Text>
        </View>
        <View style={styles.viewcart}>
        <Text style={{marginRight:5,fontSize:20,fontWeight:'bold',color:'#ffffff'}}>VIEW CART</Text>
        <Icon name={'shopping-bag'} color={'#ffffff'} size={20}/>
        </View>
      </View>
      </TouchableOpacity>
      </Fade>
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
    // margin:5,
    // padding:5,
    // marginLeft:5,
    // marginBottom:5,
    alignSelf:'center',
    width:Dimensions.get('window').width/2,
    height:Dimensions.get('window').width/2,
    borderRadius: 100 / 5,
  },
  itemImage:{
    marginTop:5,
    marginBottom:5,
    // marginLeft:15,
    marginRight:15,
    justifyContent:'center',
    alignSelf:'center',
    width:Dimensions.get('window').width/2-15,
    height:Dimensions.get('window').width/2-100,
    borderRadius: 100 / 5,
  },
  itemName:{
    fontWeight:'bold',
    fontSize:15,
  },
  footer:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:Dimensions.get('window').width,
    height:60,
    backgroundColor:'#20c41d',
    alignContent:'center',
    
  },
  viewcart:{
  flexDirection:'row',
  marginBottom:15,
  marginRight:15,
  alignSelf:'flex-end',

},
itemCountShow:{
  flexDirection:'row',
  marginTop:15,
  marginRight:15,
  alignSelf:'flex-start',
}


});