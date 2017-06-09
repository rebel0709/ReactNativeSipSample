'use strict';
/*jshint esversion: 6*//*jshint node: true*/
import React, { Component } from 'react';
import {AppRegistry, StyleSheet, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavigationExperimental from 'react-native-deprecated-custom-components';

import BuyCredits from './app/components/BuyCredits/BuyCredits';
import CallHistory from './app/components/CallHistory/CallHistory';
import CallMenu from './app/components/CallMenu/CallMenu';
import Navbar from './app/components/Navbar/Navbar';
import Settings from './app/components/Settings/Settings';
import Splash from './app/components/Splash/Splash';
import Terms from './app/components/Terms/Terms';
import Support from './app/components/Support/Support';
import CallScreen from './app/components/CallScreen/CallScreen';

export default class FakeCallerID extends Component {
  constructor () {
    super();
    this.state = {
      statusBarHidden: false
    };
  }

  renderScene (route, navigator) {
    switch (route.id) {
      case 'BuyCredits':
        return (<BuyCredits navigator={navigator} user={route.user} title='BuyCredits' />);
      case 'CallHistory':
        return (<CallHistory navigator={navigator} user={route.user} title='CallHistory' />);
      case 'CallMenu':
        return (<CallMenu navigator={navigator} user={route.user} title='CallMenu' />);
      case 'Navbar':
        return (<Navbar navigator={navigator} user={route.user} previous={route.comingFrom} title='Navbar' />);
      case 'Settings':
        return (<Settings navigator={navigator} user={route.user} title='Settings' />);
      case 'Splash':
        return (<Splash navigator={navigator} user={route.user} title='Splash' />);
      case 'Terms':
        return(<Terms navigator={navigator} user={route.user} title='Terms' />);
      case 'Support':
        return(<Support navigator={navigator} user={route.user} title='Support'/>);
      case 'CallScreen':
        return(<CallScreen navigator={navigator} user={route.user} title='CallScreen' extra={route.extra}/>);
    }
  }

  render () {
    return (
      <LinearGradient style={styles.body} colors={[ '#1775ff', '#31dbd2']} start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}>
        <StatusBar hidden={this.state.statusBarHidden} />
        <NavigationExperimental.Navigator
          initialRoute={{id: 'Splash', statsbar: true}}
          renderScene={this.renderScene}
          configureScene={(route, routeStack) => NavigationExperimental.Navigator.SceneConfigs.FadeAndroid}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  }
});

AppRegistry.registerComponent('FakeCallerID', () => FakeCallerID);
