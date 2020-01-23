/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View,StyleSheet, Dimensions } from 'react-native';
import Colors from '../components/colors';


export const Separator = (props) => {

    return (
        <View style = {styles.view}>
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        height:0.7,
        backgroundColor: Colors.lightGrey,//can change as we move to various pages
        // marginBottom: 10,//can change as we move to various pages
        // marginLeft: '2%', //can change as we move to various pages
        // width: '96%', //can change as we move to various pages
        flexDirection: 'row',
        // borderColor: '#e4e4e4',
        // borderRadius: 10,
        // borderWidth: 0.5,
        width: Dimensions.get('screen').width - 40,
        // elevation: 1,
        // paddingHorizontal: 10,
        // paddingVertical: 5,
    },
});
