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
    import OrderHistory from "./OrderHistory";
  const PharmacyOrderHistory = ({navigation,navigation:{navigate}}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
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
    const pharmacyId=useSelector((state)=>state.pharmaID)
      const [orders,setOrders]= useState([])
  const fetchOrders=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/orderParameter/?pharmacy=${pharmacyId}&received=true`)
    .then((r)=>{setOrders(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}

const HumanReadableDateTime = ({ dateTimeString }) => {
  const formattedDateTime = new Date(dateTimeString).toLocaleString();

  return <Text>{formattedDateTime}</Text>;
};

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
      const [phamacyName, setPharmacyName] = useState('');
      const [dID, setDId] = useState('');
      const [uId, setUid] = useState('');
      const [pId, setPId] = useState('');
      const [userFirst, setUserFirst] = useState('');
      const [userLast, setUserLast] = useState('');
      const [totalPrice, setTotalPrice] = useState(0);
      const [payMethod, setPayMethod] = useState('');
const handleView=(oId,id,uid,phone,subcity,kebele,houseNo,lat,long,drId,phId,drName,phName,totPrice,Quant,image,ufName,ulName,pMethod)=>{
  setOId(oId)
  setAId(id)
  setPhoneNo(phone)
  setSubCity(subcity)
  setKebele(kebele)
  setHouseNo(houseNo)
  setLoLat(lat)
  setLocLong(long)
  setDrugName(drName)
  setPharmacyName(phName)
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

useEffect(() => {
  fetchOrders();
}, []);
    return (
      <SafeAreaView>
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Delivered drugs</Text>
         </View>
         <SafeAreaView>
          <OrderHistory/>
         </SafeAreaView>
         
      <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
      <TouchableOpacity onPress={()=>navigate('PharmacistHome')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('PharmacistDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacyOrders')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Icon name="shopping-bag" color={Colors.primary}  size={Spacing*3}/>
             <Text>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacistPrescription')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Prescription</Text> 
            </TouchableOpacity>
            </View>
  </SafeAreaView>
    )
  }
  
  export default PharmacyOrderHistory