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
  import Layout from "../constants/Layout";
  import { Ionicons } from "@expo/vector-icons";

import Navigation from "../navigation";

const HomeScreen = ({ navigation, navigation:{navigate} }) => {
  return (
    <SafeAreaView>
        <View style={{flexDirection:'row',}}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{
            padding:Spacing,
            marginHorizontal:Spacing*2,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:50}}>
            <Ionicons name="menu-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Home</Text>
          <TouchableOpacity 
          onPress={()=>navigate("Search")}
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
          <ScrollView style={{height:600, backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true} endFillColor={'brown'}>
          <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
            
          }}>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Categories
            </Text>
            <View style={{flexDirection:'row', height:120, borderRadius:5, borderColor:Colors.primary}}>
            <ScrollView horizontal={true}>
              <TouchableOpacity style={{margin:5,width:100,backgroundColor:'white', height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center', borderRadius:30,color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center', borderRadius:30,color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{margin:5,width:100, height:100,padding:Spacing/4,borderColor:'lightgreen', borderWidth:1,alignItems:'center',borderRadius:30, color:Colors.primary}}>
                 <Ionicons size={FontSize.xLarge} name="search-outline" />
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>Abcd</Text>
              </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
          <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
          }}>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Drugs
            </Text>
              <View style={{ borderRadius:5, borderColor:Colors.primary}}>
              
              <TouchableOpacity 
              onPress={()=>navigate('Drug')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Paracetamol</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>navigate('Drug')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
            }}>Paracetamol</Text>
              </TouchableOpacity>
              <TouchableOpacity 
             onPress={()=>navigate('Drug')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Paracetamol</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>navigate('Drug')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Paracetamol</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>navigate('Drug')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
            }}>Paracetamol</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>navigate('Drug')} 
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Paracetamol</Text>
              </TouchableOpacity>
              </View>
              
            
          </View>
          </ScrollView>
          <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminHome')} style={{alignItems:'center', marginLeft:10,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            
            <TouchableOpacity onPress={()=>navigate('SysAdmin')} style={{alignItems:'center',marginLeft:5, padding: Spacing}}>
            <Ionicons name="location-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Help')}  style={{alignItems:'center',marginLeft:5, padding:Spacing,}}>
            <Ionicons name="help-circle-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Settings')} style={{alignItems:'center',marginLeft:5, padding:Spacing}}>
            <Ionicons name="settings-outline" color={Colors.primary} size={Spacing*3}/>
             <Text>Prescription</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Profile')} style={{alignItems:'center',marginLeft:5, padding:Spacing,}}>
            <Ionicons name="person-circle-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>profile</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default HomeScreen