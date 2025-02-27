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

const OtpSmsVerify = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View style={{padding:Spacing*2}}>
        <View style={{alignItems:'center'}}>
          <Text style={{
            fontSize:FontSize.xLarge,
            color:Colors.primary,
            fontFamily:Font['poppins-bold'],
            marginVertical:Spacing*3
            }}>Reset password</Text>
        </View>
        <View style={{
          marginVertical:Spacing*2,}}>
          <TextInput placeholder="New password" 
          placeholderTextColor={Colors.darkText}
          secureTextEntry 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing
          }}/>
          <TextInput placeholder="Confirm password" 
          placeholderTextColor={Colors.darkText}
          secureTextEntry 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing/2
          }}/>
        </View>
        <TouchableOpacity 
        onPress={()=>navigate('Login')}
        style={{
           padding:Spacing,
           marginTop:Spacing,
           backgroundColor:Colors.primary,
           marginVertical:Spacing*3,
           borderRadius:Spacing
        }}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            color:Colors.onPrimary,
            alignSelf:'center'}}>Reset</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default OtpSmsVerify