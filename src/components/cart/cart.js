import React, { Component } from 'react';
import { View,CheckBox, Text ,StyleSheet,ScrollView,Dimensions,TouchableOpacity,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import CardView from 'react-native-rn-cardview';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButton } from '../assests/customButtonLarge.js';
import { Fade } from '../assests/fade.js';



export default class Cart extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
  constructor(props) {
    super(props);
    this.state = {
        outletName:'MOTI MAHAL RESTURENT',
        station:'Kanpur',
        count:0,
        totalPrice:0,
        walletBalance:500,
        walletUsed:false,
        textPromoCode:'Apply Coupon Code',
        OutletMenuInfo:[
          {key:"1",itemName:"Special Thali",itemImage:require('../images/thali.png'),itemPrice:"175",itemCategory:"Thali",itemType:"veg",itemMarking:"",itemDescription:""},
          {key:"2",itemName:"Chicken Curry",itemImage:require('../images/chickencurry.png'),itemPrice:"200",itemCategory:"Main Course",itemType:"nonveg",itemMarking:"",itemDescription:""},
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
  // changeCode=(couponCode)=>{
  //   this.setState({
  //       couponCode:couponCode
  //   })
  // }


  render() {
    const { navigation } = this.props;
    const count = navigation.getParam('count','0');
    const totalPrice=navigation.getParam('totalPrice','0')
    const couponCode=navigation.getParam('couponCode','ZOOP50')
    return (
        <SafeAreaView style={styles.slide}>
            <ScrollView>
      <View>
          {/* header view */}
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Menu')}>
          <Icon style={{margin:20}} name={'chevron-left'} size={20} color={'#000000'}/>
          </TouchableOpacity>
          <View style={{flexDirection:'column',justifyContent:'center',width:Dimensions.get('window').width-100,alignItems:'center'}}>
        <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:25,color:'#000000'}}> Cart </Text>
        </View>
        </View>
        {/* header view ends */}
        <View style={{flexDirection:'column',justifyContent:'center',width:Dimensions.get('window').width,alignItems:'center',marginTop:15}}>
        <Text style={{alignSelf:'center',fontSize:20,color:'#000000',fontWeight:'bold'}}>{this.state.outletName}</Text>
        <Text style={{alignSelf:'center',fontSize:15,color:'#000000'}}>{this.state.station}</Text>
        </View>
        {/* Selected Items list */}
        <View>
          <CardView
          style={styles.card}
          cardElevation={5}
          maxCardElevation={5}
          radius={5}
          >
            <FlatList
            style={{width:Dimensions.get('window').width}}
            data={this.state.OutletMenuInfo}
            renderItem={({item})=>
                <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:5,marginBottom:5,alignItems:'center'}}>
                <Icons name={'carrot'} size={15} color={item.itemType=='nonveg'?'#eb0909':'#1e8728'}/>
                <Text>{item.itemName}</Text>
              {/* Adding item to cart button */}
              
                    <View style={{alignItems:'center',width:60,borderColor:'#1e8728',borderRadius: 100 / 6,borderWidth:0}}>
                      <TouchableOpacity onPress={()=>{this.incrementCounter(),this.state.totalPrice=item.itemPrice}} disabled={this.state.count==0?false:true}>
                        <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={this.decrementCounter} disabled={this.state.count==0?true:false}>
                              <Icon style={{opacity:this.state.count==0?0:100}} name='minus' size={10} color='#1e8728' />
                            </TouchableOpacity>
                            <Text style={{fontWeight:'bold',color:'#1e8728',margin:5,paddingLeft:5,paddingRight:5}}>{this.state.count==0 ? 'Add':this.state.count}</Text>
                            <TouchableOpacity onPress={()=>{
                              this.incrementCounter()
                              }}>
                              <Icon style={{opacity:this.state.count==0?0:100}} name='plus' size={10} color='#1e8728'/>
                            </TouchableOpacity>
                    
                       </View>
                    </TouchableOpacity>
                   </View>
              
              {/* Adding item to cart button ends here */}
                <Text>Rs. {item.itemPrice}</Text>
                </View>
               }
            />
          </CardView>
          {/* itemCard ends here */}
        {/* Wallet and Coupon Card begin here */}
          <CardView
          style={styles.couponcard}
          cardElevation={5}
          maxCardElevation={5}
          radius={5}
          >
            <View style={{flexDirection:'column',alignContent:'center',alignItems:'center'}}>
               <View style={{flexDirection:'column',alignContent:'center',alignItems:'center'}}>
               <View style={{flexDirection:'row',alignItems:'center'}}>
               <CheckBox
               value={this.state.walletUsed}
               disabled={this.state.textPromoCode==ConstantValues.couponCode?true:false}
               onValueChange={walletUsed=>this.setState({walletUsed})}
               />
               <Text style={{fontSize:15,fontWeight:'bold'}}>Use Zoop Wallet</Text>
               </View>
               <Text style={{fontSize:20,fontWeight:'bold',color:'#000000'}}>Rs. {this.state.walletBalance}</Text>
               </View>
               <Text>OR</Text>

               <TouchableOpacity onPress={()=>this.props.navigation.navigate('CouponPage')} disabled={this.state.walletUsed==true?true:false}>
                 <Text style={[styles.coupontext,{color:this.state.walletUsed==true?'#636666':'#149db5'}]}>
                    {this.state.textPromoCode}
                </Text>
                <Fade visible={this.state.textPromoCode==couponCode?true:false}>
                  <Text>Applied Successfully</Text>
                </Fade>
               </TouchableOpacity>
            </View>
          </CardView>
          {/* Wallet and Coupon Card ends here */}
          {/* bill detail Card begins here */}
                <BillCardDetail/>
          {/* bill detail Card ends here */}

        </View>
      </View>
     </ScrollView>
     <CustomButton 
      style={{backgroundColor:'#1fc44e',alignSelf: 'center',marginBottom:20,}}
      onPress={()=>this.props.navigation.navigate('PassengerDetail')}
      title='Add Passenger Details'
      />
   </SafeAreaView>
  );
 }
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        width:Dimensions.get('window').width,
          justifyContent:'center',
          backgroundColor:'#ffffff',
        }, 
        card:{
         width:Dimensions.get('window').width-5,
         borderRadius: 100 / 4,
         marginLeft:5,
         marginRight:10,
         marginTop:10,
         alignItems:'center',
         flexDirection: 'row',
         paddingTop:10,
         paddingBottom:10,
         paddingLeft:10,
         paddingRight:10 
        },
       couponcard:{
          width:Dimensions.get('window').width-5,
          justifyContent:'center',
          borderRadius: 100 / 4,
          marginLeft:5,
          marginRight:10,
          marginTop:10,
          alignItems:'center',
          flexDirection: 'row',
          paddingBottom:10,
          paddingLeft:10,
          paddingRight:10 
         },
       coupontext:{
        fontSize:20,
        // color:'#149db5',
        fontWeight:'bold',
        textDecorationLine:'underline'
       },
      
});
