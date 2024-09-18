import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../API/Authapi'; // Ensure this is correct
import { Emp_ID, UserToken } from '../../auth_component/Login';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Import for navigation

const HospitalComponent = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Hook to access navigation

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/v1/mobile/fetch-added-hospitals`, {
          headers: {
            'x-hospital-token': UserToken,
          },
          params: { emp_id: Emp_ID }, // Sending emp_id in query parameters
        });

        if (response.data.status === 201) {
          setHospitals(response.data.result); // Update state with fetched hospitals
        } else {
          console.error('Failed to fetch hospitals:', response.data.message);
          setError('Failed to fetch hospital data.');
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setError('An error occurred while fetching the hospital data.');
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchHospitals(); // Call the function when component mounts
  }, []);

  const handleVisitPress = (visit_id, hospital_id) => {
    navigation.navigate('VisitForm', { visit_id, hospital_id }); // Navigate to VisitForm with params
  };

  const handleSkipPress = (visit_id, hospital_id) => {
    navigation.navigate('SkipForm', { visit_id, hospital_id }); // Navigate to SkipForm with params
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.loaderContainer}>
      <Text style={styles.cardText}>Hospital List</Text>
      {hospitals.length > 0 ? (
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item.visit_id} // Assuming each hospital has a unique `visit_id`
          renderItem={({ item }) => (
            <Card containerStyle={styles.hospitalItem}>
              <Text style={styles.hospitalName}>Name: {item.name}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Address: {item.address}, {item.area}, {item.city}, {item.state}</Text>
              <Text>Visit Date: {item.visit_date}</Text>
              <Text>Visit Status: {item.visit_status}</Text>
              <Text>Visit ID: {item.visit_id}</Text>

              {/* Buttons for Visit and Skip */}
              <View style={styles.buttonContainer}>
                <Button
                  title="Visit"
                  onPress={() => handleVisitPress(item.visit_id, item.hospital_id)}
                  disabled={item.visit_status !== 'Pending'} // Disable if status is not pending
                />
                <Button
                  title="Skip"
                  color="red"
                  onPress={() => handleSkipPress(item.visit_id, item.hospital_id)}
                  disabled={item.visit_status !== 'Pending'} // Disable if status is not pending
                />
              </View>
            </Card>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No hospitals found for today.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  hospitalItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  hospitalName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Spacing between buttons
    marginTop: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HospitalComponent;
