import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableWithoutFeedback} from 'react-native';
import Colors from '../colors';


export const CouponCodeView = (props) =>{
    const {title='ZOOP' , style = {}, textStyle = {},onPress} = props;

    return(
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.codeView, style ]}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    codeView: {
        justifyContent:'flex-start',
        width:150,
        alignItems: 'center',
        paddingVertical:5,
        backgroundColor: '#ffffff',
        borderColor: Colors.newOrange,
        borderRadius: 100 / 8,
        borderWidth:1,
        borderStyle:'dashed'
    },
    text: {
        fontSize: 20,
        width:'auto',
        textTransform: 'uppercase',
        color: Colors.newOrange,
        fontFamily:'Poppins-Medium',
        justifyContent:'center'
    },
});