import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../constants/Theme.js';

const customButton = (props => {
  let iconPlaced = null;
  let imagePlaced = null
  let buttonTitle = null;

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
      <Image
        source={props.image}
        style={{width: 80, height:80,}}
        color={props.inverse ? 'white' : props.color ? props.color : THEME.GREY_MEDIUM_ALT} />
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
      borderColor: props.selected ? THEME.GREEN_ACCENT : THEME.GREY_LIGHT,
      elevation: props.selected ? 5 : 0,
      borderWidth: props.selected ? 2 : 1
    }]}>
      {imagePlaced}
      {iconPlaced}
      {buttonTitle}

    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius:8,
    borderColor:THEME.GREY_LIGHT,
    borderWidth:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding:5,
    marginBottom:5,
    minHeight:50,
    backgroundColor:"#FFF",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
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