import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class CustomTouchableOpacity extends Component {
	render() {
		const { text, onPress,disabled} = this.props;
		return (
		  <TouchableOpacity 
			onPress={() => onPress()}
			disabled={disabled}
		  >
			 <Text style={styles.textStyle}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

CustomTouchableOpacity.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:20,
	color: '#202646',
	textAlign: 'center'
  },
  
  buttonStyle: {
	padding:10,
	backgroundColor: '#202646',
	borderRadius:5
  }
});

export default CustomTouchableOpacity;