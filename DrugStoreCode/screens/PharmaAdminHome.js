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

const PharmaAdminHome = ({ navigation: { navigate } }) => {

  return (
    <SafeAreaView>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity  style={{
            padding:Spacing,
            marginHorizontal:Spacing*2,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:50}}>
            <Ionicons name="menu-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Home</Text>
          <TouchableOpacity 
          onPress={()=>navigate('PharmaAdminSearch')}
          style={{
            alignSelf:'flex-end',
            alignItems:'center',
            marginTop:Spacing*4,
            marginLeft:100,
            width:50,
            height:40,
            borderRadius:Spacing,
          }}>
             <Ionicons style={{
              // alignSelf:'center'
              }} name="search-outline" color={Colors.primary} size={Spacing*2.5}/>
          </TouchableOpacity>
        </View>
          <ScrollView style={{height:600}}>
          <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,}}>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Dashboard
            </Text>
            <View style={{ height:230,borderWidth:1, borderRadius:5, borderColor:Colors.primary}}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              
              </View>
            </View>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Notifications
            </Text>
            <View style={{marginTop:10, height:350,borderWidth:1, borderRadius:5, borderColor:Colors.primary}}>
            
          </View>
          </View>
          
          </ScrollView>
          <View  style={{flexDirection:'row',alignItems:'flex-end', borderTopWidth:1, borderColor:Colors.primary}}>
            <TouchableOpacity style={{alignItems:'center', marginLeft:10,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity style={{alignItems:'center',marginLeft:10, padding:Spacing}}>
            <Ionicons name="settings-outline" color={Colors.primary} size={Spacing*3}/>
             <Text>Settings</Text>
            </TouchableOpacity >
            <TouchableOpacity style={{alignItems:'center',marginLeft:10, padding: Spacing}}>
            <Ionicons name="location-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:'center',marginLeft:10, padding:Spacing,}}>
            <Ionicons name="help-circle-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaDrugList')} style={{alignItems:'center',marginLeft:10, padding:Spacing,}}>
            <Ionicons name="person-circle-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Drugs</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default PharmaAdminHome