import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Emp_ID, UserToken } from '../../auth_component/Login';
import { BASE_URL } from '../../API/Authapi';

const Stockist = () => {
  const [stockists, setStockists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch stockist data
  const fetchStockists = async () => {
    try {


      const response = await axios.get(`${BASE_URL}api/v1/mobile/stockists`, {
        params: { emp_id:Emp_ID },
        headers: {
          'x-hospital-token': UserToken,
        },
      });

      if (response.data.status === 201) {
        setStockists(response.data.result);
      } else {
        setError('Failed to fetch stockists');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch stockists on component mount
  useEffect(() => {
    fetchStockists();
  }, );

  // Render each stockist item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.firm_name}</Text>
      <Text>Owner: {item.owner_name}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Address: {item.address}, {item.town}, {item.city}, {item.state}, {item.pincode}</Text>
    </View>
  );

  // Loading state
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Error state
  if (error) {
    return <Text>{error}</Text>;
  }

  // Main render
  return (
    <View style={styles.container}>
      <FlatList
        data={stockists}
        keyExtractor={(item) => item.stockist_id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Stockist;
