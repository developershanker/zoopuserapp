import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
export default class ButtonExample extends Component {
    componentDidMount() {
        SplashScreen.hide();
        }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button>
            <Text>Click Me!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}