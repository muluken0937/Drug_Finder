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
  import Layout from "../constants/Layout";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import MapView from "react-native-maps";

const LoggedPharmacyDetails = ({navigation:{navigate}}) => {
  return (
    <SafeAreaView>
        <View style={{flexDirection:'row',}}>
          <TouchableOpacity 
          
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Ab pharmacy</Text>
        </View>
        <ScrollView style={{height:600,backgroundColor:Colors.lightPrimary}}>
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
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Phone Number:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Working hour</Text>
            </View>
            </View>
        <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
          }}>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
             Pharmacy Location
            </Text>
            <View style={{height:400,borderWidth:1, borderRadius:5, borderColor:Colors.primary, marginBottom:Spacing*2}}>
                <MapView mapType="hybrid" showsCompass={true} showsUserLocation={true} style={{flex:1}}
                  initialRegion={{
                    latitude: 12.6048,
                    longitude: 37.4689,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}> 
                </MapView>
            </View>
         </View>
        </ScrollView>
        <View style={{flexDirection:'row',alignItems:'flex-end'}}>
        <TouchableOpacity onPress={()=>navigate('LoggedHome')} style={{alignItems:'center', marginLeft:Layout.width/16,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('LoggedPharmacyList')} style={{alignItems:'center',marginLeft:Layout.width/14, padding: Spacing}}>
            <Ionicons name="fitness-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedDrugList')}  style={{alignItems:'center',marginLeft:Layout.width/14, padding:Spacing,}}>
            <Ionicons name="leaf-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedPrescriptionList')}  style={{alignItems:'center',marginLeft:Layout.width/14, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Prescription</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default LoggedPharmacyDetails