import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Button, Platform, Image, ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
// import RatingView from './ratingView';
import ConstantValues from '../constantValues';
import { Fade } from '../assests/fade';
import { CustomButton } from '../assests/customButtonLarge.js';


export default class OrderFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModalId: null,
            visibleModal: 'bottom',
            Default_Rating: 1,
            //To set the default Star Selected
            Max_Rating: 5,
            //To set the max number of Stars
            tagVisible: false
        };
        //Filled Star. You can also give the path from local
        this.Star = 'https://aboutreact.com/wp-content/uploads/2018/08/star_filled.png';
        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://aboutreact.com/wp-content/uploads/2018/08/star_corner.png';
    }

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
        ConstantValues.orderRating = key
        console.log('ConstantValues.orderRating: ' + ConstantValues.orderRating)
        //Keeping the Rating Selected in state
    }

    showTags(bool) {
        this.setState({ tagVisible: bool });
    }


    render() {
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}>
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableOpacity>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={this.state.visibleModal === 'bottom'}
                    onSwipeComplete={() => this.setState({ visibleModal: null })}
                    swipeDirection={['left', 'right',]}
                    style={styles.bottomModal}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setState({ visibleModal: null })}>
                            <Icon name={'times-circle'} style={{ alignSelf: 'flex-end' }} size={20} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.heading}>Rate Your Food</Text>
                            {/*View to hold our Stars*/}
                            <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                            {/* <Text style={{color:'#000000',fontSize:30}}>ratings are here:{ConstantValues.orderRating}</Text> */}
                        </View>
                        <Image style={{ alignSelf: 'center', height: 15, paddingVertical: 20 }} source={require('../images/line.png')} />
                        <View style={styles.feedbackView}>
                            <Text style={styles.heading}>REPORT ISSUE</Text>
                            <TouchableOpacity onPress={() => { this.showTags(!this.state.tagVisible) }}>
                                <Icon name={this.state.tagVisible == true ? 'chevron-up' : 'chevron-down'} style={{ paddingHorizontal: 5 }} size={20} color={'#000000'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tagView}>
                            <Fade visible={this.state.tagVisible == true ? true : false}>
                                {/* make your tags here */}
                                <View>
                                    <Text>Tags</Text>
                                    <Text>Tags</Text>
                                    <Text>Tags</Text>
                                    <Text>Tags</Text>
                                    <Text>Tags</Text>
                                    <Text>Tags</Text>
                                    <Text>Tags</Text>
                                    <Text>Tags</Text>
                                </View>
                            </Fade>
                        </View>
                        <CustomButton
                            style={{ backgroundColor: '#1fc44e', alignSelf: 'center', }}
                            onPress={() => {
                                ToastAndroid.show('Feedback Submitted Successfully', ToastAndroid.LONG),
                                    this.setState({ visibleModal: null }),
                                    this.props.navigation.navigate('Search')

                            }}
                            title='Submit'
                        />

                    </View>

                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalView: {
        width: Dimensions.get('screen').width,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        // height: 300,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopStartRadius: 100 / 5,
        borderTopEndRadius: 100 / 5
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    StarImage: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
    },
    heading: {
        fontSize: 20,
        color: '#000000',
        fontFamily:'Poppins-Bold'
    },
    feedbackView: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    tagView: {
        width: Dimensions.get('screen').width,
        paddingHorizontal: 10,
        paddingVertical: 10

    }
})