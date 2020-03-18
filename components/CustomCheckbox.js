import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../constants/Theme.js';


const customCheckbox = props => (
    <input type="checkbox" {...props}/>
  );

const styles = StyleSheet.create({
  button: {
    width: "70%",
    borderRadius: 8,
    borderColor: THEME.GREY_LIGHT,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    padding: 10,
    marginBottom: 5,
    minHeight: 50,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  disabled: {
    opacity: .3,
  }
});

export default customCheckbox;