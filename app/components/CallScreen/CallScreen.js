'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Platform} from 'react-native';
import {Endpoint} from 'react-native-pjsip';

// Init PJSIP
let endpoint = new Endpoint();
let state = endpoint.start();
let {accounts, calls} = state;
let configuration = {proxy: null};
let account;

endpoint.on('registration_changed', (account) => {});
endpoint.on('connectivity_changed', (online) => {});
endpoint.on('call_received', (call) => {});
endpoint.on('call_changed', (call) => {});
endpoint.on('call_terminated', (call) => {});
if (Platform.OS !== 'android') {
  endpoint.on('call_screen_locked', (call) => {});
}

export default class CallScreen extends Component {
  _timer: Timer;

  constructor(props) {
    super(props);
    console.log(props.extra);
    this.state = {
      user: this.props.user,
      callTo: this.props.extra.callTo,
      callTimer: callLength,
      pjSipAcc: null,
      account:null
    };    
  }

  componentDidMount () {    
    this.startCallTime();
    this.initSipCall();    
  }

  initSipCall () {
    this.createSipAcc()
      .then((returnAcc) => {
          console.log(returnAcc);
          this.setState({account:returnAcc});
          this.makeSipCall();
      });
    //this.makeSipCall();
  }

  startCallTime () {
    this._timer = setInterval(() => {
      if (this.state.callTimer.minutes === 60){
        callLength.hours += 1;
        callLength.minutes = 0;
      }
      if(this.state.callTimer.seconds === 60){
        callLength.minutes += 1;
        callLength.seconds = 0;
      }
      callLength.seconds += 1;
      this.setState({callTimer: callLength});
    }, 1000);
  }

  async createSipAcc () {
    let userConfig = this.state.user.config;

    configuration.name = userConfig.sip_name;
    configuration.username = userConfig.sip_user;
    configuration.domain = userConfig.sip_domain;
    configuration.password = userConfig.sip_password;

    /*endpoint.createAccount(configuration)
      .then((returnAcc) => {
        console.log(returnAcc);
        this.setState({account:returnAcc});
        this.makeSipCall();
      });*/
      return await endpoint.createAccount(configuration);
      //.then(
  }

  makeSipCall () {
    let options = {
      headers: {
        'P-Asserted-Identity': 'Header Example',
        'X-UA': 'React native'
      }
    };    
    let call = endpoint.makeCall(this.state.account, this.state.user.config.sip_callTo, options);
  }

  render () {
    // {this.state.callTimer.hours}:{this.state.callTimer.minutes}:{this.state.callTimer.seconds}
    let time = {
      hours: this.state.callTimer.hours,
      minutes: this.state.callTimer.minutes,
      seconds: this.state.callTimer.seconds
    };


    return (
      <View style={styles.body}>
        <Text style={styles.connected}>Connected: {this.state.callTo}</Text>
        <Text style={styles.connected}>{time.hours/10 <= 1 ? 0:false}{time.hours}:{time.minutes/10 <= 1 ? 0:false}{time.minutes}:{time.seconds/10 <= 1 ? 0:false}{time.seconds}</Text>
      </View>
    );
  }
}

const callLength = {
  hours: 0,
  minutes: 0,
  seconds: 0
};

const styles = StyleSheet.create({
  body: {
    marginTop: 15
  },
  connected: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 23,
    paddingTop: 5
  }
});

AppRegistry.registerComponent('CallScreen', () => CallScreen);
