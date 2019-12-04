import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import ButtonBackground from '../components/CustomButton';
import NextButton from '../components/NextButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultInput from '../components/CustomInput';
import { MonoText } from '../components/StyledText';
import { getMenuItems, getToppingsForMenuItem } from '../utils/utils.js';
import { submitCode } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
//import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../context/AppContext.js';

export default CodeScreen = (props) => {
  let { navigation } = props;

  const [user, setUser] = useContext(UserContext);
  const [password, setPassword] = useState("Test123$");
  const [code, setCode] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    status: "InProgress"
  })
  let spinner = null;
  if (loading) {
    spinner = <ActivityIndicator color={THEME.BLUE_PRIMARY} />;
  }


  const onSubmit = () => {
    setLoading(true);
    codeObj = {
      code
    }
    submitCode(codeObj).then((response) => {
      setLoading(false);
      console.log("code response: ", response )
      if(response.accepted){
      navigation.navigate(
        'AvailableCommunities',
        { user })
      } else {
        setMessage("Code is incorrect. Please try again")
      }
    });

  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ width: "70%", height: 120 }}>
        <Image style={{ flex: 1, width: undefined, height: undefined }}
          source={require('../assets/images/Logo.png')}
          resizeMode="contain" />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{
          borderColor: "rgba(0,0,0,0.2)",
          borderRadius: 10,
          padding: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 1,
          backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          width: Dimensions.get('window').width > 500 ? "50%" : "90%"
        }}>
          <Text style={styles.invalid}>{message}</Text>

          {/* <View
            style={{ flex: 7 }}
            contentContainerStyle={styles.contentContainer}> */}
          <View style={[styles.input]}>
            <Icon name="lock" color="#DDD" size={28} style={styles.icon} />
            <DefaultInput placeholder="Code"
              label="Code"
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={code}
              onChangeText={(val) => setCode(val)}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.buttons}>
            <View style={{ height: 30 }}>{spinner}</View>
              <ButtonBackground
                style={styles.buttonPadding}
                color={THEME.BLUE_PRIMARY}
                inverse={true}
                onPress={onSubmit}
                title={"Submit"}
              // disabled={userStore.validateEmail && userStore.validatePassword ? false : true}
              />
          </View>
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

CodeScreen.navigationOptions = {
  title: 'Enter Daily Code',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  direction: {
    flexDirection: Dimensions.get('window').height > 500 ? "column" : "row",
  },
  inputContainer: {
    flex: 1,
  },
  inputContainerInd: {
    width: "100%",
    marginBottom: 25,
  },
  inputContainer: {
    width: "100%",
  },
  buttonPadding: {
    padding: 15,
    borderRadius: 5
  },
  buttons: {
    width: "70%",
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
  },
  textInput: {
    width: "80%",
    borderColor: "#DDD",
    borderWidth: 1,
    color: "grey",
    padding: 13,
    backgroundColor: "transparent",
  },
  invalid: {
    fontSize: 11,
    color: THEME.ACTION_NEGATIVE,
    borderColor: THEME.ACTION_NEGATIVE,
  },
});
