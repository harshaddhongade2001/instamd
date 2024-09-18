import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

import { BASE_URL } from '../../API/Authapi';
import { UserToken } from '../../auth_component/Login';

const UpdateDcrForm = ({ route, navigation }) => {
  const { dcr_id, initialData } = route.params; // Extract parameters from route
  const [workType, setWorkType] = useState('');
  const [area, setArea] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setWorkType(initialData.work_type || '');
      setArea(initialData.area || '');
      setWorkingWith(initialData.working_with || '');
      setRemarks(initialData.remarks || '');
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!workType || !area || !workingWith || !remarks) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `${BASE_URL}api/v1/mobile/update/dcr`,
        {
          dcr_id: dcr_id,
          data: {
            work_type: workType,
            area: area,
            working_with: workingWith,
            remarks: remarks,
          },
        },
        {
          headers: {
            'x-hospital-token': UserToken,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'DCR updated successfully');
        navigation.goBack(); // Close or navigate away after successful update
      } else {
        Alert.alert('Error', 'Failed to update DCR');
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
        value={workType}
        onValueChange={(value) => setWorkType(value)}
        items={[
          { label: 'Field Work', value: 'Field Work' },
          { label: 'Admin Day', value: 'Admin Day' },
          { label: 'Transit', value: 'Transit' },
          { label: 'Training', value: 'Training' },
          { label: 'Camp Work', value: 'Camp Work' },
          { label: 'Cycle Meeting', value: 'Cycle Meeting' },
          { label: 'Meeting Introduction', value: 'Meeting Introduction' },
          { label: 'Holiday', value: 'Holiday' },
          { label: 'Leave', value: 'Leave' },
          { label: 'Unpaid Leave', value: 'Unpaid Leave' },
        ]}
        placeholder={{ label: 'Select work type', value: null }}
      />

      <Text style={styles.label}>Area</Text>
      <RNPickerSelect
        value={area}
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
        value={workingWith}
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
        title={loading ? 'Updating...' : 'Update DCR'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
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

export default UpdateDcrForm;
