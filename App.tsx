/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,

} from 'react-native';

import AuthScreen from './app/AuthScreen';

import messaging from '@react-native-firebase/messaging';
import HomeScreen from './app/Home';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,createNavigationContainerRef } from '@react-navigation/native';


const navigationRef = createNavigationContainerRef()
const routeNameRef: any = React.createRef();

const Stack = createStackNavigator();
function App(): JSX.Element {

  const requestUserPermission = async () => {
   
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const mnotificationApp = async () => {
    if (await requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      
      messaging()
        .getToken()
        .then((fcmToken: any) => {
          console.log('FCM Token -> ', fcmToken);
        });
    } else console.log('Not Authorization status:', "authStatus");


    messaging()
      .getInitialNotification()
      .then(async (remoteMessage: any) => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification:' +
            'Notification caused app to open from quit state',
          );
          console.log(remoteMessage);
          Alert.alert(
            'getInitialNotification: Notification caused app to' +
            ' open from quit state',
          );
        }
      });


    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp: ' +
          'Notification caused app to open from background state',
        );
        console.log(remoteMessage);
        Alert.alert(
          'onNotificationOpenedApp: Notification caused app to' +
          ' open from background state',
        );
      }
    });


    messaging().setBackgroundMessageHandler(
      async (remoteMessage: any) => {
        console.log(
          'Message handled in the background!',
          remoteMessage
        );
      });

    messaging()
      .subscribeToTopic("HI")
      .then(() => {
        console.log(`Topic: ${"hi"} Suscribed`);
      });
  }

  type params = {
  
    params: { userId: string };
  };

  useEffect(() => {
    requestUserPermission()
    mnotificationApp()

    const unsubscribe = messaging().onMessage(
      async (remoteMessage: any) => {
       
        Alert.alert('Login request Recived !');
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage.notification.body)
        );
        if (navigationRef.isReady()) {
          navigationRef.navigate('authscreen',{
          userId: remoteMessage.notification.body
          });
        }
      }
    );

    return () => {
      unsubscribe;
      /**
       * Unsubscribe the device from a topic.
       */
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
        (routeNameRef.current =
          navigationRef.current.getCurrentRoute().name)
        }
      >
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="authscreen" component={AuthScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>


  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
