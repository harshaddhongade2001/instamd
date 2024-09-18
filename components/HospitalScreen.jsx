import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import HospitalL1 from '../component_indepth/L1/HospitalL1';
import HospitalL2 from '../component_indepth/L2/HospitalL2';
import HospitalL3 from '../component_indepth/L3/HospitalL3';

export default class HospitalScreen extends Component {
  render() {
    const { route } = this.props;
    const { title } = route.params || {};

    const renderComponent = () => {
      switch (title) {
        case 'L1':
          return <HospitalL1 />;
        case 'L2':
          return <HospitalL2 />;
        case 'L3':
          return <HospitalL3 />;
        default:
          return <Text style={styles.error}>Invalid title</Text>;
      }
    };


    return (
      <View style={styles.container}>
        {/* Render the corresponding component based on the title */}
        {renderComponent()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#fff',
  },
  error: {
    fontSize: 20,
    color: 'red',
  },
});
