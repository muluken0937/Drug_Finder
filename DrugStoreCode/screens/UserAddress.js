import {
    SafeAreaView,
    ScrollView,
    Text,Alert,Image,
    TextInput,
    TouchableOpacity,
    View,StyleSheet
    
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Layout from "../constants/Layout";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import { useState,useEffect } from "react";
  import MapView, { Marker } from 'react-native-maps';
  import axios from 'axios'
  import * as ImagePicker from 'expo-image-picker'
  import * as Location from 'expo-location'
  import Api from "../constants/Api";
  import { useSelector } from "react-redux";
  import Activity from "./Activity";
  // import Geolocation from "@react-native-community/geolocation";
  import Icon from 'react-native-vector-icons/FontAwesome';
  const UserAddress = ({navigation:{navigate}}) => {
  
    const userID=useSelector((state)=>state.User_ID)
    const first=useSelector((state)=>state.FName)
    const last=useSelector((state)=>state.LName)
    const [address,setAddress]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [isVisible,setIsVisible]=useState(false)
 
    const toggleFloatScreen=()=>{
      setIsVisible(!isVisible)
    }

    const handleMapPress = (event) => {
      const { coordinate } = event.nativeEvent;
      setLocation(coordinate);
      setLoLat(location.latitude)
      setLocLong(location.longitude)
    }; 
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
    
    // Call the function to retrieve the user's location
    useEffect(() => {
      getLocationAsync();
    }, []);
  
    const handleSubmit=()=>{
      setIsLoading(true);
      const data = {
        Subcity:subCity,
        kebele: Kebele,
        houseNo: houseNo,
        phoneNo: phoneNo,
        loc_latitude: location.latitude,
        loc_longitude: location.longitude,
        user: userID
      };
      axios
     .post(`http://${Api}/order/addressList/`, data)
     .then(()=>{alert("Added successfully"),setIsLoading(false)})
     .catch((error) => {
       // Handle the error response
       console.log(error);
       alert("Address with this user already exists!");
       setIsLoading(false)
     });
        
    }
      const [phoneNo, setPhoneNo]=React.useState('')
      const [aID, setAId]=React.useState('')
      const [subCity, setSubCity]=React.useState('')
      const [Kebele, setKebele]=React.useState('')
      const [houseNo, setHouseNo]=React.useState('')
      const [loLat, setLoLat]=React.useState(null)
      const [locLong, setLocLong]=React.useState(null)
    const handleView=(id,phone,subcity,kebele,houseNo,lat,long)=>{
        setAId(id)
        setPhoneNo(phone)
        setSubCity(subcity)
        setKebele(kebele)
        setHouseNo(houseNo)
        setLoLat(lat)
        setLocLong(long)
        setIsVisible(!isVisible)

    }
    const handleupdate=()=>{
        setIsLoading(true);
        const data = {
          Subcity:subCity,
          kebele: Kebele,
          houseNo: houseNo,
          phoneNo: phoneNo,
          loc_latitude: loLat,
          loc_longitude: locLong,
          user: userID
        };
        
        axios.put(`http://${Api}/order/addressDetails/${aID}`,data)
        .then((res)=>{alert('updated successfully'),setIsLoading(false),fetchAddress(),toggleFloatScreen()})
        .catch((error) => {
          // Handle the error response
          console.log(error);
          alert("Something went wrong!");
          setIsLoading(false);
        });
          
      }
   //////////////////////--BACKEND CODE--///////////////////
      
        
      const fetchAddress=()=>{
        setIsLoading(true)
        axios.get(`http://${Api}/order/addressParameter/?user=${userID}`)
        .then((r)=>{setAddress(r.data),setIsLoading(false)})
        .catch((err)=>{console.log(err),alert(err),setIsLoading(false)})
    }
    useEffect(() => {
      fetchAddress();
    }, []);
    return (
      <SafeAreaView>
      <View style={{flexDirection:'row', shadowColor:'gray',shadowOffset:{width:0,height:Spacing},shadowOpacity:0.3,shadowRadius:Spacing}}>
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
              <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Address</Text>
          </View>
          {address.length===0?(<View>
            <Text style={{
          fontSize:FontSize.medium, 
          color:Colors.primary,
          backgroundColor:'#F5DFF4',
          fontFamily:Font['poppins-bold'], 
          textAlign:'center'}}>
         Hello {first} {last}! Fill the information below
        </Text>
      <ScrollView style={{height:Layout.height*79/100, backgroundColor:'#F5DFF4'}}  scrollEnabled={true}>
      <View style={{
        paddingHorizontal:Spacing,
        paddingTop:Spacing,
      }}>
        <View  style={{
            }}>
            <TextInput value={phoneNo} onChangeText={setPhoneNo}
            placeholder="Your phone number" 
            placeholderTextColor={Colors.darkText}
            keyboardType='phone-pad'
            maxLength={10}
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
              marginVertical:10
              
            }}/>
            {!phoneNo.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}
            <TextInput value={subCity} onChangeText={setSubCity} placeholder="Sub city" 
            placeholderTextColor={Colors.darkText} 
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
              marginVertical:10
            }}/>
            {!subCity.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}
            <TextInput value={Kebele} onChangeText={setKebele} placeholder="Kebele" 
            placeholderTextColor={Colors.darkText} 
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              marginVertical:10,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
            }}/>
            {!Kebele.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}
            <TextInput value={houseNo} onChangeText={setHouseNo} placeholder="House number" 
            placeholderTextColor={Colors.darkText} 
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              marginVertical:10,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
            }}/>
            {!houseNo.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}
            <View style={{borderTopWidth:3,borderTopColor:Colors.active,marginTop:10}}>
              <Text style={{
                marginTop:Layout.width*5/100,
            fontSize:FontSize.large, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            textAlign:'left'}}>
             Your Location
          </Text> 
              <View style={{height:Layout.height*70/100,borderWidth:1, borderRadius:5, }}>
              <View style={{ flex: 1 }}>
        {location ? (
          <MapView onPress={handleMapPress} mapType="hybrid" showsCompass={true} showsUserLocation={true}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0052,
              longitudeDelta: 0.0051,
            }}
          >
            <Marker 
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Current Location"
            />
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
              </View>
            </View>
            <View style={{borderBottomColor:Colors.active,borderBottomWidth:3,borderRadius:1, marginBottom:10}}>
            <Text style={{
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.medium,
              color:Colors.active,
              alignSelf:'center'}}>Place the marker on the eaxct your location</Text>
          <TouchableOpacity onPress={()=>getLocationAsync()} style={{
             padding:Spacing,
             marginTop:Spacing,
             backgroundColor:'brown',
             borderRadius:Spacing/2,
             marginRight:Spacing,
             marginBottom:Layout.height*5/100
          }}>
              <Text style={{
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.medium,
              color:Colors.onPrimary,
              alignSelf:'center'}}>Show current loc..</Text>
              </TouchableOpacity>
              </View>
          </View>
              <TouchableOpacity
              onPress={() =>
                Alert.alert("Save", "Are you sure?", [
                  { text: "No" },
                  { text: "Yes" ,onPress:handleSubmit},
                ])
              }
              disabled={
                !(
                  phoneNo &&
                  subCity &&
                  Kebele &&
                  houseNo 
                  
                )
              }
              style={[
                styles.button,
                {
                  opacity:
                  phoneNo &&
                  subCity &&
                  Kebele &&
                  houseNo
                      ? 1
                      : 0.5,
                },
              ]}
              >
              <Text style={{
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              alignSelf:'center'}}>Save address </Text>
              </TouchableOpacity>
      </View>
      </ScrollView>

          </View>):(<View><Text style={{
          fontSize:FontSize.medium, 
          color:Colors.primary,
          backgroundColor:'#F5DFF4',
          fontFamily:Font['poppins-bold'], 
          textAlign:'center'}}>
         Hello {first} {last}!
        </Text>
      <ScrollView style={{height:Layout.height*79/100, backgroundColor:'#F5DFF4'}}  scrollEnabled={true}>
       {address.map((a)=>{return(
            <View key={a.id} style={{margin:5,borderRadius:20,borderBottomLeftRadius:1,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,borderWidth:1}}>
            <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
              <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{first} {last}</Text>
            </View>
            <View style={{ borderBottomWidth:1,borderStyle:'dashed'}}>
            <View style={{flexDirection:'column',}}>
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>Phone no</Text>
              <Text style={{color:Colors.text, fontFamily:Font["poppins-regular"],fontSize:FontSize.medium,width:Layout.width*90/100, marginLeft:Layout.width*10/100}}>{a.phoneNo}</Text>
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>Kebele</Text>
              <Text style={{color:Colors.text, fontFamily:Font["poppins-regular"],fontSize:FontSize.medium,width:Layout.width*90/100, marginLeft:Layout.width*10/100}}> {a.kebele}</Text>
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>House no</Text>
              <Text style={{color:Colors.text, fontFamily:Font["poppins-regular"],fontSize:FontSize.medium,width:Layout.width*90/100, marginLeft:Layout.width*10/100}}>{a.houseNo}</Text>
           
           </View>
            </View>
            <View style={{flex:1,height:Layout.height*60/100,margin:10}}>
            <Text style={{margin:10,color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium}}>Location</Text>
            <MapView onPress={handleMapPress} mapType="hybrid" showsCompass={true} showsUserLocation={true}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: parseFloat(a.loc_latitude),
              longitude: parseFloat(a.loc_longitude),
              latitudeDelta: 0.0052,
              longitudeDelta: 0.0051,
            }}
          >
            <Marker 
              coordinate={{
                latitude: parseFloat(a.loc_latitude),
                longitude: parseFloat(a.loc_longitude),
              }}
              title="Your Current Location"
            />
          </MapView>
             
            </View>
            <TouchableOpacity
              onPress={() =>handleView(a.id,a.phoneNo,a.Subcity,a.kebele,a.houseNo,parseFloat(a.loc_latitude),parseFloat(a.loc_longitude))}
              style={{
             padding:Spacing,
             backgroundColor:Colors.primary,
             borderRadius:Spacing,
             width:Layout.width*30/100,
             alignSelf:'center',
             margin:5
          }}>
              <Text style={{
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              alignSelf:'center'}}>Update</Text>
              </TouchableOpacity>
          </View>)})}
       </ScrollView>
        </View>)}
        {isVisible &&(
        <View style={{
          height: Layout.height*85/100,
          position: "absolute",
          bottom: (Layout.height * 12) / 100,
          backgroundColor: "white",
          marginLeft:Layout.width*1/100,
          borderRadius: 10,
          width:Layout.width*95/100,
          elevation: 10,
          flexDirection:'column'}}>
           <View style={{}}>
            <Text style={{textAlign:'center',marginTop:10,fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>Updating your address</Text>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary,}}>Subcity </Text>
            <TextInput value={subCity} onChangeText={setSubCity} style={{marginLeft:10,height:Layout.height*5/100,borderWidth:1,width:Layout.width*70/100,fontSize:FontSize.medium,paddingLeft:10}} placeholder="Subcity"></TextInput>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Kebele</Text>
            <TextInput value={Kebele} onChangeText={setKebele} style={{marginLeft:10,height:Layout.height*5/100,borderWidth:1,width:Layout.width*70/100,fontSize:FontSize.medium,paddingLeft:10}} placeholder="Kebele"></TextInput> 
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>House no</Text>
            <TextInput value={houseNo} onChangeText={setHouseNo} style={{marginLeft:10,height:Layout.height*5/100,borderWidth:1,width:Layout.width*70/100,fontSize:FontSize.medium,paddingLeft:10}} placeholder="House no"></TextInput> 
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Phone number </Text>
            <TextInput value={phoneNo} onChangeText={setPhoneNo} style={{marginLeft:10,marginBottom:10,height:Layout.height*5/100,borderWidth:1,width:Layout.width*70/100,fontSize:FontSize.medium,paddingLeft:10}} placeholder="Phon number"></TextInput>
            </View>
            <View style={{flex:1,height:Layout.height*40/100,width:Layout.width*90/100,margin:5}}>
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Location </Text>
          {location ? (
        <MapView onPress={handleMapPress} mapType="hybrid" showsCompass={true} showsUserLocation={true}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0052,
            longitudeDelta: 0.0051,
          }}
        >
          <Marker 
            coordinate={{
              latitude: loLat,
              longitude: locLong,
            }}
            title="Your Current Location"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
      
            <View style={{flexDirection:'row',marginLeft:10}}>
        <TouchableOpacity onPress={()=>toggleFloatScreen()} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary, marginRight:Layout.width*35/100}} >
                  <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Cancel</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>Alert.alert("Confirm", "Are you sure, you want to update?", [
                        { text: "No" },
                        { text: "Yes" ,onPress:handleupdate},
                      ])} style={{marginTop:5,borderWidth:1,backgroundColor:'green',borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
                  <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.onPrimary}}>Update address</Text>
         </TouchableOpacity>
        </View>
        </View>
        )}{isLoading &&(<Activity/>)}
      <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
      <TouchableOpacity onPress={()=>navigate('LoggedHome')} style={{alignItems:'center', marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary}}>Home</Text>
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
  
const styles = StyleSheet.create({
  input: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  button: {
    padding: Spacing,
    marginTop: Spacing,
    backgroundColor: Colors.primary,
    marginVertical: Spacing,
    borderRadius: Spacing,
  },
  buttonText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
    color: Colors.onPrimary,
    alignSelf: "center",
  },
});
  export default UserAddress
  