import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Stockist from './Stockist';

const StockiestMainL1 = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('AddStockistForm');
  };

  return (
    <View style={styles.container}>
      <Text>Stock List</Text>
      <Button title="Go to Add Stockist Form" onPress={handleNavigate} />
      <Stockist/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default StockiestMainL1;
