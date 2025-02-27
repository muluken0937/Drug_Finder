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
import { useSelector,useDispatch } from "react-redux";
import { setCartLength, } from "../store/action/action";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SlidingImages } from "./PharmacyReport";

const PharmacistHome = ({navigation,navigation:{navigate}}) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userID=useSelector((state)=>state.User_ID)
    const first=useSelector((state)=>state.FName)
    const last=useSelector((state)=>state.LName)
    const changed=useSelector((state)=>state.isChangedPassword)
    const toggleFloatScreen = () => {
      setIsVisible(!isVisible);
    };
    const [isVisible2, setIsVisible2] = React.useState(false);
    
  
    const toggleFloatScreen2 = () => {
      setIsVisible2(!isVisible2);
    };
    const [drugs,setDrugs]= useState([])
    const pharmacyId=useSelector((state)=>state.pharmaID)
  const fitchDrugs=(category)=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}&Category=${category}`)
    .then((r)=>{setDrugs(r.data);setIsLoading(false);})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
const HumanReadableDateTime = ({ dateTimeString }) => {
  const formattedDateTime = new Date(dateTimeString).toLocaleString();
  return <Text>{formattedDateTime}</Text>;
};
useEffect(() => {
  // Fetch drugs whenever the location changes
  fitchDrugs('');
}, []);
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
  const handleView = (
    drId,
    drname,
    drBrName,
    drGenName,
    drBatchNo,
    drDosage,
    drManuName,
    drPrice,
    drStrength,
    drExpire,
    drManuDate,
    drQunatity,
    drAdditional
  ) => {
    setdId(drId);
    setDname(drname);
    setdBrName(drBrName);
    setdGenName(drGenName);
    setdBatchNo(drBatchNo);
    setdDosage(drDosage);
    setdManuName(drManuName);
    setdPrice(drPrice);
    setdStrength(drStrength);
    setdExpire(drExpire);
    setdDosage(drDosage);
    setdManuDate(drManuDate);
    setdQunatity(drQunatity);
    setdAdditional(drAdditional);
    setIsVisible(!isVisible);
  };
  const [orders,setOrders]= useState([])
  const fetchOrders=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/orderParameter/?pharmacy=${pharmacyId}&received=false`)
    .then((r)=>{setOrders(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
const [orderh,setOrderh]= useState([])
  const fetchOrderh=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/orderParameter/?pharmacy=${pharmacyId}&received=true`)
    .then((r)=>{setOrderh(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  fetchOrders();
  fetchOrderh()
}, []);

const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Validation
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // Email Validation
  const [isValidEmail, setIsValidEmail] = useState(true);

  // Validate Password
  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
    setIsValidPassword(
      value.length >= 8 && // minimum length of 8 characters
      /[A-Z]/.test(value) && // at least one uppercase letter
      /[a-z]/.test(value) && // at least one lowercase letter
      /[0-9]/.test(value) && // at least one digit
      /[!@#$%^&*(),.?":{}|<>]/.test(value) // at least one special character
    );
    setPasswordsMatch(value === confirmPassword);
  };

  // Validate Confirm Password
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordsMatch(value === newPassword);
  };

  // Validate Email
  const handleEmailChange = (value) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate the entire form and submit the data if valid
  const handleSubmit = () => {
    if (
      isValidEmail &&
      isValidPassword &&
      passwordsMatch &&
      newPassword
    ) {
      // Create an object with the input data
      const data = {
        first_name: first,
        last_name: last,
        role: 5,
        pharmacy_id:pharmacyId,
        password: confirmPassword,
        is_PasswordChanged:true
      };

      // Make a POST request to the Django API endpoint with axios
      axios
        .put(`http://${Api}/registerDetails/${userID}`, data)
        .then(() => {
          // Handle the successful response
          {alert("Success");navigate('Login')}
        })
        .catch((error) => {
          // Handle the error response
          alert(error)
        });
    } else {
      // Show an error message when the form is not valid
      alert("Please fill in all the required fields correctly.");
    }
  };
    if (changed==false){
      return(<View style={{
        height: Layout.height*50/100,
        marginTop:Layout.height*30/100,
        backgroundColor: "white",
        padding: 10,
        marginLeft:10,
        width:Layout.width*95/100,
        borderRadius: 10,
        elevation: 10,
      }}>
        <Text style={{fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,textAlign:'center'}}>Dear {first} {last} You have to change Your password first!</Text>
        <View>
        <TextInput
                    value={newPassword}
                    onChangeText={handleNewPasswordChange}
                    placeholder="New password"
                    placeholderTextColor={Colors.darkText}
                    secureTextEntry
                    style={styles.input}
                  />
                  {!isValidPassword && newPassword.length > 0 && (
                    <Text style={{ color: "red" }}>
                      Password must be at least 8 characters long, contain at least
                      one uppercase letter, one lowercase letter, at least one
                      special character and one digit
                    </Text>
                  )}
                  <TextInput
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    placeholder="Confirm password"
                    placeholderTextColor={Colors.darkText}
                    secureTextEntry
                    style={styles.input}
                  />
                  {!passwordsMatch && confirmPassword.length > 0 && (
                    <Text style={{ color: "red" }}>Passwords do not match</Text>
                  )}
                  <TouchableOpacity
              onPress={handleSubmit}
              disabled={
                !(
                  isValidEmail &&
                  isValidPassword &&
                  passwordsMatch &&
                  newPassword
                )
              }
              style={[
                styles.button,
                {
                  opacity:
                    isValidEmail &&
                    isValidPassword &&
                    passwordsMatch &&
                    newPassword
                      ? 1
                      : 0.5,
                },
              ]}
            >
              <Text style={styles.buttonText}>Change</Text></TouchableOpacity>
        </View>
      </View>)
    }else {

   
    return (
      <SafeAreaView style={{flex:1}}>
          <View style={{flexDirection:'row',}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{
              padding:Spacing,
              marginHorizontal:Spacing*2,
              borderRadius:Spacing/2,
              marginTop:Spacing*4,
              marginRight:50}}>
              <Ionicons name="menu-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Home</Text>
            <TouchableOpacity 
            onPress={()=>navigate("PharmacistSearch")}
            style={{
              alignSelf:'flex-end',
              alignItems:'center',
              marginTop:Spacing*4,
              marginLeft:100,
              width:50,
              height:40,
              borderRadius:Spacing,
            }}>
               <Ionicons style={{
                // alignSelf:'center'
                }} name="search-outline" color={Colors.primary} size={Spacing*2.5}/>
            </TouchableOpacity>
          </View>
            <ScrollView style={{height:Layout.height*83.5/100, backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true} endFillColor={'brown'}>
            <SlidingImages />
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
              <View style={{flexDirection:'row', height:Layout.height*22/100, borderRadius:5, borderColor:Colors.primary}}>
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
                Drugs in this pharmacy
              </Text>
                <ScrollView scrollEnabled={true} horizontal={true} style={{height:Layout.height*10/100, borderRadius:5, borderColor:Colors.primary}}>
                
                {drugs.length>0? drugs.map((d)=>{return(
              <TouchableOpacity key={d.id}
              onPress={() => {
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
              }} style={{
                height:Layout.height*8/100,
                margin:Spacing,
                marginTop:5,
                width:Layout.width*60/100,
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
                </ScrollView>
                
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
                New Orders
              </Text>
              <ScrollView horizontal={true}>
              {orders.length>0?orders.map((o)=>{return(
             <View key={o.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*85/100,height:Layout.height*27/100,borderWidth:1}}>
             <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
               <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
             <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.user['first_name']} {o.user['last_name']}</Text>
             <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,marginTop:5, marginLeft:Layout.width*1/100}}>Quantity: {o.quantity}</Text>
             </View> 
             <View style={{height:Layout.height*13/100}}>
             <View style={{flexDirection:'row',alignItems:'center',}}>
             <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100,marginLeft:5}} source={require("../assets/images/medicine-drug.png")}></Image>
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*35/100, marginLeft:Layout.width*1/100}}>{o.drug['DrugName']}</Text>
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
          )}):<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>Order is empty</Text></View>}
          </ScrollView>
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
                Delivered drugs
              </Text>
              <ScrollView horizontal={true}>
              {orderh.length>0?orderh.map((o)=>{return(
          <View key={o.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*85/100,height:Layout.height*28/100,borderWidth:1}}>
           
           <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
             <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.user['first_name']} {o.user['last_name']}</Text>
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,marginTop:5, marginLeft:Layout.width*1/100}}>Quantity: {o.quantity}</Text>
           </View>
           <View style={{height:Layout.height*16/100}}>
           <View style={{flexDirection:'row',alignItems:'center',}}>
           <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100,marginLeft:5}} source={require("../assets/images/medicine-drug.png")}></Image>
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*30/100, marginLeft:Layout.width*1/100}}>{o.drug['DrugName']}</Text>
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium, marginLeft:Layout.width*0/100}}>Total price: {o.total_price}birr</Text>
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
         )}):(<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>Order is empty</Text></View>)}
              </ScrollView>
              </View>
            </ScrollView>
            {isVisible && (
          <ScrollView
            style={{
              height: Layout.height*80/100,
              position: "absolute",
              bottom: (Layout.height * 12) / 100,
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
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Name: {Dname}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Brand name: {dBrName}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Generic name: {dGenName}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Batch no: {dBatchNo}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Dosage: {dDosage}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Strength: {dStrength}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Manufacturer: {dManuName}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Manufactured date: {dManuDate}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Expire date: {dExpire}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Estimated Price:{dPrice}</Text>
              <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Additional description: {dAdditional}</Text>
              </View>
              </View>
           <TouchableOpacity
                  onPress={toggleFloatScreen}
                  style={{marginTop:Layout.height*20/100,
                    padding: Spacing,
                    paddingRight: 30,
                    alignItems: "center",
                    backgroundColor: Colors.onPrimary,
                    borderWidth:1,
                    borderColor:Colors.primary,
                    borderRadius: Spacing / 2,
                    marginLeft:10,
                    marginRight:10
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
                    Ok
                  </Text>
                </TouchableOpacity>
          </ScrollView>
          
        )}
        {isVisible2 && (
          <ScrollView
          style={{
            height: Layout.height*87/100,
            position: "absolute",
            bottom: (Layout.height * 12) / 100,
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
                  <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Name:</Text>
                  <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Phone Number:</Text>
                
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
                  <MapView mapType="hybrid" showsCompass={true} showsUserLocation={true} style={{flex:1}}
                    initialRegion={{
                      latitude: 12.6048,
                      longitude: 37.4689,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}> 
                  </MapView>
              </View>
              <TouchableOpacity
                  onPress={toggleFloatScreen2}
                  style={{marginTop:20,
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
        </ScrollView>
        )}{isLoading &&(<Activity />)}
            <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
            <TouchableOpacity onPress={()=>navigate('PharmacistHome')} style={{alignItems:'center', backgroundColor:Colors.primary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.onPrimary} size={Spacing*3}/>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('PharmacistDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacyOrders')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Icon name="shopping-bag" color={Colors.primary}  size={Spacing*3}/>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacistPrescription')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Prescription</Text> 
            </TouchableOpacity>
            </View>
      </SafeAreaView>
  )
}}
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
export default PharmacistHome