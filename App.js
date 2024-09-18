import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import Login from "./auth_component/Login";
import AuthorizedHome from "./auth_component/AuthorizedHome";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       // Fetch the token from AsyncStorage
  //       const token = await AsyncStorage.getItem("authToken");

  //       // If token exists, mark the user as logged in
  //       if (token) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking token:", error);
  //     } finally {
  //       // After token check, stop showing the loader
  //       setIsLoading(false);
  //     }
  //   };

  //   checkToken();
  // }, []);

  // if (isLoading) {
  //   // Show a loading spinner while checking the token
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#1e90ff" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerStyle:{backgroundColor:'#f0f8ff'}, headerTintColor: 'black',headerTitleStyle: { fontWeight: 'bold' }}} />
        <Stack.Screen name="InstaMD" component={AuthorizedHome} options={{headerStyle:{backgroundColor:'#f0f8ff'}, headerTintColor: 'black',headerTitleStyle: { fontWeight: 'bold' }}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
