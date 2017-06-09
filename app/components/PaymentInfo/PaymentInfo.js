import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class PaymentInfo extends Component {
  render () {
    return (
      <View>
        <Text>Payment Info</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('PaymentInfo', () => PaymentInfo);
