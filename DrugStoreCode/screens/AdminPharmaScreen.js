import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Image,Animated,
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
  import axios from "axios";
  import Api from "../constants/Api";
  import { useState,useEffect,useRef} from "react";
  import { useSelector } from "react-redux";
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { BarChart, PieChart } from "react-native-chart-kit";
  import { ExpirePieChart,ExpireBarChart,PharmacistDeliverer,SlidingImages } from "./PharmacyReport";
  
const AdminPharmaScreen = ({navigation,navigation:{navigate}}) => {
  const [approval, setApproval] = useState([]);
const pharmacyId = useSelector((state) => state.pharmaID);
const first=useSelector((state)=>state.FName)
const last=useSelector((state)=>state.LName)

const fetchPharma = () => {
  
  axios
    .get(`http://${Api}/drugs/pharmacyParameter/?id=${pharmacyId}&&approved=True`)
    .then((response) => {
      setApproval(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
useEffect(() => {
  fetchPharma();
}, []);


  return (
    <SafeAreaView style={{flex:1}}>
      {approval.length>0 ? <View style={{flex:1}}>
        <View style={{flex:1}}>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{
            padding:Spacing,
            marginHorizontal:Spacing*2,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:50}}>
            <Ionicons name="menu-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Home</Text>
        
        </View>
          <ScrollView style={Layout.styles.scrollContainer}>
            <SlidingImages  />
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
            <View style={{ height:Layout.height*40/100,width:Layout.width*96/100, borderRadius:5, borderColor:Colors.primary,backgroundColor:Colors.onPrimary}}>
            <PharmacistDeliverer navigation={navigation}/>
            </View>   
          </View>
          <View>
             <View>
             <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'center'}}>Drugs status pie chart</Text>
            <ExpirePieChart />
            
             
             </View>
             <View>
             <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'center'}}>Drugs status bar chart</Text>
            <ExpireBarChart />
           
             
             </View>

             
           </View>
          
          
          </ScrollView>
          <View  style={{flexDirection:'row',}}>
          <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={{alignItems:'center', backgroundColor:Colors.primary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.onPrimary} size={Spacing*3}/>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Inventory')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/inventory.png")}></Image>
               <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Inventory</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')}   style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/skills.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Accounts</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View> : 
        <View style={{alignItems:'center'}}>
          <View style={{height:Layout.height*70/100,margin:Layout.width*10/100,marginTop:Layout.width*30/100,width:Layout.width*90/100}}>
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text
              style={{marginTop:20,
                fontSize: FontSize.large,
                color:Colors.primary,
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
             OOPS! Sorry {first} {last} You are registered as pharmacy manager to your pharmacy. 
              but your pharmacy is not approved yet. 
              So please wait until the approval of your pharmacy. for more information call to +251978654324
            </Text>   
            <Ionicons name="close-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
              <TouchableOpacity
               onPress={()=>navigate('Login')}
                style={{marginTop:20,
                  padding: Spacing,
                  paddingRight: 30,
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: Spacing / 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.onPrimary,
                    alignSelf: "center",
                  }}
                >
                  Back to login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>}
      
        
    </SafeAreaView>
  )
}
export default AdminPharmaScreen