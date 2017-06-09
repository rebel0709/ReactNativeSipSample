import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class Test extends Component {
  constructor (props) {
    super(props);
    this.state = {
      test = this.props.info
    }
  }

  render () {
    return (
      <View>
        <Text>Call History</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Test', () => Test);
