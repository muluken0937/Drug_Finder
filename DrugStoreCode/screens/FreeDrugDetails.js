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

const FreeDrugDetails = ({ navigation:{navigate} }) => {
  return (
    <SafeAreaView >
        <View style={{flexDirection:'row', shadowColor:'gray',shadowOffset:{width:0,height:Spacing},shadowOpacity:0.3,shadowRadius:Spacing}}>
          <TouchableOpacity 
          onPress={()=>navigate('FreeDrugList')}
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
            
            
            <View style={{ borderRadius:5, borderColor:Colors.primary}}>
              
              <TouchableOpacity 
              onPress={()=>navigate('FreePharmacyDetails')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Ab pharmacy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={()=>navigate('FreePharmacyDetails')}  
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Gondar pharmacy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={()=>navigate('FreePharmacyDetails')}  
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Red cross pharmacy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={()=>navigate('FreePharmacyDetails')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Ephrem pharmacy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>navigate('FreePharmacyDetails')}  
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Enat pharmacy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={()=>navigate('FreePharmacyDetails')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Ibex pharmacy</Text>
              </TouchableOpacity>
              
             
              </View>
            
         </View>
        </ScrollView>
        <View style={{flexDirection:'row',alignItems:'flex-end',}}>
        <TouchableOpacity onPress={()=>navigate('HomeFree')} style={{alignItems:'center', marginLeft:Layout.width/8,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            
            <TouchableOpacity onPress={()=>navigate('FreePharmacyList')} style={{alignItems:'center',marginLeft:Layout.width/6, padding: Spacing}}>
            <Ionicons name="location-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('FreeDrugList')}  style={{alignItems:'center',marginLeft:Layout.width/6, padding:Spacing,}}>
            <Ionicons name="help-circle-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Drugs</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default FreeDrugDetails