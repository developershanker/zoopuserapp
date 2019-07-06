import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const CustomButton = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
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
        backgroundColor: '#000000',
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 10 },
        shadowRadius: 20,
        margin: 10,
    },
    text: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#ffffff',
        justifyContent:'center'
    },
});
