'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';


export default class Status extends Component {
  constructor (props) {
    super(props);

    this.state = {
      server_status: this.props.status
    };
  }

  componentDidMount () {
    this.getServerStatus();
    console.log(this.state.server_status);
  }

  getServerStatus () {
    if (this.state.server_status != 'success') {
      fetch('https://api.status.io/1.0/status/571e4481fe9259916000266a', {
        method: 'GET',
      })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.result.status_overall.status != 'Operational') {
          this.setState({server_status: resp.result.status_overall.status});
        }
      });
    } else {
      this.setState({server_status: 'Operational'});
    }
  }

  render () {
    return (
      <View style={this.state.server_status === 'Operational' ? styles.container : styles.containerError}>
        <Text style={styles.messageText}>Service Status: {this.state.server_status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(41, 184, 34, 0.54)',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent:'center',
    alignItems: 'center'
  },
  containerError: {
    backgroundColor: 'rgba(209, 25, 25, 0.55)',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    justifyContent:'center',
    alignItems: 'center'
  },
  messageText: {
    color: '#ffffff',
    alignSelf: 'center',
    paddingTop: 7,
    paddingBottom: 7
  }
});
