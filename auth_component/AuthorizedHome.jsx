import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import HomeScreen from "../components/HomeScreen";
import ProfileScreen from "../components/ProfileScreen";
import DashboardScreen from "../components/DashboardScreen";
import MyDayPlanScreen from "../components/MyDayPlanScreen";
import DCRScreen from "../components/DCRScreen";
import HospitalScreen from "../components/HospitalScreen";
import StockiestScreen from "../components/StockiestScreen";
import PathScreen from "../components/PathScreen";
import MTPScreen from "../components/MTPScreen";
import KnowYourBrandsScreen from "../components/KnowYourBrandsScreen";
import MeetingsScreen from "../components/MeetingsScreen";
import EDriveScreen from "../components/EDriveScreen";
import BirthdayScreen from "../components/BirthdayScreen";
import RefreshDataScreen from "../components/RefreshDataScreen";
import ReportScreen from "../components/ReportScreen";
import SupportScreen from "../components/SupportScreen";
import LogoutScreen from "../components/LogoutScreen";
import HospitalForm from "../component_indepth/hospitalscreen/HospitalForm";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 
import EmployeeCategoryProvider from '../constant/EmployeeCategoryProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from './LogoutButton';
import DateDisplayScreen from '../component_indepth/CommonComponent/DateDisplay';
import HospitalProfileL1 from '../component_indepth/L1/HospitalProfileL1';
import DcrForm from '../component_indepth/L1/DcrForm';
import UpdateDcrForm from '../component_indepth/L1/UpdateDcrForm';
import VisitForm from '../component_indepth/L1/VisitForm';
import SkipForm from '../component_indepth/L1/SkipForm';
import AddStockistForm from '../component_indepth/L1/AddStockistForm';
import AddHospitalContactForm from '../component_indepth/L1/AddHospitalContactForm';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export let Empoyee_Id 
export let Token 

const CustomDrawerContent = (props) => {

    const [name ,setname] = useState(true)
    const [avtar , setavtar] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
              const user = JSON.parse(userInfo);
              // Set the role based on emp_category from the user data
          
              setname(user.emp_name)
              setavtar(user.avatar)
            }
          //  console.log("this ia avtar image ",avtar)
          } catch (error) {
            console.error('Error fetching user data', error);
          } 
        };
    
        fetchUserData();
      }, []);


  return (
    <ScrollView style={styles.drawerContent}>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: avtar || 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{name}</Text>
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

const AuthorizedHome = () => {

    const [Role, setRole] = useState(true);
    const [empid ,setempid] = useState();
   

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            const token = await AsyncStorage.getItem("authToken");
            Token = token
            if (userInfo) {
              const user = JSON.parse(userInfo);
              // Set the role based on emp_category from the user data
              setRole(user.emp_category);
              setempid(user.emp_id)
              Empoyee_Id = empid
             // console.log("this is the emplo id ", Empoyee_Id)
            

             
            }
          } catch (error) {
            console.error('Error fetching user data', error);
          } 
        };
    
        fetchUserData();
      }, []);

  return (
    <EmployeeCategoryProvider>
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
      <Drawer.Screen name="MyDayPlan" component={MyDayPlanScreen} initialParams={{ title: `${Role}`}} options={{headerStyle:{backgroundColor:'#f0f8ff'}, headerTintColor: 'black',headerTitleStyle: { fontWeight: 'bold' }}} />
      <Drawer.Screen name="DCR" component={DCRScreen} initialParams={{ title: `${Role}`}} options={{headerStyle:{backgroundColor:'#f0f8ff'}, headerTintColor: 'black',headerTitleStyle: { fontWeight: 'bold' }}}  />
      <Drawer.Screen name="Hospital" component={HospitalScreen} initialParams={{ title: `${Role}`}}  options={{ headerStyle: {backgroundColor: '#f0f8ff'},
    headerTintColor: 'black',
    headerTitleStyle: { fontWeight: 'bold' }
    }} />
      <Drawer.Screen name="Stockiest" component={StockiestScreen} initialParams={{ title: `${Role}`}}  />
      <Drawer.Screen name="Path" component={PathScreen} />
      <Drawer.Screen name="MTP" component={MTPScreen} />
      <Drawer.Screen name="KnowYourBrands" component={KnowYourBrandsScreen} />
      <Drawer.Screen name="Meetings" component={MeetingsScreen} />
      <Drawer.Screen name="EDrive" component={EDriveScreen} />
      <Drawer.Screen name="Birthday" component={BirthdayScreen} />
      <Drawer.Screen name="RefreshData" component={RefreshDataScreen} />
      <Drawer.Screen name="Report" component={ReportScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="Logout" component={LogoutButton} />
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
      <Drawer.Screen name="HospitalForm" component={HospitalForm} options={{headerStyle:{backgroundColor:'#f0f8ff'}, headerTintColor: 'black',headerTitleStyle: { fontWeight: 'bold' }}}  /> 
      <Drawer.Screen name="DateDisplay" component={DateDisplayScreen} options={{headerStyle:{backgroundColor:'#f0f8ff'}, headerTintColor: 'black',headerTitleStyle: { fontWeight: 'bold' }}}  />
      <Drawer.Screen name="HospitalProfile" component={HospitalProfileL1} options={{ title: 'Hospital Profile' , headerStyle:{ backgroundColor:'#f0f8ff'} , headerTitleStyle: { fontWeight: 'bold' } }} />
      <Drawer.Screen name="DcrForm" component={DcrForm} />
      <Drawer.Screen name="UpdateDcrForm" component={UpdateDcrForm} />
      <Drawer.Screen name="VisitForm" component={VisitForm} />
      <Drawer.Screen name="SkipForm" component={SkipForm} />
      <Drawer.Screen name="AddStockistForm" component={AddStockistForm} />
      <Drawer.Screen name="AddHospitalContactForm" component={AddHospitalContactForm} />
      

      

    </Drawer.Navigator>
    </EmployeeCategoryProvider>
  );
};

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

export default AuthorizedHome;
