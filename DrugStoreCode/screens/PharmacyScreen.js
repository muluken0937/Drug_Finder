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
  import MapView from "react-native-maps";

const PharmacyScreen = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('Home')
        }
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
            <View style={{height:500,borderWidth:1, borderRadius:5, borderColor:Colors.primary, marginBottom:Spacing*2}}>
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
        <View style={{flexDirection:'row',alignItems:'flex-end', borderTopWidth:1, borderColor:Colors.primary}}>
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

export default PharmacyScreen