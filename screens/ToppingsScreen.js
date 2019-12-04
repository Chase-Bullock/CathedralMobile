import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/Button';
import NextButton from '../components/NextButton';
import { MonoText } from '../components/StyledText';
import { getMenuItems, getToppingsForMenuItem } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';

export default ToppingsScreen = (props) => {

  let { navigation } = props;
  let selectedMenuItem = navigation.state.params.selectedMenuItem;
  let selectedCommunity = navigation.state.params?.selectedCommunity;


  const [toppings, setToppings] = useState();
  const [meatToppings, setMeatToppings] = useState();
  const [otherPizzaToppings, setOtherPizzaToppings] = useState();
  const [tacoToppings, setTacoToppings] = useState();
  const [tacoSauceToppings, setTacoSauceToppings] = useState();
  const [toppingsTypes, setToppingsTypes] = useState();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [errorMsg, setErrorMsg] = useState();


  useEffect(() => {
    console.log(selectedMenuItem)
    if (selectedMenuItem.name == "Pizza") {
      console.log("hererkejrlejrlrhLJ")
      getToppingsForMenuItem(selectedMenuItem.name, "Meat").then((response) => setMeatToppings(response));
    } else if (selectedMenuItem.name == "Taco") {
      getToppingsForMenuItem(selectedMenuItem.name, "Topping").then((response) => setTacoToppings(response));
      getToppingsForMenuItem(selectedMenuItem.name, "Sauce").then((response) => setTacoSauceToppings(response));

    }
  }, [])

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
    const check = selectedToppings.some(x => x.id == item.id);
    if(check == false){
    setSelectedToppings((prev) => ([ ...prev, item ]));
    } else {
      var newSelectedToppings = selectedToppings.filter(x => x.id != item.id);
      setSelectedToppings(newSelectedToppings);
      //remove from selectedToppings
    }

  }


  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "red" }}>{errorMsg}</Text>
        </View>
        <View style={{ alignItems: "center", flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        {meatToppings &&
            <Text style={THEME.TEXT_SECTION_TITLE_SMALL}>Toppings</Text>}
          {
            meatToppings && meatToppings.map((topping, index) => {
              return (
                <CustomButton
                  key={topping.id}
                  style={{ marginBottom: 12, height: 50 }}
                  title={topping.name}
                  selected={selectedToppings.includes(topping)}
                  //image={'../assets/images/pizza.png'}
                  onPress={() => { selectToppingItem(topping) }} />
              )
            })
          }
          {tacoToppings &&
            <Text style={THEME.TEXT_SECTION_TITLE_SMALL}>Taco Toppings</Text>}
          {
            tacoToppings && tacoToppings.map((topping, index) => {
              return (
                <CustomButton
                  key={topping.id}
                  style={{ marginBottom: 12, height: 50 }}
                  title={topping.name}
                  selected={selectedToppings.includes(topping)}
                  //image={'../assets/images/pizza.png'}
                  onPress={() => { selectToppingItem(topping) }} />
              )
            })
          }
          {tacoSauceToppings &&
            <Text style={THEME.TEXT_SECTION_TITLE_MEDIUM}>Sauces</Text>}
          {
            tacoSauceToppings && tacoSauceToppings.map((topping, index) => {
              return (
                <CustomButton
                  key={topping.id}
                  style={{ marginBottom: 12, height: 50 }}
                  title={topping.name}
                  selected={selectedToppings.includes(topping)}

                  //image={'../assets/images/pizza.png'}
                  onPress={() => { selectToppingItem(topping) }} />
              )
            })
          }
        </View>
      </ScrollView>
      </View>
      <View style={{flex:1}}>
      <NextButton
        title="Next"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Note',
             { selectedMenuItem, selectedToppings, selectedCommunity },
          )}}
      />
      </View>
    </View >
  );
}

ToppingsScreen.navigationOptions = {
  title: 'Toppings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
    justifyContent: "space-between",
    flexDirection: "column"
  },
});
