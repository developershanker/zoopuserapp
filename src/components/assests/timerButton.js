import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class timerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowingText=true
    };

  }

  render() {
    return (
      <View>
        <Text> timerButton </Text>
      </View>
    );
  }
}
