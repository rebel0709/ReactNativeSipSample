'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class CallHistory extends Component {
  render () {
    return (
      <View>
        <Text>Call History</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('CallHistory', () => CallHistory);
