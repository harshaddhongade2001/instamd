import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { BASE_URL } from '../../API/Authapi';
import { UserToken } from '../../auth_component/Login';

const AddHospitalContactForm = ({ route, navigation }) => {
  const { hospitalId } = route.params;  // Get hospitalId from route params
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAddContact = async () => {
  
    const contactData = {
      hospital_id: hospitalId,
      data: {
        name: name,
        contact_type: contactType,
        phone_number: phone,
        email: email,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}api/v1/mobile/add-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hospital-token': UserToken,  // Include the token in the request header
        },
        body: JSON.stringify(contactData),  // Send the contact data in request body
      });

      const result = await response.json();

      if (response.ok && result.status === 201) {
        Alert.alert('Success', 'Contact added successfully');
        navigation.goBack();  // Go back after successfully adding the contact
      } else {
        Alert.alert('Error', result.message || 'Failed to add contact');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      Alert.alert('Error', 'An error occurred while adding the contact');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contact for Hospital {hospitalId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Type (e.g., Nursing Head)"
        value={contactType}
        onChangeText={setContactType}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Add Contact" onPress={handleAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddHospitalContactForm;
