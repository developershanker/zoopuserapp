import React, { Component } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';

class AuthLoadingScreen extends Component {
    componentDidMount() {
        SplashScreen.hide();
        this._bootstrapAsync();
        // this.getCustomerId();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {


        try {
           await AsyncStorage.getItem('x-authtoken').then((userToken) => {
                if (userToken != '') {
                    ConstantValues.token = userToken
                    console.log('ConstantValues.token : ' + ConstantValues.token)
                    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
                } else {
                    return (
                        ToastAndroid.showWithGravity('Something went wrong!!', ToastAndroid.BOTTOM)
                    )
                }
            }).done();
        } catch (error) {
            console.log(error)
        }
        // let keys = ['x-authtoken', 'customerId'];
        // await AsyncStorage.multiGet(keys, (err, stores) => {
        //     stores.map((result, i, store) => {
        //         let key = store[i][0]; //reurn one key
        //         let value = store[i][1]; //return value for key
        //         let multiget = result; //return key and it's value
        //         console.log('result : ' + result)
        //         console.log('key, value : ' + key  , value)
        //         this.props.navigation.navigate(value ? 'App' : 'Auth');
                // if (result == 'x-authtoken') {
                //     ConstantValues.token = value
                //     console.log('ConstantValues.token : ' + ConstantValues.token)
                //     this.props.navigation.navigate(value ? 'App' : 'Auth');
                // } else {
                //     return (
                //         ToastAndroid.showWithGravity('Something went wrong!!', ToastAndroid.BOTTOM)
                //     )
                // }
                // result.forEach((key,value)=>{
                    
                //     if (keys == 'x-authtoken') {
                //         ConstantValues.token = value
                //         console.log('ConstantValues.token : ' + ConstantValues.token)
                //         //this.props.navigation.navigate(value ? 'App' : 'Auth');
                //     } else {
                //         return (
                //             ToastAndroid.showWithGravity('Something went wrong!!', ToastAndroid.BOTTOM)
                //         )
                //     }
                // }
                // )
                
                
          //  })
        //})

    };
    getCustomerId = async () => {

        try {
            await AsyncStorage.getItem('customerId').then((customerId) => {
                ConstantValues.customerId = customerId
                console.log('ConstantValues.customerId : ' + ConstantValues.customerId)
            }).done();
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <View style={styles.slide}>
                <ActivityIndicator
                    color={'#FF5819'}
                    size={40}
                    animating={true} />
                <Text style={styles.text}>Loading...</Text>
                {/* <StatusBar barStyle="default" /> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#FF5819',
        paddingVertical: 10
    }

})

export default AuthLoadingScreen;
