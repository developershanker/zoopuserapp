import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class customMenuFAB extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View >
       <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
           <Icon name={'utensils'} size={15} color={'#ffffff'}/>
          <Text style={styles.fabIcon}>MENU</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
    fab: { 
        flexDirection:'row',
        position:'absolute',
        width:100, 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#03A9F4', 
        borderRadius: 100, 
        elevation: 8 
        }, 
        fabIcon: { 
        marginLeft:10,
          fontSize: 15, 
          color: 'white' 
        }
});
