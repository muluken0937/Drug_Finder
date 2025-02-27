import {
    SafeAreaView,
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
const ForgotScreen = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View style={{padding:Spacing*2}}>
        <View style={{alignItems:'center'}}>
          <Text style={{
            fontSize:FontSize.xLarge,
            color:Colors.primary,
            fontFamily:Font['poppins-bold'],
            marginVertical:Spacing*3
            }}>Forgot Password</Text>
        </View>
        <View style={{
          marginVertical:Spacing*2,}}>
          <TextInput placeholder="Phone number" 
          placeholderTextColor={Colors.darkText}
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing
          }}/>
        </View>
        <TouchableOpacity onPress={()=>navigate('OtpSms')} style={{
           padding:Spacing,
           backgroundColor:Colors.primary,
           marginVertical:Spacing,
           borderRadius:Spacing
        }}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            color:Colors.onPrimary,
            alignSelf:'center'}}>OK</Text>
            </TouchableOpacity>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>navigate('Login')}>
          <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.small,
            color:Colors.primary,
            alignSelf:'center'}}>I remember password</Text>
            </TouchableOpacity>
            
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotScreen