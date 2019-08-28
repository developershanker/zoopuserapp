import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const CustomActivityIndicator = (props) => {
    const { animating,size={} } = props;

    return (
        <View style={styles.container}>
            <ActivityIndicator
            color={'#FF5819'}
            size={size}
            animating={animating}
            />
        </View>
    );
};
export default CustomActivityIndicator

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})