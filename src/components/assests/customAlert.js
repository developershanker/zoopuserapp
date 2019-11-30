import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Alert ,Dimensions} from 'react-native';
import Modal from 'react-native-modal'
import { CustomButtonShort } from './customButtonShort';


export const CustomAlert = (props) => {
  const {onBackButtonPress, leftTitle, rightTitle, alertHeading, alert, subAlert, visibleModal, onPressRight, onPressLeft, modalView = {} } = props;

  return (
    <Modal
      isVisible={visibleModal}
      onBackButtonPress={onBackButtonPress}
      // onSwipeComplete={() => this.setState({ visibleModal: null })}
      // swipeDirection={['left', 'right']}
      style={styles.centerModal}
    >
      <View style={[styles.modalView, modalView]}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Text style={styles.tiletextH}>{alertHeading}</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', paddingTop: 5, textAlign: 'center' }}>{alert}</Text>
          <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', paddingTop: 5, textAlign: 'center' }}>{subAlert}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {/* for cancel */}
          <CustomButtonShort
            onPress={onPressRight}
            title={rightTitle}
            style={{ alignSelf: 'center', backgroundColor: '#e7e7e7' }}
            textStyle={{ color: '#9b9b9b' }} />
            {/* for ok */}
          <CustomButtonShort
            onPress={onPressLeft}
            title={leftTitle}
            style={{ alignSelf: 'center', backgroundColor: '#e7e7e7' }}
            textStyle={{ color: '#F15926' }} />
        </View>
      </View>

    </Modal>

  );


};



const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  tiletextH: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: 18
  },
  text: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#FF5819',
    paddingVertical: 5
  },
  centerModal: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalView: {
    width: Dimensions.get('screen').width - 20,
    height: 170,
    backgroundColor: '#ffffff',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopStartRadius: 100 / 5,
    borderTopEndRadius: 100 / 5,
    borderBottomStartRadius: 100 / 5,
    borderBottomEndRadius: 100 / 5
  },
})