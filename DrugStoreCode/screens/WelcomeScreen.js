import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Layout from "../constants/Layout";

import { useEffect } from "react";

// type Props = NativeStackScreenProps<RootStackParamList, "welcome">;

const WelcomeScreen = ({navigation:{navigate}}) => {
  const  height  =Layout.height
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('AmhWelcome');
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <SafeAreaView>
      {/* <View style={{marginTop:Spacing*4,}}>
        <TouchableOpacity 
        style={{
          marginTop:Spacing,
          borderRadius:Spacing,
            borderColor:Colors.primary,
            borderWidth:1,
            width:'30%',alignItems:'center'}} onPress={()=>navigate('AmhWelcome')}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.small,
            color:Colors.primary,
            
            }}>አማርኛ</Text>
            </TouchableOpacity> 
      </View> */}
      <View style={{marginTop:Spacing*4}}>
        <Image style={{height: height/2.7, width:height/2}} resizeMode='contain' source={require("../assets/images/online-pharmacy.png")}/>
        <View style={{
          paddingHorizontal:Spacing*4,
          paddingTop:Spacing*4,
        }}>
          <Text style={{
            fontSize:FontSize.xxLarge, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            textAlign:'center'}}>
            Discover Medical drugs here
          </Text>
          <Text style={{
            fontSize:FontSize.small, 
            color:Colors.text,
            fontFamily:Font['poppins-regular'], 
            textAlign:'center',
            marginTop:Spacing*2,}}>
            Explore all medical drugs in Gondar! 
            we will help you to find nearby pharmacy 
            in which the drug is present with GPS!
          </Text>
        </View>
        <View style={{
          paddingHorizontal:Spacing*2,
          paddingTop:Spacing*6,
          alignItems:'center'
        }}>
          <TouchableOpacity
                onPress={()=>{navigate('AmhWelcome');}}
                style={{
                  padding: Spacing,
                  paddingRight: 30,
                  alignSelf:'flex-end',
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: Spacing / 2,
                }}
              >
                <Text
                  style={{ fontFamily: Font["poppins-semiBold"],fontSize: FontSize.medium,color: Colors.onPrimary,alignSelf: "center", }}>
                 Start
                </Text>
              </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
