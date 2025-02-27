
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Button,Image,ActivityIndicator,
    Alert,
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
const Activity = () => {
  return (
    <View style={{backgroundColor: 'rgba(256, 256, 256,1)',borderRadius:10,marginTop:Layout.height*35/100,...StyleSheet.absoluteFillObject,height:Layout.height*20/100, alignItems:'center', width:Layout.width*60/100, marginLeft:Layout.width*20/100}}>
            <ActivityIndicator color="#0000ff"size={35} style={{marginTop:Layout.width*10/100,marginBottom:Layout.width*3/100}}/>
            <Text>Loading...</Text>
    </View>
  )
}

export default Activity