import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import * as Location from 'expo-location'; // Import Expo Location API
import { BASE_URL } from '../../API/Authapi';
import { Emp_ID, UserToken } from '../../auth_component/Login';

const DcrForm = () => {
  const [workType, setWorkType] = useState('');
  const [area, setArea] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  // Request permission and get location when the component mounts
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      console.log(`Location: ${loc.coords.latitude}, ${loc.coords.longitude}`);
    };

    getLocation();
  }, []);

  const handleSubmit = async () => {
    if (!location) {
      Alert.alert('Error', 'Location is not available.');
      return;
    }

    try {
      setLoading(true);

      const formatDateTime = () => {
        const date = new Date();
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
          .getSeconds()
          .toString()
          .padStart(2, '0')}`;
      };

      const formattedDate = formatDateTime();

      const response = await axios.post(
        `${BASE_URL}api/v1/mobile/dcr`,
        {
          emp_id: Emp_ID,
          work_date: formattedDate,
          start_time: formattedDate,
          work_type: workType,
          area: area,
          working_with: workingWith,
          remarks: remarks,
          latitude: location.latitude,  // Send latitude
          longitude: location.longitude // Send longitude
        },
        {
          headers: {
            'x-hospital-token': UserToken,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'DCR saved successfully');
        setWorkType('');
        setArea('');
        setWorkingWith('');
        setRemarks('');
      } else {
        Alert.alert('Error', 'Failed to save DCR');
      }
    } catch (error) {
      console.error('Request failed', error);
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'An error occurred');
      } else {
        Alert.alert('Error', 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Work Type</Text>
      <RNPickerSelect
        onValueChange={(value) => setWorkType(value)}
        items={[
          { label: 'Field Work', value: 'Field Work' },
          { label: 'Admin Day', value: 'Admin Day' },
          // ...other options
        ]}
        placeholder={{ label: 'Select work type', value: null }}
      />

      <Text style={styles.label}>Area</Text>
      <RNPickerSelect
        onValueChange={(value) => setArea(value)}
        items={[
          { label: 'OUT', value: 'OUT' },
          { label: 'EX', value: 'EX' },
          { label: 'Mumbai', value: 'Mumbai' },
        ]}
        placeholder={{ label: 'Select area', value: null }}
      />

      <Text style={styles.label}>Working With</Text>
      <RNPickerSelect
        onValueChange={(value) => setWorkingWith(value)}
        items={[
          { label: 'EMP001', value: 'EMP001' },
          { label: 'EMP002', value: 'EMP002' },
          { label: 'EMP003', value: 'EMP003' },
        ]}
        placeholder={{ label: 'Select colleague', value: null }}
      />

      <Text style={styles.label}>Remarks</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setRemarks(text)}
        value={remarks}
        placeholder="Enter remarks"
        multiline
      />

      <Button
        title={loading ? 'Saving...' : 'Save DCR'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:'#f0f8ff'
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default DcrForm;
