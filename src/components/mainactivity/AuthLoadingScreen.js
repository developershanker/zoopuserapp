import React, { Component } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ToastAndroid,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';
import Spinner from 'react-native-spinkit';
import { ZoopLoader } from '../assests/zoopLoader';

class AuthLoadingScreen extends Component {
   async componentDidMount() {
        SplashScreen.hide();
        this._bootstrapAsync();
        this.checkPermission();
        this.createNotificationListeners(); //add this line
    }
    componentWillUnmount() {
        this.notificationListener;
        this.notificationOpenedListener;
    }
    //-------------------------notification management---------------------
    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                console.log('fcmToken:', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log('fcmToken:', fcmToken);
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }


    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            console.log('onNotification:');
            const localNotification = new firebase.notifications.Notification({
                sound: 'sampleaudio',
                show_in_foreground: true,
            })
                .setSound('sampleaudio.wav')
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setBody(notification.body)
                .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
                .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
                .android.setColor('#000000') // you can set a color here
                .android.setPriority(firebase.notifications.Android.Priority.High);
            firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
        });
        const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
            .setDescription('Demo app description')
            .setSound('sampleaudio.wav');
        firebase.notifications().android.createChannel(channel);

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log('onNotificationOpened:');
            Alert.alert(title, body)
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            console.log('getInitialNotification:');
            Alert.alert(title, body)

        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log("JSON.stringify:", JSON.stringify(message));
        });
    }




    //  ---------------------fetchingusertoken for zoop app------------------




    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        try {
            const storedValues = await AsyncStorage.getItem('userInfo')
            // console.log('JSON.stringify(storedValues) : ' + JSON.stringify(storedValues))
            console.log('storedValues : ' + storedValues)
            //  storedValues : {"userToken":"pbkdf2_sha256$55000$UxLacxq6kwQ=$GqbBXFV+Kircxzvwf14je+wWpWa8+fxNnvcTaItB2xY=","customerId":2}
            let userInfo = JSON.parse(storedValues)
            let userToken = userInfo.userToken
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
                {/* <ActivityIndicator
                    color={'#FF5819'}
                    size={40}
                    animating={true} /> */}
                <Spinner size={100} type={'FadingCircleAlt'} color={'#FF5819'} isVisible={true} />
                <Text style={styles.text}>Loading...</Text>
                {/* <StatusBar barStyle="default" /> */}
            </View>
            // <ZoopLoader isVisible={true} text={'Loading...'} />
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
