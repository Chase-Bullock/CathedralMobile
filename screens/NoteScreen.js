import React, { useState, useEffect } from 'react';
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

export default NoteScreen = (props) => {

  let { navigation } = props;
  let selectedMenuItem = navigation.state.params.selectedMenuItem;
  let selectedToppings = navigation.state.params.selectedToppings;
  let selectedCommunity = navigation.state.params?.selectedCommunity;


  const [note, setNote] = useState();

  return (
    <View style={styles.container}>
      <View
        style={{flex:9}}
        contentContainerStyle={styles.contentContainer}>
       <TextInput 
       style={{borderWidth: 1, margin: 10, height: 150, justifyContent: "flex-start", textAlignVertical: "top", padding: 5}}
       multiline={true}
       numberOfLines={10}
       placeholder="Enter special instructions"
       onChangeText={text => setNote(text)}
       value={note}
       />
      </View>
      <View style={{flex:1}}>
      <NextButton
        title="Next"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Review',
             { selectedMenuItem, selectedToppings, selectedCommunity, note },
             )
        }}
      />
      </View>
    </View >
  );
}

NoteScreen.navigationOptions = {
  title: 'Note',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
    justifyContent: "center"
  },
});
