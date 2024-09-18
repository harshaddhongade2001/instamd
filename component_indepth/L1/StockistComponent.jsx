import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../API/Authapi';
import { Emp_ID, UserToken } from '../../auth_component/Login';

const StockistComponent = () => {
  const [stockists, setStockists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch stockist data
  const fetchStockists = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/v1/mobile/stockists`, {
        params: { emp_id: Emp_ID },
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
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stockists}
        keyExtractor={(item) => item.stockist_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.stockistItem}>
            <Text style={styles.firmName}>Firm: {item.firm_name}</Text>
            <Text style={styles.ownerName}>Owner: {item.owner_name}</Text>
            <Text style={styles.details}>Phone: {item.phone}</Text>
            <Text style={styles.details}>Email: {item.email}</Text>
            <Text style={styles.details}>Address: {item.address}, {item.city}, {item.state}, {item.pincode}</Text>
            <Text style={styles.details}>Created By: {item.created_by}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
  stockistItem: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  firmName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ownerName: {
    fontSize: 16,
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StockistComponent;
