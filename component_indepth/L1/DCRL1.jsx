import React, { Component } from 'react';
import { Text, View , StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarScreen from '../CommonComponent/CalendarScreen';


 let UserToken
 let Emp_ID 

export default class DCRL1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      employeeId: '',
    };
  }

  async componentDidMount() {
    try {
    
      const token = await AsyncStorage.getItem('authToken');
      UserToken=token
      const userInfo = await AsyncStorage.getItem('userInfo');

      let employeeId = '';

      if (userInfo) {
        const user = JSON.parse(userInfo);
        employeeId = user.emp_id;
        Emp_ID= employeeId
      }

  
      this.setState({
        token: token || 'No token found',
        employeeId: employeeId || 'No employee ID found',
      });
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
      this.setState({
        token: 'Error fetching token',
        employeeId: 'Error fetching employee ID',
      });
    }
  }

  render() {
    const { token, employeeId } = this.state;

    return (
      <View style={styles.container}>
        
        <CalendarScreen/>
      
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});