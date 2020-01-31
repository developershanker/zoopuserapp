import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './stationCss.js';
import { PlaceholderMedia } from 'rn-placeholder';

export const OutletCard = (props) => {
    return(
    <View>
        <PlaceholderMedia style={styles.outletimageloader}/>
    </View>
    )
}


export default OutletCard