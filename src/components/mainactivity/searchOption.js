import React, { Component } from 'react';
import { View,FlatList,Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import { InputAutoSuggest } from 'react-native-autocomplete-input';



export default class searchOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
    };
  }
  componentDidMount(){
    fetch('https://api.myjson.com/bins/1159gb')
    .then(response =>response.json())
    .then((responseJson)=>{
      this.setState({
          loading: false,
          dataSource:responseJson
      })
    })
    .catch(error=>console.log(error))
   }
   renderItem=(data)=>
   <TouchableOpacity style={styles.list}>
   <Text style={styles.heading}>{data.item.train}</Text>
   </TouchableOpacity>
   render(){
    if(this.state.loading){
     return( 
       <View style={styles.loader}> 
         <ActivityIndicator size="large" color="#0c9"/>
       </View>
   )}
   return(
    <View style={styles.container}>
    <InputAutoSuggest
       data= {this.state.dataSource}
       renderItem= {item=> this.renderItem(item)}
       keyExtractor= {data=>data.train.toString()}
    />
    </View>
      )
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#0c9"
   },
   heading:{
    color: 'black',
    fontFamily:'Poppins-Bold',
    fontSize: 20,
  }
});
