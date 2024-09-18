import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Card, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Emp_ID, UserToken } from '../../auth_component/Login';
import { BASE_URL } from '../../API/Authapi';
import { gdcr_id } from './DCRComponent';

// Get screen dimensions
const { width } = Dimensions.get('window');

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabledButtons, setDisabledButtons] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/v1/mobile/hospital/empid`, {
          headers: {
            'x-hospital-token': UserToken,
          },
          params: { emp_id: Emp_ID },
        });
        setHospitals(response.data.result);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, );

  const handleAddHospital = async (hospitalId) => {
    setDisabledButtons((prev) => ({ ...prev, [hospitalId]: true })); // Disable button while processing
  
    try {
      const response = await axios.post(`${BASE_URL}api/v1/mobile/visits`, {
        emp_id: Emp_ID,
        hospital_id: hospitalId,
        dcr_id:gdcr_id
      }, {
        headers: {
          'x-hospital-token': UserToken,
        },
      });
  
      if (response.status === 201) {
        Alert.alert("Success", "Hospital added successfully.");
      } else if (response.status === 400) {
        Alert.alert("Error", response.data.message || "Hospital already added to today's visit list.");
      } else {
        Alert.alert("Error", "Unexpected error occurred.");
      }
    } catch (error) {
     // console.error('Error adding hospital:', error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong.");
    } finally {
      setDisabledButtons((prev) => ({ ...prev, [hospitalId]: false })); // Re-enable button after processing
    }
  };
  
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('HospitalProfile', { hospitalId: item.id })}>
      <Card containerStyle={styles.card}>
        <View style={styles.header}>
          <Text style={styles.hospitalName}>{item.name}</Text>
          <Text style={styles.hospitalCategory}>{item.category}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Icon name="location-pin" type="entypo" color="#517fa4" size={20} />
          <Text style={styles.addressText}>
            {item.address}, {item.area}, {item.city}, {item.state}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsItem}>
            <Icon name="people" type="ionicon" color="#517fa4" size={20} />
            <Text style={styles.detailsText}>{item.total_doctors} Doctors</Text>
          </View>
          <View style={styles.detailsItem}>
            <Icon name="bed" type="font-awesome-5" color="#517fa4" size={20} />
            <Text style={styles.detailsText}>{item.total_beds} Beds</Text>
          </View>
          <View style={styles.detailsItem}>
            <Icon name="hospital-o" type="font-awesome" color="#517fa4" size={20} />
            <Text style={styles.detailsText}>{item.total_icus} ICUs</Text>
          </View>
        </View>
        <Button
          title="Add Hospital"
          buttonStyle={styles.addButton}
          disabled={disabledButtons[item.id]}
          onPress={() => handleAddHospital(item.id)}
        />
      </Card>
    </TouchableOpacity>
  );
  

  return (
    <FlatList
      data={hospitals}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.emptyText}>No hospitals found</Text>}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
    width: width - 60,
  },
  header: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  hospitalCategory: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailsItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsText: {
    fontSize: 12,
    color: '#2c3e50',
    marginLeft: 5,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#34495e',
    marginTop: 20,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
  },
});

export default HospitalList;
