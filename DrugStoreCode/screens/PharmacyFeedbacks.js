import {
    Alert,
      SafeAreaView,
      ScrollView,
      StyleSheet,
      Text,Image,
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
    import { useState,useEffect } from "react";
    import MapView, { Marker } from 'react-native-maps';
  import axios from 'axios'
  import * as ImagePicker from 'expo-image-picker'
  import * as Location from 'expo-location'
  import Api from "../constants/Api";
  import { useSelector } from "react-redux";
    import Activity from "./Activity";
    import FreeDrug from "./freeDrug";
    import Icon from 'react-native-vector-icons/FontAwesome';
  const PharmacyFeedbacks = ({navigation,navigation:{navigate}}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [quantity,setQuantity]=useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const userID=useSelector((state)=>state.User_ID)
    const first=useSelector((state)=>state.FName)
    const last=useSelector((state)=>state.LName)
    const toggleFloatScreen = () => {
      setIsVisible(!isVisible);
    };
    const pharmacyId=useSelector((state)=>state.pharmaID)
    const [feedBacks,setFeedbacks]= useState([])
  const fetchFeedback=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/ratingList/?pharmacy${pharmacyId}`)
    .then((r)=>setFeedbacks(r.data),setIsLoading(false))
    .catch((err)=>console.log(err),setIsLoading(false))
}
useEffect(()=>{setIsLoading(true), fetchFeedback()},[])
const HumanReadableDateTime = ({ dateTimeString }) => {
  const formattedDateTime = new Date(dateTimeString).toLocaleString();

  return <Text>{formattedDateTime}</Text>;
};

    return (
      <SafeAreaView style={{flex:1}}>
      <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('PharmacistHome')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Feedbacks from customers</Text>
         </View>
         <ScrollView style={{height:Layout.height*83/100,backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true}>
          {feedBacks.length>0?feedBacks.map((f)=>{return(<View key={f.id} style={{margin:5,borderRadius:20,borderBottomLeftRadius:1,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,borderWidth:1}}>
              <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
                <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{f.customer_name}</Text>
              </View>
              <View style={{ borderBottomWidth:1,borderStyle:'dashed'}}>
              <View style={{flexDirection:'column',}}>
                <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>Comment</Text>
                <Text style={{color:Colors.text, fontFamily:Font["poppins-regular"],fontSize:FontSize.medium,width:Layout.width*90/100, marginLeft:Layout.width*10/100}}>{f.feedback}</Text>
             
             </View>
              </View>
              <View style={{}}>
              <Text style={{margin:10,color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium}}>Sent on: <HumanReadableDateTime dateTimeString={f.created_at} /> </Text>
              </View>  
            </View>)}):<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>Empty messages</Text></View>}
            
          </ScrollView>
          {isLoading &&(<Activity />)}
      <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
      <TouchableOpacity onPress={()=>navigate('PharmacistHome')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('PharmacistDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacyOrders')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Icon name="shopping-bag" color={Colors.primary}  size={Spacing*3}/>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacistPrescription')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Prescription</Text> 
            </TouchableOpacity>
            </View>
  </SafeAreaView>
    )
  }
  
  export default PharmacyFeedbacks