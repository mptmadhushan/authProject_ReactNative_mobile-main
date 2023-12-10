import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableHighlight,
  ImageBackground,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ReactNativeBiometrics,{ BiometryTypes } from 'react-native-biometrics';
import database from '@react-native-firebase/database';

import {useEffect, useState} from 'react';



const AuthScreen= ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [userId, setUserId] = useState('')

 // const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const compatible = await LocalAuthentication.hasHardwareAsync();
  //     setIsBiometricSupported(compatible);
  //   })();
  // });

  React.useEffect(() => {
    if (route.params?.userId) {
      setUserId(route.params?.userId)
     
    }
  }, [route.params?.userId]);

;
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

  const rnFaceToutchID = () =>{
    rnBiometrics.simplePrompt({
        promptMessage: "Sign in with Touch ID",
        cancelButtonText: "Close",
        })
        .then(async (resultObject) => {
        // let allData = await resultObject
        // console.trace("🚀 ~ allData", allData)
        const { success } = resultObject;
        if (success) {
        console.trace("successful biometrics provided");
        updateUserStateParam()
        } else {
        console.trace("user cancelled biometric prompt");
        // this.addListnerAgain()
        }
        })
        .catch((err) => {
        console.trace("biometrics failed", err);
        });
  }


  const updateUserStateParam = () =>{
    database()
    .ref('/userrand/'+userId)
    .update({
      isUserLog: true,
    })
    .then(() => 
    console.log('Data updated.'),
    navigation.navigate('home')
    )
    .catch((error) => {
        console.log("error: " + error);
    })
  }

  const isBiometricSupport = async () => {

  
    rnBiometrics.isSensorAvailable()
    .then((resultObject) => {
      const { available, biometryType } = resultObject
      console.log(biometryType)
      rnFaceToutchID()
  
      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported')
        rnFaceToutchID()
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported')
        rnFaceToutchID()
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported')
        rnFaceToutchID()
      } else {
        console.log('Biometrics not supported')
      }
    })

   
  };

  return (
    <SafeAreaView style={{justifyContent:'center',alignContent:'center'}}>
    <ImageBackground source={require('./images/bgbiometric.jpeg')} resizeMode="cover" style={styles.image}>
          <Text style={{fontSize: 25, justifyContent:'center', textAlign:'center', marginTop: 100}}>
             Please click finger icon for biometric authentication
          </Text>
          <View style={{flex:1, marginTop: 300, alignContent:'center', alignItems:'center'}}>
          <TouchableHighlight onPress={isBiometricSupport}>
          <Image source={require('./images/finger.png')} style={{width: 100, height: 100, resizeMode: 'stretch',}}/>
          </TouchableHighlight>
        
          </View>
         
    </ImageBackground>

   
        {/* <Header /> */}
        {/* <TouchableHighlight
          style={{
            height: 60,
          }}>
          <Button
            title="Login with Biometrics"
            color="#fe7005"
          
          />
        </TouchableHighlight>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
        

        </View> */}

    </SafeAreaView>
  );
};

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
  image: {
    height:'100%',
    width:'100%'
  },
});

export default AuthScreen;