'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Platform, AppRegistry, Text, View, Navigator, Image, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import DeviceInfo from 'react-native-device-info';
import APICalls from '../ExtraClasses/APICalls';

type State = { animating: boolean; };
type Timer = number;


export default class Splash extends Component{

  state : State;
  _timer : Timer;


  constructor(props){
    super(props);
    this.state = {
      animating: true
    };
  };

  componentDidMount(){
    this.login();
    this.setToggleTimeout();
  };


  componentWillUnmount(){
    clearTimeout(this._timer)
  };

  login(){
    //  NEEDS REWORKED
        /*
    let resp = APICalls.login()

    if (resp.error != null) {
      Alert.alert(resp.error)
    } else if (resp.success != null) {
      this.props.navigator.push({
          id: 'CallMenu',
          user: resp.success,
          status_bar_hidden: this.state.statsbar
        });
    } else {
    //  console.log(resp)
      Alert.alert('ERROR: CODE C1 \n Contact support at support@tracebust.com' + resp)
    }
    */

    const loginInfo = 'uuid=' + DeviceInfo.getUniqueID + '&source=' + Platform.OS + '&appId=' + (Platform.OS === 'android' ? 1 : 2) + '&version=' + DeviceInfo.getVersion().toString();

    fetch('https://api.fakecallerid.io/login', {
      method: 'POST',
      headers: {
        'Accept' : 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: loginInfo
    })

    .then((user) => user.json())
    .then((userJson) => {
      //console.log(userJson);
      if (userJson.user.banned == 1){
        Alert.alert("Your account has been banned. If you have any questions or concerns contact support at support@tracebust.com");
      }else{
        let user = {user: userJson.user, config: userJson.config, status: userJson.status};
        console.log(user)
        this.props.navigator.push({
            id: 'CallMenu',
            user: user,
            status_bar_hidden: this.state.statsbar
          });
      }
    })
    .catch((error) => {
      Alert.alert(error);
    });
  };


  setToggleTimeout(){
    this._timer = setTimeout(() => {
      this.setState({animating : !this.state.animating});
      this.setToggleTimeout();
    }, 2000);
  };


  render(){
    return(
      <View style={styles.body}>
        <Text>{"\n"}</Text>
        <Image
          source={require('./logo.png')}
        />
        <ActivityIndicator
        animating={this.state.animating}
        style={styles.activity}
        size = {100}
        color = 'rgb(255, 255, 255)'
        />
        <View style={styles.infoBox}>
          <Text style={styles.columnText}>{"\n"}Made with <Icon name="heart" color="rgb(255, 0, 0)" size={14} /> in Portland, OR</Text>
          <Text style={styles.columnText}>Symba Ventures</Text>
        </View>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  body:{
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  columnText:{
    color:'#ffffff',
    position:'relative'
  },
  infoBox:{
    alignItems: 'center',
    position:'absolute',
    bottom: 0,
    paddingBottom: 10
  },
  activity:{
    paddingTop: 70,
    paddingBottom: 70
  }
});

AppRegistry.registerComponent('Splash', () => Splash);
