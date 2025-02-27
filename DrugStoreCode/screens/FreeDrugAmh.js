import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Image,
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
  import axios from "axios";
  import Api from "../constants/Api";
  import Activity from "./Activity";
  import * as Location from 'expo-location'
import { useSelector } from "react-redux";
const FreeDrugAmh = (category) => {
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
  const fitchDrugs=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/drugsParameter/?ExpireDate=false`)
    .then((r)=>{setDrugs(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  // Fetch location when component mounts
  getLocationAsync();
}, []);

useEffect(() => {
  // Fetch drugs whenever the location changes
  fitchDrugs();
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
    <View style={{flex:1}}>
        <ScrollView style={{height:Layout.height*83.5/100,backgroundColor:Colors.lightPrimary}}  scrollEnabled={true}>
    <View style={{
      paddingHorizontal:Spacing,
      paddingTop:Spacing,
    }}>
      <Text style={{
        fontSize:FontSize.large, 
        color:Colors.primary,
        fontFamily:Font['poppins-bold'], 
        textAlign:'left'}}>
       መድሀኒቶች
      </Text>
      <View style={{ borderRadius:5, borderColor:Colors.primary}}>
        {drugs.length>0? drugs.map((d)=>{return(
              <TouchableOpacity key={d.id}
              onPress={()=>handleView(d.id,d.DrugName,d.BrandName,d.GenericName,d.BatchNo,d.Dosage,d.Manufacturer,d.Price,d.Strength,d.ExpireDate, d.ManufacturedDate,d.Quantity,d.additional,d.pharmacy)} 
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
              }}>ዋጋ: {d.Price}</Text>
              </View>
                
              </View>
              </TouchableOpacity>
            )}):<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:'red',}}>መድኃኒት የለም</Text></View>}
      
        </View>
    </View>
    </ScrollView>
    {isVisible && (
      
      <View style={{height: Layout.height*75/100,
      position: "absolute",
      bottom: (Layout.height * 15) / 100,
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
           ዋና ዋና መረጃዎች
          </Text>
          <View style={{borderRadius:5, borderColor:Colors.primary}}>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>የመድኃኒቱ ሥም: {Dname}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>ብራንድ ሥም: {dBrName}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>ጄነሪክ ሥም: {dGenName}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>ባች ቁጥር: {dBatchNo}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>የመድሃኒቱ አወሳሰድ: {dDosage}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>የመድሃኒቱ ጥንካሬ: {dStrength}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>አምራች ድርጅት: {dManuName}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>የተመረተበት ቀን: {dManuDate}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>ጊዜው የሚያበቃበት ቀን: {dExpire}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>የዋጋ ተመን:{dPrice}</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>ተጨማሪ ማብራሪያ: {dAdditional}</Text>
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
            መድሃኒቱን ያለበት በአቅራቢያ የሚገኝ ፋርማሲ 
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
            <Text>በአቅራቢያዎት ፋርማሲ የለም</Text>
          </View>)}
          </ScrollView>
       </View>
      </ScrollView>
       <View style={{flexDirection:'row',marginBottom:10}}>
       <TouchableOpacity
              onPress={toggleFloatScreen}
              style={{
                padding: Spacing,
                paddingRight: 30,
                alignItems: "center",
                backgroundColor: "green",
                borderRadius: Spacing / 2,
                marginLeft:10,
                marginRight:10
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
              ይሁን
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
          bottom: (Layout.height * 4) / 100,
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
              ዋና ዋና መረጃዎች
            </Text>
            <View style={{borderRadius:5, borderColor:Colors.primary}}>
               <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>የፋርማሲ ሥም:{pName}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>ስልክ ቁጥር:{pPhone}</Text>
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
             የፋርማሲ መገኛ
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
        <Text>ካርታ በመፈለግ ላይ...</Text>
      </View>
    )}
            </View>
            <TouchableOpacity
                onPress={toggleFloatScreen2}
                style={{marginTop:10,
                  padding: Spacing,
                  paddingRight: 30,
                  alignItems: "center",
                  backgroundColor: Colors.onPrimary,
                  borderRadius: Spacing / 2,
                  borderColor:Colors.primary,
                  borderWidth:1
                }}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.primary,
                    alignSelf: "center",
                  }}
                >
                ይሁን
                </Text>
              </TouchableOpacity>
         </View>
      </ScrollView>
      )}{isLoading &&(
        <Activity/>
      )}
    </View>
  )
}

export default FreeDrugAmh