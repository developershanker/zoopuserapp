import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import ConstantValues from '../constantValues';


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
    alignItems: 'stretch',
    alignContent: 'stretch',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
  header: {
    width: ConstantValues.deviceWidth,
    height: '8%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 10
  },
  autocompleteContainer: {
    paddingTop: 20,
    flex: 1,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // zIndex: 1
  },
  mainD: {
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    width: Dimensions.get('screen').width,
    height: 400,
    backgroundColor: '#fff',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5
  },
  modalViewDrawer: {
    width: Dimensions.get('window').width - 140,
    height: ConstantValues.deviceHeight,
    backgroundColor: '#fff',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5,
    borderBottomEndRadius: 100 / 5
  },
  scroll: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: '40%',
  },
  img: {
    width: Dimensions.get('window').width,
    height: 120,
    marginLeft: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 160,
    // flexWrap: 'nowrap',
    resizeMode: 'cover'
    // marginLeft: 5
  },
  contentContainer: {
    justifyContent: 'space-around',
    // height:120
  },
  radioButton: {
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: '5%',
    justifyContent: 'space-around',
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  inputView: {
    width: Dimensions.get('window').width - 20,
    marginLeft: 5,
    borderRadius: 10,
    borderColor: '#cfc7c4',
    borderWidth: 1,
    // paddingVertical: 5
  },
  box: {
    margin: 5,
    borderRadius: 10 / 10,
    borderColor: '#e7e7e7',
    borderWidth: 1,
    paddingVertical: 5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  inputViewD: {
    marginLeft: 5,
    borderRadius: 10,
    borderColor: '#cfc7c4',
    borderWidth: 1,
    // paddingVertical: 5,
    width: Dimensions.get('window').width - 20,
  },
  itemText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
  input: {
    fontSize: 15,
    color: '#635c5a',
    width: Dimensions.get('window').width - 20,
    fontFamily: 'Poppins-Regular',
  },
  inputAuto: {
    // width:Dimensions.get('window').width - 50,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    // zIndex: 1
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  dropdown: {
    height: 30,
    justifyContent: 'center',
    fontSize: 20,
    color: '#000000',
    width: Dimensions.get('window').width - 30,
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    borderBottomColor: '#000000'
  },
  // autocompleteContainer: {
  //   width: Dimensions.get('window').width - 20,
  //   height:'20%'
  // },
  gridContainer: {
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    height: '20%'
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 100,
    height: 90,
    // shadowOffset: { width: 3, height: 0 },
    // shadowRadius: 6,
    borderRadius: 5,
    // shadowOpacity: 0.4,
    borderBottomWidth: 2,
    borderBottomColor: '#cfc7c4',
    borderColor: '#ebe9e8',
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  GridViewTextLayout: {
    fontSize: 8,
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
    padding: 5,
  },
  iconImg: {
    width: 64,
    height: 64
  },
  imageTop: {
    width: Dimensions.get('screen').width,
    height: 120,
  }
})

export default styles;