'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {AppRegistry, Platform, TouchableHighlight, Text, View, StyleSheet, TouchableOpacity, Image, Picker, Dimensions, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import coinImages from '../Data/Images';
import Status from './Status.js';
import DeviceInfo from 'react-native-device-info';

export default class Support extends Component {
  constructor (props) {
    super(props);
    this._toPage = this._toPage.bind(this);
    this.state = {
      user: this.props.user
    };
  }

  componentDidMount () {
    this.assembleTicketInfo();
  }

  assembleTicketInfo () {
    ticketInfo.country = this.state.user.user.country;
  }

  submitTicket () {
    fetch('https://api.fakecallerid.io/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: null
    });
  }

  _toPage (id) {
    this.props.navigator.push({
      id: id,
      user: this.state.user,
      comingFrom: 'Support'
    });
  }

  render () {
    return (
      <View>
        <View style={styles.topNav}>
          <View style={styles.navViewMenu}><TouchableOpacity onPress={() => {this._toPage('Navbar'); }}><Ionicons name='md-menu' color='white' size={25} /></TouchableOpacity></View>
          <View style={styles.navView}><Text style={styles.pageText}>FAKE CALLER ID</Text></View>
          <View style={styles.navViewCredits}><Text style={styles.pageText}>{this.state.user.user.minutes}<Image source={coinImages.coin4} style={styles.image} /></Text></View>
        </View>

        <Status
          status={this.state.user.status}
        />

        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>REQUEST SUPPORT</Text>
          <View style={styles.topicContainer}>
            <Picker
              selectedValue={ticketInfo.ticketIssue}
              onValueChange={(topic) => {ticketInfo.ticketIssue = topic;}}
              style={styles.topicPicker}
            >
              <Picker.Item value='General Question' label='General Question' />
              <Picker.Item value='Problem Making Calls' label='Problem Making Calls' />
              <Picker.Item value='Listening to Recordings' label='Listening to Recordings' />
              <Picker.Item value='Adding Minutes' label='Adding Minutes' />
              <Picker.Item value='Credit Card Declining' label='Credit Card Declining' />
              <Picker.Item value='Billing Issue' label='Billing Issue' />
            </Picker>
          </View>
          <Text style={styles.supportText}>EMAIL</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.inputEmail}
              placeholder='example@gmail.com'
              onBlur={(text) => { ticketInfo.emailAddress = text;}}
              selectionColor="#ffffff"
              placeholderTextColor='rgba(255, 255, 255, 0.83)'
              underlineColorAndroid='rgba(255, 255, 255, 0.83)'
            />
          </View>
          <Text style={styles.supportText}>MESSAGE</Text>
            <View style={styles.inputBar}>
              <TextInput
                style={styles.inputMessage}
                placeholder='Problem'
                onBlur={(text) => { ticketInfo.message = text; }}
                selectionColor="#ffffff"
                placeholderTextColor='rgba(255, 255, 255, 0.83)'
                underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                multiline={true}
              />
            </View>
            <View style={styles.paymentButton}>
              <TouchableHighlight style={styles.callTouchable} onPress={() => {this.submitTicket(); }} underlayColor='rgba(65, 214, 43, 0.56)'>
                <Text style={styles.buttonText}>SUBMIT TICKET</Text>
              </TouchableHighlight>
            </View>
        </View>
      </View>
    );
  }
}

var ticketInfo = {
  uuid: DeviceInfo.getUniqueID(),
  source: null,
  version: DeviceInfo.getVersion().toString(),
  appId: null,
  country: null,
  ticketIssue: 'General Question',
  emailAddress: null,
  message: null,
  devicePlatfrom: Platform.OS,
  deviceModel: DeviceInfo.getModel(),
  deviceVersion: DeviceInfo.getSystemVersion(),
  locale: DeviceInfo.getDeviceLocale()
};

let width = Dimensions.get('window').width * 0.9;

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 4
  },
  pageText: {
    color: '#ffffff',
    fontSize: 16,
    paddingTop: 10
  },
  image: {
    height: 70,
    width: 50,
    flex: 1,
    resizeMode: 'contain'
  },
  navView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7
  },
  navViewMenu: {
    alignItems: 'flex-start',
    padding: 7,
    paddingRight: 30
  },
  navViewCredits: {
    alignItems: 'flex-end',
    padding: 7
  },
  //supportcontainer
  supportContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  supportText: {
    color:'#ffffff',
    marginTop: 15
  },
  topicContainer: {
    width: width,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  topicPicker:{
    width: width,
    color: '#ffffff'
  },
  inputBar: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 5,
    marginTop: 10
  },
  inputEmail: {
    color: '#ffffff',
    alignSelf: 'stretch',
    flex: 1,
    fontSize: 20,
    width: width * 0.93
  },
  inputMessage: {
    color: '#ffffff',
    alignSelf: 'stretch',
    flex: 1,
    fontSize: 20,
    width: width * 0.93,
  },
  callTouchable: {
    backgroundColor: '#41d62b',
    width: width,
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    paddingTop: 10
  },
  paymentButton: {
    paddingTop: 35
  }
});

AppRegistry.registerComponent('Support', () => Support);
