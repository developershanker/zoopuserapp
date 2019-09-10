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
            const storedValues = await AsyncStorage.getItem('userInfo')
            // console.log('JSON.stringify(storedValues) : ' + JSON.stringify(storedValues))
             console.log('storedValues : ' + storedValues)
            //  storedValues : {"userToken":"pbkdf2_sha256$55000$UxLacxq6kwQ=$GqbBXFV+Kircxzvwf14je+wWpWa8+fxNnvcTaItB2xY=","customerId":2}
            let userInfo = JSON.parse(storedValues)
            let userToken  = userInfo.userToken 
            let customerId = userInfo.customerId
            console.log('Getting token from localstorage : ' + userToken)
            console.log('Getting CustomerId from localstorage : ' + customerId)
            if (userToken != '') {
                ConstantValues.token = userToken
                ConstantValues.customerId = customerId
                console.log('ConstantValues.token : ' + ConstantValues.token)
                console.log('ConstantValues.customerId : ' + ConstantValues.customerId)
                this.props.navigation.navigate(userToken ? 'App' : 'Auth');
            } else {
                return (
                    ToastAndroid.show('Something went wrong!!', ToastAndroid.BOTTOM)
                )
            }

        } catch (error) {
            this.props.navigation.navigate('Auth')
            console.log('Error in getting stored value from asyncstorage: ' + error)
        }

    };



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
