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

  import Activity from "./Activity";
  import FreeDrug from "./freeDrug";
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { useSelector, useDispatch } from 'react-redux';
import { setCartLength } from "../store/action/action";
const CartList = ({navigation,navigation:{navigate}}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [isVisible5, setIsVisible5] = useState(false);
  const [h1,setH1]=useState(0)
  const [h2,setH2]=useState(Layout.height*65/100)
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  
  const dispatch = useDispatch();
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const toggleFloatScreen2 = () => {
    setIsVisible2(!isVisible2);
  };
  const toggleFloatScreen3 = () => {
    setIsVisible3(!isVisible3);
  };
  const toggleFloatScreen4 = () => {
    setIsVisible4(!isVisible4);
  };
  const toggleFloatScreen5 = () => {
    setIsVisible5(!isVisible5);
  };
  const selecting = () => {
    setSelected('checkmark')
    setSelectedButton('pay after delivery in cash')
  };

  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  
  const [carts,setCarts]= useState([])
  const fetchcart=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/cartParameter/?user=${userID}`)
    .then((r)=>{setCarts(r.data);setIsLoading(false);const cartData = r.data;
      const cartLength = cartData.length;
      dispatch(setCartLength(cartLength));})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  fetchcart();
}, [dispatch]);

      const [address,setAddress]=useState([])
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
        setIsVisible3(!isVisible3)

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
      .then((res)=>{alert('updated successfully'),setIsLoading(false),fetchAddress(),toggleFloatScreen3()})
      .catch((error) => {
        // Handle the error response
        console.log(error);
        alert("Something went wrong!");
        setIsLoading(false);
      });
        
    }
      const fetchAddress=()=>{
        setIsLoading(true)
        axios.get(`http://${Api}/order/addressParameter/?user=${userID}`)
        .then((r)=>{setAddress(r.data),setIsLoading(false)})
        .catch((err)=>{console.log(err),alert(err),setIsLoading(false)})
    }
    useEffect(() => {
      fetchAddress();
    }, []);

const [drugName, setDrugName] = useState('');
const [phamacyName, setPharmacyName] = useState('');
const [dID, setDId] = useState('');
const [pId, setPId] = useState('');
const [totalPrice, setTotalPrice] = useState(0);
const [quantity,setQuantity]=useState(0)
const [cartId,setCartId]=useState('')
  const handleCartView=(cId,drId,phId,drName,phName,totPrice,Quant)=>{
   setDrugName(drName)
   setPharmacyName(phName)
   setTotalPrice(totPrice)
   setQuantity(Quant)
   setCartId(cId)
   setDId(drId)
   setPId(phId)
   setIsVisible2(!isVisible2);
  }
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
    setLoLat(coordinate.latitude)
    setLocLong(coordinate.longitude)
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

  const handleDeleteCart=(id)=>{
    setIsLoading(true)
    axios.delete(`http://${Api}/order/cartDetails/${id}`)
        .then((res)=>{alert('Item Removed '),setIsLoading(false),fetchAddress(),fetchcart()})
        .catch((error) => {
          // Handle the error response
          console.log(error);
          alert("Something went wrong!");
          setIsLoading(false);
        });
  }

  ////////////////----CODES FOR CAMERA AND IMAGE UPLOAD------//////////////
  const [imageUri, setImageUri] = useState(null); 
  const handleChoosePhoto = async () => { 
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
    if (status !== 'granted') { 
      alert('Sorry, we need camera roll permissions to make this work!'); 
      return; 
    } 
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true, 
      quality: 1, 
    });
    if (!result.canceled) { 
      setImageUri(result.assets[0].uri);
      setH2(0) 
      setH1(Layout.height*65/100)
    }}

  const handleTakePhoto = async () => { 
    const { status } = await ImagePicker.requestCameraPermissionsAsync(); 
    if (status !== 'granted') { 
      alert('Sorry, we need camera permissions to make this work!'); 
      return; 
    } 
    let result = await ImagePicker.launchCameraAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true, 
      
      quality: 1, 
    }); 
    if (!result.canceled) { 
      setImageUri(result.assets[0].uri); 
      setH2(0) 
      setH1(Layout.height*65/100)
    } 
  }


  const handleSubmit=()=>{
    setIsLoading(true);
    
      const formData = new FormData();
      formData.append('quantity', quantity);
      formData.append('total_price',totalPrice,);
      formData.append('payMethod', selectedButton);
      formData.append('paid', false);
      formData.append('recieved', false);
      formData.append('prescriptionImage', {
        uri: imageUri,
        name: `${first}${last}'sOrderPrescription.jpg`, // Provide a name for the file
        type: 'image/jpeg', // Adjust the file type accordingly
      });
      formData.append('user', userID);
      formData.append('validPrescription', true);
      formData.append('pharmacy', pId);
      formData.append('drug', dID);
      formData.append('address', aID);
      axios.post(`http://${Api}/order/orderList/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
          },}).then((res) => {axios.delete(`http://${Api}/order/cartDetails/${cartId}`).then((r)=>{fetchcart(),toggleFloatScreen5(),toggleFloatScreen2()}),alert('Drug ordering Finished!')}).catch((err)=>{console.log(err)})
    
    
  }
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
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Cart Items</Text>
       </View>
       <ScrollView style={{height:Layout.height*83/100,backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true}>
        {carts.length>0?carts.map((c)=>{return(
          <View key={c.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,height:Layout.height*30/100,borderWidth:1}}>
          <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
            <Icon name='hospital-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
          <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{c.pharmacy['name']}</Text>
          <TouchableOpacity onPress={()=>handleCartView(c.id,c.drug['id'],c.pharmacy['id'],c.drug['DrugName'],c.pharmacy['name'],c.total_price,c.quantity)} style={{marginTop:1,backgroundColor:Colors.primary,borderRadius:40,padding:Spacing,borderColor:Colors.primary,}} >
            <Text style={{fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.onPrimary}}>Place order</Text>
          </TouchableOpacity>
          </View> 
          <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed',height:Layout.height*10/100}}>
          <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100,marginLeft:5}} source={require("../assets/images/medicine-drug.png")}></Image>
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*50/100, marginLeft:Layout.width*1/100}}>{c.drug['DrugName']}</Text>
          <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10, marginLeft:Layout.width*1/100}}>{c.drug['Price']} birr</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',}}>
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,marginTop:5,width:Layout.width*40/100, marginLeft:Layout.width*5/100}}>Quantity:{c.quantity}</Text>
          <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Total price: {c.total_price}</Text>
          </View>
          <View style={{flexDirection:'row',marginLeft:10}}>
          <TouchableOpacity onPress={toggleFloatScreen} style={{marginTop:10,marginRight:Layout.width*30/100}} >
            <Text style={{fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Update Quantity</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{Alert.alert("Cancel", "Are you sure?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{handleDeleteCart(c.id)}},
                  ])}} style={{marginTop:1,backgroundColor:Colors.onPrimary,borderColor:'red',borderWidth:1,borderRadius:10,padding:Spacing,borderColor:Colors.primary,}} >
            <Text style={{fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:'red'}}>Remove</Text>
          </TouchableOpacity>
          </View>
        </View>
        )}):(<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>Your cart is empty</Text></View></View>)}
       </ScrollView>
       {isLoading &&<Activity/>}
    {isVisible &&(
    <View style={{
      height: Layout.height*27/100,
      position: "absolute",
      bottom: (Layout.height * 37) / 100,
      backgroundColor: "white",
      marginLeft:Layout.width*20/100,
      borderRadius: 10,
      width:Layout.width*30/100,
      elevation: 10,flexDirection:'column'
    }}>
      
    <Text style={{marginTop:10,textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Select</Text>
    <TouchableOpacity onPress={()=>{setQuantity(1),toggleFloatScreen()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(2),toggleFloatScreen()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>2</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(3),toggleFloatScreen()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>3</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(4),toggleFloatScreen()}} style={{marginTop:5,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>4</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setQuantity(5),toggleFloatScreen()}} style={{marginTop:5,borderBottomWidth:1,borderBottomColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>max.Quant(5)</Text>
    </TouchableOpacity>

    </View>)}
    {isVisible2 &&(
    <View style={{
      height: Layout.height*80/100,
      position: "absolute",
      bottom: (Layout.height * 13) / 100,
      backgroundColor: "white",
      marginLeft:Layout.width*1/100,
      borderRadius: 10,
      width:Layout.width*90/100,
      elevation: 10,
      flexDirection:'column'}}>
     <Text style={{textAlign:'center',marginTop:10,fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Drug Ordering Summary</Text>
     <View style={{borderBottomWidth:1}}>
     <Text style={{textAlign:'center',marginTop:10,fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>Drug information</Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Drug name: {drugName} </Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Pharmacy name: {phamacyName} </Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Quantity: {quantity}</Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Total price: {totalPrice}</Text>
     </View>
    
      {address.length>0? address.map((a)=>{return(
          <View key={a.id} style={{borderBottomWidth:1}}>
          <Text style={{textAlign:'center',marginTop:10,fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>User information</Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>User full name: {first} {last} </Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Phone no: {a.phoneNo} </Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Sub city: {a.Subcity}</Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Kebele: {a.kebele}</Text>
        <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>House no:{a.houseNo}</Text>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={() =>handleView(a.id,a.phoneNo,a.Subcity,a.kebele,a.houseNo,parseFloat(a.loc_latitude),parseFloat(a.loc_longitude))}
               style={{marginTop:1,backgroundColor:Colors.primary,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,marginBottom:5}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.onPrimary}}>Update your address</Text>
            </TouchableOpacity>
           
            </View>
            </View>
      )
         
      }):(<View >
         <Text style={{textAlign:'center',marginTop:10,fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:'red'}}>Sorry Your address is not Registered!</Text>
         <TouchableOpacity onPress={()=>{navigate('UserAddress')}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,margin:10}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Register Address here</Text>
     </TouchableOpacity>
      </View>)}
     
        
     
     <View style={{}}>
     <Text style={{textAlign:'center',marginTop:5,fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>Choose payment method</Text>
     <TouchableOpacity onPress={selecting} style={{flexDirection:'row',alignContent:'center',marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
              <Text style={{marginLeft:Layout.width*25/100,textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Pay after delivery</Text>
              <Ionicons size={Spacing*2} style={{alignSelf:'center',color:'red'}} name={selected}/>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>alert('Sorry, This service not available at this time.')} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Pay via telebirr </Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>alert('Sorry, This service not available at this time.')} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Pay via bank account</Text>
     </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row',marginLeft:10}}>
    <TouchableOpacity onPress={()=>Alert.alert("Cancel", "Are you sure?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:toggleFloatScreen2},
                  ])} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary, marginRight:Layout.width*55/100}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Cancel</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>{setImageUri(null),setH1(0) 
      setH2(Layout.height*65/100),toggleFloatScreen5()}}
      disabled={
        !(
          address.length>0 && selectedButton!=''
          
        )
      }
                   style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Next</Text>
     </TouchableOpacity>
    </View>
    </View>)}
    {isVisible3 &&(
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
    <TouchableOpacity onPress={()=>toggleFloatScreen3()} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary, marginRight:Layout.width*35/100}} >
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
    )}
    {isVisible4 &&(
    <View style={{
      height: Layout.height*65/100,
      position: "absolute",
      bottom: (Layout.height * 30) / 100,
      backgroundColor: "white",
      marginLeft:Layout.width*1/100,
      borderRadius: 10,
      width:Layout.width*95/100,
      elevation: 10,
      flexDirection:'column'}}>
       <View style={{flex:1}}>
        <Text style={{textAlign:'center',marginTop:10,fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>Tab on your location</Text>
        <View style={{flex:1,height:Layout.height*50/100,width:Layout.width*90/100,margin:10}}>
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
        <View style={{flexDirection:'row',marginBottom:10,marginLeft:10}}>
    <TouchableOpacity onPress={()=>Alert.alert("Cancel", "Are you sure?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:toggleFloatScreen4},
                  ])} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary, marginRight:Layout.width*35/100}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Cancel</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>Alert.alert("Confirm", "Are you sure, you want to update?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:toggleFloatScreen4},
                  ])} style={{marginTop:5,borderWidth:1,backgroundColor:'green',borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.onPrimary}}>Update address</Text>
     </TouchableOpacity>
    </View>
    </View>)}{isVisible5 && (
        <ScrollView
          style={{
            height: Layout.height*80/100,
            position: "absolute",
            bottom: (Layout.height * 13) / 100,
            right: 10,
            left:10,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 20, }}
          scrollEnabled={true}>
          <View style={{ paddingHorizontal: Spacing,paddingTop: Spacing,}}>
            <Text style={{fontSize: FontSize.medium,color: Colors.primary,fontFamily: Font["poppins-bold"],textAlign: "center",}}>
              Send us your prescription
            </Text>
            <View style={{ height:h2}}>
              <View  style={{flexDirection:'row',marginTop:Layout.height*25/100}}>
                <TouchableOpacity onPress={handleTakePhoto} style={{marginLeft:Layout.height*8/100,marginRight:Layout.height*5/100}}>
                  <Ionicons name="camera-outline"color={Colors.primary}size={Spacing * 7}/>
                  <Text style={{fontFamily:Font["poppins-semiBold"]}}>Take a picture</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleChoosePhoto}><Ionicons
            name="file-tray-full-outline"
            color={Colors.primary}
            size={Spacing * 7}
          /><Text style={{fontFamily:Font["poppins-semiBold"]}}>Choose from file</Text></TouchableOpacity></View>
            </View>
             {imageUri && ( 
        <Image style={{height:h1,flex:1,marginBottom:10}} source={{ uri: imageUri }} /> )} 
            <View style={{ flexDirection: "row", marginBottom: 10, }} >
               <TouchableOpacity onPress={() =>Alert.alert("Cancel", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:toggleFloatScreen5},])}
                  style={{padding: Spacing,backgroundColor: "black",borderRadius: Spacing / 2, marginRight:Layout.height*20/100 }}>
                <Text style={{fontFamily: Font["poppins-semiBold"], fontSize: FontSize.medium,color: Colors.onPrimary,alignSelf: "center",}}> Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>Alert.alert("order", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{handleSubmit()}},])} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}}
             
              >
                <Text style={{ textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>
                 Finish ordering
                </Text>
              </TouchableOpacity>
              <View>
    </View> 
            </View>
           
          </View>
        </ScrollView>
      )}
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

export default CartList