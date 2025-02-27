import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,Alert,
  TextInput,
  TouchableOpacity,
  View,Image
} from "react-native";
import React from "react";
import {useState,useEffect}from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import * as ImagePicker from 'expo-image-picker'
const LoggedPrescriptionDetails = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  }
 
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    
    <ScrollView style={{
      position: 'absolute',
    bottom: Layout.height*20/100
    ,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 10,
  }}  scrollEnabled={true}>
    <View style={{
      paddingHorizontal:Spacing,
      paddingTop:Spacing,
    }}>
      <Text style={{
        fontSize:FontSize.medium, 
        color:'white',
        backgroundColor:'red',
        fontFamily:Font['poppins-bold'], 
        textAlign:'center'}}>
       Donot take drugs unless doctor told you to do so!
      </Text>
      
     
      <View style={{marginVertical:Spacing,}}>
          <Text style={{
        fontSize:FontSize.large, 
        color:Colors.primary,
        fontFamily:Font['poppins-bold'], 
        textAlign:'left'}}>This drug is available at</Text>
        <TouchableOpacity  style={Layout.styles.ListTouch}>
        <Text style={Layout.styles.ListTouchText}>Jemal pharmacy</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={Layout.styles.ListTouch}>
        <Text style={Layout.styles.ListTouchText}>Jemal pharmacy</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={Layout.styles.ListTouch}>
        <Text style={Layout.styles.ListTouchText}>Jemal pharmacy</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={Layout.styles.ListTouch}>
        <Text style={Layout.styles.ListTouchText}>Jemal pharmacy</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',alignItems:'flex-end'}}>
      <TouchableOpacity onPress={()=>Alert.alert('Delete','Are you sure? You want to delete?',[{text:'No',},{text:'Yes',}])}
     style={{
            padding:Spacing,
            backgroundColor:'red',
            borderRadius:Spacing/2,
            alignSelf:'flex-end',
            marginRight:20,
            marginLeft:100
          }}>
              <Text style={{
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.medium,
              color:Colors.onPrimary,
              alignSelf:'center'}}>Delete this</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>toggleFloatScreen} style={{
            padding:Spacing,
            paddingRight:30,
            alignItems:'center',
            backgroundColor:'green',
            borderRadius:Spacing/2,
            
          }}>
              <Text style={{
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.medium,
              color:Colors.onPrimary,
              alignSelf:'center'}}>Ok</Text>
          </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    <View  style={{flexDirection:'row',alignItems:'flex-end'}}>
    
        </View>
</SafeAreaView>
  )
}

export default LoggedPrescriptionDetails