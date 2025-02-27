import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AlertType,Image
    
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import WebView from "react-native-webview";
  import Layout from "../constants/Layout";
  import Api from "../constants/Api";
  import { useState } from "react";
import Activity from "./Activity";
const DatabseScreen = ({navigation:{navigate}}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView style={{flex:1}} >
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('SysAdmin')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Manage Databse</Text>
        </View>
        <View style={{flex:1}} scrollEnabled={true}>
            
            <WebView
        source={{ uri: `http://${Api}/admin/` }}
        style={{ flex: 1 }}
      />
            
        </View>
        <View style={{flexDirection:'row',alignItems:'flex-end', }}>
        <TouchableOpacity onPress={()=>navigate('SysAdmin')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('AdminAccount')}   style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width/6,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/skills.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Accounts</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=>navigate('Database')}  style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width/8,width:Layout.width*28/100, padding:Spacing,}}>
            <Ionicons name="layers-outline" color={Colors.onPrimary} size={Spacing*3}/>
             <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Adminstration</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default DatabseScreen