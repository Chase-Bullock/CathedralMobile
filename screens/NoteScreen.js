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
import { MonoText } from '../components/StyledText';
import { getMenuItems, getToppingsForMenuItem } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';

export default NoteScreen = (props) => {

  let { navigation } = props;
  let selectedMenuItem = navigation.state.params.selectedMenuItem;
  let selectedToppings = navigation.state.params.selectedToppings;

  const [note, setNote] = useState();





  // useEffect(() => {
  //   if (toppings != undefined) {
  //     let toppingsTypes = [];
  //     toppings?.forEach(i => {
  //       toppingsTypes.push(i.toppingType.mainValue)
  //     });

  //     let toppingsTypesUnique = [...new Set(toppingsTypes)];


  //     setToppingsTypes(toppingsTypesUnique);
  //   }
  // }, [toppings])

  const selectToppingItem = (item) => {
    console.log(item, "selectedTopping")
    const check = selectedToppings.some(x => x.id == item.id);
    if(check == false){
    setSelectedToppings((prev) => ([ ...prev, item ]));
    } else {
      var newSelectedToppings = selectedToppings.filter(x => x.id != item.id);
      setSelectedToppings(newSelectedToppings);
      //remove from selectedToppings
    }

  }

  console.log(selectedToppings, "selectedToppings")


  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
       <TextInput 
       style={{borderWidth: 1, margin: 25, height: 150, justifyContent: "flex-start", textAlignVertical: "top", padding: 5}}
       multiline={true}
       numberOfLines={10}
       onChangeText={text => setNote(text)}
       value={note}
       />
      </ScrollView>
      <Button
        title="Next"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Note')
        }}
      />
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
    backgroundColor: '#fff',
  },
});
