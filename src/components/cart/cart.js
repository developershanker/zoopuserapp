import React, { Component } from 'react';
import { View, Text ,StyleSheet,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import CardView from 'react-native-rn-cardview';


export default class Cart extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
  constructor(props) {
    super(props);
    this.state = {
        outletName:'MOTI MAHAL RESTURENT',
        station:'(Kanpur)'
    };
  }

  render() {
    return (
        <SafeAreaView style={styles.slide}>
            <ScrollView>
      <View>
          {/* header view */}
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Menu')}>
          <Icon style={{margin:20}} name={'chevron-left'} size={20} color={'#000000'}/>
          </TouchableOpacity>
          <View style={{flexDirection:'column',justifyContent:'center',width:Dimensions.get('window').width-100,alignItems:'center'}}>
        <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:25,color:'#000000'}}> Cart </Text>
        </View>
        </View>
        {/* header view ends */}
        <View style={{flexDirection:'column',justifyContent:'center',width:Dimensions.get('window').width,alignItems:'center',marginTop:15}}>
        <Text style={{alignSelf:'center',fontSize:20,color:'#000000',fontWeight:'bold'}}>{this.state.outletName}</Text>
        <Text style={{alignSelf:'center',fontSize:20,color:'#000000'}}>{this.state.station}</Text>
        </View>
        {/* Selected Items list */}
        <View>
          <CardView
          style={styles.card}
          cardElevation={4}
          maxCardElevation={4}
          radius={5}
          >

          </CardView>
        </View>

      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        width:Dimensions.get('window').width,
          justifyContent:'center',
          backgroundColor:'#ffffff',
        }, 
        card:{
          width:Dimensions.get('window').width,
          height:'auto',
         borderRadius: 100 / 4,
         margin: 5,
         alignItems:'center',
         flexDirection: 'row',   
        },
});
