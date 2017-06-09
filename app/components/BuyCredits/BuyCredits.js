/*jshint esversion: 6*//*jshint node: true*/
'use strict';
import React, {Component} from 'react';
import {AppRegistry, Text, Platform, View, Navigator, StyleSheet, ListView, TouchableOpacity, Image, Button, TextInput, ScrollView, Alert} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import coinImages from '../Data/Images';
import Modal from 'react-native-simple-modal';
import Sound from 'react-native-sound';

export default class BuyCredits extends Component{

  _timer: Timer;

  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      creditDataSource: ds,
      user: this.props.user,
      step:1,
      paymentDetails: cardDetails,
      showModal: false
    };
  }

  componentDidMount () {
    this.setCreditData();
  }

  _toPage (id) {
    this.props.navigator.push({
      id: id,
      user: this.state.user,
      comingFrom: 'BuyCredits'
    });
  }

  _toPaymentOption (creditItem, creditID) {
    let data = creditData[creditItem];
    this.setState({
      selectedMinutes: data,
      creditDataSource: this.state.creditDataSource.cloneWithRows([data]),
      step: 2
    });
  }

  successfulPurchase () {
    this.setState({showModal: true});

    const minAfterPurchase = String(Number(this.state.user.user.minutes) + Number(this.state.selectedMinutes.amount));

    coinWin.play((success) => {
      if (!success) {
        Alert.alert('Error: Sound #2', ':( There was an issue playing your sound file!');
      }
    });

    this._timer = setInterval(() => {
      let user = this.state.user;

      if (this.state.user.user.minutes != minAfterPurchase) {
        user.user.minutes = String(Number(this.state.user.user.minutes) + 1);
        this.setState({user: user});
      } else {
        clearInterval(this._timer);
      }
    }, 200);
  }

  makePurchase () {
    // purchase minutes api call

    this.successfulPurchase();
  }

  updateCardDetails (text, detail) {
    cardDetails[detail] = text;
    this.setState({paymentDetails: cardDetails});
  }

  renderPaymentType () {
    if (this.state.paymentType && this.state.step === 3) {
      switch (this.state.paymentType) {
        case 'creditDebit':
          return(
            <ScrollView>
              <View style={styles.infoCol}>
                <View style={styles.inputBar}>
                  <TextInput
                    placeholder='Name on Card'
                    onChangeText={(text) => {this.updateCardDetails(text, 'name');}}
                    placeholderTextColor='rgba(255, 255, 255, 0.83)'
                    underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                  />
                </View>
              </View>
              <View style={styles.infoCol}>
                <View style={styles.inputBar}>
                  <TextInput
                    placeholder='Card Number'
                    onChangeText={(text) => {this.updateCardDetails(text, 'number');}}
                    placeholderTextColor='rgba(255, 255, 255, 0.83)'
                    underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                  />
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.splitOne }>
                  <TextInput
                    placeholder='Exp Month'
                    onChangeText={(text) => {this.updateCardDetails(text, 'expMonth');}}
                    placeholderTextColor='rgba(255, 255, 255, 0.83)'
                    underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                  />
                </View>
                <View style={styles.splitTwo}>
                  <TextInput
                    placeholder='Exp Year'
                    onChangeText={(text) => {this.updateCardDetails(text, 'expYear');}}
                    placeholderTextColor='rgba(255, 255, 255, 0.83)'
                    underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                  />
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.splitOne }>
                  <TextInput
                    placeholder='CVV'
                    onChangeText={(text) => {this.updateCardDetails(text, 'CVV');}}
                    placeholderTextColor='rgba(255, 255, 255, 0.83)'
                    underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                  />
                </View>
                <View style={styles.splitTwo}>
                  <TextInput
                    placeholder='ZIP/Postal Code'
                    onChangeText={(text) => {this.updateCardDetails(text, 'zip');}}
                    placeholderTextColor='rgba(255, 255, 255,  0.83)'
                    underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                  />
                </View>
              </View>
              <View style={styles.infoCol}>
                <View style={styles.inputBar}>
                  <TextInput
                    placeholder='Coupon Code'
                    onChangeText={(text) => {this.updateCardDetails(text, 'couponCode');}}
                    placeholderTextColor='rgba(255, 255, 255, 0.83)'
                    underlineColorAndroid='rgba(255, 255, 255, 0.83)'
                  />
                </View>
              </View>
              <View style={styles.infoCol}>
                  <Button
                    title='Buy Now'
                    onPress={() => {this.makePurchase();}}
                    color='#41d62b'
                  />
              </View>
            </ScrollView>
          );
        case 'applePay':
          break;
        case 'googleWallet':
          break;
        case 'paypal':
          break;
      }
    }
  }

  renderPaymentOptions () {
    var osOption;
    if (Platform.OS === 'ios') {
      osOption = <Button
                      title='Apple Pay'
                      onPress={() => {this.setState({paymentType: 'applePay', step: 3});}}
                      color='#41d62b'
                  />;
    } else if (Platform.OS === 'android') {
      osOption = <Button
                      title='Google Wallet'
                      onPress={() =>{this.setState({paymentType: 'googleWallet', step: 3});}}
                      color='#41d62b'
                  />;
    }

    if (this.state.selectedMinutes && this.state.step === 2) {
      return(
        <View style={styles.paymentOptions}>
          <View style={styles.paymentButton}>
            <Button
              title='Credit/Debit'
              onPress={() => {this.setState({paymentType: 'creditDebit', step: 3});}}
              color='#41d62b'
            />
          </View>
          <View style={styles.paymentButton}>
            <Button
              title='Paypal'
              onPress={() => {this.setState({paymentType: 'paypal', step: 3});}}
              color='#41d62b'
            />
          </View>
          <View style={styles.paymentButton}>
            {osOption}
          </View>
        </View>
      );
    }
  }

  renderRowImage (imageCode) {
    switch (imageCode) {
      case 'coin1':
        return(<Image source={coinImages.coin1} style={styles.coinImages} />);
      case 'coin2':
        return (<Image source={coinImages.coin2} style={styles.coinImages} />);
      case 'coin4':
        return(<Image source={coinImages.coin4} style={styles.coinImages} />);
      case 'coin6':
        return(<Image source={coinImages.coin6} style={styles.coinImages} />);
      case 'coinStack':
        return(<Image source={coinImages.coinStack} style={styles.coinImages} />);
    }
  }

  setCreditData () {
    this.setState({
        creditDataSource: this.state.creditDataSource.cloneWithRows(creditData)
    });
  }

  renderRow (creditItem, sectionId, rowId, highlightRow) {
    console.log(creditItem);
    return (
      <View>
        <TouchableOpacity style={styles.creditElement} onPress={this._toPaymentOption.bind(this, rowId)}>
          <View style={styles.row}>
            {this.renderRowImage(creditItem.imgUrl)}
            <View style={styles.infoContainer}>
              <Text style={{fontWeight: 'bold', fontSize:18, color: '#ffffff'}}>{creditItem.amount} Credits</Text>
              <Text style={{fontSize:16, color: '#ffffff'}}>{creditItem.perCredit} per credit</Text>
            </View>
            <Text style={styles.price, styles.creditText}>{creditItem.price}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.topNav}>
          <View style={styles.navViewMenu}><TouchableOpacity onPress={() => {this._toPage('Navbar'); }}><Ionicons name='md-menu' color='white' size={25} /></TouchableOpacity></View>
          <View style={styles.navView}><Text style={styles.pageText}>FAKE CALLER ID</Text></View>
          <View style={styles.navViewCredits}><Text style={styles.minTxt}>{this.state.user.user.minutes}</Text><Image source={coinImages.coin4} style={styles.image} /></View>
        </View>

        <Text style={styles.centeredText}>Purchasing Credits removes advertisements</Text>

        <ListView
          dataSource={this.state.creditDataSource}
          renderRow={this.renderRow.bind(this)}
          style={{marginBottom:50}}
        />
        {this.renderPaymentOptions()}
        {this.renderPaymentType()}

        <Modal
          overlayBackground={'rgba(0, 0, 0, 0.75)'}
          animationDuration={250}
          closeOnTouchOutside={true}
          open={this.state.showModal}
          modalDidClose={() => {console.log('lmao');}}
          modalStyle={styles.modal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalMinutes}>{this.state.user.user.minutes}</Text>
            <Text style={styles.modalTitle}>Credits</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const coinWin = new Sound('coins.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    Alert.alert('Error: Sound #1', ':( There was an error loading your sound file!');
    console.log(error);
  }
});

const cardDetails = {};

const creditData = {
  twentyFive: {
    imgUrl: 'coin1',
    amount: '25',
    perCredit: '19¢',
    price: '$4.95',
    package: 1
  },
  sixty: {
    imgUrl: 'coin2',
    amount: '60',
    perCredit: '16¢',
    price: '$9.95',
    package: 2
  },
  oneThirty: {
    imgUrl: 'coin4',
    amount: '130',
    perCredit: '15¢',
    price: '$19.95',
    package: 3
  },
  twoHundred: {
    imgUrl: 'coin6',
    amount: '200',
    perCredit: '14¢',
    price: '$29.95',
    package: 4
  },
  threeFifty: {
    imgUrl: 'coinStack',
    amount: '350',
    perCredit: '14¢',
    price:'$49.95',
    package: 5
  }
};

const styles= StyleSheet.create({
  topNav: {flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#ffffff', paddingTop: 10, padding: 4, justifyContent:'space-between', alignItems:'center', width:'100%'},
  pageText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight:'bold',
    paddingTop: 10
  },
  minTxt:{color: 'white', fontSize: 22, fontWeight:'bold'},
  image: {height: 70, width: 50, resizeMode: 'contain'},    
  navView: { padding: 7 },
  navViewMenu: { alignItems: 'flex-start' },  
  navViewCredits: { flexDirection:'row', alignItems:'center'},
  row: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  centeredText: {
    color: "#ffffff",
    marginTop: 14,
    marginBottom: 3,
    alignSelf: 'center'
  },
  creditText: {
    color: '#ffffff',
    fontSize: 20
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingBottom: 5
  },
  creditElement: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  paymentButton: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20
  },
  // payment info
  infoCol: {
    flexDirection: 'column',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 16
  },
  infoRow: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 16
  },
  inputBar: {
    flexDirection: 'column',
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 5
  },
  splitOne: {
    flex: 2,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 5
  },
  splitTwo: {
    flex: 2,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 5,
    marginLeft: 3
  },
  //modal
  modal:{
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMinutes: {
    fontSize: 50,
    color: '#ffffff'
  },
  modalTitle: {
    fontSize: 40,
    color: '#ffffff'
  }
});

AppRegistry.registerComponent('BuyCredits', () => BuyCredits);
