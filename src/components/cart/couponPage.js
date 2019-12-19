import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView, TouchableOpacity ,TouchableWithoutFeedback, TextInput } from 'react-native';
import Modal from "react-native-modal";
import styles from './cartCss';
import moment from 'moment';


export const CouponPage = (props) => {
     
    const { visibleCouponModal , onBackButtonPress , onChangeCouponText , applyCouponsFromInput , applyCoupons , couponList } = props

    return(
        <KeyboardAvoidingView enabled>
          <Modal
            isVisible={visibleCouponModal}
            onBackButtonPress={onBackButtonPress}
            // onSwipeComplete={() => this.setState({ visibleModal: null })}
            // swipeDirection={['left', 'right']}
            style={styles.bottomModal}
          >

            <View style={styles.modalView}>
              <View style={styles.promocodeInput}>
                <TextInput
                  style={{ fontSize: 15, textTransform: 'uppercase', fontFamily: 'Poppins-Medium', width: 200 }}
                  placeholder='Enter Promo Code'
                  // keyboardType='default'
                  autoCapitalize='characters'
                  onChangeText={onChangeCouponText}
                />
                <TouchableOpacity onPress={applyCouponsFromInput}>
                  <Text style={{ color: '#60b246', fontSize: 15, fontFamily: 'Poppins-Medium', }}>APPLY</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: Dimensions.get('window').width - 10, flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins-Medium', paddingHorizontal: 10 }}>Available Coupons</Text>
                {/* <Image style={{ height: 10, alignSelf: 'center' }} source={require('../images/line.png')} /> */}
              </View>


              {/* CouponDetail Card begin Here */}


              <FlatList
                data={couponList}
                renderItem={({ item }) =>

                  <View>
                    <View style={styles.card}>
                      <View>
                        <TouchableWithoutFeedback onPress={applyCoupons}>
                          <View style={styles.codeView}>
                            <Text style={styles.text}>{item.couponCode}</Text>
                          </View>
                        </TouchableWithoutFeedback>

                        <Text style={{ paddingTop: 5, color: '#000000', fontFamily: 'Poppins-Regular', }}>{item.discription}</Text>
                        <Text style={{ paddingTop: 5, fontFamily: 'Poppins-Regular', }}>Validity of this coupon is: {moment(item.validityEndDate).format('DD-MM-YYYY HH:mm A')}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={applyCoupons(item)}
                      >
                        <Text style={{ color: '#60b246', fontSize: 15, fontFamily: 'Poppins-Medium', alignSelf: 'flex-end', marginRight: 25 }}>APPLY</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                }
                keyExtractor={item => item.couponId.toString()}
              />

            </View>
            {/* CouponDetail Card ends Here  */}


          </Modal>
        </KeyboardAvoidingView>
    )


}