import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { BASE_URL } from '../../API/Authapi';
import { Emp_ID, UserToken } from '../../auth_component/Login';

const HospitalForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [totalDoctors, setTotalDoctors] = useState('');
  const [totalBeds, setTotalBeds] = useState('');
  const [totalICUs, setTotalICUs] = useState('');
  const [totalOTs, setTotalOTs] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const endpoint = 'api/v1/mobile/get-state';
        const url = BASE_URL + endpoint;
        const response = await axios.get(url, {
          headers: {
            'x-hospital-token': UserToken,
          },
        });
        setStates(response.data.result || []);
      } catch (error) {
        setError('Error fetching states');
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (state) {
      const fetchDistricts = async () => {
        setLoadingDistricts(true);
        try {
          const endpoint = 'api/v1/mobile/get-districts-by-state';
          const url = BASE_URL + endpoint;
          const response = await axios.get(url, {
            params: { state_id: state },
            headers: {
              'x-hospital-token': UserToken,
            },
          });
          setDistricts(response.data.result || []);
        } catch (error) {
          setError('Error fetching districts');
        } finally {
          setLoadingDistricts(false);
        }
      };

      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [state]);

  const handleSubmit = async () => {
    const selectedState = states.find(s => s.id === state)?.name;
    const selectedDistrict = districts.find(d => d.id === district)?.name;
  
    const endpoint = 'api/v1/mobile/create-hospital';
    const url = BASE_URL + endpoint;
    const payload = {
      emp_id: Emp_ID,
      data: {
        name,
        category,
        type,
        total_doctors: Number(totalDoctors),
        total_beds: Number(totalBeds),
        total_icus: Number(totalICUs),
        total_ots: Number(totalOTs),
        address,
        area,
        city,
        state: selectedState,  // Send the state name
        district: selectedDistrict,  // Send the district name
        pincode,
      },
    };
  
    try {
     // console.log("this is hospital data ", payload);
      await axios.post(url, payload, {
        headers: {
          'x-hospital-token': UserToken,
        },
      });
  
      // Clear all fields after successful submission
      setName('');
      setCategory('');
      setType('');
      setTotalDoctors('');
      setTotalBeds('');
      setTotalICUs('');
      setTotalOTs('');
      setAddress('');
      setArea('');
      setCity('');
      setState('');
      setDistrict('');
      setPincode('');
  
      Alert.alert('Success', 'Hospital information submitted successfully!');
      navigation.navigate('Hospital'); 
    } catch (error) {
      Alert.alert('Error', 'Failed to submit hospital information.');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Hospital Form</Text>

        {/* Error Message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Hospital Form Fields */}
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Hospital Name" value={name} onChangeText={setName} />

        <Text style={styles.label}>Category</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select Category...', value: null }}
          value={category}
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: 'Nursing Home', value: 'Nursing Home' },
            { label: 'Corporate Hospital', value: 'Corporate Hospital' },
            { label: 'Govt Hospital', value: 'Govt Hospital' },
          ]}
        />

        <Text style={styles.label}>Type</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select Type...', value: null }}
          value={type}
          onValueChange={(value) => setType(value)}
          items={[
            { label: 'New', value: 'New' },
            { label: 'Existing', value: 'Existing' },
          ]}
        />

        <Text style={styles.label}>Total Doctors</Text>
        <TextInput style={styles.input} placeholder="Total Doctors" value={totalDoctors} keyboardType="numeric" onChangeText={setTotalDoctors} />

        <Text style={styles.label}>Total Beds</Text>
        <TextInput style={styles.input} placeholder="Total Beds" value={totalBeds} keyboardType="numeric" onChangeText={setTotalBeds} />

        <Text style={styles.label}>Total ICUs</Text>
        <TextInput style={styles.input} placeholder="Total ICUs" value={totalICUs} keyboardType="numeric" onChangeText={setTotalICUs} />

        <Text style={styles.label}>Total OTs</Text>
        <TextInput style={styles.input} placeholder="Total OTs" value={totalOTs} keyboardType="numeric" onChangeText={setTotalOTs} />

        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

        <Text style={styles.label}>Area</Text>
        <TextInput style={styles.input} placeholder="Area" value={area} onChangeText={setArea} />

        <Text style={styles.label}>City</Text>
        <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />

        <Text style={styles.label}>State</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select State...', value: null }}
          value={state}
          onValueChange={(value) => setState(value)}
          items={states.length > 0 ? states.map(state => ({ label: state.name, value: state.id })) : []}
        />

        <Text style={styles.label}>District</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select District...', value: null }}
          value={district}
          onValueChange={(value) => setDistrict(value)}
          items={districts.length > 0 ? districts.map(district => ({ label: district.name, value: district.id })) : []}
        />

        <Text style={styles.label}>Pincode</Text>
        <TextInput style={styles.input} placeholder="Pincode" value={pincode} keyboardType="numeric" onChangeText={setPincode} />

        <Button title="Submit" onPress={handleSubmit} color="#007BFF" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollView: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#34495e',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#34495e',
  },
  input: {
    height: 50,
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f0f8ff',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f0f8ff',
  },
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: '#34495e',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});

export default HospitalForm;
