import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const CustomButton = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress,disabled } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} disabled={disabled}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        width: 100,
        height: 30,
        borderRadius: 5,
        justifyContent:'center',
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#f2c744',
        shadowColor: '#f2c744',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 10 },
        shadowRadius: 20,
        margin: 10,
        borderRadius: 50 / 2,
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
        justifyContent:'center',
        fontFamily:'Poppins-Bold'
    },
});
