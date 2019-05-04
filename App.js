import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';
import DrawerNavigator from './Navigation/NavigationDrawer'
import Splash from './screens/splash';
import Login from './screens/Login';
import Register from './screens/Register';
import Start from './screens/Start';
import ForgetPassword from './screens/ForgetPassword';
import ChangePassword from './screens/ChangePassword';
import Countries from './screens/Countries';

const TopLevelNavigator = createStackNavigator({
  Splash: { screen: Splash },
  Login: { screen: Login },
  Start: { screen: Start },
  Register: { screen: Register },
  ForgetPassword: { screen: ForgetPassword },
  ChangePassword: { screen: ChangePassword },
  /////////////////////////////////////////
  DrawerNavigator: { screen: DrawerNavigator },
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  })
const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends Component {

  
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}