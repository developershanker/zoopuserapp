import React, { Component } from 'react';
import { View, Text , StyleSheet ,Dimensions,FlatList} from 'react-native';


export class StationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ListItems:[
            {key:"1",stationName:"Kanpur",haltMins:"05",scheduleTime:"11:50",expectedTime:"12:00"}
        ]
    };
  }

  render() {
    return (
      <View style={styles.slide}>
          <FlatList
          data={this.state.ListItems}
        renderItem={ ({item}) =>
        <View>
        <Text style={styles.text}>{item.stationName}</Text>
        <View style={styles.stextview}>
        <Text style={styles.stext}>Halt Minutes : {item.haltMins}</Text>
        <Text style={styles.stext}> S.T.A:{item.scheduleTime} |</Text>
        <Text style={styles.stext}> E.T.A:{item.expectedTime}</Text>
        </View> 
        </View>}
        ></FlatList>
      </View>
    );
  }
}

const styles=StyleSheet.create({
slide:{
    flex:1,
    width:Dimensions.get('window').width - 10,
    alignItems:'stretch',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#ffffff',
    },
text:{
    marginLeft:20,
    fontSize:20,
    fontFamily:'Arial',
    fontWeight:'bold',
    color:'#000000',
    justifyContent:'center',
    },
stext:{
    fontSize:13,
    fontFamily:'Arial',
    fontWeight:'normal',
    color:'#000000',
    alignItems:'center'
},
stextview:{
    flexDirection:'row',
   marginLeft:Dimensions.get('window').width-250,
   justifyContent:'center'
}

})


