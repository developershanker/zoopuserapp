import React, { Component } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ToastAndroid,
    Alert,
    Linking,
    BackHandler,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen';
import ConstantValues from '../constantValues';
import Spinner from 'react-native-spinkit';
import { ZoopLoader } from '../assests/zoopLoader';
import Modal from 'react-native-modal';
import Device from 'react-native-device-info';
import servicesApi from '../services/servicesApi';
import { CustomButtonShort } from '../assests/customButtonShort';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    Loader,
    Shine
} from "rn-placeholder";
import { StationLoader } from './stationLoader';
import Colors from '../colors';

class AuthLoadingScreen extends Component {
    async componentDidMount() {
        SplashScreen.hide();
        this.checkAppVersion();
        // this.tokenAsync();
        // this.checkPermission();
        // this.createNotificationListeners(); //add this line
    }
    // componentWillUnmount() {
    //     this.notificationListener;
    //     this.notificationOpenedListener;
    // }
    constructor(props) {
        super(props);
        this.state = {
            showVersionUpdateModal: null,
            loader: true
        };
    }
    //-------------------------notification management---------------------
    //1
    // async checkPermission() {
    //     const enabled = await firebase.messaging().hasPermission();
    //     if (enabled) {
    //         this.getToken();
    //     } else {
    //         this.requestPermission();
    //     }
    // }

    // //3
    // async getToken() {
    //     let fcmToken = await AsyncStorage.getItem('fcmToken');
    //     if (!fcmToken) {
    //         fcmToken = await firebase.messaging().getToken();
    //         if (fcmToken) {
    //             // user has a device token
    //             console.log('fcmToken:', fcmToken);
    //             await AsyncStorage.setItem('fcmToken', fcmToken);
    //         }
    //     }
    //     console.log('fcmToken:', fcmToken);
    // }

    // //2
    // async requestPermission() {
    //     try {
    //         await firebase.messaging().requestPermission();
    //         // User has authorised
    //         this.getToken();
    //     } catch (error) {
    //         // User has rejected permissions
    //         console.log('permission rejected');
    //     }
    // }


    // async createNotificationListeners() {
    //     /*
    //     * Triggered when a particular notification has been received in foreground
    //     * */
    //     this.notificationListener = firebase.notifications().onNotification((notification) => {
    //         const { title, body } = notification;
    //         console.log('onNotification:');
    //         const localNotification = new firebase.notifications.Notification({
    //             sound: 'sampleaudio',
    //             show_in_foreground: true,
    //         })
    //             .setSound('sampleaudio.wav')
    //             .setNotificationId(notification.notificationId)
    //             .setTitle(notification.title)
    //             .setBody(notification.body)
    //             .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
    //             .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
    //             .android.setColor('#000000') // you can set a color here
    //             .android.setPriority(firebase.notifications.Android.Priority.High);
    //         firebase.notifications()
    //             .displayNotification(localNotification)
    //             .catch(err => console.error(err));
    //     });
    //     const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
    //         .setDescription('Demo app description')
    //         .setSound('sampleaudio.wav');
    //     firebase.notifications().android.createChannel(channel);

    //     /*
    //     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    //     * */
    //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //         const { title, body } = notificationOpen.notification;
    //         console.log('onNotificationOpened:');
    //         Alert.alert(title, body)
    //     });

    //     /*
    //     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    //     * */
    //     const notificationOpen = await firebase.notifications().getInitialNotification();
    //     if (notificationOpen) {
    //         const { title, body } = notificationOpen.notification;
    //         console.log('getInitialNotification:');
    //         Alert.alert(title, body)

    //     }
    //     /*
    //     * Triggered for data only payload in foreground
    //     * */
    //     this.messageListener = firebase.messaging().onMessage((message) => {
    //         //process data message
    //         console.log("JSON.stringify:", JSON.stringify(message));
    //     });
    // }

    async checkAppVersion() {
        const appVersion = Device.getVersion();
        console.log('App Version is : ' + appVersion)
        try {
            let response = await servicesApi.checkAppVersion(appVersion)
            if (response.status == true) {
                console.log('App Version data is :' + response.data)
                if (response.data == true) {
                    console.log('Status of App Version data is :' + response.data + 'App version matched!!!')
                    this.getRecentItem()
                    this.tokenAsync()
                } else if (response.data == false) {
                    this.setState({
                        loader: false,
                        showVersionUpdateModal: 'center'
                    })
                }
            } else {
                console.log('Error in getting app version')
                this.setState({
                    loader: false,
                    showVersionUpdateModal: 'center'
                })
            }
        } catch (error) {
            console.log('I am in catch of getversionAPI.Error in getting app version ' + error)
        }

    }


    gotoLink = () => {
        let link = 'https://play.google.com/store/apps/details?id=com.zoop.zoopindiaservice'
        Linking.openURL(link);
    }

    //  ---------------------fetchingusertoken for zoop app------------------


    getRecentItem = async () => {
        try {
            const recentSearch = await AsyncStorage.getItem('recentSearch')
            let getRecentSearch = new Array()
            getRecentSearch = JSON.parse(recentSearch)
            console.log('getRecentSearch::: without filter : ' + JSON.stringify(getRecentSearch))
            var myData = getRecentSearch;
            getRecentSearch = Array.from(new Set(myData.map(JSON.stringify))).map(JSON.parse);
            console.log(getRecentSearch)
            console.log('getRecentSearch::: with filter : ' + JSON.stringify(getRecentSearch))
            ConstantValues.getRecentSearch = getRecentSearch
            console.log('ConstantValues.getRecentSearch : ' + JSON.stringify(ConstantValues.getRecentSearch))
        } catch (error) {
            console.log('Error in fetching asyncstorage:::::getRecentItem : ' + error)
        }
    }



    // Fetch the token from storage then navigate to our appropriate place
    tokenAsync = async () => {
        try {
            const storedValues = await AsyncStorage.getItem('userInfo')
            // console.log('JSON.stringify(storedValues) : ' + JSON.stringify(storedValues))
            console.log('storedValues : ' + storedValues)
            //  storedValues : {"userToken":"pbkdf2_sha256$55000$UxLacxq6kwQ=$GqbBXFV+Kircxzvwf14je+wWpWa8+fxNnvcTaItB2xY=","customerId":2}
            let userInfo = JSON.parse(storedValues)
            let userToken = userInfo.userToken
            let customerId = userInfo.customerId
            let isAgent = userInfo.isAgent
            console.log('Getting token from localstorage : ' + userToken)
            console.log('Getting CustomerId from localstorage : ' + customerId)
            console.log('Getting isAgent from localstorage : ' + isAgent)
            if (userToken != '') {
                ConstantValues.token = userToken
                ConstantValues.customerId = customerId
                ConstantValues.isAgent = isAgent
                console.log('ConstantValues.token : ' + ConstantValues.token)
                console.log('ConstantValues.customerId : ' + ConstantValues.customerId)
                console.log('ConstantValues.isAgent : ' + ConstantValues.isAgent)
                this.props.navigation.navigate(userToken ? 'App' : 'App');
            } else {
                return (
                    ToastAndroid.show('Something went wrong!!', ToastAndroid.BOTTOM)
                )
            }

        } catch (error) {
            this.props.navigation.navigate('App')
            console.log('Error in getting stored value from asyncstorage: ' + error)
        }

    };





    render() {
        return (
            <View style={styles.slide}>
                <Placeholder
                    style={styles.slideIn}
                    Animation={Shine}
                >
                    <PlaceholderMedia style={{ width: 60, height: 30, marginTop: 30, margin: 10 }} />
                    <PlaceholderMedia style={{ width: ConstantValues.deviceWidth - 20, height: '15%', marginTop: 30, margin: 10 }} />
                    <PlaceholderLine width={0} />
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine /><PlaceholderLine width={30} />
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine />

                    <PlaceholderMedia style={{ width: ConstantValues.deviceWidth - 20, height: '20%', marginTop: 20, margin: 10 }} />
                </Placeholder>
                {/* <StationLoader/> */}


                {/* <Spinner size={100} type={'FadingCircleAlt'} color={'#898c8b'} isVisible={this.state.loader} /> */}
                {/* <Text style={styles.text}>Loading...</Text> */}
                {/* <StatusBar barStyle="default" /> */}

                <Modal
                    isVisible={this.state.showVersionUpdateModal === 'center'}
                    // onBackButtonPress={() => this.setState({ visibleModal: null })}
                    // onSwipeComplete={() => this.setState({ visibleModal: null })}
                    // swipeDirection={['left', 'right', 'down']}
                    style={styles.centerModal}
                >
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, color: Colors.newOrange, fontFamily: 'Poppins-Medium' }}>Update Available</Text>
                        <Text style={{ fontSize: 15, color: '#696b6a', fontFamily: 'Poppins-Regular', textAlign: 'center', alignSelf: 'center' }}>New version of Zoop available! Download and get better app experience</Text>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                            <CustomButtonShort
                                textStyle={{ color: Colors.darkGrey1 }}
                                style={{ backgroundColor: Colors.white, borderColor: Colors.darkGrey1, borderWidth: 1 }}
                                title='Exit'
                                onPress={() => BackHandler.exitApp()}
                            />
                            <CustomButtonShort
                                textStyle={{ color: Colors.white }}
                                style={{ backgroundColor: Colors.newgGreen3 }}
                                title='Update'
                                onPress={() => this.gotoLink()}
                            />

                        </View>
                    </View>
                </Modal>

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
    slideIn: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
        alignItems: 'stretch',
        alignContent: 'stretch',
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#FF5819',
        paddingVertical: 10
    },
    centerModal: {
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        // margin: 0,
    },
    modalView: {
        width: Dimensions.get('screen').width - 20,
        height: 200,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
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
        // borderBottomWidth: 2,
        // borderBottomColor: '#cfc7c4',
        // borderColor: '#ebe9e8',
        // borderWidth: 1,
        // backgroundColor: '#ffffff'
    },

})


export default AuthLoadingScreen;
