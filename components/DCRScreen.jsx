import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DCRL1 from '../component_indepth/L1/DCRL1';
import DCRL2 from '../component_indepth/L2/DCRL2';
import DCRL3 from '../component_indepth/L3/DCRL3';



export default class DCRScreen extends Component {
  render() {
    const { route } = this.props;
    const { title } = route.params || {};

    // Function to render the component based on the title
    const renderComponent = () => {
      switch (title) {
        case 'L1':
          return <DCRL1 />;
        case 'L2':
          return <DCRL2 />;
        case 'L3':
          return <DCRL3 />;
        default:
          return <Text style={styles.error}>Invalid title</Text>;
      }
    };

    return (
      <View style={styles.container}>
        {/* Render the corresponding component based on the title */}
        {renderComponent()}
      </View>
    );
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
