import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import { Container, Header, Content, Accordion } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-navigation';
import ConstantValues from '../constantValues.js';
import BillCardDetail from '../cart/billDetailCard.js';
import { CustomButton } from '../assests/customButtonLarge.js';
import { Fade } from '../assests/fade.js';
import Colors from '../colors.js';



const dataArray = [
  { title: "Q.1 - How can customers book food for journeys?", content: "Customers can log on to www.Zoopindia.com or download our mobile app from Google playstore, enter their journey details, and our automated systems will list all the options for your selection. You may also call us at 8010802222 or IRCTC call centre number 1323, where our team members will be very happy to assist you." },
  { title: "Q.2 - How will a customer know that his order is booked?", content: "At the successful booking of every order, an order ID is generated which is sent to your mobile number through an SMS. All registered customers are also sent an email for the same." },
  { title: "Q.3 –Who delivers the food in Train?", content: "Food is delivered by the restaurant chosen by you while placing the order. For example – If your food is booked to be delivered at Bhopal, then the restaurant at Bhopal in our network will deliver that order to you, right at your seat." },
  { title: "Q.4 - Does a customer need to stand at the gate of the railway coach or step out on the platform to collect the order.?",content:"Just in case you are too excited to get your food, we advise all our customers to be still seated at their seat / berth only and not move out anywhere. Moreover, we feel it’s convenient too."},
  { title: "Q.5 - If the train is running late, then how will Zoop ensure timely deliveries?",content:"Indian Railways have improved a lot, and are normally running on time, but in case of an unfortunate situation of a delay, we can pre-pone your order to a station before (with your permission and choice) as we are present at more than 100+ stations. This will try and ensure that even if the train is running late, your order is delivered to you around the expected delivery time only "+
  'Customers can log on to www.Zoopindia.com or download our mobile app from Google playstore, enter their journey details, and our automated systems will list all the options for your selection.'+
  ' You may also call us at 8010802222 or IRCTC call centre number 1323, where our team members will be very happy to assist you'},
  // { title: "",content:""},
  // { title: "",content:""},
  // { title: "",content:""},
  // { title: "",content:""},
  // { title: "",content:""},
  // { title: "",content:""},
  // { title: "",content:""},
  // { title: "",content:""},

];
export default class faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
         {/* header view */}
         <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                <Icon style={{ margin: 20 }} name={'chevron-left'} size={20} color={'#000000'} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: Dimensions.get('window').width - 100, alignItems: 'center' }}>
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Medium', fontSize: 18, color: Colors.newOrange }}> FAQs </Text>
              </View>
            </View>
            {/* header view ends */}

        <Content padder>
          <Accordion dataArray={dataArray} expanded={0}/>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
})
