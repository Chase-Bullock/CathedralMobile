import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/Button';
import { MonoText } from '../components/StyledText';
import { getMenuItems } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';

const MenuScreen = (props) => {
  let { navigation } = props;

  const [menuItems, setMenuItems] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [selectedMenuItem, setSelectedMenuItem] = useState();

  useEffect(() => {
    getMenuItems().then((response) => setMenuItems(response));
  }, [])

  const navigateToToppings = () => {
    if (selectedMenuItem != undefined) {
      navigation.navigate(
        'Toppings',
        { selectedMenuItem })
    } else {
      setErrorMsg("Select something from the menu!")
    }
  }

  const selectMenuItem = (item) => {
    setSelectedMenuItem(item);
    setErrorMsg("");
  }

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={{alignItems: "center"}}>
        <Text style={{color:"red"}}>{errorMsg}</Text>
        </View>
        <View style={{ alignItems: "center", flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          {menuItems ?.map(item => (
            <CustomButton
              key={item.id}
              style={{ marginBottom: 12 }}
              title={item.name}
              image={'../assets/images/pizza.png'}
              onPress={() => { selectMenuItem(item) }} />
          ))}
        </View>
      </ScrollView>
      <Button
        title="Toppings"
        onPress={() => {
          navigateToToppings();
        }}
      />
    </View >
  );
}

MenuScreen.navigationOptions = {
  title: 'Menu',
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
