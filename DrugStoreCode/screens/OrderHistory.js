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
  const OrderHistory = () => {
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
      <View>
         <ScrollView style={{height:Layout.height*83/100,backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true}>
          {orders.length>0?orders.map((o)=>{return(
          <TouchableOpacity key={o.id} onPress={()=>{handleView(o.id, o.address['id'],o.user['id'],o.address['phoneNo'],o.address['Subcity'],o.address['kebele'],o.address['houseNo'],parseFloat(o.address['loc_latitude']),parseFloat(o.address['loc_longitude']),o.drug['id'],o.pharmacy['id'],o.drug['DrugName'],o.pharmacy['name'],o.total_price,o.quantity,o.prescriptionImage,o.user['first_name'],o.user['last_name'],o.payMethod)}}>
          <View style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,height:Layout.height*28/100,borderWidth:1}}>
           
           <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
             <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.user['first_name']} {o.user['last_name']}</Text>
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,marginTop:5, marginLeft:Layout.width*1/100}}>Quantity: {o.quantity}</Text>
           </View>
           <View style={{height:Layout.height*16/100}}>
           <View style={{flexDirection:'row',alignItems:'center',}}>
           <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100,marginLeft:5}} source={require("../assets/images/medicine-drug.png")}></Image>
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.drug['DrugName']}</Text>
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Total price: {o.total_price} birr</Text>
          </View>
          <View style={{alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
            <Text style={{color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Customer phone No: {o.address['phoneNo']}</Text>
           
            <Text style={{color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Odered on: <HumanReadableDateTime dateTimeString={o.created_at} /></Text>
           
            </View>
            <View >
            <Text style={{color:'green', textAlign:'center',fontFamily:Font["poppins-bold"],fontSize:FontSize.xLarge, marginLeft:Layout.width*1/100}}>Delivered!</Text>
           
             </View>
           </View>
         </View>
          </TouchableOpacity>)}):(<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>Order is empty</Text></View>)}
          
         </ScrollView>
         {isVisible &&(
      <View style={{
        height: Layout.height*50/100,
        position: "absolute",
        bottom: (Layout.height * 25) / 100,
        backgroundColor: "white",
        marginLeft:Layout.width*5/100,
        borderRadius: 10,
        width:Layout.width*90/100,
        elevation: 100,
        flexDirection:'column'}}>
       <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Drug delivered Summary</Text>
       <View style={{}}>
       <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>Drug information</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Drug name: {drugName} </Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Quantity: {quantity}</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Total price: {totalPrice} birr</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Payment method: <Text style={{color:"red"}}>After delivery</Text></Text>
       </View>
       <View style={{}}>
       <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.darkText}}>User information</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Customer name: {userFirst} {userLast} </Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Phone no: {phoneNo} </Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Sub city: {subCity}</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Kebele: {Kebele}</Text>
          <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>House no: {houseNo}</Text>
          <View style={{flexDirection:'row',margin:10}}>
          <TouchableOpacity onPress={()=>{toggleFloatScreen()}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,borderColor:Colors.primary, marginRight:Layout.width*30/100}} >
                <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Ok</Text>
       </TouchableOpacity>
              <TouchableOpacity onPress={toggleFloatScreen2} style={{marginTop:1,backgroundColor:Colors.primary,marginTop:5,marginBottom:5,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}} >
                <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.onPrimary}}>Show Prescription</Text>
              </TouchableOpacity>
              
          </View>
       </View>
      <View style={{flexDirection:'row',marginLeft:10}}>
      
      </View>
      </View>)}
      {isVisible2 &&(
      <View style={{
        height: Layout.height*89/100,
        position: "absolute",
        bottom: (Layout.height * 2) / 100,
        backgroundColor: "white",
        marginLeft:Layout.width*1/100,
        borderRadius: 10,
        width:Layout.width*97/100,
        elevation: 10,
        flexDirection:'column'}}>
       <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Prescription</Text>
       <View style={{height:Layout.height*78/100,}}>
       <Image style={{marginHorizontal:10,width:Layout.width*90/100,height:Layout.height*78/100}} source={{uri:imageUri}}></Image>
       </View>
      <View style={{alignItems:'center'}}>
      <TouchableOpacity onPress={()=>{toggleFloatScreen2()}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,borderColor:Colors.primary}} >
                <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Ok</Text>
       </TouchableOpacity>
      </View>
      </View>)}
      {isLoading &&<Activity/>}
      
  </View>
    )
  }
  
  export default OrderHistory