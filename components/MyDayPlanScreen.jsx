import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import MydayPlanL1 from '../component_indepth/L1/MydayPlanL1';
import MydayPlanL2 from '../component_indepth/L2/MydayPlanL2';
import MydayPlanL3 from '../component_indepth/L3/MydayPlanL3';

export default class MyDayPlanScreen extends Component {
  render() {

    const { route } = this.props;
    const { title } = route.params || {};

    // Function to render the component based on the title
    const renderComponent = () => {
      switch (title) {
        case 'L1':
          return <MydayPlanL1 />;
        case 'L2':
          return <MydayPlanL2 />;
        case 'L3':
          return <MydayPlanL3 />;
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
