'use strict';
/*jshint esversion: 6*/
/*jshint node: true*/
import React, {Component} from 'react';
import {ScrollView, AppRegistry, Text, View, StyleSheet, Image, TouchableOpacity, TextInput, TouchableHighlight, Switch, Platform, ActivityIndicator} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import Button from 'apsl-react-native-button'
import KeyboardSpace from 'react-native-keyboard-space';

type State = { animating: boolean; };
type Timer = number;

export default class CallMenu extends Component {

  state : State;
  _timer : Timer;

  constructor (props) {
    super(props);
    this._toPage = this._toPage.bind(this);
    this.state = {
      user: this.props.user,
      toCall: 0,
      fakeID: 0,
      voiceOption: 'none',
      recordCall: false,
      animating: false,
      size: 0
    };
  }

  componentWillUnmount(){
    clearTimeout(this._timer)
  };

  setToggleTimeout(){
    this._timer = setTimeout(() => {
      this.setState({animating : !this.state.animating, size: 100});
      this.setToggleTimeout();
    }, 2000);
  };

  _toPage (id) {
    this.props.navigator.push({
      id: id,
      user: this.state.user,
      comingFrom: 'CallMenu'
    });
  }

  placeCall () {
    this.setToggleTimeout();

    let params = 'userId=' + this.state.user.user.id + '&uuid=' + DeviceInfo.getUniqueID() + '&source=' + Platform.OS + '&version=' + DeviceInfo.getVersion() +
    /*
    fetch('https://api.fakecallerid.io/call', {
      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })
    */
    this.props.navigator.push({
      id: 'CallScreen',
      user: this.state.user,
      extra: {
        callTo: this.state.toCall
      }
    });
  }

  setVoiceOption (option) {
    var defaultStyle = {flex: 2, alignItems: 'center'};
    var selectedStyle = {backgroundColor: 'rgba(255, 255, 255, 0.5)', flex: 2, alignItems: 'center', borderRadius: 4};

    styles.noneOption = defaultStyle; styles.maleOption = defaultStyle; styles.femaleOption = defaultStyle;

    switch (option) {
      case 'none':
        this.setState({
          voiceOption: 'none'
        });
        styles.noneOption = selectedStyle;
        break;
      case 'male':
        this.setState({
          voiceOption: 'male'
        });
        styles.maleOption = selectedStyle;
        break;
      case 'female':
        this.setState({
          voiceOption: 'female'
        });
        styles.femaleOption = selectedStyle;
        break;
    }
  }

  stateNumbers (text, input) {
    if (input === true) {
      this.setState({
        toCall: Number(text)
      });
    } else {
      this.setState({
        fakeID: Number(text)
      });
    }
  }

  render () {
    const noneIconDefault=(<Ionicons name='md-close-circle' size={40} style={styles.optionIcon} color='black'/>);
    const noneIconSelected=(<Ionicons name='md-close-circle' size={40} style={styles.optionIcon} color='white'/>);
    const maleIconDefault =(<Ionicons name='md-man' color='black' size={40} style={{paddingLeft: 10, paddingTop: 4}}/>);
    const maleIconSelected =(<Ionicons name='md-man' color='white' size={40} style={{paddingLeft: 10, paddingTop: 4}}/>);
    const femaleIconDefault =(<Ionicons name='md-woman' color='black' size={40} style={{paddingLeft: 20, paddingTop: 4}} />);
    const femaleIconSelected =(<Ionicons name='md-woman' color='white' size={40} style={{paddingLeft: 20, paddingTop: 4}} />);
    return (
      <View style={{flex:1}}>

        <View style={styles.topNav}>
            <TouchableOpacity onPress={() => {this._toPage('Navbar'); }}>
                <Ionicons name='md-menu' color='white' size={27}/>
            </TouchableOpacity>            
            <Text style={styles.navTitle}>FAKE CALLER ID</Text>
            <TouchableOpacity onPress={()=>{this._toPage('BuyCredits')}}>
              <View style={styles.navViewCredits}>                
                <Text style={styles.minTxt}>{this.state.user.user.minutes}</Text><Image source={require('./4coin.png')} style={styles.image} />                
              </View>
            </TouchableOpacity>
        </View>

        <View style={styles.inputs}>
          <Text style={styles.pageText} >NUMBER TO CALL</Text>
          <View style={styles.inputBar}>
            <TextInput 
              style={styles.inputNumbers}
              placeholder='(555)555-5555'
              onChangeText={(text) => { this.stateNumbers(text, true); }}
              keyboardType='phone-pad'
              selectionColor="#ffffff"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={{position:'absolute', right:9}}>
              <Ionicons name='md-contacts' color='white' size={40} />
            </TouchableOpacity>
          </View>
          <Text style={styles.pageText}>FAKE CALLER ID</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.inputNumbers}
              placeholder='(555)555-5555'
              onChangeText={(text) => { this.stateNumbers(text, false); }}
              keyboardType='phone-pad'
              selectionColor="#ffffff"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
            <KeyboardSpace />
            <TouchableOpacity style={styles.contactsIcon}>
              <Ionicons name='md-contacts' color='white' size={40} />
            </TouchableOpacity>
          </View>
        </View>        
        <View style={styles.options}>
          <Text style={styles.pageText}>VOICE CHANGER</Text>
          <View style={styles.voiceOptions}>
            <TouchableHighlight style={styles.noneOption} onPress={() => {this.setVoiceOption('none'); }}>
              <View>
                {this.state.voiceOption==='none'? noneIconSelected:noneIconDefault}                
                <Text style={styles.pageText}>None</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.maleOption} onPress={() => {this.setVoiceOption('male'); }}>
              <View>
                {this.state.voiceOption==='male'? maleIconSelected:maleIconDefault}                
                <Text style={styles.pageText}>Male</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.femaleOption} onPress={() => {this.setVoiceOption('female'); }}>
              <View>
                {this.state.voiceOption==='female'? femaleIconSelected:femaleIconDefault}                
                <Text style={styles.pageText}>Female</Text>                
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.recordOption}>
            <Text style={styles.pageText}>RECORD CALL</Text>
            <Switch
              onValueChange={(value) => this.setState({recordCall: value})}
              value={this.state.recordCall}
              style={styles.recordSwitch}
              onTintColor="#cfe6ba"
              tintColor="white"
              thumbTintColor={this.state.recordCall?"#97d35f":'#d6d6d6'}
            />
          </View>
          <Button style={styles.callContainer} textStyle={styles.buttonText} onPress={() => {this.placeCall(); }} >CALL NOW</Button>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:15}}>
              <Text style={styles.disclaimer}>By clicking "Call Now" you agree to our </Text>
              <TouchableOpacity onPress={() => { this._toNav('Terms'); }}>
                <Text style={styles.termsConditions}>Terms & Conditions</Text>
              </TouchableOpacity>
          </View>
        </View>        
      </View>
    );
  }
}




const styles = StyleSheet.create({
  // Nav View
  topNav: {flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#85c3f3', paddingHorizontal:4 , paddingTop:15, paddingBottom:7, justifyContent:'space-between', alignItems:'center', width:'100%'},
  minTxt: {color: 'white', fontSize: 25, fontWeight:'bold', marginRight:3, marginTop:-3},
  image: {height: 25, width: 34, resizeMode: 'cover'},    
  navViewCredits: { flexDirection:'row', alignItems:'center'},
  navTitle:{color: 'white', fontSize: 25, fontWeight:'bold'},
  //input View
  pageText: {color: 'white', fontSize: 16, fontWeight:'bold', paddingTop: 10},
  inputs: {    
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5
  },
  inputBar: {
    flexDirection: 'row',
    height: 60, alignItems:'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 5
  },
  /*inputNumbers: {
    color: '#ffffff',
    alignSelf: 'stretch',
    flex: 3,
    fontSize: 20
  },*/
  inputNumbers:{flex:1, color: '#ffffff', fontSize: 20},
  contactsIcon: {
    justifyContent: 'flex-end',
    marginLeft: 9
  },
  // options View
  options:{
    flex: 2,
    alignItems: 'center'
  },
  voiceOptions: {
    flexDirection: 'row',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 8,
  },
  noneOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flex: 2,
    alignItems: 'center',
    borderRadius: 4,
  },
  maleOption: {
    flex: 2,
    alignItems: 'center'
  },
  femaleOption: {
    alignItems: 'center',
    flex: 2,
  },
  optionIcon: {
    paddingLeft: 5,
    paddingTop: 4
  },
  recordOption: {
    flexDirection: 'row',
    marginTop: 17,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  recordSwitch: {
    flex: 2
  },
  callContainer: {    
    paddingVertical: 20,
    marginHorizontal:15,
    backgroundColor:'#97d35f',
    borderColor:'transparent',
    borderRadius:30
  },
  callTouchable: {
    backgroundColor: '#41d62b',
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    paddingBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,    
  },
  disclaimer: {
    fontSize: 12,
    color: '#ebebeb',    
  },
  termsConditions: {
    fontSize: 12,
    color: '#ebebeb'
  }
});

AppRegistry.registerComponent('CallMenu', () => CallMenu);
