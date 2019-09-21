import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../constants/Theme.js';

const header = (props => {
    let itemFour = null;
    let background = props.background;
    //background ? props.background : THEME.BLUE_ACCENT
    return(
        <View style={[styles.container, {paddingLeft:16,paddingTop:10,paddingRight:10, backgroundColor: background}]}>
          <View>
            
          </View>
            <View style={[styles.textContainer]}>
                <Text style={[styles.listText,{color:props.color}]}>{props.title}</Text>
            </View>
        </View>
)});

const styles = StyleSheet.create({
  container: {
      color:'white',
      width: "100%",
      minHeight:80,
      flexDirection:'column',
      justifyContent:'center',
      flexDirection:"row",
      alignItems:"center",
  },
  listText: {
      fontSize:24,
      fontWeight:"300"
  },
  labelText: {
      fontSize:11,
      marginBottom:0,
      paddingBottom:0,
      fontWeight:"700",
      color:'grey'
  },
  textContainer:{
      flexDirection:"row",
      alignItems:"center",
  },
  text: {
      fontSize:14,
      fontWeight:"300",
  },
  marginRight: {
      paddingRight:40,
  }
});

export default header;