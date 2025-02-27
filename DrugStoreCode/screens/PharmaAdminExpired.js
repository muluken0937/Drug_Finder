import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,Image,Alert,
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
import { useState,useEffect } from "react";
import Layout from "../constants/Layout";
import axios from "axios";
import Api from "../constants/Api";
import Activity from "./Activity";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import { useSelector,useDispatch } from "react-redux";
import { setCartLength, } from "../store/action/action";
import Icon from 'react-native-vector-icons/FontAwesome';
const PharmaAdminExpired = ({navigation:{navigate}}) => {let dquantity=10
  let sold=50
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const [isLoading, setIsLoading] = useState(false);
   
  
  const pharmacyId=useSelector((state)=>state.pharmaID)
    const [category,setCategory]=React.useState('Select drug category')
    const [dId, setdId]=useState('')
    const [Dname, setDname]=useState('')
    const [dBrName, setdBrName]=useState('')
    const [dGenName, setdGenName]=useState('')
    const [dBatchNo, setdBatchNo]=useState('')
    const [dDosage, setdDosage]=useState('')
    const [dManuName, setdManuName]=useState('')
    const [dStrength, setdStrength]=useState('')
    const [dExpire, setdExpire]=useState('')
    const [dManuDate, setdManuDate]=useState('')
    const [dQunatity, setdQunatity]=useState(0)
    const [dAdditional, setdAdditional]=useState('')
    const [dPharmacy, setdPharmacy]=useState('')
    const [dPrice, setdPrice]=useState(0)
    const handleView =(drId,drname,drBrName,drGenName,drCategory,drBatchNo,drDosage,drManuName,drPrice,drStrength,drExpire,drManuDate,drQunatity,drAdditional,drPharmacy)=>{
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
      setCategory(drCategory)
      setIsVisible(!isVisible);
     }
     const [drugs,setDrugs]= useState([])
     const fitchDrugs=()=>{
      setIsLoading(true)
      axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}&ExpireDate=true`)
      .then((r)=>{setDrugs(r.data),setIsLoading(false)})
      .catch((err)=>{console.log(err),setIsLoading(false)})
  }
 useEffect(()=>{fitchDrugs()},[])
  return (
    <SafeAreaView >
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:Layout.width*20/100, alignSelf:'center', fontSize:FontSize.large}}>Expired Drug List</Text>
        </View>
         <ScrollView style={{height:600, backgroundColor:Colors.lightPrimary}} scrollEnabled={true}>
        <View style={{ paddingHorizontal:Spacing,
            paddingTop:Spacing,borderRadius:5, borderColor:Colors.primary}}>
        <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Medication
            </Text>
            {drugs.length>0? drugs.map((d)=>{return(
              <TouchableOpacity key={d.id}
              onPress={()=>handleView(d.id,d.DrugName,d.BrandName,d.GenericName,d.Category,d.BatchNo,d.Dosage,d.Manufacturer,d.Price,d.Strength,d.ExpireDate, d.ManufacturedDate,d.Quantity,d.additional,d.pharmacy)} 
              style={{
                height:Layout.height*8/100,
                margin:Spacing,
                marginTop:5,
                backgroundColor:Colors.primary,
                marginVertical:Spacing/4,
                borderRadius:Spacing/3
          }}>
             <View style={{flexDirection:'row',alignItems:'center'}} key={d.id}>
              <View>
              <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100,marginLeft:5}} source={require("../assets/images/medicine-drug.png")}></Image>
              </View>
              <View>
              <Text style={{ 
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:Layout.width*5/100,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>{d.DrugName}</Text>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:Layout.width*4/100,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>Price: {d.Price}</Text>
              </View>
                
              </View>
              </TouchableOpacity>

            )}):<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:'red',}}>No Expired Drugs in this pharmacy!</Text></View>}
         </View>
     
        </ScrollView>
        
        {isVisible && (
          <ScrollView
            style={{
              height: Layout.height*87/100,
              position: "absolute",
              bottom: (Layout.height * 12) / 100,
              backgroundColor: "white",
              marginLeft:10,
              borderRadius: 10,
              width:Layout.width*95/100,
              elevation: 10,
            }}
            scrollEnabled={true}
          >
            <View style={{
              paddingHorizontal:Spacing,
              paddingTop:Spacing,
            }}>
              <Text style={{
                fontSize:FontSize.large, 
                color:Colors.primary,
                fontFamily:Font['poppins-bold'], 
                textAlign:'left'}}>
                Basic Information
              </Text>
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
              </View>
           <View style={{marginTop:Layout.height*5/100,flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={toggleFloatScreen}
                  style={{
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
                    Ok
                  </Text>
                </TouchableOpacity>
           </View>
           
          </ScrollView>
          
        )}{isLoading &&(<Activity/>)}
        <View style={{flexDirection:'row',alignItems:'flex-end',}}>
        <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
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
    </SafeAreaView>
)
}

export default PharmaAdminExpired