import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Image,
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
  import { useState,useEffect } from "react";
  import MapView from "react-native-maps";
  import axios from "axios";
  import Api from "../constants/Api";
  import Icon from 'react-native-vector-icons/FontAwesome';
  import Activity from "./Activity";
  
  import FreeDrug from "./freeDrug";
const FreeDrugList = ({ navigation:{navigate} }) => {
  
   
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity 
        onPress={()=>navigate('HomeFree')}
        style={{
          padding:Spacing,
          marginHorizontal:Spacing,
          borderRadius:Spacing/2,
          marginTop:Spacing*4,
          marginRight:5}}>
          <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
       </View>
       <FreeDrug/>
    <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
            <TouchableOpacity onPress={()=>navigate('HomeFree')} style={{alignItems:'center', marginLeft:Layout.width*1/100,width:Layout.width/5,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
              
            <TouchableOpacity onPress={()=>navigate('FreePharmacyList')} style={{alignItems:'center',marginLeft:Layout.width/5,width:Layout.width/4.5, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
                <Text style={{color:Colors.primary,fontSize:FontSize.small}} >Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('FreeDrugList')}  style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width/7,width:Layout.width/5, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}} >Drugs</Text>
            </TouchableOpacity>
          </View>
</SafeAreaView>
  )
}

export default FreeDrugList