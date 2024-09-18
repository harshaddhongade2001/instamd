import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const navigation = useNavigation();

  const handleDatePress = (date) => {
    navigation.navigate('DateDisplay', { date: date.dateString });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDatePress}
        markedDates={{
          // Optionally highlight today's date or selected date
          
        }}
       style = {styles.calender}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0, // No horizontal padding
    marginHorizontal: 0,  // No horizontal margin
    backgroundColor:'#f0f8ff',
  },
  calender:{
   margin:8,
   padding:15,
    borderRadius:10
  }
});

export default CalendarScreen;
