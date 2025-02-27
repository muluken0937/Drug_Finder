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

const PharmaAdminDrugsDetails = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView >
        <View style={{flexDirection:'row', shadowColor:'gray',shadowOffset:{width:0,height:Spacing},shadowOpacity:0.3,shadowRadius:Spacing}}>
          <TouchableOpacity 
          onPress={()=>navigate('PharmaAdminDrugList')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Paracetamol</Text>
        </View>
        <ScrollView style={{height:600 ,backgroundColor:Colors.lightPrimary}} scrollEnabled={true}>
        
        <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
          }}>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Basic Information
            </Text>
            <View style={{borderRadius:5, borderColor:Colors.primary}}>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Name:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Batch no:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Dosage:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Strength:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Manufacturer:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Additional description:</Text>
            </View>
            </View>
        <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
          }}>
            <Text style={{
              fontSize:FontSize.medium, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Nearby pharmacies in which the drug is found
            </Text>
         </View>
        </ScrollView>
        <View  style={{flexDirection:'row',}}>
            <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Inventory')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="key-outline" color={Colors.primary} size={Spacing*3}/>
             <Text>Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="person-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="layers-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Accounts</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default PharmaAdminDrugsDetails