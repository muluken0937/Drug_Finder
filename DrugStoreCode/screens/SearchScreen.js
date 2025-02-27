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
  //import { RNCamera } from "react-native-camera";

const SearchScreen = ({ navigation:{navigate} }) => {
  return (
    <SafeAreaView >
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('Home')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <TextInput style={{color:Colors.primary, marginLeft:Spacing*2,marginTop:Spacing*4, fontSize:FontSize.large}} placeholder="Search here . . . "></TextInput>
            <TouchableOpacity  style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginLeft:90}}>
            <Ionicons name="camera-outline" color={Colors.primary} size={Spacing*3} /></TouchableOpacity>
         </View>
        <ScrollView style={{height:600, backgroundColor:Colors.lightPrimary}} scrollEnabled={true}>
        <View style={{ paddingHorizontal:Spacing,
            paddingTop:Spacing,borderRadius:5, borderColor:Colors.primary}}>
        <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Results
            </Text>
              <TouchableOpacity 
              onPress={()=>navigate('Drug')} 
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
              }}>Paracetamol</Text>
              </TouchableOpacity>
              </View>
              
        </ScrollView>
        <View style={{flexDirection:'row',alignItems:'flex-end',}}>
            <TouchableOpacity onPress={()=>navigate('Home')} style={{alignItems:'center', marginLeft:10,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Settings')} style={{alignItems:'center',marginLeft:15, padding:Spacing}}>
            <Ionicons name="settings-outline" color={Colors.primary} size={Spacing*3}/>
             <Text>Settings</Text>
            </TouchableOpacity >
            <TouchableOpacity style={{alignItems:'center',marginLeft:15, padding: Spacing}}>
            <Ionicons name="location-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Help')}  style={{alignItems:'center',marginLeft:15, padding:Spacing,}}>
            <Ionicons name="help-circle-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Profile')} style={{alignItems:'center',marginLeft:15, padding:Spacing,}}>
            <Ionicons name="person-circle-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>profile</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default SearchScreen