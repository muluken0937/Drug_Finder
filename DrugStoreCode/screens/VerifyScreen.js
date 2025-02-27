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
const VerifyScreen = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View style={{padding:Spacing*2}}>
        <View style={{alignItems:'center'}}>
          <Text style={{
            fontSize:FontSize.large,
            color:Colors.primary,
            fontFamily:Font['poppins-bold'],
            marginVertical:Spacing*3,
            alignSelf:'center'
            }}>We have sent 6 digit verification Code to your number</Text>
        </View>
        <View style={{
          marginVertical:Spacing*2,}}>
          <TextInput placeholder="6 Digit Code" 
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
        <TouchableOpacity onPress={()=>navigate('Login')} style={{
           padding:Spacing,
           backgroundColor:Colors.primary,
           marginVertical:Spacing,
           borderRadius:Spacing
        }}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            color:Colors.onPrimary,
            alignSelf:'center'}}>Verify</Text>
            </TouchableOpacity>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigate('Verify')}>
          <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.small,
            color:Colors.primary,
            alignSelf:'center'}}>Resend code</Text>
            </TouchableOpacity>
            
        </View>
      </View>
    </SafeAreaView>
  )
}

export default VerifyScreen