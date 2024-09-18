// DCRComponent.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Emp_ID, UserToken } from '../../auth_component/Login';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../API/Authapi';

export let gdcr_id

const DCRComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/v1/mobile/dcr/data`, {
        headers: {
          'x-hospital-token': UserToken,
        },
        params: { emp_id: Emp_ID },
      });
      setData(response.data);
      
      // console.log("this is dcr data",response.data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  },[
    
  ]); // Added dependencies

  const endDCR = async () => {
    try {
      const response = await axios.put(`${BASE_URL}api/v1/mobile/end-dcr`, {
        emp_id: Emp_ID,
        dcr_id: data.result.dcr_id,
      }, {
        headers: {
          'x-hospital-token': UserToken,
        },
      });
      
      if (response.status === 201) {
        Alert.alert('Success', 'DCR ended successfully');
        // Refresh the data after successful end of DCR
        fetchData();
      } else {
        Alert.alert('Error', 'Failed to end DCR');
      }
    } catch (err) {
      if (err.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log('Error Data:', err.response.data);
        // console.log('Error Status:', err.response.status);
        // console.log('Error Headers:', err.response.headers);
        Alert.alert('Error', `Failed to end DCR: ${err.response.data.message || err.message}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.log('Error Request:', err.request);
        Alert.alert('Error', 'No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error Message:', err.message);
        Alert.alert('Error', err.message);
      }
   }
   
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!data || data.result.message) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>{data.result.message}</Text>
      </View>
    );
  }

  const { manager, work_started, remarks, area, work_date, work_type, dcr_id } = data.result;
  gdcr_id=dcr_id

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>DCR Details</Text>
      <Text style={styles.label}>Work Started: {work_started}</Text>
      <Text style={styles.label}>Remarks: {remarks}</Text>
      <Text style={styles.label}>Area: {area}</Text>
      <Text style={styles.label}>Work Date: {new Date(work_date).toLocaleDateString()}</Text>
      <Text style={styles.label}>Work Type: {work_type}</Text>
      <Text style={styles.title}>Managers</Text>
      {manager.map((mgr, index) => (
        <TouchableOpacity
          key={index}
          style={styles.managerContainer}
          onPress={() => navigation.navigate('UpdateDcrForm', { dcr_id, initialData: { ...mgr } })}
        >
          <Text style={styles.managerText}>Name: {mgr.emp_name}</Text>
          <Text style={styles.managerText}>ID: {mgr.emp_id}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.button} onPress={endDCR}>
        <Text style={styles.buttonText}>End DCR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  managerContainer: {
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  managerText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
    color: 'blue',
  },
  button: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DCRComponent;
