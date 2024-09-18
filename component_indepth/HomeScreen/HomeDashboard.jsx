import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 70) / 4; // Adjusted for margins and padding

// Define colors for each option
const iconColors = {
  DCR: '#3498db', // Blue
  Hospital: '#3498db', // Red
  Stockiest: '#3498db', // Green
  Path: '#3498db', // Orange
  MTP: '#3498db', // Purple
  KnowYourBrands: '#3498db', // Teal
  Meetings: '#3498db', // Caramel
  EDrive: '#3498db', // Yellow
  Birthday: '#3498db', // Pink
  RefreshData: '#3498db', // Dark Grey
  Report: '#3498db', // Light Grey
  Support: '#3498db', // Aqua
  Logout: '#3498db', // Dark Red

  CLM: '#3498db', // Purple
  Quotation: '#3498db', // Orange
  POBs: '#3498db', // Green
  Eposters: '#3498db', // Blue
  Expenses: '#3498db', // Red
  Leaves: '#3498db', // Teal
  RCPA: '#3498db', // Caramel
  Activities: '#3498db', // Yellow
  Sales: '#3498db', // Pink
  AboutCompany: '#3498db', // Dark Grey
  AppointStockist: '#3498db', // Aqua
};

const HomeDashboard = () => {
  const navigation = useNavigation();

  // Define your drawer options with corresponding icons and colors
  const drawerOptions = [
    { name: 'DCR', screen: 'DCR', icon: 'description' },
    { name: 'Hospital', screen: 'Hospital', icon: 'hospital-o' },
    { name: 'Stockiest', screen: 'Stockiest', icon: 'store' },
    { name: 'Path', screen: 'Path', icon: 'road' },
    { name: 'MTP', screen: 'MTP', icon: 'calendar-today' },
    { name: 'KnowYourBrands', screen: 'KnowYourBrands', icon: 'tags' },
    { name: 'Meetings', screen: 'Meetings', icon: 'meeting-room' },
    { name: 'EDrive', screen: 'EDrive', icon: 'cloud' },
    { name: 'Birthday', screen: 'Birthday', icon: 'birthday-cake' },
    { name: 'RefreshData', screen: 'RefreshData', icon: 'refresh' },
    { name: 'Report', screen: 'Report', icon: 'file-text-o' },
    { name: 'Support', screen: 'Support', icon: 'support-agent' },
    { name: 'Logout', screen: 'Logout', icon: 'logout' },

    // Additional options
    { name: 'CLM', screen: 'CLM', icon: 'file-text' },
    { name: 'Quotation', screen: 'Quotation', icon: 'file-text-o' },
    { name: 'POBs', screen: 'POBs', icon: 'clipboard' },
    { name: 'Eposters', screen: 'Eposters', icon: 'image' },
    { name: 'Expenses', screen: 'Expenses', icon: 'money' },
    { name: 'Leaves', screen: 'Leaves', icon: 'calendar-check-o' },
    { name: 'RCPA', screen: 'RCPA', icon: 'pie-chart' },
    { name: 'Activities', screen: 'Activities', icon: 'tasks' },
    { name: 'Sales', screen: 'Sales', icon: 'bar-chart' },
    { name: 'AboutCompany', screen: 'AboutCompany', icon: 'info-circle' },
    { name: 'AppointStockist', screen: 'AppointStockist', icon: 'user-plus' },
  ];

  const renderOptions = () => {
    const rows = [];
    for (let i = 0; i < drawerOptions.length; i += 4) {
      const rowItems = drawerOptions.slice(i, i + 4);
      rows.push(
        <View key={`row-${i}`} style={styles.row}>
          {rowItems.map(item => {
            const iconColor = iconColors[item.name];
            return (
              <TouchableOpacity
                key={item.name}
                style={[styles.option, { borderColor: iconColor }]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <View style={styles.iconContainer}>
                  {item.icon === 'description' && (
                    <MaterialIcons name="description" size={30} color={iconColor} />
                  )}
                  {item.icon === 'hospital-o' && (
                    <FontAwesome name="hospital-o" size={30} color={iconColor} />
                  )}
                  {item.icon === 'store' && (
                    <MaterialIcons name="store" size={30} color={iconColor} />
                  )}
                  {item.icon === 'road' && (
                    <FontAwesome name="road" size={30} color={iconColor} />
                  )}
                  {item.icon === 'calendar-today' && (
                    <MaterialIcons name="calendar-today" size={30} color={iconColor} />
                  )}
                  {item.icon === 'tags' && (
                    <FontAwesome name="tags" size={30} color={iconColor} />
                  )}
                  {item.icon === 'meeting-room' && (
                    <MaterialIcons name="meeting-room" size={30} color={iconColor} />
                  )}
                  {item.icon === 'cloud' && (
                    <FontAwesome name="cloud" size={30} color={iconColor} />
                  )}
                  {item.icon === 'birthday-cake' && (
                    <FontAwesome name="birthday-cake" size={30} color={iconColor} />
                  )}
                  {item.icon === 'refresh' && (
                    <MaterialIcons name="refresh" size={30} color={iconColor} />
                  )}
                  {item.icon === 'file-text-o' && (
                    <FontAwesome name="file-text-o" size={30} color={iconColor} />
                  )}
                  {item.icon === 'support-agent' && (
                    <MaterialIcons name="support-agent" size={30} color={iconColor} />
                  )}
                  {item.icon === 'logout' && (
                    <MaterialIcons name="logout" size={30} color={iconColor} />
                  )}
                  {item.icon === 'file-text' && (
                    <FontAwesome name="file-text" size={30} color={iconColor} />
                  )}
                  {item.icon === 'clipboard' && (
                    <FontAwesome name="clipboard" size={30} color={iconColor} />
                  )}
                  {item.icon === 'image' && (
                    <FontAwesome name="image" size={30} color={iconColor} />
                  )}
                  {item.icon === 'money' && (
                    <FontAwesome name="money" size={30} color={iconColor} />
                  )}
                  {item.icon === 'calendar-check-o' && (
                    <FontAwesome name="calendar-check-o" size={30} color={iconColor} />
                  )}
                  {item.icon === 'pie-chart' && (
                    <AntDesign name="piechart" size={30} color={iconColor} />
                  )}
                  {item.icon === 'tasks' && (
                    <FontAwesome name="tasks" size={30} color={iconColor} />
                  )}
                  {item.icon === 'bar-chart' && (
                    <FontAwesome name="bar-chart" size={30} color={iconColor} />
                  )}
                  {item.icon === 'info-circle' && (
                    <FontAwesome name="info-circle" size={30} color={iconColor} />
                  )}
                  {item.icon === 'user-plus' && (
                    <FontAwesome name="user-plus" size={30} color={iconColor} />
                  )}
                </View>
                <Text style={[styles.optionText, { color: iconColor }]}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderOptions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    height: ITEM_WIDTH,
    width: ITEM_WIDTH,
   
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeDashboard;
