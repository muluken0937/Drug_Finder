import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Image,
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
  import { useState,useEffect } from "react";
  import Layout from "../constants/Layout";
  import MapView from "react-native-maps";
  import axios from "axios";
  import Api from "../constants/Api";
  import Activity from "./Activity";
  import DrugList from "./DrugList";
const LoggedDrugList = ({navigation:{navigate}}) => {
  
  return (
    <SafeAreaView>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity 
        onPress={()=>navigate('LoggedHome')}
        style={{
          padding:Spacing,
          marginHorizontal:Spacing,
          borderRadius:Spacing/2,
          marginTop:Spacing*4,
          marginRight:5}}>
          <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Drug list</Text>
       </View>
    <View>
      <DrugList/>
    </View>
    
    <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
          <TouchableOpacity onPress={()=>navigate('LoggedHome')} style={{alignItems:'center', marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('LoggedPharmacyList')} style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedDrugList')}  style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedPrescriptionList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Prescription</Text>
            </TouchableOpacity>
          </View>
</SafeAreaView>
  )
}

export default LoggedDrugList