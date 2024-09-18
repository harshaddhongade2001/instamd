import React from 'react';
import { Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remove token and user object from AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      // Navigate to login screen after successful logout
      navigation.replace('Login'); // Replace so user can't go back to the previous screen

      Alert.alert('Logout', 'You have been logged out successfully.');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Button title="Logout" onPress={handleLogout} />
  );
};

export default LogoutButton;
