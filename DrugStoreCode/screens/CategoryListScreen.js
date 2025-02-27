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

const CategoryListScreen = ({navigation:{navigate}}) => {
  return (
    <SafeAreaView>
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
          <TouchableOpacity onPress={()=>navigate('AddCategory')} style={{
          padding:Spacing,
          marginHorizontal:Spacing,
          borderRadius:Spacing/2,
          marginTop:Spacing*4,
          marginLeft:90}}>
          <Ionicons name="add-outline" color={Colors.primary} size={Spacing*3} /></TouchableOpacity>
       </View>
    <ScrollView style={{height:600, backgroundColor:Colors.lightPrimary}}  scrollEnabled={true}>
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
      <View style={{ borderRadius:5, borderColor:Colors.primary}}>
        <TouchableOpacity 
        onPress={()=>navigate('CategoryDetails')} 
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
        }}>Ab pharmacy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>navigate('Pharmacy')}  
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
        }}>Gondar pharmacy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>navigate('Pharmacy')}  
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
        }}>Red cross pharmacy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>navigate('Pharmacy')} 
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
        }}>Ephrem pharmacy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>navigate('Pharmacy')}  
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
        }}>Enat pharmacy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>navigate('Pharmacy')} 
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
        }}>Ibex pharmacy</Text>
        </TouchableOpacity>
        
        </View>
    </View>
    </ScrollView>
    <View  style={{flexDirection:'row',alignItems:'flex-end', borderTopWidth:1, borderColor:Colors.primary}}>
    <TouchableOpacity onPress={()=>navigate('SysAdmin')} style={{alignItems:'center', marginLeft:10,padding:Spacing}}>
          <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
            <Text>Home</Text>
          </TouchableOpacity >
          <TouchableOpacity  style={{alignItems:'center',marginLeft:10, padding:Spacing}}>
          <Ionicons name="settings-outline" color={Colors.primary} size={Spacing*3}/>
           <Text>Settings</Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={{alignItems:'center',marginLeft:10, padding: Spacing}}>
          <Ionicons name="location-outline" color={Colors.primary} size={Spacing*3}/>
            <Text>Pharmacy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate('CategoryList')}  style={{alignItems:'center',marginLeft:10, padding:Spacing,}}>
          <Ionicons name="help-circle-outline" color={Colors.primary} size={Spacing*3}/>
            <Text>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigate('DrugList')} style={{alignItems:'center',marginLeft:10, padding:Spacing,}}>
          <Ionicons name="person-circle-outline" color={Colors.primary} size={Spacing*3}/>
            <Text>Drugs</Text>
          </TouchableOpacity>
        </View>
</SafeAreaView>
  )
}

export default CategoryListScreen