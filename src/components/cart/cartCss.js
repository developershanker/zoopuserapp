import React, { Component } from 'react'
import { Text, View ,Dimensions ,StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    slide: {
      flex: 1,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
    },
    card: {
      //backgroundColor: '#9b9b9b',//can change as we move to various pages
      // marginBottom: 10,//can change as we move to various pages
      // marginLeft: '2%', //can change as we move to various pages
      // width: '96%', //can change as we move to various pages
      // borderColor: '#e4e4e4',
      // borderRadius: 100 / 9,
      // borderWidth: 1,
      // shadowOpacity: 0.4,
      // borderBottomColor: '#e4e4e4',
      // borderBottomWidth: 2,
      width: Dimensions.get('screen').width,
      paddingHorizontal: 5,
      paddingVertical: 5
    },
    promocodeInput: {
      borderRadius: 100 / 8,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderWidth: 1,
      width: '96%',
      borderColor: '#626663',
    },
    couponcard: {
      // width: Dimensions.get('window').width - 5,
      backgroundColor: '#ffffff',//can change as we move to various pages
      marginBottom: 10,//can change as we move to various pages
      marginLeft: '2%', //can change as we move to various pages
      width: '90%', //can change as we move to various pages
      borderColor: '#e4e4e4',
      borderRadius: 100 / 9,
      borderWidth: 1,
      shadowOpacity: 0.4,
      borderBottomColor: '#e4e4e4',
      borderBottomWidth: 2,
    },
    plusminus: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      borderRadius: 6
    },
    coupontext: {
      fontSize: 15,
      // color:'#149db5',
      fontFamily: 'Poppins-Medium',
      textDecorationLine: 'underline'
    },
    removetext: {
      fontSize: 15,
      color: '#b32120',
      fontFamily: 'Poppins-Medium',
      // textDecorationLine: 'underline'
    },
    billcard: {
      backgroundColor: '#ffffff',//can change as we move to various pages
      marginBottom: 10,//can change as we move to various pages
      marginLeft: '2%', //can change as we move to various pages
      width: '90%', //can change as we move to various pages
      borderColor: '#e4e4e4',
      borderRadius: 100 / 9,
      borderWidth: 1,
      shadowOpacity: 0.4,
      borderBottomColor: '#e4e4e4',
      borderBottomWidth: 2,
    },
    tile: {
      // width: Dimensions.get('screen').width - 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    tiletext: {
      fontFamily: 'Poppins-Regular',
      color: '#000000'
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalView: {
      width: Dimensions.get('screen').width,
      height: 400,
      backgroundColor: '#ffffff',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderTopStartRadius: 100 / 5,
      borderTopEndRadius: 100 / 5
    },
    text: {
      fontSize: 20,
      width: 'auto',
      textTransform: 'uppercase',
      color: '#f59120',
      fontFamily: 'Poppins-Medium',
      justifyContent: 'center'
    },
    codeView: {
      justifyContent: 'flex-start',
      width: 150,
      alignItems: 'center',
      paddingVertical: 5,
      backgroundColor: '#ffffff',
      borderColor: '#f59120',
      borderRadius: 100 / 8,
      borderWidth: 1,
      borderStyle: 'dashed'
    },
  });


  export default styles;