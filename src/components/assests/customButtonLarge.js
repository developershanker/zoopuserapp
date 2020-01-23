import React from 'react';
import { TouchableOpacity, StyleSheet, Text,Dimensions } from 'react-native';
import Colors from '../colors';


export const CustomButton = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress,disabled,activeOpacity } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled} activeOpacity={activeOpacity}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        width: Dimensions.get('window').width - 20,
        height: 30,
        borderRadius: 5,
        justifyContent:'center',
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: Colors.newOrange,
        shadowColor: Colors.newOrange,
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 10 },
        shadowRadius: 20,
        marginTop:10,
        marginBottom: 10,
        
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
        justifyContent:'center',
        fontFamily:'Poppins-SemiBold'
    },
});
