import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


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
        width: 300,
        height: 30,
        borderRadius: 5,
        justifyContent:'center',
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#FF5819',
        shadowColor: '#FF5819',
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
        fontFamily:'Poppins-Bold'
    },
});
