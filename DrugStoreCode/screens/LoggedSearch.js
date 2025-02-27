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
const LoggedSearch = ({navigation:{navigate}}) => {
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
  
  /////////////////////-----BACKEND CODES----//////////////////
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      setIsLoading(true)
      // Perform the search API call and retrieve the results
      const response = await axios.get(`http://${Api}/drugs/drugsParameter/?DrugName=${searchTerm}`);
      const data = response.data;
      
      // Update the search results state variable with the retrieved data
      setSearchResults(data);
      setIsLoading(false)
      // Clear the input by resetting the searchTerm state variable
      setSearchTerm('');
    } catch (error) {
      console.log(error);
      alert(error);
      setIsLoading(false)
    }
  };const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  
  
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
  
  const handleAddCart=()=>{
    setIsLoading(true)
    const data = {
      
      quantity: quantity,
      total_price: dPrice*quantity,
      user: userID,
      pharmacy: pId,
      drug: dId
    };
    axios
   .post(`http://${Api}/order/cartList/`, data)
   .then(()=>{alert("Added successfully",setIsLoading(false),toggleFloatScreen4(),toggleFloatScreen2()),toggleFloatScreen()}
     // Handle the successful response
     
   )
   .catch((error) => {
     // Handle the error response
     console.log(error);
     alert("Something went wrong!");
     setIsLoading(false)
   });
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
  
useEffect(() => {
  // Fetch location when component mounts
  getLocationAsync();
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
    <SafeAreaView style={{flex:1}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('LoggedHome')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <TextInput 
        //     placeholder="Search drug"
        // value={searchTerm}
        // onChangeText={setSearchTerm}
        placeholder="Search drugs here..."
    value={searchTerm}
    onChangeText={setSearchTerm}
    onSubmitEditing={handleSearch}
                   style={{color:Colors.primary, marginLeft:Spacing*2,marginTop:Spacing*4, fontSize:FontSize.large}}></TextInput>
            
         </View>
         <ScrollView style={{height:600, backgroundColor:Colors.lightPrimary}} scrollEnabled={true}>
        <View style={{ paddingHorizontal:Spacing,
            paddingTop:Spacing,borderRadius:5, borderColor:Colors.primary}}>
        <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Results
            </Text>

            {searchResults.length>0? searchResults.map((d)=>{return(
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
            )}):<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:'red',}}>No Result</Text></View></View>}
              
              {/* <ScrollView>
        {renderDrugItems()}
      </ScrollView> */}
              
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
              <TouchableOpacity
                onPress={toggleFloatScreen3}
                style={{
                  padding:Spacing,
                  backgroundColor: "gray",
                  borderRadius: 10,
                  marginLeft:Layout.height*13/100
                  }}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.onPrimary,
                    textAlign:'center'
                  }}
                >
                  Add to cart the drug
                </Text>
              </TouchableOpacity>
            </View>
            
         </View>
      </ScrollView>
      )}
      {isLoading && (
        <Activity/>
      )}{ isVisible4 &&(<View style={{
        height: Layout.height*40/100,
        position: "absolute",
        bottom: (Layout.height * 12) / 100,
        backgroundColor: "white",
        marginLeft:Layout.width*20/100,
        borderRadius: 10,
        width:Layout.width*70/100,
        elevation: 10,flexDirection:'column'
      }}>
        <View style={{margin:10}}>
        <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.primary,
                    alignSelf:'center'
                  }}
                >Add to cart summary</Text>
                 <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.primary,
                    
                  }}
                >Pharmacy: {pName} pharmacy</Text>
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.primary,
                    
                  }}
                >DrugName: {Dname}</Text>
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.primary,
                    
                  }}
                >price: {dPrice}</Text>
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.primary,
                    
                  }}
                >Quantity: {quantity}</Text>
        </View>
       
        <TouchableOpacity
                onPress={()=>handleAddCart()}
                style={{
                  margin:10,
                  padding: Spacing,
                  paddingRight: 30,
                  alignItems: "center",
                  backgroundColor: Colors.onPrimary,
                  borderRadius: Spacing / 2,
                  borderWidth:1,
                  borderColor:Colors.primary
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
                  Add
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>toggleFloatScreen4()}
                style={{ margin:10,
                  padding: Spacing,
                  paddingRight: 30,
                  alignItems: "center",
                  backgroundColor: Colors.onPrimary,
                  borderRadius: Spacing / 2,
                  borderWidth:1,
                  borderColor:Colors.primary
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
                  Cancel
                </Text>
              </TouchableOpacity>
       
        
      </View>)}
      { isVisible3 &&(<View style={{
       height: Layout.height*27/100,
        position: "absolute",
        bottom: (Layout.height * 12) / 100,
        backgroundColor: "white",
        marginLeft:Layout.width*55/100,
        borderRadius: 10,
        width:Layout.width*35/100,
        elevation: 10,flexDirection:'column'
      }}>
        <View style={{margin:10}}>
        <Text style={{marginTop:10,textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Select quantity</Text>
        <TouchableOpacity onPress={()=>{setQuantity(1),toggleFloatScreen3(),toggleFloatScreen4()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(2),toggleFloatScreen3(),toggleFloatScreen4()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>2</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(3),toggleFloatScreen3(),toggleFloatScreen4()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>3</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(4),toggleFloatScreen3(),toggleFloatScreen4()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>4</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(5),toggleFloatScreen3(),toggleFloatScreen4()}} style={{marginTop:5,borderBottomWidth:1,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>max.Quant(5)</Text>
    </TouchableOpacity>
        </View>
      </View>)}
        <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
        <TouchableOpacity onPress={()=>navigate('LoggedHome')} style={{alignItems:'center', backgroundColor:Colors.primary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.onPrimary} size={Spacing*3}/>
              <Text style={{color:Colors.onPrimary}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('LoggedPharmacyList')} style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedPrescriptionList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Prescription</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default LoggedSearch