/*jshint esversion: 6*//*jshint node: true*/
import React, {Component} from 'react';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class APICalls{
  constructor() {
    this.login = this.login.bind(this);

    this.state = {};
  }

  login () {
    // C1
    let response = {
      success: null,
      error: null,
      networkError: null
    };

    /*
    const loginInfo = encodeURIComponent(JSON.stringify({
      uuid: DeviceInfo.getUniqueID,
      source: Platform.OS,
      appId: (Platform.OS === 'android' ? 1 : 2),
      version: DeviceInfo.getVersion().toString()
    }));
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
        response.error = "Your account has been banned. If you have any questions or concerns contact support at support@tracebust.com";
      }else{
        let user = {user: userJson.user, config: userJson.config, status: userJson.status};
        response.success = user;
      }
    })
    .catch((error) => {
      response.networkError = error;
    });
    console.log(response);
    return(response);
  }
}

/*
fetch('https://api.fakecallerid.io/login', {
      method: 'POST',
      headers: {
        'Accept' : 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: user_data1
    })

    .then((user) => user.json())
    .then((userJson) => {
      console.log(userJson)
      if (userJson.user.banned == 1){
        alert("Your account has been banned. If you have any questions or concerns contact support at support@tracebust.com")
      }else{
        this.props.navigator.push({
          id: 'CallMenu',
          user: {user: userJson.user, config: userJson.config, status: userJson.status},
          status_bar_hidden: this.state.statsbar
        })
      }
    })
    .catch((error) => {
      alert(error)
    })
*/
