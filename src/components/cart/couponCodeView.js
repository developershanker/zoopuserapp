import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export const CouponCodeView = (props) =>{
    const {title='ZOOP' , style = {}, textStyle = {}} = props;

    return(
        <View style={[styles.codeView, style ]}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    codeView: {
        justifyContent:'flex-start',
        width:150,
        alignItems: 'center',
        paddingVertical:5,
        backgroundColor: '#ffffff',
        borderColor: '#f59120',
        borderRadius: 100 / 8,
        borderWidth:2,
        borderStyle:'dashed'
    },
    text: {
        fontSize: 20,
        width:'auto',
        textTransform: 'uppercase',
        color: '#f59120',
        fontWeight:'bold',
        justifyContent:'center'
    },
});