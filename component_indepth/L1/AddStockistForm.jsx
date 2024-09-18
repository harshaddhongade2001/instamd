import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { UserToken } from '../../auth_component/Login';
import { BASE_URL } from '../../API/Authapi';

const AddStockistForm = () => {
  const [firmName, setFirmName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');



  const handleSubmit = () => {
    const stockistData = {
      firm_name: firmName,
      owner_name: ownerName,
      phone: phone,
      email: email,
      address: address,
      town: town,
      city: city,
      state: state,
      district: district,
      pincode: pincode,
    };

    fetch(`${BASE_URL}api/v1/mobile/add-stockist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hospital-token': UserToken,
      },
      body: JSON.stringify(stockistData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          Alert.alert('Success', 'Stockist added successfully!');
        } else {
          Alert.alert('Error', 'Failed to add stockist');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while adding the stockist.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Stockist Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Firm Name"
        value={firmName}
        onChangeText={setFirmName}
      />
      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Town"
        value={town}
        onChangeText={setTown}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default AddStockistForm;
