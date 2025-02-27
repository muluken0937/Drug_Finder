/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import ForgotScreen from '../screens/ForgotScreen'
import Layout from "../constants/Layout";
import OtpSms from '../screens/OtpSms'
import OtpSmsVerify from "../screens/OtpSmsVerify";
import VerifyScreen from "../screens/VerifyScreen";
import AmhWelcomeScreen from "../screens/AmhWelcomeScreen";
//import HomeScreen from "../screens/HomeScreen";

import AdminPharmaScreen from "../screens/AdminPharmaScreen";
import { useSelector } from "react-redux";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();


import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView,Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SysAdminHome from "../screens/SysAdminHome";

import AddPharmacyScreen from "../screens/AddPharmacyScreen";
import PharmaAdminDrugList from "../screens/PharmaAdminDrugList";
import PharmaAdminSearch from "../screens/PharmaAdminSearch";
import SysAdminSearch from "../screens/SysAdminSearch";
import HomeFree from "../screens/HomeFree";

import FreeDrugList from "../screens/FreeDrugList";
import FreePharmacyList from "../screens/FreePharmacyList";
import FreeSearch from "../screens/FreeSearch";
import LoggedHome from "../screens/LoggedHome";
import LoggedSearch from "../screens/LoggedSearch";
import LoggedDrugList from "../screens/LoggedDrugList";
import LoggedPharmacyList from "../screens/LoggedPharmacyList";
import LoggedPrescriptionList from "../screens/LoggedPrescriptionList";
import LoggedSendFeedback from "../screens/LoggedSendFeedback";
import DatabseScreen from "../screens/DatabseScreen";
import AdminAccountScreen from "../screens/AdminAccountScreen";
import InventoryScreen from "../screens/InventoryScreen";
import PharmaAdminAccount from "../screens/PharmaAdminAccount";
import ExpiredDrugsScreen from "../screens/ExpiredDrugsScreen";
import RegisterHome from "../screens/RegisterHome";
import RegisterPharmacy from "../screens/RegisterPharmacy";
import RegisterFeedbacks from "../screens/RegisterFeedbacks";
import RegisterRequests from "../screens/RegisterRequests";
import RegisterSearch from "../screens/RegisterSearch";
import PharmacistHome from "../screens/PharmacistHome";
import PharmacistDrugList from "../screens/PharmacistDrugList";
import PharmacistPrescription from "../screens/PharmacistPrescription";
import PharmacistSearch from "../screens/PharmacistSearch";
import PharmacistExpired from "../screens/PharmacistExpired";
import CartList from "../screens/CartList";
import LoggedOrderList from "../screens/LoggedOrderList";
import Icon from 'react-native-vector-icons/FontAwesome';
import DelivererHome from "../screens/DelivererHome";
import DelivererOrders from "../screens/DelivererOrders";
import DelivererFinished from "../screens/DelivererFinished";
import PharmacyOrders from "../screens/PharmacyOrders";
import PharmacyOrderHistory from "../screens/PharmacyOrderHistory";
import PharmacyFeedbacks from "../screens/PharmacyFeedbacks";
import PharmaAdminOrder from "../screens/PharmaAdminOrder";
import PharmaAdminfeedbacks from "../screens/pharmaAdminfeedbacks";
import PharmaAdminExpired from "../screens/PharmaAdminExpired";
import UserAddress from "../screens/UserAddress";
import LoggedRecievedOrders from "../screens/LoggedRecievedOrders";
import HomeFreeAmh from "../screens/HomeFreeAmh";
import FreeDrugListAmh from "../screens/FreeDrugListAmh";
import FreePharmacyListAmh from "../screens/FreePharmacyListAmh";
import FreeSearchAmh from "../screens/FreeSearchAmh";

const Drawer = createDrawerNavigator();  
function CustomDrawerContent({ navigation,navigation:{navigate} }) {
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const handleAlert=()=>{
    navigate('Login')
  }
  const handleAlert2=()=>{
    navigate('LoggedHome')
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{height:Layout.height*28/100,flexDirection:'row',backgroundColor:Colors.primary}}>
         <View style={{backgroundColor:'white', height:65, width:65, borderRadius:50,alignItems:'center',marginLeft:7, marginTop:120}}>
          <Ionicons name="person-outline" color={Colors.primary} style={{marginTop:10}} size={Spacing*3}/>
         </View>
         <View style={{marginLeft:10, marginTop:130}}>
          <Text style={{color:Colors.onPrimary, fontFamily:Font["poppins-semiBold"], fontSize:FontSize.large}}>{first} {last}</Text>
          <Text style={{color:Colors.onPrimary,alignSelf:'center', fontFamily:Font["poppins-regular"]}}>Customer</Text>
         </View>
    </View>
    <View style={{height:Layout.height*72/100,}}>
      
      <TouchableOpacity underlayColor="green" activeOpacity={0.2}
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('AddPharmacy')}
      >
        <Ionicons name="create-outline" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], }}>Register pharmacy</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('LoggedSendFeedback')}
      ><Ionicons name="mail-outline" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
   
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Send Comment</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('LoggedOrderList')}
      ><Icon name="shopping-bag" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
   
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Your Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('LoggedRecievedOrders')}
      ><Icon name="shopping-bag" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
   
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Recieved Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('UserAddress')}
      ><Ionicons name="location-outline" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
   
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Your Address</Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
      onPress={()=>Alert.alert('oops','Are you sure?',[{text:'No',onPress:handleAlert2},{text:'Yes',onPress:handleAlert}])}
      style={{flexDirection:'row', backgroundColor:'#FFB570', height:40,marginTop:5,marginBottom:5}}
      >
        <Ionicons name="log-out-outline" color={Colors.primary} style={{marginRight:10}}  size={Spacing*3}/>
   
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Log out</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
function CustomDrawerContent2({ navigation,navigation:{navigate} }) {
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const handleAlert=()=>{
    navigate('Login')
  }
  const handleAlert2=()=>{
    navigate('PharmacistHome')
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{height:Layout.height*28/100,flexDirection:'row',backgroundColor:Colors.primary}}>
         <View style={{backgroundColor:'white', height:65, width:65, borderRadius:50,alignItems:'center',marginLeft:7, marginTop:120}}>
          <Ionicons name="person-outline" color={Colors.primary} style={{marginTop:10}} size={Spacing*3}/>
         </View>
         <View style={{marginLeft:10, marginTop:130}}>
          <Text style={{color:Colors.onPrimary, fontFamily:Font["poppins-semiBold"], fontSize:FontSize.large}}>{first} {last}</Text>
          <Text style={{color:Colors.onPrimary,alignSelf:'center', fontFamily:Font["poppins-regular"]}}>Pharmacist</Text>
         </View>
    </View>
    <View style={{height:Layout.height*72/100,}}>
      
      <TouchableOpacity underlayColor="green" activeOpacity={0.2}
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('PharmacistExpired')}
      >
        <Ionicons name="create-outline" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Expired drugs</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('PharmacyFeedbacks')}
      ><Ionicons name="mail-outline" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Pharmacy feedbacks</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('PharmacyOrderHistory')}
      ><Icon name="shopping-bag" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
   
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Orders history</Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
      onPress={()=>Alert.alert('oops','Are you sure?',[{text:'No',onPress:handleAlert2},{text:'Yes',onPress:handleAlert}])}
      style={{flexDirection:'row', backgroundColor:'#FFB570', height:40,marginTop:5,marginBottom:5}}
      >
        <Ionicons name="log-out-outline" color={Colors.primary} style={{marginRight:10}}  size={Spacing*3}/>
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Log out</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
function CustomDrawerContent3({ navigation,navigation:{navigate} }) {
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const handleAlert=()=>{
    navigate('Login')
  }
  const handleAlert2=()=>{
    navigate('AdminPharma')
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{height:Layout.height*28/100,flexDirection:'row',backgroundColor:Colors.primary}}>
         <View style={{backgroundColor:'white', height:65, width:65, borderRadius:50,alignItems:'center',marginLeft:7, marginTop:120}}>
          <Ionicons name="person-outline" color={Colors.primary} style={{marginTop:10}} size={Spacing*3}/>
         </View>
         <View style={{marginLeft:10, marginTop:130}}>
          <Text style={{color:Colors.onPrimary, fontFamily:Font["poppins-semiBold"], fontSize:FontSize.large}}>{first} {last}</Text>
          <Text style={{color:Colors.onPrimary,alignSelf:'center', fontFamily:Font["poppins-regular"]}}>Pharmacy Manager</Text>
         </View>
    </View>
    <View style={{height:Layout.height*72/100,}}>
      
      <TouchableOpacity underlayColor="green" activeOpacity={0.2}
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('PharmaAdminExpired')}
      >
        <Ionicons name="create-outline" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Expired drugs</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('PharmaAdminfeedbacks')}
      ><Ionicons name="mail-outline" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Pharmacy feedbacks</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{flexDirection:'row', height:Layout.height*5/100,}}
        onPress={() => navigation.navigate('PharmaAdminOrder')}
      ><Icon name="shopping-bag" color={Colors.primary} style={{marginRight:20,marginLeft:20}}  size={Spacing*3}/>
   
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Orders history</Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
      onPress={()=>Alert.alert('oops','Are you sure?',[{text:'No',onPress:handleAlert2},{text:'Yes',onPress:handleAlert}])}
      style={{flexDirection:'row', backgroundColor:'#FFB570', height:40,marginTop:5,marginBottom:5}}
      >
        <Ionicons name="log-out-outline" color={Colors.primary} style={{marginRight:10}}  size={Spacing*3}/>
        <Text style={{color:Colors.primary,fontFamily:Font["poppins-bold"], fontSize:FontSize.large}}>Log out</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

function MyDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} navigation={navigation} />}
    >
      <Drawer.Screen name="Home" component={LoggedHome} />
    </Drawer.Navigator>
  );
}
function MyDrawer2({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="PharmacistHome"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent2 {...props} navigation={navigation} />}
    >
      
      <Drawer.Screen name="PharmacistHome" component={PharmacistHome} />
    </Drawer.Navigator>
  );
}
function MyDrawer3({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="AdminPharma"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent3 {...props} navigation={navigation} />}
    >
      
      <Drawer.Screen name="AdminPharma" component={AdminPharmaScreen} />
    </Drawer.Navigator>
  );
}
function RootNavigator() {
  return (
    <Stack.Navigator
     
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="OtpSms" component={OtpSms} />
      <Stack.Screen name="OtpSmsVerify" component={OtpSmsVerify} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="AmhWelcome" component={AmhWelcomeScreen} />
      <Stack.Screen name="LoggedHome" component={MyDrawer} />
      <Stack.Screen name="SysAdmin" component={SysAdminHome} />
      <Stack.Screen name="AdminPharma" component={MyDrawer3} />
      
      <Stack.Screen name="AddPharmacy" component={AddPharmacyScreen} />
      <Stack.Screen name="PharmaAdminDrugList" component={PharmaAdminDrugList} />
      <Stack.Screen name="PharmaAdminSearch" component={PharmaAdminSearch} />
      <Stack.Screen name="SysAdminSearch" component={SysAdminSearch} />

      <Stack.Screen name="HomeFree" component={HomeFree} />
      <Stack.Screen name="HomeFreeAmh" component={HomeFreeAmh} />
      <Stack.Screen name="FreeDrugList" component={FreeDrugList} />
      <Stack.Screen name="FreeDrugListAmh" component={FreeDrugListAmh} />
      <Stack.Screen name="FreePharmacyList" component={FreePharmacyList} />
      <Stack.Screen name="FreePharmacyListAmh" component={FreePharmacyListAmh} />
      <Stack.Screen name="FreeSearch" component={FreeSearch} />
      <Stack.Screen name="FreeSearchAmh" component={FreeSearchAmh} />

      <Stack.Screen name="LoggedSearch" component={LoggedSearch} />
      <Stack.Screen name="LoggedDrugList" component={LoggedDrugList} />
      <Stack.Screen name="LoggedPharmacyList" component={LoggedPharmacyList} />
      <Stack.Screen name="LoggedPrescriptionList" component={LoggedPrescriptionList} />
      <Stack.Screen name="LoggedSendFeedback" component={LoggedSendFeedback} />
      <Stack.Screen name="Database" component={DatabseScreen} />
      <Stack.Screen name="AdminAccount" component={AdminAccountScreen} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="PharmaAdminAccount" component={PharmaAdminAccount} />
      <Stack.Screen name="ExpiredDrugs" component={ExpiredDrugsScreen} />
      <Stack.Screen name="RegisterHome" component={RegisterHome} />
      <Stack.Screen name="RegisterPharmacy" component={RegisterPharmacy} />
      <Stack.Screen name="RegisterFeedbacks" component={RegisterFeedbacks} />
      <Stack.Screen name="RegisterRequests" component={RegisterRequests} />
      <Stack.Screen name="RegisterSearch" component={RegisterSearch} />
      <Stack.Screen name="PharmacistHome" component={MyDrawer2} />
      <Stack.Screen name="PharmacistDrugList" component={PharmacistDrugList} />
      <Stack.Screen name="PharmacistPrescription" component={PharmacistPrescription} />
      <Stack.Screen name="PharmacistSearch" component={PharmacistSearch} />
      <Stack.Screen name="PharmacistExpired" component={PharmacistExpired} />
      <Stack.Screen name="CartList" component={CartList} />
      <Stack.Screen name="LoggedOrderList" component={LoggedOrderList} />
      <Stack.Screen name="DelivererHome" component={DelivererHome} />
      <Stack.Screen name="DelivererOrders" component={DelivererOrders} />
      <Stack.Screen name="DelivererFinished" component={DelivererFinished} />
      <Stack.Screen name="PharmacyOrders" component={PharmacyOrders} />
      <Stack.Screen name="PharmacyOrderHistory" component={PharmacyOrderHistory} />
      <Stack.Screen name="PharmacyFeedbacks" component={PharmacyFeedbacks} />
      <Stack.Screen name="PharmaAdminOrder" component={PharmaAdminOrder} />
      <Stack.Screen name="PharmaAdminfeedbacks" component={PharmaAdminfeedbacks} />
      <Stack.Screen name="PharmaAdminExpired" component={PharmaAdminExpired} />
      <Stack.Screen name="UserAddress" component={UserAddress} />
      <Stack.Screen name="LoggedRecievedOrders" component={LoggedRecievedOrders} />
    </Stack.Navigator>
  );
}
