import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './menuCss';
import { PlaceholderMedia } from 'rn-placeholder';

export const MenuCard = (props) => {
    return(
    <View>
        <PlaceholderMedia style={{ alignItems: 'center', width: 90, borderRadius: 6}}/>
    </View>
    )
}


export default MenuCard