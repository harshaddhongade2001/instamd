import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../API/Authapi";
export let UserToken
export let Emp_ID 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    const loginData = {
      email,
      password,
    };

    try {
      const endpoint = 'api/v1/mobile/log-in'
      const url = BASE_URL+endpoint 
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const resData = await response.json();
      if (resData.status === 201) {
        const token = resData.result.token;
        const user = resData.result.user; // Assuming the response includes user data

        // Store the token and user information in AsyncStorage
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("userInfo", JSON.stringify(user));

        const gettoken = await AsyncStorage.getItem('authToken');
        UserToken=gettoken
        const userInfo = await AsyncStorage.getItem('userInfo');

        let employeeId = '';
        if (userInfo) {
          const user = JSON.parse(userInfo);
          employeeId = user.emp_id;
          Emp_ID= employeeId
        }

        // Navigate to the main stack
        navigation.reset({
          index: 0,
          routes: [{ name: "InstaMD" }], // Assuming "InstaMD" is the main screen
        });
      } else {
        Alert.alert("Login Failed", resData.message || "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor:"#f0f8ff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default Login;
