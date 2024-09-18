import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as Location from 'expo-location'; // Import Expo Location API
import { Emp_ID, UserToken } from '../../auth_component/Login';
import { BASE_URL } from '../../API/Authapi';

const VisitForm = ({ route, navigation }) => {
  const { visit_id, hospital_id } = route.params; // Accessing passed params
  const [contacts, setContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState('');
  const [promotionalItems, setPromotionalItems] = useState('');
  const [remarks, setRemarks] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch contacts when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/v1/mobile/hospital/contacts`, {
          params: { hosp_id: hospital_id },
          headers: {
            'x-hospital-token': UserToken,
          },
        });

        if (response.data.status === 201) {
          setContacts(response.data.result);
        } else {
          Alert.alert('Error', 'Failed to fetch contacts');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        Alert.alert('Error', 'An error occurred while fetching contacts');
      }
    };

    fetchContacts();
  }, []);

  // Request permission and get location when the component mounts
  useEffect(() => {
    const getLocation = async () => {
      try {
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
      } catch (error) {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Failed to get location.');
      }
    };

    getLocation();
  }, []);

  const handleSubmit = async () => {
    if (!UserToken) {
      Alert.alert('Error', 'Token not found');
      return;
    }
  
    // Check if location data is available
    const latitude = location ? location.latitude : null;
    const longitude = location ? location.longitude : null;
  
    // Validate location before submitting
    if (latitude === null || longitude === null) {
      Alert.alert('Error', 'Location is not available.');
      return;
    }
  
    try {
      setLoading(true);
  
      // Prepare request payload
      const requestData = {
        visit_id: parseInt(visit_id), // Ensure it's an integer
        hospital_id: parseInt(hospital_id), // Ensure it's an integer
        emp_id: Emp_ID, // Assuming it's a string
        contact_id: selectedContactId ? parseInt(selectedContactId) : null, // Cast to integer if needed
        promotional_items_used: promotionalItems ? promotionalItems.toString() : '', // Ensure it's a string
        remarks: remarks ? remarks.toString() : '', // Ensure it's a string
        latitude: latitude || '', // Send latitude only if available, otherwise empty string
        longitude: longitude || '', // Send longitude only if available, otherwise empty string
      };
  
      // console.log('Request Data:', requestData);
      // console.log('this is the token:', UserToken);
  
      // Handle form submission logic here (e.g., API call)
      const response = await axios.put(
        `${BASE_URL}api/v1/mobile/hospital/visits`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hospital-token': UserToken,
          },
        }
      );
     
  
      if (response.data.status === 201) {
        Alert.alert('Success', 'Visit form submitted successfully');
        navigation.goBack(); // Navigate back to the previous screen after form submission
      } else {
        Alert.alert('Error', 'Failed to submit visit form');
      }
    } catch (error) {
      console.error('Submission error:', error);
  
      // Log and handle error response
      if (error.response) {
        console.log('Error response data:', error.response.data);
        Alert.alert('Error', `Submission failed: ${error.response.data.message || 'Unknown error'}`);
      } else {
        Alert.alert('Error', 'An error occurred while submitting the form');
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visit Form</Text>
      <Text style={styles.label}>Visit ID: {visit_id}</Text>
      <Text style={styles.label}>Hospital ID: {hospital_id}</Text>

      {/* Dropdown for contacts */}
      <Text style={styles.label}>Select Contact:</Text>
      <Picker
        selectedValue={selectedContactId}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedContactId(itemValue)}
      >
        <Picker.Item label="Select Contact" value="" />
        {contacts.map((contact) => (
          <Picker.Item key={contact.id} label={contact.name} value={contact.id.toString()} />
        ))}
      </Picker>

      {/* Input fields for promotional items and remarks */}
      <Text style={styles.label}>Promotional Items Used:</Text>
      <TextInput
        style={styles.input}
        value={promotionalItems}
        onChangeText={setPromotionalItems}
        placeholder="Enter promotional items"
      />
      <Text style={styles.label}>Remarks:</Text>
      <TextInput
        style={styles.input}
        value={remarks}
        onChangeText={setRemarks}
        placeholder="Enter remarks"
        multiline
      />

      <Button title={loading ? 'Submitting...' : 'Submit'} onPress={handleSubmit} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
});

export default VisitForm;
