import {
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
  import axios from "axios";
  import Api from "../constants/Api";
  import { useState,useEffect } from "react";
  import { useSelector } from "react-redux";
const PharmaAdminDrugList = ({ navigation: { navigate } }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [dId, setdId]=useState('')
  const [Dname, setDname]=useState('')
  const [dBrName, setdBrName]=useState('')
  const [dGenName, setdGenName]=useState('')
  const [dBatchNo, setdBatchNo]=useState('')
  const [dDosage, setdDosage]=useState('')
  const [dManuName, setdManuName]=useState('')
  const [dPrice, setdPrice]=useState(0)
  const [dStrength, setdStrength]=useState('')
  const [dExpire, setdExpire]=useState('')
  const [dManuDate, setdManuDate]=useState('')
  const [dQunatity, setdQunatity]=useState(0)
  const [dAdditional, setdAdditional]=useState('')
  const [dPharmacy, setdPharmacy]=useState('')
  const handleView =(drId,drname,drBrName,drGenName,drBatchNo,drDosage,drManuName,drPrice,drStrength,drExpire,drManuDate,drQunatity,drAdditional,drPharmacy)=>{
    setdId(drId)
    setDname(drname)
    setdBrName(drBrName)
    setdGenName(drGenName)
    setdBatchNo(drBatchNo)
    setdDosage(drDosage)
    setdManuName(drManuName)
    setdPrice(drPrice)
    setdStrength(drStrength)
    setdExpire(drExpire)
    setdDosage(drDosage)
    setdManuDate(drManuDate)
    setdQunatity(drQunatity)
    setdAdditional(drAdditional)
    setdPharmacy(drPharmacy)
    setIsVisible(!isVisible);
   }
   const pharmacyId=useSelector((state)=>state.pharmaID)
  const [drugs,setDrugs]= useState([])
  const fitchDrugs=()=>{
    axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}`)
    .then((r)=>setDrugs(r.data))
    .catch((err)=>console.log(err))
}
React.useEffect(()=>{fitchDrugs()},[])
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  return (
    <SafeAreaView>
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
      {drugs.map((d)=>{return(
        <View key={d.id} style={{ borderRadius:5, borderColor:Colors.primary}}>
        <TouchableOpacity 
        onPress={()=>handleView(d.id,d.DrugName,d.BrandName,d.GenericName,d.BatchNo,d.Dosage,d.Manufacturer,d.Price,d.Strength,d.ExpireDate, d.ManufacturedDate,d.Quantity,d.additional,d.pharmacy)} 
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
      width: '40%',
      fontFamily: Font['poppins-semiBold'],
      fontSize: FontSize.large,
      color: Colors.onPrimary,
      // alignSelf:'left'
  
        }}>{d.DrugName}</Text>
        <Text style={{
        marginLeft:Layout.width*23/100,
        fontFamily:Font['poppins-semiBold'],
        fontSize:FontSize.large,
        color:Colors.onPrimary,
        // alignSelf:'left'
        }}>{d.Quantity}</Text>
        <Text style={{
        marginLeft:Layout.width*13/100,
        fontFamily:Font['poppins-semiBold'],
        fontSize:FontSize.large,
        color:Colors.onPrimary,
        // alignSelf:'left'
        }}>{d.Price}</Text>
        </TouchableOpacity>
        </View>
      )})}
      
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
            <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Name: {Dname}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Brand name: {dBrName}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Generic name: {dGenName}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Batch no: {dBatchNo}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Dosage: {dDosage}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Strength: {dStrength}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Manufacturer: {dManuName}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Manufactured date: {dManuDate}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Expire date: {dExpire}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Price:{dPrice}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Available Quantity: {dQunatity}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Additional description: {dAdditional}</Text>
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
    <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Inventory')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.onPrimary,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/inventory.png")}></Image>
               <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Inventory</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.primary,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')}   style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.onPrimary,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/skills.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Accounts</Text>
            </TouchableOpacity>
          </View>
</SafeAreaView>
  )
}

export default PharmaAdminDrugList