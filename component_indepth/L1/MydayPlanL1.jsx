import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import HospitalComponent from './HospitalComponent';
import DCRComponent from './DCRComponent';
import StockistComponent from './StockistComponent';




const MyDayPlanL1 = () => {
  const navigation = useNavigation();
  const [dayPlan, setDayPlan] = useState(null); // To store DCR response
  const [selectedTab, setSelectedTab] = useState('hospital'); // State to track selected tab

  useEffect(() => {
    const fetchDcrResponse = async () => {
      try {
        const storedDcrResponse = await AsyncStorage.getItem('dcr_response');
        if (storedDcrResponse) {
          const parsedResponse = JSON.parse(storedDcrResponse);
          setDayPlan(parsedResponse); // Set the day plan from AsyncStorage
        }
      } catch (error) {
        console.error('Failed to fetch DCR response:', error);
      }
    };

    fetchDcrResponse(); // Fetch DCR response from AsyncStorage when component mounts
  }, );

  const handleStartPress = () => {
    navigation.navigate('DcrForm');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Day Plan</Text>
      <DCRComponent/>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'hospital' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('hospital')}
        >
          <Text style={styles.tabText}>Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'stockist' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('stockist')}
        >
          <Text style={styles.tabText}>Stockist</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.componentContainer}>
        {selectedTab === 'hospital' && <HospitalComponent />}
        {selectedTab === 'stockist' && <StockistComponent />}
      </View>

      <Button title="Start New DCR" onPress={handleStartPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#f0f8ff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  componentContainer: {
    flex: 1,
    marginBottom:10
  },
});

export default MyDayPlanL1;
