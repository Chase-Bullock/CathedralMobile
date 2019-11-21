import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../constants/Theme.js';

const nextButton = (props => {

  let buttonTitle;

  if (props.title) {
    buttonTitle = <Text style={{color: "white", fontSize: 18, alignSelf:"center"}}>{props.title}</Text>;
  }
  return (
    <TouchableOpacity {...props} style={[styles.button,
    props.style,
    props.disabled ? styles.disabled : null,
    {
      borderColor: props.color,
    }]}>
      {buttonTitle}
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    padding: 7,
    borderRadius: 7,
    width:"50%",
    backgroundColor:THEME.ACTION_PRIMARY
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

export default nextButton;