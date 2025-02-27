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
  import { SlidingImages,DelivererDashboard } from "./PharmacyReport";
const DelivererHome = ({navigation,navigation:{navigate}}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [category,setCategory]=React.useState('')
  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const changed=useSelector((state)=>state.isChangedPassword)
  const pharmacyId=useSelector((state)=>state.pharmaID)
  const [orders,setOrders]= useState([])
  const fetchOrders=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/order/orderParameter/?&assignedDeliverer=${userID}&paid=true`)
    .then((r)=>{setOrders(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  fetchOrders();
}, []);
const [orders2,setOrders2]= useState([])
const fetchOrders2=()=>{
  setIsLoading(true)
  axios.get(`http://${Api}/order/orderParameter/?&assignedDeliverer=${userID}&paid=false`)
  .then((r)=>{setOrders2(r.data),setIsLoading(false)})
  .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
fetchOrders2();
}, []);

    const HumanReadableDateTime = ({ dateTimeString }) => {
      const formattedDateTime = new Date(dateTimeString).toLocaleString();
    
      return <Text>{formattedDateTime}</Text>;
    };

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
        role: 6,
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
          <TouchableOpacity onPress={()=>Alert.alert("Log out", "Are you sure?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{navigate('Login')}},
                  ])} style={{
            padding:Spacing,
            marginHorizontal:Spacing*2,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:50}}>
            <Ionicons name="log-out-outline" color={Colors.primary} size={Spacing*3}/>
          </TouchableOpacity>
          <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Home</Text>
         
        </View>
          <ScrollView style={{height:Layout.height*83/100, backgroundColor:Colors.lightPrimary,}}  scrollEnabled={true} endFillColor={'brown'}>

            <View>
              <Text style={{color:Colors.primary, textAlign:'center',fontFamily:Font["poppins-bold"],fontSize:FontSize.large, marginLeft:Layout.width*1/100}}>
                Hello {first} {last}, Welcome Again!
              </Text>
              <SlidingImages/>
           </View>
          <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
          }}>
            <Text style={{color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.large, marginLeft:Layout.width*1/100}}>
                Dashboard
              </Text>
              <DelivererDashboard navigation={navigation} />
            <Text style={{color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.large, marginLeft:Layout.width*1/100}}>
                New order assigned
              </Text>
            <ScrollView horizontal={true}>
            
         {orders2.length>0?orders2.map((o)=>{return(
            <View key={o.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,height:Layout.height*30/100,borderWidth:1}}>
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
           
          )}):<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>New Order is empty</Text></View>}
          </ScrollView> 
          <Text style={{color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.large, marginLeft:Layout.width*1/100}}>
                Delivered orders
              </Text>
         <ScrollView horizontal>
         {orders.length>0?orders.map((o)=>{return(
          <View key={o.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,height:Layout.height*30/100,borderWidth:1}}>
             <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
               <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
             <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{o.user['first_name']} {o.user['last_name']}</Text>
             <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,marginTop:5, marginLeft:Layout.width*1/100}}>Quantity: {o.quantity}</Text>
             </View>
         <View style={{height:Layout.height*16/100}}>
         
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
            <Text style={{color:'green', textAlign:'center',fontFamily:Font["poppins-bold"],fontSize:FontSize.xLarge, marginLeft:Layout.width*1/100}}>Delivered!</Text>
             </View>
         </View>
       </View>
         )}):<View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>You don't deliver yet</Text></View>}
         </ScrollView>
          
          </View>
        </ScrollView>
          <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
          <TouchableOpacity onPress={()=>navigate('DelivererHome')} style={{alignItems:'center',backgroundColor:Colors.primary, marginLeft:Layout.width*1/100,width:Layout.width/5,padding:Spacing}}>
            <Ionicons name="home-outline" color={'white'} size={Spacing*3}/>
              <Text style={{color:'white'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('DelivererOrders')} style={{alignItems:'center',marginLeft:Layout.width/5,width:Layout.width/4.5, padding: Spacing}}>
            <Icon name="shopping-bag" color={Colors.primary}   size={Spacing*3}/>
             <Text>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('DelivererFinished')}  style={{alignItems:'center',marginLeft:Layout.width/7,width:Layout.width/5, padding:Spacing,}}>
            <Ionicons name="cart" color={Colors.primary}   size={Spacing*3}/>
             <Text>Delivered</Text>
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
export default DelivererHome