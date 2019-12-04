import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useContext } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/Button';
import NextButton from '../components/NextButton';
import { MonoText } from '../components/StyledText';
import { getMenuItems } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
import { UserContext } from '../context/AppContext';

const MenuScreen = (props) => {
  let { navigation } = props;
  let selectedCommunity = navigation.state.params ?.selectedCommunity;

  const [menuItems, setMenuItems] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const [user, setUser] = useContext(UserContext);
  const [menuItemImages, setMenuItemImages] = useState();

  useEffect(() => {
    getMenuItems().then((response) => {
      var imagesArray = [];
      setMenuItems(response)
      response.forEach(menuItem => {
        imagesArray.push(require('../assets/images/pizza.png'));
      });
      setMenuItemImages(imagesArray);
    });

  }, [])

  const navigateToToppings = () => {
    if (selectedMenuItem != undefined) {
      navigation.navigate(
        'Toppings',
        {
          selectedMenuItem,
          selectedCommunity
        })
    } else {
      setErrorMsg("Select something from the menu!")
    }
  }

  const selectMenuItem = (item) => {
    setSelectedMenuItem(item);
    setErrorMsg("");
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "red" }}>{errorMsg}</Text>
      </View>
      <View style={{ flex: 9 }}>
        <ScrollView>
          <View style={{ alignItems: "center", flex: 9, flexDirection: 'column', justifyContent: 'space-between' }}>
            {menuItemImages && menuItems ?.map((item, index) => (
              <CustomButton
                key={item.id}
                style={{ marginBottom: 12, flex: 1, width: "90%", maxHeight: 85 }}
                title={item.name}
                image={typeof menuItemImages[index] !== 'undefined' ? menuItemImages[index] : undefined}
                selected={selectedMenuItem ?.id == item.id}
                onPress={() => { selectMenuItem(item) }} />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <NextButton
          title="Next"
          onPress={() => {
            navigateToToppings();
          }}
          inverse={true}
        />
      </View>
    </View >
  );
}

MenuScreen.navigationOptions = {
  title: 'Menu',
};


export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
    justifyContent: "space-between"
  },
  button: {
    alignSelf: 'center',
    padding: 20,
    borderRadius: 5,
    width: "50%",
    backgroundColor: THEME.ACTION_PRIMARY
  },
});
