import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { THEME } from '../constants/Theme.js';


import TabBarIcon from '../components/TabBarIcon';
import MenuScreen from '../screens/MenuScreen';
import ToppingsScreen from '../screens/ToppingsScreen';
import NoteScreen from '../screens/NoteScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Menu: MenuScreen,
  Toppings: ToppingsScreen,
  Note: NoteScreen
},
{
  defaultNavigationOptions: {
  headerStyle: {
    backgroundColor: "#53075B"
    
  },
  headerTintColor: '#EDEDED',
  headerTitleStyle: {
    textAlign: 'center',
    flex:1
  },
  headerTitleContainerStyle: {
    left: 0, // THIS RIGHT HERE
  },
}
});

    export default HomeStack;
