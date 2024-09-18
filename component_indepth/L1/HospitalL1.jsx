import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set
import HospitalList from './HospitalList';

const HospitalL1 = () => {
  const navigation = useNavigation();

  const handleAddHospital = () => {
    navigation.navigate('HospitalForm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttoncontainer} >
      <TouchableOpacity style={styles.button} onPress={handleAddHospital}>
        <Icon name="add" size={20} color="#34495e" style={styles.icon} />
        <Text style={styles.buttonText}>Add Hospital</Text>
      </TouchableOpacity>
      </View>
      <HospitalList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light background color
  },
  buttoncontainer:{
   justifyContent:'flex-end',
   alignItems:'flex-end'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Primary color
    padding: 15,
    borderRadius: 5,
   
 
    width:200
  },
  buttonText: {
    color: '#34495e', // Text color for the button
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default HospitalL1;
