import {
    StyleSheet,
    Dimensions} from 'react-native';

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      // alignContent:'flex-start',
      // justifyContent: 'flex-start',
      backgroundColor: '#fff',
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: '#ffffff',
    },
    stationContainer: {
      margin: 5,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: '#ffffff',
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
    outletContainer: {
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      // backgroundColor: '#ffffff',
    },
    searchBarView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginHorizontal: 5
    },
    card: {
      backgroundColor: '#ffffff',//can change as we move to various pages
      marginBottom: 10,//can change as we move to various pages
      marginLeft: '2%', //can change as we move to various pages
      width: '96%', //can change as we move to various pages
      // borderColor: '#e4e4e4',
      // borderRadius: 100 / 9,
      // borderWidth: 1,
      // shadowOpacity: 0.4,
      // borderBottomColor: '#e4e4e4',
      // borderBottomWidth: 4,
      alignItems: 'center',
      flexDirection: 'row',
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
    scroll: {
      height: 'auto',
      flexDirection: 'column'
      // marginLeft: 10,
    },
    name: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 5,
      justifyContent: 'center',
      alignSelf: 'center',
      width: 100
    },
    image: {
      width: 100,
      height: 100,
      marginLeft: 5,
    },
    outletimage: {
      margin: 10,
      width: 100,
      height: 100,
      borderRadius: 100 / 4,
    },
    fabIcon: {
      fontFamily: 'Poppins-Medium',
      marginLeft: 10,
      fontSize: 15,
      color: 'white'
    },
    contentContainer: {
      paddingVertical: 25,
      justifyContent: 'space-around',
    },
    text: {
      alignItems: 'center',
      fontSize: 15,
      // justifyContent:'center'
    },
    detail: {
      width: Dimensions.get('screen').width - 100,
      height: 120,
      flexDirection: 'row'
    },
    outletname: {
      width: 130,
      paddingTop: 10,
      marginLeft: 10,
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
      color: '#000000',
      justifyContent: 'center',
    },
    roundImage: {
      width: 70,
      height: 70,
      borderRadius: 100 / 2,
      marginLeft: 20,
      backgroundColor: '#ff5819'
    },
    ratingView: {
      backgroundColor: '#a5ce39',
      marginLeft: 20,
      marginTop: 5,
      width: 35,
      height: 20,   //#0e8341
      alignItems: 'center',
      borderRadius: 5
    },
    rating: {
      textAlign: 'center',
      fontSize: 13,
      justifyContent: 'center',
      fontFamily: 'Poppins-SemiBold',
      color: '#ffffff'
    },
    stationView: {
      width: 100,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    cuisine: {
      width: 150,
      // flexDirection:'row',
      fontSize: 10,
      fontFamily: 'Poppins-Regular',
      marginLeft: 10
    },
    minorder: {
      fontFamily: 'Poppins-Light',
      color: '#b32120',
      fontSize: 12,
      marginLeft: 10,
      marginTop: 5,
    },
    modalViewHeading: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#e5e5e5',
      borderBottomWidth: 1,
      paddingVertical: 5,
      width: Dimensions.get('screen').width
    },
    filterCard: {
      backgroundColor: '#ffffff',//can change as we move to various pages
      marginVertical: 10,//can change as we move to various pages
      // marginLeft: '2%', //can change as we move to various pages
      // width: '96%', //can change as we move to various pages
      width: 50,
      height: 50,
      borderColor: '#e4e4e4',
      borderRadius: 100 / 9,
      borderWidth: 1,
      shadowOpacity: 0.4,
      borderBottomColor: '#e4e4e4',
      borderBottomWidth: 4,
      alignItems: 'center',
      justifyContent: 'space-around'
      // flexDirection: 'row',
    },
    filterCardRow: {
      width: Dimensions.get('screen').width - 15,
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomColor: '#e5e5e5',
      borderBottomWidth: 1,
      paddingVertical: 20,
    },
    cuisineText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 15, color: '#000000',
      paddingVertical: 10,
      paddingHorizontal: 10
    },
    textheader: {
      marginLeft: 20,
      fontSize: 20,
      fontFamily: 'Poppins-Regular',
      color: '#000000',
      justifyContent: 'center',
    },
    stext: {
      fontSize: 13,
      fontFamily: 'Poppins-Regular',
      color: '#898c8b',
      alignItems: 'center'
    },
    stextview: {
      marginLeft: 20,
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    }
  
  })

  export default styles;