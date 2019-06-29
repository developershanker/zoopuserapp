import React, { Component } from 'react';
import { View ,TouchableOpacity,StyleSheet} from 'react-native';
import {Button, Text,Icon} from 'native-base';
import SplashScreen from 'react-native-splash-screen';


export default class Welcome extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.slide}>
          {/* <Text>Login</Text> */}
        
          <Button iconLeft onPress={()=>this.props.navigation.navigate('Login')}>
            <Text>Login</Text>
            <Icon name='home' />
            </Button>
        <Button iconRight dark onPress={()=>this.props.navigation.navigate('Search')}>
            <Text>Skip</Text>
            <Icon name='arrow-forward' />
            </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#f7e759'
    },
    image: {
      width:100,
      height:100,
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      paddingHorizontal: 16,
    },
    title: {
    justifyContent: 'center',
      fontSize: 60,
      color: 'black',
      backgroundColor: 'transparent',
      textAlign: 'center',
      marginBottom: 16,
    }
  });
