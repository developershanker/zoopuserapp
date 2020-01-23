/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import styles from '../cart/cartCss';
import Colors from '../colors';

export const Counter = (props) => {
    const { onPressAdd, onPressRemove, disabledAdd, disabledRemove, itemCount, style = {} } = props;

    return (
       
            <View>

                {/* Adding item to cart button */}
                <View
                    style={[style,{ width: 90, borderColor: Colors.lightGrey, borderRadius: 6, borderWidth: 1 }]} >
                    <TouchableOpacity onPress={onPressAdd} disabled={disabledAdd}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={onPressRemove} disabled={disabledRemove}>
                                <View style={[styles.plusminus, { opacity: itemCount == 0 ? 0 : 100 }]}>
                                    <IconA name='minus' size={12} color={Colors.newOrange} />
                                    {/* <Text style = {{fontSize: 15 , color : {Colors.newOrange},fontWeight:'bold'}}>-</Text> */}
                                </View>

                            </TouchableOpacity>
                            { itemCount === 0 ?
                            <Text style={{ fontFamily: 'Poppins-Regular', color: itemCount == 0 ? Colors.newOrange : '#000', paddingLeft: 5, paddingRight: 5,fontSize:12 ,backgroundColor:Colors.white}}>ADD +</Text>
                            :
                            <View style={[styles.plusminus,{backgroundColor:Colors.newLightOrange,borderRadius:10/10}]}>
                                <Text style={{ fontFamily: 'Poppins-Regular', color: itemCount == 0 ? Colors.newOrange : '#000', paddingLeft: 5, paddingRight: 5,fontSize:12 ,backgroundColor:Colors.newLightOrange}}>{itemCount}</Text>
                            </View>
                            }
                            {/* <Text style={{ fontFamily: 'Poppins-Regular', color: itemCount == 0 ? Colors.newOrange : '#000', paddingLeft: 5, paddingRight: 5,fontSize:12 ,backgroundColor:itemCount == 0 ? Colors.white : Colors.newLightOrange}}>{itemCount == 0 ? 'ADD +' : itemCount}</Text> */}


                            <TouchableOpacity onPress={onPressAdd}>
                                <View style={[styles.plusminus, { opacity: itemCount === 0 ? 0 : 100 }]}>
                                    <IconA name='plus' size={12} color={Colors.newOrange} />
                                    {/* <Text style = {{fontSize: 15 , color : {Colors.newOrange},fontWeight:'bold'}}>+</Text> */}
                                </View>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </View>
                {/* Adding item to cart button ends */}
            </View>
    )

}


export default Counter;