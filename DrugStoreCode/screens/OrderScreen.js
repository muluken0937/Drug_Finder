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

const OrderScreen = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity style={{
        padding:Spacing,
        marginHorizontal:Spacing,
        borderRadius:Spacing/2,
        marginTop:Spacing/2,
        marginRight:5}}>
        <Ionicons name="menu-outline" color={Colors.primary} size={Spacing*3}/>
      </TouchableOpacity>

      <TextInput  placeholder="Search here" 
      placeholderTextColor={Colors.darkText} 
      style={{paddingLeft:10,
        fontFamily:Font['poppins-regular'],
        fontSize:FontSize.small,
        height:40,
        width:'80%',
        color:Colors.primary,
        backgroundColor:Colors.lightPrimary,
        borderRadius:Spacing,
        borderColor:Colors.primary,
        borderWidth:1,
        textAlign:'justify',
        marginTop:Spacing,
        marginVertical:Spacing
      }}/>
      <TouchableOpacity 
      // onPress={()=>navigate("Register")}
      style={{
        alignItems:'center',
        marginTop:Spacing,
        backgroundColor:Colors.primary,
        marginLeft:2,
        width:50,
        height:40,
        borderRadius:Spacing,
      }}>
         <Ionicons style={{alignSelf:'center'}} name="search-outline" color={Colors.lightPrimary} size={Spacing*3}/>
      </TouchableOpacity>
    </View>
    <View style={{alignItems:'center'}}>
      <Text style={{
        fontSize:FontSize.xLarge,
        color:Colors.primary,
        fontFamily:Font['poppins-bold'],
        marginVertical:Spacing*3
        }}>Order Screen</Text>
      
    </View>
</SafeAreaView>
  )
}

export default OrderScreen