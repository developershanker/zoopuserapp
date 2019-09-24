import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const CustomButtonShort = (props) => {
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
        width: 150,
        height: 30,
        borderRadius: 5,
        justifyContent:'center',
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#00c74f',
        shadowColor: '#00c74f',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 10 },
        shadowRadius: 20,
        margin: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
        justifyContent:'center',
        fontFamily:'Poppins-Bold'
    },
});
