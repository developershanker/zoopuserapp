import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Spinner from 'react-native-spinkit';
import { CustomButtonShort } from './customButtonShort';
import Colors from '../colors';

// export const ZoopLoader = (props) => {
//     const { animating,size={} } = props;



export const ErrorView = (props) => {
    const { isvisible, text, onPress } = props;
    const image = require('../images/noorder.png')


    return (

        <View style={styles.slide}>
            <Image style={{ width: '60%', height: '50%',opacity:.5 }} source={image} />
            <View style={{height:'30%',backgroundColor:Colors.white,justifyContent:'flex-end',alignContent:'center',alignItems:'center'}}>
            <Text style={styles.text}>Unable to load this page</Text>
            <CustomButtonShort
                style={{ backgroundColor: Colors.newgGreen3 }}
                title={'GO TO HOME'}
                onPress={onPress}
            />
            </View>
        </View>

    );

};



const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    text: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        color: Colors.newOrange,
        paddingVertical: 5
    }
})