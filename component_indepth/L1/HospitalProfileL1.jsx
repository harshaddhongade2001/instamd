import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import Material Icons
import { UserToken } from '../../auth_component/Login';
import { BASE_URL } from '../../API/Authapi';
import { useNavigation } from '@react-navigation/native';

const HospitalProfile = ({ route }) => {
  const { hospitalId } = route.params;
  const [hospitalDetails, setHospitalDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('Basic Details'); // State to manage the active section
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/v1/mobile/hospital-details/id?hosp_id=${hospitalId}`, {
          method: 'GET',
          headers: {
            'x-hospital-token': UserToken,
          },
        });
        const data = await response.json();
       // console.log('Response Data:', data);

        if (data.status === 201) {
          setHospitalDetails(data.result[0]);
        } else {
          console.log('Failed to fetch hospital details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!hospitalDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No hospital details found.</Text>
      </View>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'Basic Details':
        return (
          <View>
            <View style={styles.section}>
              <Icon name="category" size={24} color="#666" />
              <Text style={styles.text}>Category: {hospitalDetails.category}</Text>
            </View>
            <View style={styles.section}>
              <Icon name="business" size={24} color="#666" />
              <Text style={styles.text}>Type: {hospitalDetails.type}</Text>
            </View>
            <View style={styles.section}>
              <Icon name="people" size={24} color="#666" />
              <Text style={styles.text}>Total Doctors: {hospitalDetails.total_doctors}</Text>
            </View>
            <View style={styles.section}>
              <Icon name="bed" size={24} color="#666" />
              <Text style={styles.text}>Total Beds: {hospitalDetails.total_beds}</Text>
            </View>
          </View>
        );
      case 'Visit History':
        return <Text style={styles.text}>Visit history data will be loaded here...</Text>;
      
        case 'Contacts':
  return (
    <View>
      {hospitalDetails.contacts.map((contact) => (
        <View key={contact.id} style={styles.contactContainer}>
          <Text style={styles.contactText}>
            <Icon name="person" size={18} color="#007BFF" /> {contact.name}
          </Text>
          <Text style={styles.contactText}>
            <Icon name="phone" size={18} color="#007BFF" /> {contact.phone_number}
          </Text>
          <Text style={styles.contactText}>
            <Icon name="email" size={18} color="#007BFF" /> {contact.email}
          </Text>
        </View>
      ))}

      {/* Add Contact Button */}
      <TouchableOpacity
        style={styles.addContactButton}
        onPress={() => navigation.navigate('AddHospitalContactForm', { hospitalId })}
      >
        <Text style={styles.addContactText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );

     
      case 'Orders':
        return <Text style={styles.text}>Order details will be displayed here...</Text>;
      case 'Activities':
        return <Text style={styles.text}>Activity logs will be shown here...</Text>;
      case 'Notes':
        return <Text style={styles.text}>Notes section...</Text>;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="local-hospital" size={30} color="#007BFF" />
        <Text style={styles.title}>{hospitalDetails.name}</Text>
      </View>

      <View style={styles.section}>
        <Icon name="location-on" size={24} color="#666" />
        <Text style={styles.text}>Address: {hospitalDetails.address}, {hospitalDetails.area}, {hospitalDetails.city}</Text>
      </View>

      {/* Horizontal Scrollable Tab Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {['Basic Details', 'Visit History', 'Contacts', 'Orders', 'Activities', 'Notes'].map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.tabButton, activeSection === section && styles.activeTab]}
            onPress={() => setActiveSection(section)}
          >
            <Text style={[styles.tabText, activeSection === section && styles.activeTabText]}>{section}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Render the content based on the active section */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    color: '#666',
  },
  tabContainer: {
    marginVertical: 15,
  },
  tabButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 20,
  },
  contactContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addContactButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  addContactText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default HospitalProfile;
