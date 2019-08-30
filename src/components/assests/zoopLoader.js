import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export const ZoopLoader = (props) => {
//     const { animating,size={} } = props;



export default class ZoopLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        
            <View style={[styles.container,{opacity:(this.props.show)}]}>
                <ActivityIndicator
                color={'#FF5819'}
                size={20}
                animating={true}
                />
                <Text style={styles.text}>Loading...</Text>
            </View>
       
    );
  }
}



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
   },
   text:{
       fontSize:20,
       fontFamily:'Poppins-Bold',
       color:'#FF5819',
       paddingVertical:10
   }
})