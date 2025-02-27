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
const DelivererOrders = ({navigation,navigation:{navigate}}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity,setQuantity]=useState(0)
 
  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const toggleFloatScreen2 = () => {
    setIsVisible2(!isVisible2);
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
  const pharmacyId=useSelector((state)=>state.pharmaID)
      const [orders,setOrders]= useState([])
  const fetchOrders=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/orderParameter/?&assignedDeliverer=${userID}&paid=false`)
    .then((r)=>{setOrders(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  fetchOrders();
}, []);
  const [phoneNo, setPhoneNo]=React.useState('')
      const [aID, setAId]=React.useState('')
      const [orderId, setOId]=React.useState('')
      const [subCity, setSubCity]=React.useState('')
      const [Kebele, setKebele]=React.useState('')
      const [houseNo, setHouseNo]=React.useState('')
      const [loLat, setLoLat]=React.useState(null)
      const [locLong, setLocLong]=React.useState(null)
      const [imageUri, setImageUri]=useState(null)
      const [drugName, setDrugName] = useState('');
      const [validity, setValidity] = useState(false);
      const [dID, setDId] = useState('');
      const [uId, setUid] = useState('');
      const [pId, setPId] = useState('');
      const [userFirst, setUserFirst] = useState('');
      const [userLast, setUserLast] = useState('');
      const [totalPrice, setTotalPrice] = useState(0);
      const [payMethod, setPayMethod] = useState('');
      const [assName, setAssName] = useState('');
      const [delivererId, setDelivererId] = useState('');
    const handleView=(oId,id,uid,phone,subcity,kebele,houseNo,lat,long,drId,phId,drName,phName,totPrice,Quant,image,ufName,ulName,pMethod,delId)=>{
        setOId(oId)
        setAId(id)
        setPhoneNo(phone)
        setSubCity(subcity)
        setKebele(kebele)
        setHouseNo(houseNo)
        setLoLat(lat)
        setDelivererId(delId)
        setLocLong(long)
        setDrugName(drName)
        
        setTotalPrice(totPrice)
        setQuantity(Quant)
        setDId(drId)
        setPId(phId)
        setUid(uid)
        setImageUri(image)
        setUserFirst(ufName)
        setUserLast(ulName)
        setPayMethod(pMethod)
        setIsVisible(!isVisible)

    }   

    const handleUpdate=()=>{
      setIsLoading(true);
      
       const data={
        quantity: quantity,
        total_price: totalPrice,
        payMethod: payMethod,
        paid: true,
        recieved: true,
        assignedDeliverer: delivererId,
        validPrescription: validity,
        prescriptionImage: {uri: imageUri },
        user: uId,
        pharmacy: pId,
        drug: dID,
        address: aID
       }
        
        axios.put(`http://${Api}/order/orderDetails/${orderId}`, data,{
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
          },})
        .then((res) => {alert('Action done successfully!'),fetchOrders(),setIsLoading(false)})
        .catch((err)=>{console.log(err),setIsLoading(false)})
    }
    const HumanReadableDateTime = ({ dateTimeString }) => {
      const formattedDateTime = new Date(dateTimeString).toLocaleString();
    
      return <Text>{formattedDateTime}</Text>;
    };
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flexDirection:'row'}}>
        <TouchableOpacity 
        onPress={()=>navigate('DelivererHome')}
        style={{
          padding:Spacing,
          marginHorizontal:Spacing,
          borderRadius:Spacing/2,
          marginTop:Spacing*4,
          marginRight:5}}>
          <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Ordered drugs</Text>
       </View>
       <ScrollView style={{height:Layout.height*83/100,backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true}>
       
        {orders.length>0?orders.map((o)=>{return(
            <TouchableOpacity key={o.id} onPress={()=>{handleView(o.id, o.address['id'],o.user['id'],o.address['phoneNo'],o.address['Subcity'],o.address['kebele'],o.address['houseNo'],parseFloat(o.address['loc_latitude']),parseFloat(o.address['loc_longitude']),o.drug['id'],o.pharmacy['id'],o.drug['DrugName'],o.pharmacy['name'],o.total_price,o.quantity,o.prescriptionImage,o.user['first_name'],o.user['last_name'],o.payMethod,o.assignedDeliverer)}}>
            <View style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,height:Layout.height*30/100,borderWidth:1}}>
             <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
               <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
             <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.user['first_name']} {o.user['last_name']}</Text>
             <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,marginTop:5, marginLeft:Layout.width*1/100}}>Quantity: {o.quantity}</Text>
             </View>
             <View style={{height:Layout.height*13/100}}>
             <View style={{flexDirection:'row',alignItems:'center',}}>
             <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100,marginLeft:5}} source={require("../assets/images/medicine-drug.png")}></Image>
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.drug['DrugName']}</Text>
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Total price:{o.total_price}</Text>
            </View>
            <View style={{alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
            <Text style={{color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Customer phone No: {o.address['phoneNo']}</Text>
           
            <Text style={{color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Odered on: <HumanReadableDateTime dateTimeString={o.created_at} /></Text>
           
            </View>
            <View >
            <Text style={{color:Colors.text, textAlign:'center',fontFamily:Font["poppins-bold"],fontSize:FontSize.xLarge, marginLeft:Layout.width*1/100}}>Not delivered</Text>
           
             </View>
             </View>
           </View>
            </TouchableOpacity>
          )}):<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>Order is empty</Text></View>}
        </ScrollView>
        {isLoading &&(<Activity/>)}
        {isVisible &&(
    <View style={{
      height: Layout.height*89/100,
      position: "absolute",
      bottom: (Layout.height * 11) / 100,
      backgroundColor: "white",
      marginLeft:Layout.width*1/100,
      borderRadius: 10,
      width:Layout.width*95/100,
      elevation: 10,
      flexDirection:'column'}}>
     <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Drug ordered Summary</Text>
     <View style={{}}>
       <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>Drug information</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Drug name: {drugName} </Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Quantity: {quantity}</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Total price: {totalPrice}</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Payment method: <Text style={{color:"red"}}>{payMethod}</Text></Text>
       </View>
       <View style={{}}>
       <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>User information</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Customer name: {userFirst} {userLast} </Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Phone no: {phoneNo} </Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Sub city: {subCity}</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Kebele: {Kebele}</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>House no:{houseNo}</Text>
          <View style={{alignItems:'center'}}>
        
            <TouchableOpacity onPress={toggleFloatScreen2} style={{marginTop:1,backgroundColor:Colors.primary,marginTop:5,marginBottom:5,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.onPrimary}}>Show Prescription</Text>
            </TouchableOpacity>
        </View>
     </View>
     <View style={{flex:1,height:Layout.height*50/100,width:Layout.width*93/100,margin:5}}>
          {location ? (
        <MapView mapType="hybrid" showsCompass={true} showsUserLocation={true}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: loLat,
            longitude: locLong,
            latitudeDelta: 0.0052,
            longitudeDelta: 0.0051,
          }}
        >
          <Marker 
            coordinate={{
              latitude: loLat,
              longitude: locLong,
            }}
            title="Customer Location"
          />
        </MapView>
      ) : (
        <Text style={{textAlign:'left',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:'green'}}>Loading user location...</Text>
      )}
    </View>
    <View style={{flexDirection:'row',marginLeft:10}}>
    <TouchableOpacity onPress={()=>{toggleFloatScreen()}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,borderColor:Colors.primary, marginRight:Layout.width*25/100}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Ok</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>Alert.alert("Cancel", "Are you sure?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{handleUpdate()}},
                  ])}
                   style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:'green'}}>Payment recieved?</Text>
     </TouchableOpacity>
    </View>
    </View>)}
    {isVisible2 &&(
    <View style={{
      height: Layout.height*89/100,
      position: "absolute",
      bottom: (Layout.height * 11) / 100,
      backgroundColor: "white",
      marginLeft:Layout.width*1/100,
      borderRadius: 10,
      width:Layout.width*97/100,
      elevation: 10,
      flexDirection:'column'}}>
     <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Prescription</Text>
     <View style={{height:Layout.height*78/100,}}>
       <Image style={{marginHorizontal:10,width:Layout.width*90/100,height:Layout.height*78/100}} source={{uri: imageUri }}></Image>
       </View>
    <View style={{alignItems:'center'}}>
    <TouchableOpacity onPress={()=>{toggleFloatScreen2()}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,borderColor:Colors.primary}} >
              <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Ok</Text>
     </TouchableOpacity>
    </View>
    </View>)}
       
    <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
    <TouchableOpacity onPress={()=>navigate('DelivererHome')} style={{alignItems:'center',backgroundColor:Colors.onPrimary, marginLeft:Layout.width*1/100,width:Layout.width/5,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('DelivererOrders')} style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width/5,width:Layout.width/4.5, padding: Spacing}}>
            <Icon name="shopping-bag" color={Colors.onPrimary}   size={Spacing*3}/>
             <Text style={{color:Colors.onPrimary}}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('DelivererFinished')}  style={{alignItems:'center',marginLeft:Layout.width/7,width:Layout.width/5, padding:Spacing,}}>
            <Ionicons name="cart" color={Colors.primary}   size={Spacing*3}/>
              <Text>Delivered</Text>
            </TouchableOpacity>
          </View>
</SafeAreaView>
  )
}

export default DelivererOrders