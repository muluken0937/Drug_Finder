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
  import Layout from "../constants/Layout";
const SysAdminSearch = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView >
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
            <TextInput style={{color:Colors.primary, marginLeft:Spacing*2,marginTop:Spacing*4, fontSize:FontSize.large}} placeholder="Search here . . . "></TextInput>
            
         </View>
        <ScrollView style={{height:600, backgroundColor:'whitesmoke'}} scrollEnabled={true}>
        
        </ScrollView>
        <View  style={{flexDirection:'row',}}>
            <TouchableOpacity onPress={()=>navigate('SysAdmin')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('AdminAccount')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="key-outline" color={Colors.primary} size={Spacing*3}/>
             <Text>Accounts</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('ViewUsers')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="person-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Database')}  style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="layers-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Databases</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default SysAdminSearch