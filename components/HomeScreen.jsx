import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import Banner from '../component_indepth/HomeScreen/Banner'
import HomeDashboard from '../component_indepth/HomeScreen/HomeDashboard'

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Banner/>
        <HomeDashboard/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f0f8ff'
    }

})
