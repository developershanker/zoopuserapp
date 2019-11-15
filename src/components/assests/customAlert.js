import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';

// export const ZoopLoader = (props) => {
//     const { animating,size={} } = props;



export const CustomAlert = (props) => {
  const { isvisible,alertHeading,alert } = props;


    return (
        Alert.alert(
            'Alert!!',
            alert,
            [
              {
                text: 'OK', onPress: () => console.log(alert),
                style: 'cancel'
              },
            ],
            { cancelable: false },
          )
       
    );
  
};



const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  text: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#FF5819',
    paddingVertical: 5
  }
})