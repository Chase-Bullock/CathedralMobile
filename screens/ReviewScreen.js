import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput
} from 'react-native';
import CustomButton from '../components/Button';
import NextButton from '../components/NextButton';

import { MonoText } from '../components/StyledText';
import { submitOrder } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
import { UserContext } from '../context/AppContext';


export default ReviewScreen = (props) => {

  let { navigation } = props;
  let selectedMenuItem = navigation.state.params.selectedMenuItem;
  let selectedCommunity = navigation.state.params ?.selectedCommunity;
  let selectedToppings = navigation.state.params.selectedToppings;
  let note = navigation.state.params.note;

  const [userOrder, setUserOrder] = useState();
  const [user, setUser] = useContext(UserContext);


  useEffect(() => {
    setUserOrder(
      {
        orderItems: [
          {
            menuItem: selectedMenuItem,
            sizeId: null,
            quantity: 4,
            toppings: selectedToppings
          }
        ],
        order: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          addressLine1: user ?.addressLine1,
          addressLine2: user ?.addressLine2,
          cityId: user.cityId,
          zipCode: user ?.zipcode,
          communityId: selectedCommunity,
          builderId: user ?.builderId,
          note: note
        }
      }
    )
  }, []);

  console.log(userOrder);
  return (
    <View style={styles.container}>

      <View
        style={{ flex: 9 }}
        contentContainerStyle={styles.contentContainer}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <View style={{ flexDirection: "row", marginBottom: 25 }}>
              <View style={{flex: 1}}>
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

          <View style={{flex: 1}}>
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
        <NextButton
          title="Confirm"
          onPress={() => {
            console.log("submitting: ",userOrder);

            submitOrder(userOrder)
            /* 1. Navigate to the Details route with params */
            navigation.navigate('OrderStatus',
              { selectedMenuItem, selectedToppings, selectedCommunity, note }
            )
          }}
        />
      </View>
    </View >
  );
}

ReviewScreen.navigationOptions = {
  title: 'Review',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
  },
});
