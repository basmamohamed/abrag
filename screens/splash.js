
import React, { Component } from 'react';
import { ImageBackground, Image, Text, AsyncStorage } from 'react-native';
import NavigationService from '../NavigationService';
import { Spinner } from 'native-base';

import firebase from 'react-native-firebase';
export default class Splash extends Component {
  componentDidMount() {
    this.checkPermission();
    setTimeout(() => {
      this.LoadInitialState()
    }, 3000)
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
      // console.warn('getToken');
    } else {
      this.requestPermission();
      // console.warn('456');
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      // console.warn('permission rejected');
    }
  }



  LoadInitialState = async () => {
    let logged = await AsyncStorage.getItem('logged');
    if (logged == 200) {
      NavigationService.navigate('DrawerNavigator')
    } else {
      NavigationService.replace('Login')
    }
  }

  render() {
    return (
      <ImageBackground source={require('./img/spalsh.png')} style={{ justifyContent: 'center', width: '100%', height: '100%' }}>
        <Image source={require('./img/icon/logo.png')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
        <Spinner></Spinner>

      </ImageBackground>
    );
  }
}

