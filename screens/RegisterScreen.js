import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  KeyboardAvoidingView,
  LayoutAnimation
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/Button';
import NextButton from '../components/NextButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultInput from '../components/CustomInput';
import { Dropdown } from 'react-native-material-dropdown';
import { MonoText } from '../components/StyledText';
import { registerUser, getBuilders, getCities, updateUser } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
import { UserContext } from '../context/AppContext.js';

export default RegisterScreen = (props) => {

  let { navigation } = props;

  let lastRoute = navigation.state.params ?.lastRoute;

  const [user, setUser] = useContext(UserContext);
  const [userObj, setUserObject] = useState({});
  const [error, setError] = useState();
  const [updatingUser, setUpdatingUser] = useState(false);
  const [cities, setCities] = useState();
  const [builders, setBuilders] = useState(
    [
      { value: 1, label: "lennar" },
      { value: 2, label: "Beazer" }
    ]
  )
  const [validation, setValidation] = useState({
    password: false,
    email: false
  });
  const [showValidation, setShowValidation] = useState({});
  const [validationMessage, setValidationMessage] = useState();

  useEffect(() => {
    if (Object.keys(user).length != 0) {
      setUpdatingUser(true);
      console.log(user)
      setUserObject(user);
      setValidation({ ...validation, password: true, email: true })
    }
  }, [])
  useEffect(() => {
    getBuilders().then(response => setBuilders(response.map(builder => {
      return { value: builder.id, label: builder.name }
    })));
    getCities().then(response => setCities(response.map(city => {
      return { value: city.id, label: city.name }
    })));
  }, [])

  isEmailValid = email => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      .test(email);
  };

  validateEmail = () => {
    let isValid = true;
    isValid = isValid && this.isEmailValid(userObj ?.email.toLowerCase());
    setValidation({
      ...validation,
      email: isValid
    });
  }

  validatePassword = () => {
    let isValid = true;
    isValid = isValid && userObj ?.password ?.trim() != '' && userObj ?.password == userObj ?.confirmPassword;
    setValidation({
      ...validation,
      password: isValid
    });
    if (userObj ?.password != userObj ?.confirmPassword) {
      setValidationMessage("Passwords do not match");
    } else if (!isValid) {
      setValidationMessage("Password is invalid");
    } else {
      setValidationMessage("")
    }
  }

  handleRegisterUser = () => {
    if (!updatingUser &&
      userObj.firstName &&
      userObj.lastName &&
      userObj.email &&
      userObj.number &&
      userObj.addressLine1 &&
      userObj.zipcode &&
      userObj.builderId &&
      userObj.cityId &&
      userObj.password &&
      userObj.confirmPassword) {
      registerUser(userObj).then((response) => {
        console.log(response);
        if (response ?.token) {
          setUser(response);
          navigation.navigate(
            'AvailableCommunities',
            { user })
        } else {
          setError(response[0].description)
        }
      })
    } else if (updatingUser &&
      userObj.firstName &&
      userObj.lastName &&
      userObj.email &&
      userObj.number &&
      userObj.addressLine1 &&
      userObj.zipcode &&
      userObj.builderId &&
      userObj.cityId) {
      updateUser(userObj).then((response) => {
        console.log(response);
        if (response ?.token) {
          setUser(response);
          navigation.navigate(
            lastRoute,
            { user })
        } else {
          setError(response[0].description)
        }
      })
    } else {
      setError("Please fill out all required fields")
    }
  }

  console.log(validation)
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 9 }} behavior="padding" enabled keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={[styles.textInput]}>
            <DefaultInput placeholder="First Name"
              label={"First Name"}
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={userObj ?.firstName}
              onChangeText={(val) => setUserObject({
                ...userObj,
                firstName: val
              })}
              autoCorrect={false}
            />
          </View>
          <View style={[styles.textInput]}>
            <DefaultInput placeholder="Last Name"
              label={"Last Name"}
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={userObj ?.lastName}
              onChangeText={(val) => setUserObject({
                ...userObj,
                lastName: val
              })}
              autoCorrect={false}
            />
          </View>
          <View style={[styles.textInput]}>
            {
              showValidation ?.email && !validation ?.email &&
                <Text style={styles.invalid}> Email is invalid
              </Text>
            }
            <DefaultInput placeholder="Email"
              label={"Email"}
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={userObj ?.email}
              onChangeText={(val) => {
                setUserObject({
                  ...userObj,
                  email: val
                })
                setTimeout(() => { validateEmail() }, 2000)
              }}
              onBlur={() => {
                setShowValidation({
                  ...showValidation,
                  email: true
                })
              }}
              autoCorrect={false}
              keyboard-type="email-address"
            />
          </View>
          <View style={[styles.textInput]}>
            <DefaultInput placeholder="Phone Number"
              label={"Phone Number"}
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={userObj ?.number}
              onChangeText={(val) => setUserObject({
                ...userObj,
                number: val
              })}
              autoCorrect={false}
            />
          </View>
          <View style={[styles.textInput]}>
            <DefaultInput placeholder="Address Line 1"
              label={"Address Line 1"}
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={userObj ?.addressLine1}
              onChangeText={(val) => setUserObject({
                ...userObj,
                addressLine1: val
              })}
              autoCorrect={false}
            />
          </View>
          <View style={[styles.textInput]}>
            <DefaultInput placeholder="Address Line 2"
              label={"Address Line 2"}
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={userObj ?.addressLine2}
              onChangeText={(val) => setUserObject({
                ...userObj,
                addressLine2: val
              })}
              autoCorrect={false}
            />
          </View>
          <View style={{ marginLeft: 15, width: 100 }}>
            <Text style={styles.label}>City</Text>
            <View
              style={{ marginLeft: 15 }}>
              <Dropdown
                value={userObj ?.cityId}
                animationDuration={50}
                dropdownOffset={{ top: 10, left: 0 }}
                data={cities}
                onChangeText={(val) => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring),
                    setUserObject({ ...userObj, cityId: val })
                }}
              />
            </View>
          </View>
          <View style={[styles.textInput]}>
            <DefaultInput placeholder="Zipcode"
              label={"Zipcode"}
              style={styles.textInput}
              placeholderTextColor="#DDD"
              value={userObj ?.zipcode}
              onChangeText={(val) => setUserObject({
                ...userObj,
                zipcode: val
              })}
              autoCorrect={false}
            />
          </View>
          <View style={{ marginLeft: 15, width: 100 }}>
            <Text style={styles.label}>Builder</Text>
            <View
              style={{ marginLeft: 15 }}>
              <Dropdown
                value={userObj ?.builderId}
                animationDuration={50}
                dropdownOffset={{ top: 10, left: 0 }}
                data={builders}
                onChangeText={(val) => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring),
                    setUserObject({ ...userObj, builderId: val })
                }}
              />
            </View>
          </View>
          {!updatingUser &&
            <View>
              <View style={[styles.textInput]}>
                {
                  showValidation ?.password && !validation ?.password &&
                    <Text style={styles.invalid}> {
                      validationMessage
                    }
                    </Text>
            }

                <DefaultInput
                  label="Password"
                  placeholder="Password"
                  style={styles.textInput}
                  placeholderTextColor="#DDD"
                  value={userObj ?.password}
                  onChangeText={(val) => {
                    setUserObject({
                      ...userObj,
                      password: val
                    })
                    setTimeout(() => { validatePassword() }, 2000)
                  }
                  }
                  secureTextEntry
                />
              </View>
              <View style={[styles.textInput]}>
                <DefaultInput
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  style={styles.textInput}
                  placeholderTextColor="#DDD"
                  value={userObj ?.confirmPassword}
                  onChangeText={(val) => {
                    setUserObject({
                      ...userObj,
                      confirmPassword: val
                    })
                    setTimeout(() => { validatePassword() }, 2000)
                    validatePassword()
                  }
                  }
                  onBlur={() => {
                    setShowValidation({
                      ...showValidation,
                      password: true
                    })
                  }}
                  secureTextEntry
                />
              </View>
            </View>
          }
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{ flex: 1 }}>
        <Text style={styles.invalid}>{error}</Text>
        <NextButton
          disabled={!validation.email || !validation.password}
          title={updatingUser ? "Confirm" : "Register"}
          onPress={handleRegisterUser}
        />
      </View>
    </View >
  );
}

RegisterScreen.navigationOptions = {
  title: 'Note',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
    justifyContent: "center"
  },
  label: {
    fontSize: THEME.TEXT_BODY_SMALL.fontSize,
    fontWeight: '500',
  },
  textInput: {
    margin: 15,
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
  },
  invalid: {
    fontSize: 11,
    color: THEME.ACTION_NEGATIVE,
    borderColor: THEME.ACTION_NEGATIVE,
  },
});
