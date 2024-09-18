import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import the icon library

import ProfileScreen from "./components/ProfileScreen";
import DashboardScreen from "./components/DashboardScreen";
import HomeScreen from "./components/HomeScreen";
import MyDayPlanScreen from "./components/MyDayPlanScreen";
import DCRScreen from "./components/DCRScreen";
import HospitalScreen from "./components/HospitalScreen";
import StockiestScreen from "./components/StockiestScreen";
import PathScreen from "./components/PathScreen";
import MTPScreen from "./components/MTPScreen";
import KnowYourBrandsScreen from "./components/KnowYourBrandsScreen";
import MeetingsScreen from "./components/MeetingsScreen";
import EDriveScreen from "./components/EDriveScreen";
import BirthdayScreen from "./components/BirthdayScreen";
import RefreshDataScreen from "./components/RefreshDataScreen";
import ReportScreen from "./components/ReportScreen";
import SupportScreen from "./components/SupportScreen";
import LogoutScreen from "./components/LogoutScreen";
import HospitalForm from "./component_indepth/hospitalscreen/HospitalForm";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CustomDrawerContent = (props) => {
  return (
    <ScrollView style={styles.drawerContent}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Harshad Dhongade</Text>
      </View>
      <View style={styles.drawerOptions}>
        <DrawerOption
          title="Home"
          icon="home"
          iconColor="#1e90ff"
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerOption
          title="Dashboard"
          icon="view-dashboard"
          iconColor="#32cd32"
          onPress={() => props.navigation.navigate("Dashboard")}
        />
        <DrawerOption
          title="Profile"
          icon="account"
          iconColor="#ff6347"
          onPress={() => props.navigation.navigate("Profile")}
        />
        <DrawerOption
          title="My Day Plan"
          icon="calendar-check"
          iconColor="#ff8c00"
          onPress={() => props.navigation.navigate("MyDayPlan")}
        />
        <DrawerOption
          title="DCR (Daily Call Report)"
          icon="clipboard-text"
          iconColor="#ff4500"
          onPress={() => props.navigation.navigate("DCR")}
        />
        <SectionHeader title="Customers" />
        <DrawerOption
          title="Hospital"
          icon="hospital-building"
          iconColor="#4682b4"
          onPress={() => props.navigation.navigate("Hospital")}
        />
        <DrawerOption
          title="Stockiest"
          icon="store"
          iconColor="#8a2be2"
          onPress={() => props.navigation.navigate("Stockiest")}
        />
        <SectionHeader title="Plan" />
        <DrawerOption
          title="Path"
          icon="map-marker-path"
          iconColor="#32cd32"
          onPress={() => props.navigation.navigate("Path")}
        />
        <DrawerOption
          title="MTP (Map To Point)"
          icon="map"
          iconColor="#ff4500"
          onPress={() => props.navigation.navigate("MTP")}
        />
        <SectionHeader title="More" />
        <DrawerOption
          title="Know Your Brands"
          icon="tag"
          iconColor="#ff69b4"
          onPress={() => props.navigation.navigate("KnowYourBrands")}
        />
        <DrawerOption
          title="Meetings"
          icon="account-group"
          iconColor="#00ced1"
          onPress={() => props.navigation.navigate("Meetings")}
        />
        <DrawerOption
          title="E-Drive"
          icon="harddisk"
          iconColor="#ffa500"
          onPress={() => props.navigation.navigate("EDrive")}
        />
        <DrawerOption
          title="Birthday"
          icon="cake"
          iconColor="#ff1493"
          onPress={() => props.navigation.navigate("Birthday")}
        />
        <DrawerOption
          title="Refresh Data"
          icon="refresh"
          iconColor="#008000"
          onPress={() => props.navigation.navigate("RefreshData")}
        />
        <DrawerOption
          title="Report"
          icon="file-chart"
          iconColor="#1e90ff"
          onPress={() => props.navigation.navigate("Report")}
        />
        <DrawerOption
          title="Support"
          icon="lifebuoy"
          iconColor="#ff6347"
          onPress={() => props.navigation.navigate("Support")}
        />
      </View>
      <View style={styles.logoutSection}>
        <DrawerOption
          title="Log Out"
          icon="logout"
          iconColor="#dc143c"
          onPress={() => props.navigation.navigate("Logout")}
        />
      </View>
    </ScrollView>
  );
};

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const DrawerOption = ({ title, icon, iconColor, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <Icon name={icon} size={24} color={iconColor} style={styles.icon} />
    <Text style={styles.option}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen}  options={{
            headerStyle: { backgroundColor: '#f0f8ff' },
            headerTintColor: 'black',
            headerTitleStyle: { fontWeight: 'bold' }
          }} />
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="MyDayPlan" component={MyDayPlanScreen} />
        <Drawer.Screen name="DCR" component={DCRScreen} />
        <Drawer.Screen name="Hospital" component={HospitalScreen} options={{ headerStyle: {backgroundColor: '#f0f8ff'},
      headerTintColor: 'black',
      headerTitleStyle: { fontWeight: 'bold' }
      }} />
        <Drawer.Screen name="Stockiest" component={StockiestScreen} />
        <Drawer.Screen name="Path" component={PathScreen} />
        <Drawer.Screen name="MTP" component={MTPScreen} />
        <Drawer.Screen name="KnowYourBrands" component={KnowYourBrandsScreen} />
        <Drawer.Screen name="Meetings" component={MeetingsScreen} />
        <Drawer.Screen name="EDrive" component={EDriveScreen} />
        <Drawer.Screen name="Birthday" component={BirthdayScreen} />
        <Drawer.Screen name="RefreshData" component={RefreshDataScreen} />
        <Drawer.Screen name="Report" component={ReportScreen} />
        <Drawer.Screen name="Support" component={SupportScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
        <Drawer.Screen name="CLM" component={LogoutScreen} />
        <Drawer.Screen name="Quotation" component={LogoutScreen} />
        <Drawer.Screen name="POBs" component={LogoutScreen} />
        <Drawer.Screen name="Eposters" component={LogoutScreen} />
        <Drawer.Screen name="Expenses" component={LogoutScreen} />
        <Drawer.Screen name="Leaves" component={LogoutScreen} />
        <Drawer.Screen name="RCPA" component={LogoutScreen} />
        <Drawer.Screen name="Activities" component={LogoutScreen} />
        <Drawer.Screen name="Sales" component={LogoutScreen} />
        <Drawer.Screen name="AboutCompany" component={LogoutScreen} />
        <Drawer.Screen name="AppointStockist" component={LogoutScreen} />
        <Stack.Screen name="HospitalForm" component={HospitalForm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor:'#f0f8ff'
  },
  profileSection: {
    marginBottom: 30,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerOptions: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 15,
  },
  option: {
    fontSize: 18,
    color: "#000",
  },
  logoutSection: {
    marginTop: 10,
    marginBottom: 40,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
  },
});
