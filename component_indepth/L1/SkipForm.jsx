import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { BASE_URL } from '../../API/Authapi';
import { Emp_ID, UserToken } from '../../auth_component/Login';

const SkipForm = ({ route, navigation }) => {
  const { visit_id, hospital_id } = route.params; // Accessing passed params
 
  const [skipReason, setSkipReason] = useState('');
  const [skipRemark, setSkipRemark] = useState('');
  const [loading, setLoading] = useState(false); // State for button loading

  const handleSkip = async () => {
    if ( !skipReason || !skipRemark) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    setLoading(true);
    

    try {
      const response = await fetch(`${BASE_URL}api/v1/mobile/skip/hospital`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-hospital-token': UserToken,
        },
        body: JSON.stringify({
          visit_id,
          hospital_id,
          emp_id: Emp_ID,
          skip_reason: skipReason,
          skip_remark: skipRemark,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', 'Visit skipped successfully');
        navigation.goBack(); // Navigate back after skipping
      } else {
        Alert.alert('Error', data.message || 'Failed to skip the visit');
      }
    } catch (error) {
      console.error('Error skipping visit:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skip Form</Text>
      <Text style={styles.label}>Visit ID: {visit_id}</Text>
      <Text style={styles.label}>Hospital ID: {hospital_id}</Text>

    

      {/* Skip Reason Input */}
      <TextInput
        style={styles.input}
        placeholder="Skip Reason"
        value={skipReason}
        onChangeText={setSkipReason}
      />

      {/* Skip Remark Input */}
      <TextInput
        style={styles.input}
        placeholder="Skip Remark"
        value={skipRemark}
        onChangeText={setSkipRemark}
        multiline
      />

      <Button
        title={loading ? 'Skipping...' : 'Skip Visit'}
        color="red"
        onPress={handleSkip}
        disabled={loading} // Disable button when loading
      />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default SkipForm;
