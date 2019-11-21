import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { THEME } from '../constants/Theme.js';


const customButton = props => {
    let iconPlaced = null;
    let buttonTitle= null;

    if(props.title){
        buttonTitle = <Text style={[styles.text, {color:props.inverse ? 'white' : props.color}]}>{props.title}</Text>;
    }

    if(props.icon) {
        iconPlaced =<View style={{marginRight:props.title ? 3 : 0}}>
                        <Icon 
                            name={props.icon} 
                            size={props.iconSize ? props.iconSize : 18} 
                            color={props.inverse ? 'white' : props.color ? props.color : THEME.GREY_MEDIUM_ALT} />
                    </View>
    }
  
    return (
    <TouchableOpacity {...props} style={[styles.button, 
            props.style, 
            props.disabled ? styles.disabled : null, 
            {
            ...THEME.TEXT_BODY_REGULAR,
            borderColor:props.color,
            backgroundColor:props.inverse ? props.color : 'transparent'
            }]}>

            {iconPlaced}
            {buttonTitle}
 
    </TouchableOpacity>
    );
};

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
    elevation: 1,
    padding:10,
    marginBottom:5,
    minHeight:50,
    backgroundColor:"#FFF",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
},
    text: {
        alignSelf:"center",   
    },
    disabled: {
        opacity:.3,
    }
});

export default customButton;