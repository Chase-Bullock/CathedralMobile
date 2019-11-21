import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { THEME } from '../constants/Theme.js';


const customInput = props => {
   let labelContent = null;
   let input =  <TextInput 
                {...props}
                style={[styles.textInputs, styles.padding, props.style,
                        {opacity:(props.editable || props.editable == null) ? 1 : .4}]} 
                maxLength={199}
                />;
   if(props.label) {
       labelContent = <Text style={[styles.label, {color:props.color}]}>{props.label}</Text>;
   } 
   if(props.readonly) {
       input = <View>
                    <Text style={[styles.textInputs, {fontSize:THEME.TEXT_BODY_SMALL.fontSize,color:props.color}]}>{props.value}</Text>
                </View>
   }
   return (
    <View style={{width:"100%"}}>
        {labelContent}
        {input}
    </View>
);
}
//!props.valid && props.touched ? styles.inValid : null

const styles = StyleSheet.create({
    padding:{
        padding:8,
    },
    textInputs: {
        width:"100%",
        borderRadius:6,

    },
    inValid: {
        color:THEME.ACTION_NEGATIVE,
        borderColor:THEME.ACTION_NEGATIVE,
    },
    label: {
        fontSize:THEME.TEXT_BODY_SMALL.fontSize,
        fontWeight:'500',
    }
});

export default customInput;