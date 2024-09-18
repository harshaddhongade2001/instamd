import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { BASE_URL } from '../../API/Authapi';
import { Emp_ID, UserToken } from '../../auth_component/Login';

const DateDisplayScreen = ({ route }) => {
  const { date } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false); // Track if no data is found

  useEffect(() => {
    // Fetch data from the backend API using query parameters
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/v1/mobile/dcr-by-date?emp_id=${Emp_ID}&date=${date}`, {
          method: 'GET',
          headers: {
            'x-hospital-token': UserToken,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', result);
        console.log('this is Response data:', response);


        if (response.status === 201 && result.result && result.result.message === "No data found for the provided date or employee ID.") {
          setNoData(true); // Set no data flag if the result indicates no data
        } else if (response.status === 201 && result.result) {
          setData(result.result); // Set data if it's available
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

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

  if (noData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data found for the selected date or employee ID .{date}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Selected Date: {date}</Text>

      {/* Display DCR Data */}
      <View style={styles.section}>
        <Text style={styles.heading}>Work Details:</Text>
        {data.dcr_data && data.dcr_data.length > 0 ? (
          data.dcr_data.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>Work Date: {new Date(item.work_date).toLocaleDateString()}</Text>
              <Text>Start Time: {item.start_time}</Text>
              <Text>End Time: {item.end_time}</Text>
              <Text>Total Work Hours: {item.total_work_hours}</Text>
              <Text>Work Type: {item.work_type}</Text>
            </View>
          ))
        ) : (
          <Text>No work details available.</Text>
        )}
      </View>

      {/* Display Hospital Visit Data */}
      <View style={styles.section}>
        <Text style={styles.heading}>Hospital Visits:</Text>
        <FlatList
          data={data.hospital}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Hospital Name: {item.hospital_name}</Text>
              <Text>Address: {item.address}</Text>
              <Text>City: {item.city}</Text>
              <Text>Visit Date: {new Date(item.visit_date).toLocaleDateString()}</Text>
              <Text>JFW Status: {item.jfws_status}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  dateText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DateDisplayScreen;
