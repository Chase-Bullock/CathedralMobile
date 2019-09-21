import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import MenuScreen from '../screens/MenuScreen';
import ToppingsScreen from '../screens/ToppingsScreen';
import NoteScreen from '../screens/NoteScreen';

export default createAppContainer(MainTabNavigator);
