import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../constants/Theme.js';

const customButton = (props => {
  let iconPlaced = null;
  let buttonTitle = null;

  const selected = props.value != undefined ? styles.on : styles.off
  if (props.title) {
    buttonTitle = <Text style={[styles.text, { color: props.inverse ? 'white' : props.color, fontSize: 18, flex:2 }]}>{props.title}</Text>;
  }

  if (props.icon) {
    iconPlaced = <View style={{ marginRight: props.title ? 3 : 0 }}>
      <Icon
        name={props.icon}
        size={props.iconSize ? props.iconSize : 18}
        color={props.inverse ? 'white' : props.color ? props.color : THEME.GREY_MEDIUM_ALT} />
    </View>
  }


  if (props.image != undefined) {
    imagePlaced = <View style={{ marginRight: props.title ? 3 : 0 }}>
      {/* <Image
        source={require(props.image)}
        style={{width: 80, height:80,}}
        color={props.inverse ? 'white' : props.color ? props.color : THEME.GREY_MEDIUM_ALT} /> */}
    </View>
  }

  let itemFour = null;
  let background = props.background;
  //background ? props.background : THEME.BLUE_ACCENT
  return (
    <TouchableOpacity {...props} style={[styles.button,
    props.style,
    props.disabled ? styles.disabled : null,
    {
      borderColor: props.color,
      backgroundColor: {selected}
    }]}>
      {imagePlaced}
      {iconPlaced}
      {buttonTitle}

    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    padding: 6,
    borderBottomWidth: 1,
    borderRadius: 3,
    height: 80,
    width: "90%",
    flex:3,
    justifyContent: "space-between"
  },
  text: {
    textAlign: "center",
  },
  disabled: {
    opacity: .3,
  },
  on: {
    backgroundColor: "white"
  },
  off: {
    backgroundColor: "black"
  }
});

export default customButton;