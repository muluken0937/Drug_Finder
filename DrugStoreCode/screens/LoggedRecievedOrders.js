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
  const LoggedRecievedOrders = ({navigation,navigation:{navigate}}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userID=useSelector((state)=>state.User_ID)
    const first=useSelector((state)=>state.FName)
    const last=useSelector((state)=>state.LName)
    const toggleFloatScreen = () => {
      setIsVisible(!isVisible);
    };
   
    const [orders,setOrders]= useState([])
  const fetchOrders=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/orderParameter/?user=${userID}&received=true`)
    .then((r)=>{setOrders(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  setIsLoading(true)
  fetchOrders();
}, []);




const HumanReadableDateTime = ({ dateTimeString }) => {
  const formattedDateTime = new Date(dateTimeString).toLocaleString();

  return <Text>{formattedDateTime}</Text>;
};
const [orderId, setOId]=React.useState('')
const [imageUri, setImageUri]=useState(null)

const handleView=(oId,imageUri,)=>{
  setImageUri(imageUri)
  setOId(oId)
  setIsVisible(!isVisible)
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Recieved orders</Text>
         </View>
         <ScrollView style={{height:Layout.height*83/100,backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true}>
          {orders.length>0?orders.map((o)=>{return(
            <TouchableOpacity key={o.id} onPress={()=>handleView(o.id,o.prescriptionImage)}>
              <View  style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,height:Layout.height*30/100,borderWidth:1}}>
           <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
             <Icon name='hospital-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.pharmacy['name']}</Text>
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,marginTop:5, marginLeft:Layout.width*1/100}}>Quantity: {o.quantity}</Text>
           </View>
           <View style={{ borderBottomWidth:1,borderStyle:'dashed',height:Layout.height*13/100}}>
           <View style={{flexDirection:'row',alignItems:'center',}}>
           <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100,marginLeft:5}} source={require("../assets/images/medicine-drug.png")}></Image>
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.drug['DrugName']}</Text>
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Total price: {o.total_price} birr</Text>
          </View>
          <View>
          <Text style={{color:Colors.primary, textAlign:'center',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*1/100}}>Odered on: <HumanReadableDateTime dateTimeString={o.created_at} />
           </Text>
          </View>
           </View>  
           <View style={{marginLeft:5}}>
        <Text style={{fontFamily:Font["poppins-bold"],textAlign:'center',color:'green',fontSize:FontSize.xLarge}}>Recieved!</Text>
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
        width:Layout.width*97/100,
        elevation: 10,
        flexDirection:'column'}}>
       <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Prescription</Text>
       <View style={{height:Layout.height*78/100,}}>
       <Image style={{marginHorizontal:10,width:Layout.width*90/100,height:Layout.height*78/100}} source={{uri: imageUri }}></Image>
       </View>
      <View style={{alignItems:'center'}}>
      <TouchableOpacity onPress={()=>{toggleFloatScreen()}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,width:Layout.width*30/100,borderColor:Colors.primary}} >
                <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Ok</Text>
       </TouchableOpacity>
       
      </View>
      </View>)}
      
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
  
  export default LoggedRecievedOrders