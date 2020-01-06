/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import styles from '../cart/cartCss';

export const Counter = (props) => {
    const { onPressAdd, onPressRemove, disabledAdd, disabledRemove, itemCount, style = {} } = props;

    return (
       
            <View>

                {/* Adding item to cart button */}
                <View
                    style={[style,{ alignItems: 'center', width: 100,}]} >
                    <TouchableOpacity onPress={onPressAdd} disabled={disabledAdd}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={onPressRemove} disabled={disabledRemove}>
                                <View style={[styles.plusminus, { opacity: itemCount == 0 ? 0 : 100 }]}>
                                    <Icon name='minus' size={10} color='#60b246' />
                                    {/* <Text style = {{fontSize: 15 , color : '#60b246',fontWeight:'bold'}}>-</Text> */}
                                </View>

                            </TouchableOpacity>

                            <Text style={{ fontFamily: 'Poppins-Medium', color: itemCount == 0 ? '#60b246' : '#000', margin: 5, paddingLeft: 5, paddingRight: 5 }}>{itemCount == 0 ? 'ADD +' : itemCount}</Text>


                            <TouchableOpacity onPress={onPressAdd}>
                                <View style={[styles.plusminus, { opacity: itemCount === 0 ? 0 : 100 }]}>
                                    <Icon name='plus' size={10} color='#60b246' />
                                    {/* <Text style = {{fontSize: 15 , color : '#60b246',fontWeight:'bold'}}>+</Text> */}
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