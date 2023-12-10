import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    // Implement your login logic here
    // For this example, we'll just display the user's input in the console
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ImageBackground source={require('./images/biometric1.jpeg')} style={styles.backgroundImage} >
    <View>
      <Text style={{color: '#fff', fontSize: 30, paddingTop: 80, paddingLeft: 20, paddingRight: 20}}>
         Please wait...
      </Text>
      <Text style={{color: '#fff', fontSize: 25, paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
        When user login use web this app allow to biometrics
      </Text>
    </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex:1,
    width:'100%',
    height: '100%',
 

  },
 
});

export default LoginScreen;
