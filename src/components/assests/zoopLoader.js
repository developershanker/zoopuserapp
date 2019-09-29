import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';

// export const ZoopLoader = (props) => {
//     const { animating,size={} } = props;



export const ZoopLoader = (props) => {
  const { isvisible,text } = props;


    return (
        
      <View>
        <Spinner size={50} type={'FadingCircleAlt'} color={'#FF5819'} isVisible={isvisible} />
        <Text style={styles.text}>{text}</Text>
      </View>
       
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