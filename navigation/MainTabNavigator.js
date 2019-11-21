import React from 'react';
import { Platform, View } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { THEME } from '../constants/Theme.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TabBarIcon from '../components/TabBarIcon';
import MenuScreen from '../screens/MenuScreen';
import ToppingsScreen from '../screens/ToppingsScreen';
import NoteScreen from '../screens/NoteScreen';
import ReviewScreen from '../screens/ReviewScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen.js';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AvailableCommunitiesScreen from '../screens/AvailableCommunitiesScreen.js';

const HomeStack = createStackNavigator({
  Menu: MenuScreen,
  Toppings: ToppingsScreen,
  Note: NoteScreen,
  Review: ReviewScreen,
  OrderStatus: OrderStatusScreen,
  AvailableCommunities: AvailableCommunitiesScreen,
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

const ProfileStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
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

const AppStack = createDrawerNavigator(
  {
    Home: { screen: HomeStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (<View style={{padding:5,borderWidth:1,borderRadius:50,borderColor:tintColor}}><Icon size={25} name='directions-walk' color={tintColor} style={{marginRight:0,width:25}}/></View>), 
        //({tintColor}) => (<Image resizeMode="contain" source={require('./assets/menu30.png')} tintColor={tintColor} style={{width:'100%',height:30}} />),
      } 
    },
    Profile: { screen: ProfileStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (<View style={{padding:5,borderWidth:1,borderRadius:50,borderColor:tintColor}}><Icon size={25} name='history' color={tintColor} style={{marginRight:0,width:25}}/></View>), 
        //({tintColor}) => (<Image resizeMode="contain" source={require('./assets/menu30.png')} tintColor={tintColor} style={{width:'100%',height:30}} />),
      } 
    }
  },
  {
    headerMode:'none',
    initialRouteName: 'Profile',
    drawerPosition:'left',
    drawerWidth:300,
    drawerBackgroundColor:"#2A303E",
    contentOptions: {
      inactiveTintColor: 'lightgrey',
      activeTintColor: 'white'
    },
  }
); 

    export default AppStack;
