/*jshint esversion: 6*//*jshint node: true*/
'use strict';
import React, {Component} from 'react';
import {BackHandler, AppRegistry, Text, View, ListView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default class Navbar extends Component {
  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.events = this.events.bind(this);
    this.state = {
      menuDataSource: ds,
      user: this.props.user
    };
  }

  componentDidMount () {
    this.setMenuData();
  // /  this.events();
  }

  events () {
    BackHandler.addEventListener('hardwareBackPress', function () {
      this.props.navigator.push({
        id: this.props.previous,
        user: this.state.user,
        statsbar: this.state.statsbar_hidden
      });
    });
  }

  _toPage (menuItem) {
    this.props.navigator.push({
      id: menuItem.id,
      user: this.state.user,
      statsbar: this.state.statsbar_hidden
    });
  }

  setMenuData () {
    const menuData = {
      Close: {
        id: this.props.previous,
        str: 'Close Menu',
        extra: '',
        ico: 'close'
      },
      CallMenu: {
        id: 'CallMenu',
        str: 'Place Call',
        extra: '',
        ico: 'phone'
      },
      BuyCredits: {
        id: 'BuyCredits',
        str: 'Buy Credits',
        extra: this.state.user.user.minutes,
        ico: 'basket'
      },
      CallHistory: {
        id: 'CallHistory',
        str: 'Call History',
        extra: '',
        ico: 'microphone'
      },
      Settings: {
        id: 'Settings',
        str: 'Settings',
        extra: '',
        ico: 'settings'
      },
      Support: {
        id: 'Support',
        str: 'Support',
        extra: '',
        ico: 'question'
      }
    };

    this.setState({
      menuDataSource: this.state.menuDataSource.cloneWithRows(menuData)
    });
  }

  renderRow (menuItem, sectionId, rowId, highlightRow) {
    return (
      <TouchableOpacity onPress={() => { this._toPage(menuItem); }}>
        <View style={styles.row}>
          <Icon name={menuItem.ico} size={20} style={styles.ico} />
          <Text style={styles.leftText}>{menuItem.str}</Text>
          <View style={styles.rightView}>
            {menuItem.extra !== '' ? <Text style={styles.rightText}>{menuItem.extra}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <View>
        <ListView
          dataSource={this.state.menuDataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightText: {
    color: '#1775ff',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 3
  },
  leftText: {
    color: '#ffffff'
  },
  row: {
    flexDirection: 'row',
    padding: 13,
    borderBottomWidth: 1,
      borderBottomColor: 'rgba(181, 181, 181, 0.7)'
  },
  rightView: {
    alignItems: 'flex-end',
    flex: 1,
  },
  ico: {
    color: '#ffffff',
    paddingRight: 13
  }
});

AppRegistry.registerComponent('Navbar', () => Navbar);
