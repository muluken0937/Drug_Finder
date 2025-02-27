import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import Layout from "../constants/Layout";
const PharmaAdminSearch = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView >
        <View style={{flexDirection:'row',}}>
          <TouchableOpacity 
          onPress={()=>navigate('AdminPharma')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <TextInput style={{color:Colors.primary, marginLeft:Spacing*2,marginTop:Spacing*4, fontSize:FontSize.large}} placeholder="Search here . . . "></TextInput>
            
         </View>
        <ScrollView style={Layout.styles.scrollContainer} scrollEnabled={true}>
        
        </ScrollView>
        <View  style={{flexDirection:'row',}}>
        <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Inventory')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="key-outline" color={Colors.primary} size={Spacing*3}/>
             <Text>Inventory</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="person-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Layout.styles.LoggedTabTouch}>
            <Ionicons onPress={()=>navigate('PharmaAdminAccount')} name="layers-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Accounts</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default PharmaAdminSearch