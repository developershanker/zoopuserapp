import React, { Component } from 'react';
import { View, Text,FlatList,StyleSheet,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';

export class CustomGridIcon extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        GridListItems: [
          { key: "truck",text:"Spot Your train" },
          { key: "flash",text:"Train Time Table" },
          { key: "medkit",text:"Coach Layout"  },
          { key: "compass",text:"Check PNR"  },
          { key: "building",text:"Platform"  },
          { key: "cab",text:"HelpLine"  },
          ]
    };
  }
  GetGridViewItem(item) {
    Alert.alert(item);
  }

  render() {
    return (
        <View>
          <FlatList
             data={ this.state.GridListItems }
             renderItem={ ({item}) =>
               <View style={styles.GridViewContainer}>
                 <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}
            style={styles.icon}
            >
                {/* <Text style={styles.GridViewTextLayout} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text> */}
               <Icon  name={item.key} size={30} color="#000000" onPress={this.GetGridViewItem.bind(this,item.key)} />
               <Text>{item.text}</Text>
               </CardView>
               </View> }
             numColumns={3}
          />
          
        </View>
     );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: "#ffffff"
    },
    headerText: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      fontWeight: "bold"
    },
    GridViewContainer: {
     flex:1,
     justifyContent: 'center',
     alignItems: 'center',
     height: 100,
     backgroundColor: '#ffffff'
  },
  GridViewTextLayout: {
     fontSize: 20,
     fontWeight: 'bold',
     justifyContent: 'center',
     color: '#fff',
     padding: 10,
   },
   icon:{
    justifyContent: 'center',
    alignItems:'center',
     width:120,
     height:80
   }
  });