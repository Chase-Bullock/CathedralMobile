import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/Button';
import NextButton from '../components/NextButton';

import { MonoText } from '../components/StyledText';
import { getMenuItems, getToppingsForMenuItem } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
import { UserContext } from '../context/AppContext';


export default OrderStatusScreen = (props) => {

  let { navigation } = props;
  let selectedMenuItem = navigation.state.params.selectedMenuItem;
  let orderId = navigation.state.params.orderId;
  let selectedToppings = navigation.state.params.selectedToppings;
  let selectedCommunity = navigation.state.params ?.selectedCommunity;
  let note = navigation.state.params.note;
  const [user, setUser] = useContext(UserContext);

  return (
    <View style={styles.container}>

      <View
        style={{ flex: 9 }}
        contentContainerStyle={styles.contentContainer}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            <View style={{ flex: 3 }}>
              <View style={{ backgroundColor: "blue", height: 2, width: 100, zIndex: -1, marginTop:8}}></View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: "white", width: 20, height: 20, borderRadius: 50, borderWidth: 5, borderColor: "green" }}></View>
            </View>
            <View style={{ flex: 3 }}>
            <View style={{ backgroundColor: "red", height: 2, width:200, zIndex: -1, marginTop:8}}></View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: "white", width: 20, height: 20, borderRadius: 50, borderWidth: 5, borderColor: "green" }}></View>
            </View>
            <View style={{ flex: 3 }}>
            <View style={{ backgroundColor: "grey", height: 2, width: "100%", zIndex: -1, marginTop:8}}></View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: "white", width: 20, height: 20, borderRadius: 50, borderWidth: 5, borderColor: "grey" }}></View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, marginBottom: 15 }}>{"Personal Info:  "}</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 3 }}>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{`${user.firstName} ${user.lastName}`}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{user.email}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{`${user.addressLine1} ${user ?.addressLine2 ? user.addressLine2 : ""}`}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{user.city.name}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{selectedCommunity.name}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, marginBottom: 15 }}>{"Item:  "}</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 3 }}>
              <View>
                <Text style={{ fontSize: 14, marginBottom: 15, fontWeight: "400" }}>{selectedMenuItem.name}</Text>
              </View>
              {selectedToppings ?.map(x => {
                return <Text style={{ fontSize: 14 }} key={`${x.id}${x.name}`}>{`${x.name} `}</Text>
              })}
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={{ fontSize: 14, marginBottom: 15 }}>{`Special instructions:`}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>{`${note != undefined ? note : ""}`}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
      </View>
    </View >
  );
}

OrderStatusScreen.navigationOptions = {
  title: 'Status',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
  },
});
