import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Button, } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";



export default class DeliveryMark extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  constructor(props) {
    super(props);
    this.state = {
      visibleModalId: null,
      visibleModal: 'bottom'
    };
  }
  


  render() {
    return (
      <View style={{ flex: 1 }}>

        <Modal
          isVisible={this.state.visibleModal === 'bottom'}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['up', 'left', 'right', 'down']}

          style={styles.bottomModal}
        >
          <View style={styles.modalView}>

            <Text style={styles.textQ}>Did you receive the order?</Text>
            {/* if 'yes' click this */}


            <TouchableOpacity onPress={() => {
               this.setState({ visibleModal: null }),
              this.props.navigation.navigate('OrderFeedback')
            }}>
              <View style={styles.optionView}>
                <Text style={{ fontWeight: 'bold', color: '#000000' }}>Yes</Text>
              </View>
            </TouchableOpacity>

            {/* if 'no' click this */}

            <TouchableOpacity onPress={() => {
              this.setState({ visibleModal: null }),
              this.props.navigation.navigate('TrackingOrder')
            }}>
              <View style={styles.optionView}>
                <Text style={styles.textO} >No</Text>
              </View>
            </TouchableOpacity>
            {/* to close the view */}

            {/* <TouchableOpacity onPress={() => this.setState({ isModalVisible: false })} >
              <Icon style={{ alignSelf: 'flex-start' }} name={'times'} color={'#ffffff'} size={20} />
            </TouchableOpacity> */}
          </View>
        </Modal>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  textQ: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 10
  },
  textO: {
    fontWeight: 'bold',
    color: '#000000'
  },
  modalView: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#4a8538',
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  optionView: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width: 50
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

})
