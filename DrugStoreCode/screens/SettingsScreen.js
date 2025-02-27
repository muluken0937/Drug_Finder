import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AlertType
    
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import WebView from "react-native-webview";
export default function SettingsScreen({ navigation:{navigate} }) {
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Settings</Text>
        </View>
        <View style={{height:600}} scrollEnabled={true}>
            
            <WebView
        source={{ uri: 'https://www.google.com' }}
        style={{ flex: 1 }}
      />
            
        </View>
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
    );
}