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

const ExpiredDrugsScreen = ({navigation:{navigate}}) => {const [isVisible, setIsVisible] = React.useState(false);

  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity 
        onPress={()=>navigate('AdminPharma')}
        style={{
          padding:Spacing,
          marginHorizontal:Spacing,
          borderRadius:Spacing/2,
          marginTop:Spacing*4,
          marginRight:5}}>
          <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <TextInput style={{color:Colors.primary, marginLeft:Spacing*2,marginTop:Spacing*4, fontSize:FontSize.large}} placeholder="Search here . . . "/>
         </View>
    <ScrollView style={Layout.styles.scrollContainer}  scrollEnabled={true}>
    <View style={{
      paddingHorizontal:Spacing,
      paddingTop:Spacing,
    }}>
      <View style={{flexDirection:'row',marginBottom:Spacing*3, justifyContent:'space-between'}}>
            <Text style={{
            fontSize:FontSize.large, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            textAlign:'left'}}>
               Medications
            </Text>
            <TouchableOpacity style={{alignSelf:'flex-end',marginRight:20}}>
                <Text>Sort by</Text>
            </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{
            fontSize:FontSize.small, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            marginLeft:30}}>
                     Name
             </Text>
             <Text style={{
            fontSize:FontSize.small, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            marginLeft:80}}>
                    Ava. Item
             </Text>
             <Text style={{
            fontSize:FontSize.small, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            marginRight:10}}>
                     Price
             </Text>
      </View>
      <View style={{ borderRadius:5, borderColor:Colors.primary}}>
        <TouchableOpacity 
        onPress={toggleFloatScreen}
        style={{
      height:40,
      margin:Spacing,
      marginTop:5,
      flexDirection:'row',
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
        }}>Amoxiline</Text>
        <Text style={{
        marginLeft:Spacing*11,
        fontFamily:Font['poppins-semiBold'],
        fontSize:FontSize.large,
        color:Colors.onPrimary,
        // alignSelf:'left'
        }}>20</Text>
        <Text style={{
        marginLeft:Spacing*4.5,
        fontFamily:Font['poppins-semiBold'],
        fontSize:FontSize.large,
        color:Colors.onPrimary,
        // alignSelf:'left'
        }}>206.5</Text>
        </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
    {isVisible && (
        <ScrollView
          style={{
            position: "absolute",
            marginTop:Layout.height*10/100,
            marginLeft:10,
            backgroundColor: "white",
            width:Layout.width*95/100,
            borderRadius: 10,
            marginRight:10,
            elevation: 10,
          }}
          scrollEnabled={true}
        >
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text style={{fontSize:FontSize.xLarge,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Drug description</Text>
            <View style={{borderRadius:5, borderColor:Colors.primary}}>
            <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Name:</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Brand name:</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Generic name:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Batch no:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Dosage:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Strength:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Manufacturer:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Manufactured date:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Expired date:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Available quantity:</Text>
            </View>

            <View
              style={{
                
                alignItems: 'center',
                
              }}
            >
              <TouchableOpacity
                onPress={toggleFloatScreen}
                style={{
                  alignSelf:'center',
                  padding: Spacing,
                  paddingRight: 30,
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: Spacing / 2,
                  marginBottom:20
                }}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.onPrimary,
                    marginLeft:6
                  }}
                >
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    <View  style={{flexDirection:'row',}}>
    <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Inventory')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="key-outline" color={Colors.primary} size={Spacing*3}/>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Inventory</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="person-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons  name="layers-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Accounts</Text>
            </TouchableOpacity>
          </View>
</SafeAreaView>
  )
}

export default ExpiredDrugsScreen