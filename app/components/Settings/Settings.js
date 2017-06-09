/*jshint esversion: 6*//*jshint node: true*/
'use strict';
import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableOpacity, Image, StyleSheet, TextInput, Picker, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import countries from '../Data/Countries';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


export default class Settings extends Component {
  constructor(props) {
    super(props);
    this._toPage = this._toPage.bind(this);
    this.state = {
      user: this.props.user,
      userCountry: this.props.user.user.country,
      userEmail: this.props.user.user.email,
      radioProps: [{label: 'Phone  ', value: 'phone',}, {label: 'Speaker', value: 'speaker'}],
      radioValue: 0
    };
  }

  _toPage (id) {
    this.props.navigator.push({
      id: id,
      user: this.state.user,
      comingFrom: 'Settings'
    });
  }

  saveSettings () {
    alert("Saving settings is not currently implemented!");
  }

  render () {
    let countryPickerItems = countries.map( (s, i) => {
      return <Picker.Item key={i} value={s.code} label={s.name} />;
    });

    return (
      <View>
        <View style={styles.topNav}>
          <View style={styles.navViewMenu}><TouchableOpacity onPress={() => {this._toPage('Navbar'); }}><Ionicons name='md-menu' color='white' size={25} /></TouchableOpacity></View>
          <View style={styles.navView}><Text style={styles.pageText}>SETTINGS</Text></View>
          <View style={styles.navViewCredits}><Text style={styles.pageText}>{this.state.user.user.minutes}<Image source={require('./4coin.png')} style={styles.image} /></Text></View>
        </View>

        <View style={styles.settingContainer}>
          <View style={styles.emailView}>
            <Text style={styles.settingsText}>EMAIL</Text>
            <TextInput
              value={this.state.email}
              style={styles.settingInput}
              placeholder="example@example.com"
              onBlur={(text) =>{this.setState({userEmail: text}); }}
              underlineColorAndroid='transparent'
            />
          </View>
          <Text style={styles.settingsText}>COUNTRY</Text>
          <View style={styles.countryView}>
            <Picker
              selectedValue={this.state.userCountry}
              onValueChange={(country) => {this.setState({userCountry: country});}}
              style={styles.countryPicker}
            >
            {countryPickerItems}
            </Picker>
            <Text style={styles.settingsText}>{this.state.userCountryName}</Text>
          </View>
          <View style={styles.defaultPlayView}>
            <Text style={styles.settingsText}>DEFAULT TO PLAY</Text>
            <RadioForm
              radio_props={this.state.radioProps}
              initial={0}
              onPress={(value) => {this.setState({radioValue:value});}}
              formHorizontal={true}
              labelColor={'#ffffff'}
              buttonColor={'#ffffff'}
              style={styles.radioForm}
              >
              </RadioForm>
          </View>
          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={() => {this.saveSettings(); }}>
              <View>
                <Text style={styles.buttonText}>
                SAVE CHANGES
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

let width = Dimensions.get('window').width * 0.8;

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
  // settings style
  settingContainer: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10
  },
  settingsText: {
    color: '#ffffff'
  },
  settingInput: {
    color:'#ffffff',

  },
  emailView: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor:'#ebebeb'
  },
  countryView: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  countryPicker: {
    width: width,
    color: '#ffffff'
  },
  defaultPlayView: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb'
  },
  radioForm: {
    justifyContent: 'flex-end',
    marginBottom: 3
  },
  submitContainer:{
    flexDirection: 'row'
  },
  saveButton: {
    backgroundColor: '#41d62b',
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 10,
    marginTop: 15
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    paddingTop: 10
  }
});

AppRegistry.registerComponent('Settings', () => Settings);
