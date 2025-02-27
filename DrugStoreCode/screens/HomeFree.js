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
import { useState,useEffect } from "react";
import Layout from "../constants/Layout";
import axios from "axios";
import Api from "../constants/Api";
import Activity from "./Activity";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SlidingImages } from "./PharmacyReport";
const HomeFree = ({navigation:{navigate} }) => {
  const [cat,setCat]=useState('')
  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [quantity,setQuantity]=useState(0)
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [isVisible3, setIsVisible3] = React.useState(false);
  const [isVisible4, setIsVisible4] = React.useState(false);
  
  const toggleFloatScreen2 = () => {
    setIsVisible2(!isVisible2);
  };
  const toggleFloatScreen3 = () => {
    setIsVisible3(!isVisible3);
  };
  const toggleFloatScreen4 = () => {
    setIsVisible4(!isVisible4);
  };
  
  const [pName, setPname]=useState('')
  const [pId, setPid]=useState('')
  const [pPhone, setpPhone]=useState('')
  const [pLocLatitude, setpLoclat]=useState(null)
  const [pLoclongitude, setpLoclong]=useState(null)

  const handlePharmacyView =(phId,phName,phPhone,phLat,phLong)=>{
   setPid(phId)
   setPname(phName)
   setpLoclat(phLat)
   setpPhone(phPhone)
   setpLoclong(phLong)
   setIsVisible2(!isVisible2);
  }
  
  const [dId, setdId]=useState('')
  const [Dname, setDname]=useState('')
  const [dBrName, setdBrName]=useState('')
  const [dGenName, setdGenName]=useState('')
  const [dBatchNo, setdBatchNo]=useState('')
  const [dDosage, setdDosage]=useState('')
  const [dPrice, setdPrice]=useState(0)
  const [dManuName, setdManuName]=useState('')
  const [dStrength, setdStrength]=useState('')
  const [dExpire, setdExpire]=useState('')
  const [dManuDate, setdManuDate]=useState('')
  const [dQunatity, setdQunatity]=useState(0)
  const [dAdditional, setdAdditional]=useState('')
  const [dPharmacy, setdPharmacy]=useState('')
  const handleView =(drId,drname,drBrName,drGenName,drBatchNo,drDosage,drManuName,drPrice,drStrength,drExpire,drManuDate,drQunatity,drAdditional)=>{
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
    getLocationAsync()
    fetchPharmacy(drname, location?.latitude, location?.longitude);
    setIsVisible(!isVisible);

   }
   const [pharmacy,setPharmacy]= useState([])
   const fetchPharmacy=(drugName,uLatitude,uLongitude)=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/nearby-drugs/?DrugName=${drugName}&latitude=${uLatitude}&longitude=${uLongitude}`)
    .then((r)=>{setPharmacy(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
   }
  const [drugs,setDrugs]= useState([])
  const fitchDrugs=(category)=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/drugsParameter/?ExpireDate=false&Category=${category}`)
    .then((r)=>{setDrugs(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  // Fetch location when component mounts
  getLocationAsync();
}, []);

useEffect(() => {
  // Fetch drugs whenever the location changes
  fitchDrugs('');
}, []);

const [location, setLocation] = useState(null);

  const getLocationAsync = async () => {
    try {
      // Request permission to access the device's location
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      // Retrieve the user's current location
      
      const currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation.coords);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  return (
    <SafeAreaView style={{flex:2}}>
        <View style={{ flexDirection:'row',}}>
          <TouchableOpacity onPress={()=>navigate('Login')} style={{
            padding:Spacing,
            marginHorizontal:Spacing*2,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:50}}>
            <Ionicons name="log-in-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Home</Text>
          <TouchableOpacity 
          onPress={()=>navigate("FreeSearch")}
          style={{
            alignSelf:'flex-end',
            alignItems:'center',
            marginTop:Spacing*4,
            marginLeft:Layout.width*10/100,
            width:50,
            height:40,
            borderRadius:Spacing,
          }}>
             <Ionicons style={{
              // alignSelf:'center'
              }} name="search-outline" color={Colors.primary} size={Spacing*2.5}/>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>navigate("HomeFreeAmh")}
          style={{
            alignSelf:'flex-end',
            alignItems:'center',
            marginTop:Spacing*4,
            width:Layout.width*20/100,
            height:40,
            borderRadius:Spacing,
          }}>
             <Text style={{color:Colors.active,fontFamily:Font["poppins-bold"]}}>አማርኛ</Text>
           </TouchableOpacity>
        </View>
        <ScrollView style={{height:Layout.height*83.5/100, backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true} endFillColor={'brown'}>
        <View>
          <SlidingImages />
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
              Categories
            </Text>
            <View style={{flexDirection:'row', height:Layout.height*23/100, borderRadius:5, borderColor:Colors.primary}}>
            <ScrollView horizontal={true}>
              <TouchableOpacity onPress={()=>{fitchDrugs('Chronic')}} style={{margin:5,width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*30/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/chronic-conditions.png")}></Image>
                 <Text style={{fontSize:FontSize.large , color:Colors.primary}}>chronic conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('Pregnancy')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/Pregnant2.jpg")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>Pregnancy and Woman health</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('child')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/baby-care.jpg")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>Baby care</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('Firstaid')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/First-Aid-Kit.png")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>First aid</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('Painrelief')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/pain-relief.jpg")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>Pain relief</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('Digestive')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/digestive.jpg")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>Digestive</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('Vitamines')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/Vitamines.jpg")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>Vitamines</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('Alergy')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/alergies.jpg")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>Alergy and flu</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{fitchDrugs('Skin')}} style={{margin:5,marginLeft:0, width:Layout.width*40/100, height:Layout.height*50/100,alignItems:'center',color:Colors.primary}}>
              <Image style={{width:Layout.width*40/100,height:Layout.height*15/100,borderRadius:20}} source={require("../assets/images/skin-care.jpg")}></Image>
                 <Text style={{fontSize:FontSize.large, color:Colors.primary}}>Skin care</Text>
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
       Medications 
      </Text>
      <View style={{ borderRadius:5, borderColor:Colors.primary}}>
        {drugs.length>0? drugs.map((d)=>{return(
              <TouchableOpacity key={d.id}
              onPress={() => {
                setLocation(null);
                getLocationAsync();
                handleView(
                  d.id,
                  d.DrugName,
                  d.BrandName,
                  d.GenericName,
                  d.BatchNo,
                  d.Dosage,
                  d.Manufacturer,
                  d.Price,
                  d.Strength,
                  d.ExpireDate,
                  d.ManufacturedDate,
                  d.Quantity,
                  d.additional
                );
                getLocationAsync();
              }} style={{
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
              color:'red',}}>No drugs in this category</Text></View>}
      
        </View>
    </View>
        </ScrollView>
        {isVisible && (
        <View style={{height: Layout.height*75/100,
        position: "absolute",
        bottom: (Layout.height * 20) / 100,
        backgroundColor: "white",
        marginLeft:10,
        borderRadius: 10,
        width:Layout.width*95/100,
        elevation: 10,}}>
        <ScrollView
          style={{
            
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
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Name: {Dname}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Brand name: {dBrName}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Generic name: {dGenName}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Batch no: {dBatchNo}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Dosage: {dDosage}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Strength: {dStrength}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Manufacturer: {dManuName}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Manufactured date: {dManuDate}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Expire date: {dExpire}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Estimated Price:{dPrice}</Text>
              <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Additional description: {dAdditional}</Text>
          </View>
            </View>
        <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
          }}>
            <Text style={{
              fontSize:FontSize.medium, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Nearby pharmacies in which the drug is found
            </Text>
            <ScrollView scrollEnabled={true}>

            {pharmacy.length>0? pharmacy.map((p)=>{return(
              <TouchableOpacity key={p.id}
              onPress={()=>{handlePharmacyView(p.pharmacy['id'],p.pharmacy['name'],p.pharmacy['phoneNo'],parseFloat(p.pharmacy.location?.['latitude']), parseFloat(p.pharmacy.location?.['longitude']))}} 
              style={{
            height:40,
            marginTop:5,
            backgroundColor:Colors.primary,
            borderRadius:Spacing/3
          }}>
              <Text style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>{p.pharmacy['name']}</Text>
              </TouchableOpacity>
            )
            }):(<View>
              <Text>No nearby pharmacy</Text>
            </View>)}
            </ScrollView>
            
             
              
         </View>
        </ScrollView>
         <View style={{marginBottom:10}}>
         <TouchableOpacity
                onPress={toggleFloatScreen}
                style={{marginTop:10,
                  width:Layout.width*50/100,
                  marginBottom:10,
                  padding: Spacing,
                  alignSelf:'center',
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
         </View>
        
      )}
      {isVisible2 && (
        <ScrollView
        style={{
          height: Layout.height*87/100,
          position: "absolute",
          bottom: (Layout.height * 11) / 100,
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
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Name:{pName}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Phone Number:{pPhone}</Text>
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
             Pharmacy Location
            </Text>
            <View style={{height:400,borderWidth:1, borderRadius:5, borderColor:Colors.primary, marginBottom:Spacing*2}}>
            {location && location.latitude && location.longitude ? (
      <MapView
        mapType="hybrid" showsCompass={true} showsUserLocation={true}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: pLocLatitude,
          longitude: pLoclongitude,
          latitudeDelta: 0.0052,
          longitudeDelta: 0.0051,
        }}
      >
        <Marker coordinate={{ latitude: pLocLatitude, longitude: pLoclongitude }} title={pName + ' ' + 'Pharmacy'} />
      </MapView>
    ) : (
      <View>
        {/* Show a message or a loading indicator if the location is not available yet */}
        <Text>Loading Map...</Text>
      </View>
    )}
            </View>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                onPress={toggleFloatScreen2}
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
            
         </View>
      </ScrollView>
      )}{isLoading && (<Activity/>)}
          <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
            <TouchableOpacity onPress={()=>navigate('HomeFree')} style={{alignItems:'center',backgroundColor:Colors.primary, marginLeft:Layout.width*1/100,width:Layout.width/5,padding:Spacing}}>
            <Ionicons name="home-outline" color={'white'} size={Spacing*3}/>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}} >Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('FreePharmacyList')} style={{alignItems:'center',marginLeft:Layout.width/5,width:Layout.width/4.5, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('FreeDrugList')}  style={{alignItems:'center',marginLeft:Layout.width/7,width:Layout.width/5, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default HomeFree