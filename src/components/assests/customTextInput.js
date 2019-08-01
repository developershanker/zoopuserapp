import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput } from 'react-native';
import {  } from 'react-native-paper';

export const CustomTextInput =(props)=> {
  const{maxLength,isFocused,style={},placeholder,value,onChangeText,disabled}=props;
    return (
      <View>
       <TextInput
       maxLength={maxLength}
       value={value}
       style={style}
       isFocused={isFocused}
       placeholder={placeholder}
       disabled={disabled}
       onChangeText={onChangeText}
       ></TextInput>
      </View>
    );
  };
  
