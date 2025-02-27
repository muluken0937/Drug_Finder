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
const PharmacistExpired = ({navigation:{navigate}}) => {
  
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleFloatScreen = () => {
      setIsVisible(!isVisible);
    };
    const [isVisible2, setIsVisible2] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const toggleFloatScreen2 = () => {
      setIsVisible2(!isVisible2);
      if (!isVisible){
        setIsVisible(isVisible)
      }else{
        setIsVisible(!isVisible)
      }
    };
    const [isVisible3, setIsVisible3] = React.useState(false);
    const toggleFloatScreen3 = () => {
      setIsVisible3(!isVisible3);
    }

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
 const handleDelete = async()=>{
  setIsLoading(true)
  axios.delete(`http://${Api}/drugs/drugsDetails/${dId}`)
  .then((res)=>{toggleFloatScreen2(),fitchDrugs(),setIsLoading(false)})
  .catch((err)=>{console.log(err),setIsLoading(false)})
}
const handleDeleteAll = async()=>{
  setIsLoading(true)
  axios.delete(`http://${Api}/drugs/delete-all-expired/?pharmacy=${pharmacyId}`)
  .then((res)=>{fitchDrugs(),toggleFloatScreen3(),setIsLoading(false)})
  .catch((err)=>{console.log(err),setIsLoading(false)})
}
    return (
      <SafeAreaView style={{flex:1}} >
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
                Expired drugs
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
          {drugs.length>0?( <TouchableOpacity onPress={() =>
          Alert.alert("Delete All", "Are you sure,You want to remove all?", [
            { text: "No" },
            { text: "Yes",onPress:()=>{handleDeleteAll()}},
          ])
        } style={{position: "absolute",
  marginTop:Layout.height*82/100,
  marginLeft:Layout.height*37/100,
  elevation: 20,height: Layout.height*10/100,backgroundColor: 'red',borderWidth:2, borderColor:'white', borderRadius:50,
  alignItems:'center',
  padding: 10,
  width:Layout.height*10/100,}}>
  <Ionicons style={{marginVertical:7,}}
  name="trash-outline"
  color={Colors.onPrimary}
  size={Spacing * 3.5}
/>
  </TouchableOpacity>):(<View></View>)}
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
                  onPress={() =>
                    Alert.alert("Delete", "Are you sure,You want to remove?", [
                      { text: "No" },
                      { text: "Yes",onPress:()=>{handleDelete()}},
                    ])
                  }
                  style={{
                    padding: Spacing,
                    paddingRight: 30,
                    alignItems: "center",
                    backgroundColor: "red",
                    borderRadius: Spacing / 2,
                    marginLeft:Layout.width*25/100,
                    marginRight:Layout.width*10/100
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
                    Delete
                  </Text>
                </TouchableOpacity>
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
          
        )}
        {isVisible2 && (
            <ScrollView
              style={{
                height: Layout.height*40/100,
                position: "absolute",
                bottom: (Layout.height * 40) / 100,
                right: 0,marginRight:50,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
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
                <Text
                  style={{marginTop:20,
                    fontSize: FontSize.xLarge,
                    color:Colors.primary,
                    fontFamily: Font["poppins-bold"],
                    textAlign: "center",
                  }}
                >
                  Drug is Deleted successfully!
                </Text>   
                <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
                  <TouchableOpacity
                    onPress={toggleFloatScreen2}
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
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
          )}{isLoading &&(<Activity/>)}
          {isVisible3 && (
            <ScrollView
              style={{
                height: Layout.height*40/100,
                position: "absolute",
                bottom: (Layout.height * 40) / 100,
                right: 0,marginRight:50,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
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
                <Text
                  style={{marginTop:20,
                    fontSize: FontSize.xLarge,
                    color:Colors.primary,
                    fontFamily: Font["poppins-bold"],
                    textAlign: "center",
                  }}
                >
                  All drugs are removed successfully!
                </Text>   
                <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
                  <TouchableOpacity
                    onPress={toggleFloatScreen3}
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
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
          )}
          <View style={{flexDirection:'row',alignItems:'flex-end',}}>
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

export default PharmacistExpired