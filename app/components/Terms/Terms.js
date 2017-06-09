'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class Terms extends Component {
  render () {
    return (
      <View>
        <Text>Terms</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Terms', () => Terms);
