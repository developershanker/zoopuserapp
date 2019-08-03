import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,Dimensions } from 'react-native';



export const CustomTextInput =(props)=> {
   const {placeholder = {} ,editable = {}, keyboardType = {},style = {}, autoCapitalize ={},onChangeText,onSubmitEditing} = props;

   return(
     <View style={[styles.input,style]}>
     <TextInput
     style = {[styles.text,style]}
     placeholder = {placeholder}
     keyboardType = {keyboardType}
     autoCapitalize = {autoCapitalize}
     onChangeText = {onChangeText}
     editable = {editable}
     blurOnSubmit = {true}
     onSubmitEditing = {onSubmitEditing}
     ></TextInput>
     </View>
   )
  }
  const styles = StyleSheet.create({
    input:{
        marginLeft:5,
        borderRadius:100/10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:2,
        width:Dimensions.get('window').width-10,
        borderColor:'#626663',
    },
    text:{
      width:Dimensions.get('window').width-10,
    }
  })
  
