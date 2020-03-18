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
import { login } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
//import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../context/AppContext.js';

export default LoginScreen = (props) => {
  let { navigation } = props;

  const [user, setUser] = useContext(UserContext);
  const [password, setPassword] = useState("Test123$");
  const [email, setEmail] = useState("chaserbullock@live.com");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    status: "InProgress"
  })
  let spinner = null;
  if (loading) {
    spinner = <ActivityIndicator color={THEME.BLUE_PRIMARY} />;
  }


  const onLogin = () => {
    setLoading(true);
    userObj = {
      email,
      password
    }
    login(userObj).then((response) => {
      setLoading(false);
      if(response?.token){
      setUser(response);
      setMessage("");
      navigation.navigate(
        'Main Menu',
        { user })
      } else {
        setMessage("Email or Password is incorrect. Please try again")
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

            <Icon name="person" color="#DDD" size={28} style={styles.icon} />
            <DefaultInput placeholder="Email"
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={email}
              onChangeText={(val) => setEmail(val)}
              autoCorrect={false}
              //valid={userStore.validateEmail}
              autoCapitalize="none"
              keyboardType="email-address"

            />
          </View>
          <View style={[styles.input]}>
            <Icon name="lock" color="#DDD" size={28} style={styles.icon} />
            <DefaultInput placeholder="Password" style={styles.textInput}
              placeholderTextColor="#DDD"
              value={password}
              //valid={userStore.validatePassword}
              onChangeText={(val) => setPassword(val)}
              secureTextEntry
            />
          </View>
          <View style={{ ...THEME.ROW, justifyContent: 'space-between', }}>
            <TouchableHighlight style={{ paddingRight: 20, marginBottom: 10 }} onPress={() => props.navigation.navigate('Register')}>
              <Text style={{
                color: THEME.BLUE_PRIMARY, ...THEME.TEXT_BODY_SMALL,
                textDecorationLine: 'underline',
                textDecorationColor: THEME.BLUE_PRIMARY,
                textDecorationStyle: 'solid'
              }}>
                Sign Up
                        </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate('PasswordReset', {
                  toggleEmailToast
                })
                AsyncStorage.setItem('url', url)
              }
              }
            >
              <Text style={{ ...THEME.TEXT_BODY_SMALL, textDecorationLine: "underline", color: THEME.BLUE_PRIMARY }}>Forgot Password</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttons}>
            <View style={{ height: 25 }}>{spinner}</View>
            <View style={{alignItems:"center"}}>
              <ButtonBackground
                style={styles.buttonPadding}
                color={THEME.BLUE_PRIMARY}
                inverse={true}
                onPress={onLogin}
                title={"Log In"}
              // disabled={userStore.validateEmail && userStore.validatePassword ? false : true}
              />
              </View>
          </View>
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

LoginScreen.navigationOptions = {
  title: 'Login',
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
    padding: 10,
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
