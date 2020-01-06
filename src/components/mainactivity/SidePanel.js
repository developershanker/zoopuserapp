import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { Fade } from '../assests/fade.js';
import Modal from "react-native-modal"
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import { Overlay } from 'react-native-elements';

export default class SidePanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: 'bottom',
        }
    }

    render() {
        return (
            <Modal
                isVisible={this.state.visibleModal === 'bottom'}
                onBackButtonPress={() => this.setState({ visibleModal: null })}
                onSwipeComplete={() => this.setState({ visibleModal: null })}
                swipeDirection={['left', 'right', 'down']}
                style={styles.bottomModal}
            >
                <View style={styles.modalView}>
                    {/* <View style={styles.gridContainer}>
                        <View>
                            <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.props.navigation.navigate('Register')}>
                                <Image style={styles.iconImg} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myProfile }} />
                                <Text style={styles.GridViewTextLayout}>Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.props.navigation.navigate('MyOrders')}>
                                <Image style={styles.iconImg} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myorders }} />
                                <Text style={styles.GridViewTextLayout}>My Orders</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.gridContainer}>
                        <View>
                            <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.props.navigation.navigate('MyWallet')}>
                                <Image style={styles.iconImg} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myWallet }} />
                                <Text style={styles.GridViewTextLayout}>My Wallet</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.GridViewContainer} onPress={() => this.props.navigation.navigate('Invite')}>
                                <Image style={styles.iconImg} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.invite }} />
                                <Text style={styles.GridViewTextLayout}>Invite & Earn</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <View style={{ width: Dimensions.get('window').width - 120, justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                            <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myProfile }} />
                            <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Profile</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyOrders')}>
                        <View style={{ width: Dimensions.get('window').width - 120, justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                            <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myorders }} />
                            <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>My Orders</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWallet')}>
                        <View style={{ width: Dimensions.get('window').width - 120, justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                            <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.myWallet }} />
                            <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>My Wallet</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Invite')}>
                        <View style={{ width: Dimensions.get('window').width - 120, justifyContent: 'flex-start', flexDirection: 'row', paddingLeft: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                            <Image style={{ width: 25, height: 25 }} source={{ uri: ConstantValues.IconUrl + ConstantValues.imgurl.invite }} />
                            <View style={{ width: 100, height: 25, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Invite & Earn</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#e7e7e7'
    },
    gridContainer: {
        width: Dimensions.get('screen').width,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        margin: 20,
        // backgroundColor: '#e7e7e7',
        height: 100
    },
    modalView: {
        width: Dimensions.get('screen').width,
        height: ConstantValues.deviceHeight - 200,
        backgroundColor: '#ffffff',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 10,
        // borderTopStartRadius: 100 / 5,
        // borderTopEndRadius: 100 / 5
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
})