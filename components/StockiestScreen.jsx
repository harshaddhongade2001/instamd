import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import StockiestmainL1 from '../component_indepth/L1/StockiestmainL1';
import StockiestmainL2 from '../component_indepth/L2/StockiestmainL2';
import StockiestmainL3 from '../component_indepth/L3/StockiestmainL3';

export default class StockiestScreen extends Component {
  render() {
    const { route } = this.props;
    const { title } = route.params || {};

    const renderComponent = () => {
      switch (title) {
        case 'L1':
          return <StockiestmainL1 />;
        case 'L2':
          return <StockiestmainL2 />;
        case 'L3':
          return <StockiestmainL3 />;
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
