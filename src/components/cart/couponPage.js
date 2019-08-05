import React, { Component } from 'react';
import { View, Text,Dimensions,StyleSheet,ScrollView,TextInput,FlatList,TouchableOpacity,Image} from 'react-native';
import CardView from 'react-native-rn-cardview';
import ConstantValues from '../constantValues.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {CouponCodeView} from './couponCodeView.js';


export default class CouponPage extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
  constructor(props) {
    super(props);
    this.state = {
        couponCode:'ZOOP50',
        CouponDetail:[
            {couponId:'1',couponCode:"ZOOP50",couponValidity:"07/09/2019",couponDescription:"Get upto 20% OFF on Order of Rs.250 and above"},
            {couponId:'2',couponCode:"ZOOP50",couponValidity:"07/09/2019",couponDescription:"Get upto 20% OFF on Order of Rs.250 and above"},
            {couponId:'3',couponCode:"ZOOP50",couponValidity:"07/09/2019",couponDescription:"Get upto 20% OFF on Order of Rs.250 and above"},
        ]
    };
  }


  render() {
      
    return (
        <SafeAreaView>
            <ScrollView style={styles.slide}>
                <View>
                        {/* header view */}
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart')}>
                            <Icon style={{margin:20}} name={'chevron-left'} size={20} color={'#000000'}/>
                        </TouchableOpacity>
                    </View>
                         {/* header view ends */}
                         {/* Conpon textInput begins here */}
                    <View style={styles.promocodeInput}>
                        <TextInput
                        style={{padding:10,fontSize:20,textTransform:'uppercase'}}
                        placeholder='Enter Promo Code'
                        keyboardType='default'
                        autoCapitalize='characters'
                        onChangeText={couponCode => this.setState ({couponCode})}
                        />
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Cart')}}>
                            <Text style={{color:'#1e8728',padding:10,fontSize:15,fontWeight:'bold'}}>APPLY</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Conpon textInput ends here */}
                    <View style={{width:Dimensions.get('window').width-10,flexDirection:'row',paddingTop:10}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Available Coupons</Text>
                        <Image style={{height:15,alignSelf:'center'}} source={require('../images/line.png')}/>
                    </View>
                    {/* CouponDetail Card begin Here */}
                    <View>
                        <FlatList
                        data={this.state.CouponDetail}
                        renderItem={({item})=>
                                    <View>
                                        <CardView
                                        style={styles.card}
                                        cardElevation={5}
                                        maxCardElevation={5}
                                        radius={5}
                                        >
                                            <View>
                                                <CouponCodeView
                                                title={item.couponCode}
                                                />
                                                <Text style={{paddingTop:10,color:'#000000',fontWeight:'bold'}}>{item.couponDescription}</Text>
                                                <Text style={{paddingTop:5}}>Validity of this coupon is: {item.couponValidity}</Text>
                                            </View>
                                            <TouchableOpacity 
                                                onPress={()=>{
                                                      this.props.navigation.navigate('Cart'),
                                                                {
                                                                    couponCode:this.state.couponCode
                                                                }}}
                                            >
                                                <Text style={{color:'#1e8728',padding:10,fontSize:15,fontWeight:'bold'}}>APPLY</Text>
                                            </TouchableOpacity>
                                        </CardView> 
                                </View>
                        }
                        keyExtractor={item=>item.couponId}
                        />
                    </View>
                      {/* CouponDetail Card ends Here  */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    slide:{
        width:Dimensions.get('window').width-5,
        marginLeft:5
    },
    promocodeInput:{
        borderRadius:100/8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        width:Dimensions.get('window').width-10,
        borderColor:'#626663'
    },
    card:{
        width:Dimensions.get('window').width-15,
        borderRadius: 100 / 4,
        marginLeft:5,
        marginRight:10,
        marginTop:10,
        justifyContent:'space-between',
        flexDirection: 'row',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10 
       },
})