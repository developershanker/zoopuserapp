import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions } from 'react-native';
import CardView from 'react-native-rn-cardview';


class billDetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <CardView
          style={styles.billcard}
          cardElevation={5}
          maxCardElevation={5}
          radius={5}
          >
            <View>
                <Text style={{fontSize:15,fontWeight:'bold',padding:5}}>Bill Details</Text>
                <View style={styles.tile}>
                <Text style={styles.tiletext}>ITEM TOTAL</Text>
                <Text style={{alignSelf:'flex-end'}}>Rs. 200</Text>
                </View>
                <View style={styles.tile}>
                <Text style={styles.tiletext}>TOTAL DISCOUNT</Text>
                <Text style={{alignSelf:'flex-end'}}>Rs. 200</Text>
                </View>
                <View style={styles.tile}>
                <Text style={styles.tiletext}>DELIVERY FEE</Text>
                <Text style={{alignSelf:'flex-end'}}>Rs. 200</Text>
                </View>
                <View style={styles.tile}>
                <Text style={styles.tiletext}>TO PAY</Text>
                <Text style={{alignSelf:'flex-end'}}>Rs. 200</Text>
                </View>             
               
            </View>
          </CardView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    billcard:{
        flex:1,
        width:Dimensions.get('window').width-5,
        borderRadius: 100 / 4,
        marginLeft:5,
        marginRight:10,
        marginTop:10,
        flexDirection: 'row',
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10 
       },
       tile:{   
           width:Dimensions.get('window').width-50,
           padding:10,        
           flexDirection:'row',
           justifyContent:'space-between'
        },
    tiletext:{
        fontWeight:'bold'
    }
})

export default billDetailCard;
