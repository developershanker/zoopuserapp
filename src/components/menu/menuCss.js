import {
    StyleSheet,
    Dimensions} from 'react-native';
    
const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: '#ffffff',
    },
    topContainer: {
      width: Dimensions.get('window').width,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
    },
    outletName: {
      // paddingTop: 15,
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 20,
      color: '#000000',
      fontFamily: 'Poppins-Medium',
    },
    card: {
      width: Dimensions.get('window').width,
      height: 60,
      borderRadius: 6,
      margin: 5,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#ffffff',//can change as we move to various pages
      marginBottom: 10,//can change as we move to various pages
      marginLeft: '2%', //can change as we move to various pages
      // width: '96%', //can change as we move to various pages
      borderColor: '#e4e4e4',
      // borderRadius: 100 / 9,
      borderWidth: 1,
      shadowOpacity: 0.4,
      borderBottomColor: '#e4e4e4',
      borderBottomWidth: 2,
    },
    // OFFER BOARD STYLES
    offerText: {
      color: '#ffffff',
      fontFamily: 'Poppins-Medium',
      fontSize: 15
    },
    plusminus: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      borderRadius: 6
    },
    offerboard: {
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width,
      backgroundColor: '#ff9214',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalView: {
      width: Dimensions.get('screen').width,
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderTopStartRadius: 100 / 5,
      borderTopEndRadius: 100 / 5
    },
    //  MENU ITEM STYLES{GRID}
    menuCardContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      width: Dimensions.get('window').width - 10,
      borderRadius: 6,
      backgroundColor: '#ffffff',//can change as we move to various pages
      marginBottom: 10,//can change as we move to various pages
      marginLeft: '2%', //can change as we move to various pages
      // borderColor: '#e4e4e4',
      // borderWidth: 1,
      shadowOpacity: 0.4,
    },
    itemImage: {
      marginVertical: 5,
      justifyContent: 'center',
      alignSelf: 'center',
      width: 95,
      height: 95,
      borderRadius: 5,
    },
    itemName: {
      paddingHorizontal: 5,
      width: 200,
      fontFamily: 'Poppins-Light',
      fontSize: 15,
      color: '#000000'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Dimensions.get('window').width,
      height: 50,
      backgroundColor: '#60b246',
      alignContent: 'center',
      alignItems: 'center'
  
    },
    viewcart: {
      flexDirection: 'row',
      marginBottom: 10,
      marginRight: 15,
      alignSelf: 'flex-end'
  
    },
    itemCountShow: {
      flexDirection: 'row',
      marginTop: 15,
      marginRight: 15,
      alignSelf: 'flex-start',
    },
    fab: {
      flexDirection: 'row',
      position: 'absolute',
      width: 100,
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
      marginLeft: 10,
      fontSize: 15,
      color: 'white',
      fontFamily: 'Poppins-Medium'
    },
    headerTextmodal: {
      alignSelf: 'center',
      fontFamily: 'Poppins-Medium',
      fontSize: 15,
      color: '#000000',
      paddingVertical: 10
    },
    modalItemView: {
      width: Dimensions.get('window').width,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#e4e4e4',
    }
  });

  export default styles;