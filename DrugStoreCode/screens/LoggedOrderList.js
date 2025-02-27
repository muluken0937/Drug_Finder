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
  const LoggedOrderList = ({navigation,navigation:{navigate}}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userID=useSelector((state)=>state.User_ID)
    const first=useSelector((state)=>state.FName)
    const last=useSelector((state)=>state.LName)
    const toggleFloatScreen = () => {
      setIsVisible(!isVisible);
    };
    const toggleFloatScreen2 = () => {
      setIsVisible2(!isVisible2);
    };
    const [orders,setOrders]= useState([])
  const fetchOrders=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/orderParameter/?user=${userID}&received=false`)
    .then((r)=>{setOrders(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  setIsLoading(true)
  fetchOrders();
}, []);

const PrescriptionStatusMessage = ({ validPrescription }) => {
  if (validPrescription) {
    return (
      <View style={{marginLeft:5}}>
        <Text style={{fontFamily:Font["poppins-regular"],textAlign:'center',color:'green',fontSize:FontSize.large}}>Your order is on process!</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={{fontFamily:Font["poppins-regular"],textAlign:'center',color:'red',fontSize:FontSize.large}}>Invalid prescription. Please send your prescription again.</Text>
      </View>
    );
  }
};
const [h1,setH1]=useState(0)
const [h2,setH2]=useState(Layout.height*65/100)
const handleChoosePhoto = async () => { 
  setIsLoading(true)
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
  if (status !== 'granted') { 
    alert('Sorry, we need camera roll permissions to make this work!'); 
    setIsLoading(false)
    return; 
  } 
  let result = await ImagePicker.launchImageLibraryAsync({ 
    mediaTypes: ImagePicker.MediaTypeOptions.All, 
    allowsEditing: true, 
    quality: 1, 
  });
  if (!result.canceled) { 
    setImageUri2(result.assets[0].uri);
    setH2(0) 
    setH1(Layout.height*65/100)
    setIsLoading(false)
  }}

const handleTakePhoto = async () => { 
  setIsLoading(true)
  const { status } = await ImagePicker.requestCameraPermissionsAsync(); 
  if (status !== 'granted') { 
    alert('Sorry, we need camera permissions to make this work!'); 
    setIsLoading(false)
    return; 
  } 
  let result = await ImagePicker.launchCameraAsync({ 
    mediaTypes: ImagePicker.MediaTypeOptions.All, 
    allowsEditing: true, 
    
    quality: 1, 
  }); 
  if (!result.canceled) { 
    setImageUri2(result.assets[0].uri); 
    setH2(0) 
    setH1(Layout.height*65/100)
    setIsLoading(false)
  } 
}

const HumanReadableDateTime = ({ dateTimeString }) => {
  const formattedDateTime = new Date(dateTimeString).toLocaleString();

  return <Text>{formattedDateTime}</Text>;
};
const [orderId, setOId]=React.useState('')
const [imageUri, setImageUri]=useState(null)
const [imageUri2, setImageUri2]=useState(null)
const [validP, setValidP]=useState(true)
const [dID, setDId] = useState('');
const [uId, setUid] = useState('');
const [assigned, setAssigned] = useState('');
const [pId, setPId] = useState('');
const [totalPrice, setTotalPrice] = useState(0);
const [payMethod, setPayMethod] = useState('');
const [aID, setAId]=React.useState('')
const [quantity,setQuantity]=useState(0)
const handleView=(oId,quantity,totalPrice,pay,imageUri,pId,dID,aID,uId,valid,assign)=>{
  setOId(oId)
  setQuantity(quantity)
  setImageUri(imageUri)
  setValidP(valid)
  setAId(aID)
  setUid(uId)
  setDId(dID)
  setPId(pId)
  setPayMethod(pay)
  setAssigned(assign)
  setTotalPrice(totalPrice)
  setIsVisible(!isVisible)
}
const handleUpdate=()=>{
  setIsLoading(true);
  
  const data={
    quantity: quantity,
    total_price: totalPrice,
    payMethod: payMethod,
    paid: false,
    recieved: true,
    assignedDeliverer: assigned,
    validPrescription: true,
    prescriptionImage:  {uri: imageUri},
    user: uId,
    pharmacy: pId,
    drug: dID,
    address: aID
   }
    
    axios.put(`http://${Api}/order/orderDetails/${orderId}`, data,{
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
      },})
    .then((res) => {alert('Thank you serving with us!'),fetchOrders(),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
const handleUpdate2 = () => {
  setIsLoading(true);

  const data = new FormData();
  data.append('quantity', quantity);
  data.append('total_price', totalPrice);
  data.append('payMethod', payMethod);
  data.append('paid', false);
  data.append('recieved', true);
  data.append('assignedDeliverer', assigned);
  data.append('validPrescription', true);
  data.append('prescriptionImage', {
    uri: imageUri2,
    name: 'Updatedprescription.jpg', // Set a name for the file (you can adjust the extension accordingly)
    type: 'image/jpg', // Set the file type
  });
  data.append('user', uId);
  data.append('pharmacy', pId);
  data.append('drug', dID);
  data.append('address', aID);

  axios
    .patch(`http://${Api}/order/orderDetails/${orderId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      alert('Thank your order is on process!');
      fetchOrders();
      setIsLoading(false);
      toggleFloatScreen2()
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Ordered drugs</Text>
         </View>
         <ScrollView style={{height:Layout.height*83/100,backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true}>
          {orders.length>0?orders.map((o)=>{return(
            <TouchableOpacity style={{flex:1}} key={o.id} onPress={()=>handleView(o.id,o.quantity,o.total_price,o.payMethod,o.prescriptionImage,o.pharmacy['id'],o.drug['id'],o.address['id'],o.user['id'],o.validPrescription,o.assignedDeliverer)}>
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
           <PrescriptionStatusMessage
                    validPrescription={o.validPrescription}
                    
                  />
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
      <View style={{flexDirection:'row',marginLeft:15}}>
      <TouchableOpacity onPress={()=>{toggleFloatScreen()}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,marginRight:Layout.width*25/100,borderColor:Colors.primary}} >
                <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Ok</Text>
       </TouchableOpacity>
       {validP?(<View><TouchableOpacity onPress={()=>{Alert.alert("Recieved", "Are you sure invalid?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{handleUpdate()}},
                  ])}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,borderColor:Colors.primary}} >
                <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Recieved</Text>
       </TouchableOpacity></View>):(<View><TouchableOpacity onPress={()=>{setH2(Layout.height*65/100) ,setH1(0),toggleFloatScreen2(),toggleFloatScreen()}} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,paddingRight:Spacing*2,borderColor:Colors.primary}} >
                <Text style={{textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Resend prescription</Text>
       </TouchableOpacity></View>)}
      </View>
      </View>)}
      {isVisible2 && (
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
             {imageUri2 && ( 
        <Image style={{height:h1,flex:1,marginBottom:10}} source={{ uri: imageUri2 }} /> )} 
            <View style={{ flexDirection: "row", marginBottom: 10, }} >
               <TouchableOpacity onPress={() =>Alert.alert("Cancel", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:toggleFloatScreen2},])}
                  style={{padding: Spacing,backgroundColor: "black",borderRadius: Spacing / 2, marginRight:Layout.height*20/100 }}>
                <Text style={{fontFamily: Font["poppins-semiBold"], fontSize: FontSize.medium,color: Colors.onPrimary,alignSelf: "center",}}> Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>Alert.alert("order", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{handleUpdate2()}},])} style={{marginTop:5,borderWidth:1,borderRadius:5,padding:Spacing/1.5,borderColor:Colors.primary,}}
             
              >
                <Text style={{ textAlign:'center',fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>
                 Send
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
  
  export default LoggedOrderList