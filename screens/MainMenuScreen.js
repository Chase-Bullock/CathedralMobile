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
import { getCommunities } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
import { UserContext } from '../context/AppContext';

const MainMenuScreen = (props) => {
  let { navigation } = props;

  const [communities, setCommunities] = useState();
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    //currently getting all communities not only available. This is for testing purposes
    getCommunities().then((response) => setCommunities(response));
  }, [])

  const navigateToMenuItems = () => {
    if (selectedCommunity != undefined) {
      navigation.navigate(
        'Menu',
        { selectedCommunity })
    } else {
      setErrorMsg("Select a community!")
    }
  }

  const selectCommunity = (community) => {
    setSelectedCommunity(community);
    setErrorMsg("");
  }

  return (
    <View style={styles.container}>
      <View style={{flex:9, justifyContent: "flex-start"}}>
        <View style={{alignItems: "center"}}>
        <Text style={{color:"red"}}>{errorMsg}</Text>
        </View>
        <View style={{ alignItems: "center", flex: 1, flexDirection: 'column', justifyContent: 'space-between', maxHeight: 200 }}>
          {communities ?.map(community => (
            <CustomButton
              key={community.id}
              style={{ marginBottom: 12, flex:1, width: "90%" }}
              title={community.name}
              selected={selectedCommunity?.id == community.id ? true : false}
              onPress={() => { selectCommunity(community) }} />
          ))}
        </View>
      </View>
      <View style={{flex: 1}}>
      <NextButton
        title="Next"
        onPress={() => {
          navigateToMenuItems();
        }}
        inverse={true}
      />
      </View>
    </View >
  );
}

MainMenuScreen.navigationOptions = {
  title: 'Main Menu',
};


export default MainMenuScreen;

const styles = StyleSheet.create({
  container: {
    display:"flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
    justifyContent: "space-between"
  },
  button: {
    alignSelf: 'center',
    padding: 20,
    borderRadius: 5,
    width:"50%",
    backgroundColor:THEME.ACTION_PRIMARY
  },
});
