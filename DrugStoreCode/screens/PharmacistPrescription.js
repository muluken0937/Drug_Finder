import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  View,Image,ActivityIndicator
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import axios from "axios";
import Api from "../constants/Api";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Activity from "./Activity";
import Icon from 'react-native-vector-icons/FontAwesome';
const PharmacistPrescription = ({navigation:{navigate}}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const setH = () => {
    if(height==0){
      setHeight(200);
    }else{
      setHeight(0)
    }
    
  };
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [isVisible3, setIsVisible3] = React.useState(false);
  const toggleFloatScreen2 = () => {
    fitchPrescriptions();
  fitchPrescriptions2();
    setIsVisible2(!isVisible2);
    if (!isVisible){
      setIsVisible(isVisible)
    }else{
      setIsVisible(!isVisible)
    }
    
  };
  const toggleFloatScreen3 = () => {
    setIsVisible3(!isVisible3);
    
  };
  const [isVisible4, setIsVisible4] = React.useState(false);
  const toggleFloatScreen4 = () => {
    setIsVisible4(!isVisible4);
    if (!isVisible3){
      setIsVisible3(isVisible3)
    }else{
      setIsVisible3(!isVisible3)
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptions2, setPrescriptions2] = useState([]);
  const [DrugName, setDrugName] = useState('');
  const [P_ID, setP_ID] = useState([]);
  const [U_ID, setU_ID] = useState([]);
  const [SenderName,setSenderName]=useState('')
  const [sentDate,setSentdate]=useState('')
  const [preUri,setPreUri]=useState('')
  const [SenderName2,setSenderName2]=useState('')
  const [preUri2,setPreUri2]=useState('')
  const pharmacyId=useSelector((state)=>state.pharmaID)
  const fitchPrescriptions=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/prescriptionParameter/?getResponse=False&pharmacy=${pharmacyId}`)
    .then((r)=>setPrescriptions(r.data),setIsLoading(false))
    .catch((err)=>console.log(err),setIsLoading(false))
}
const fitchPrescriptions2=()=>{
  setIsLoading(true)
  axios.get(`http://${Api}/drugs/prescriptionParameter/?getResponse=True&pharmacy=${pharmacyId}`)
  .then((r)=>setPrescriptions2(r.data),setIsLoading(false))
  .catch((err)=>console.log(err),setIsLoading(false))
}
useEffect(() => {
  fitchPrescriptions();
  fitchPrescriptions2();
}, []);

const handleView=(pId,sName,preImage,user)=>{
  setP_ID(pId)
  setU_ID(user)
  setSenderName(sName)
  setPreUri(preImage)
  setIsVisible(!isVisible);
}
const handleView2=(pId,sName2,preImage2,uId)=>{
  setP_ID(pId)
  setU_ID(uId)
  setSenderName2(sName2)
  setPreUri2(preImage2)
  setIsVisible3(!isVisible3);
}
const handleAvaUpdate=()=>{
  setIsLoading(true);
const formData = new FormData();
    formData.append('prescriptionImage', {
      uri: preUri,
      name: 'prescription.jpg', // Provide a name for the file
      type: 'image/jpeg', // Adjust the file type accordingly
    });
    formData.append('senderName', SenderName);
    formData.append('drugName', null);
    formData.append('sentDate', "2023-05-16");
    formData.append('getResponse', true);
    formData.append('available', true,);
    formData.append('user', U_ID);
    formData.append('pharmacy', pharmacyId);

    axios.put(`http://${Api}/drugs/prescriptionDetails/${P_ID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
        },
      }).then(
        // Handle the successful response
        toggleFloatScreen2
        )
        .catch((error) => {
        // Handle the error response
        console.log(error);
        alert("Something went wrong!");
        }).finally(() => {
          // Set loading state to false when the request is completed
          setIsLoading(false);
        });;
      }
const handleNameUpdate=()=>{
  const formData = new FormData();
  formData.append('prescriptionImage', {
    uri: preUri,
    name: 'prescription.jpg', // Provide a name for the file
    type: 'image/jpeg', // Adjust the file type accordingly
  });
  formData.append('senderName', SenderName);
  formData.append('drugName', DrugName);
  formData.append('sentDate', "2023-05-16");
  formData.append('getResponse', true);
  formData.append('available', false,);
  formData.append('user', U_ID);
  formData.append('pharmacy', pharmacyId);

  axios.put(`http://${Api}/drugs/prescriptionDetails/${P_ID}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
      },
    }).then(
      // Handle the successful response
      toggleFloatScreen2
      )
      .catch((error) => {
      // Handle the error response
      console.log(error);
      alert("Something went wrong!");
      });
 }
  return (
    <SafeAreaView style={{flex:1}}>
      <View
        style={{
          flexDirection: "row",
          shadowColor: "gray",
          shadowOffset: { width: 0, height: Spacing },
          shadowOpacity: 0.3,
          shadowRadius: Spacing,
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("PharmacistHome")}
          style={{
            padding: Spacing,
            marginHorizontal: Spacing,
            borderRadius: Spacing / 2,
            marginTop: Spacing * 4,
            marginRight: 5,
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            color={Colors.primary}
            size={Spacing * 3}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.primary,
            marginTop: Spacing * 4,
            marginLeft: 70,
            alignSelf: "center",
            fontSize: FontSize.large,
          }}
        >
          Prescription List
        </Text>
      </View>
      <ScrollView style={Layout.styles.scrollContainer} scrollEnabled={true}>
        <View
          style={{
            paddingHorizontal: Spacing,
            paddingTop: Spacing,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              textAlign: "left",
            }}
          >
            You didn't give response for
          </Text>

          <View style={{ marginVertical: Spacing * 2 }}>
            {prescriptions.length>0? prescriptions.map((pre)=>{return(
               <TouchableOpacity key={pre.id}
               onPress={()=>handleView(pre.id,pre.senderName,pre.prescriptionImage,pre.user)}
               style={Layout.styles.ListTouch}
             >
               <Text style={Layout.styles.ListTouchText}>{pre.senderName}</Text>
             </TouchableOpacity>
            )}):<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:'red',}}>No Prescriptions</Text></View></View>}
            
            <Text
              style={{
                fontSize: FontSize.large,
                color: Colors.primary,
                fontFamily: Font["poppins-bold"],
                textAlign: "left",
              }}
            >
              you give response for
            </Text>
            {prescriptions2.length>0? prescriptions2.map((pre2)=>{return(
              
              <TouchableOpacity key={pre2.id}
              onPress={()=>handleView2(pre2.id,pre2.senderName,pre2.prescriptionImage)}
              style={Layout.styles.ListTouch}
            >
              <Text style={Layout.styles.ListTouchText}>{pre2.senderName}</Text>
            </TouchableOpacity>
            )}):<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:'red',}}>No Prescriptions</Text></View></View>}
            
            
          </View>
          
        </View>
        
      </ScrollView>
           
      {isVisible && (
        <ScrollView
          style={{
            height: Layout.height*87/100,
            position: "absolute",
            bottom: (Layout.height * 10) / 100,
            marginLeft:Layout.width*3/100,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            elevation: 10,
          }}
          scrollEnabled={true}
        >
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.medium,
                color:Colors.primary,
                
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
              If it's avialable in your pharmacy simply click on Yes button.
            </Text>
            <Text style={{
                fontSize: FontSize.large,
                fontFamily: Font["poppins-bold"],
                
              }}>Sender Name: {SenderName}</Text>
            <View style={{ height: Layout.height*65/100 }}>
              <Image  source={ {uri: preUri }} style={{ width: Layout.width*83/100, height: Layout.height*63/100 }} />
            </View>
            <View style={{ marginVertical: Spacing }}>
              <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.primary,
                  fontFamily: Font["poppins-bold"],
                  textAlign: "left",
                }}
              >
                Is it available in your pharmacy?
              </Text>
              <View
              style={{
                
                marginBottom: 15,
                borderBottomWidth:1
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Available", "Are you sure?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:handleAvaUpdate},
                  ])
                }
                style={{
                  padding: Spacing,
                  paddingRight: 30,
                  alignItems: "center",
                  backgroundColor: Colors.primary,
                  borderRadius: Spacing / 2,
                  marginBottom:20
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
                 Yes
                </Text>
              </TouchableOpacity>
              {isLoading && <ActivityIndicator size="large" color="blue" />}
            </View>
            </View>
            <Text
            style={{
              fontSize: FontSize.large,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              textAlign: "center",
            }}
          >
            If it is not available fill the information below
          </Text>
              <View
              style={{
                marginBottom: 5,
                borderBottomWidth:1,
               
              }}> 
              <TextInput value={DrugName} onChangeText={setDrugName} placeholder="What is the Drug name?" 
            placeholderTextColor={Colors.darkText} 
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
              
            }}/>
            <TouchableOpacity
            onPress={() =>
              Alert.alert("Name", "Are you sure?", [
                { text: "No" },
                { text: "Yes",onPress:handleNameUpdate},
              ])
            }
            style={{
              padding: Spacing,
              paddingRight: 30,
              alignItems: "center",
              backgroundColor: Colors.primary,
              borderRadius: Spacing / 2,
              marginBottom:5,
              marginTop:Spacing
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
             Send
            </Text>
          </TouchableOpacity></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure? You want to delete?", [
                    { text: "No" },
                    { text: "Yes" },
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor: "red",
                  borderRadius: Spacing / 2,
                  alignSelf: "flex-end",
                  marginRight: 20,
                  marginLeft: 100,
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
                  Delete this
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleFloatScreen}
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
            </View>
          </View>
        </ScrollView>
      )}
      {isVisible2 && (
        <ScrollView
          style={{
            height: Layout.height*40/100,
            position: "absolute",
            bottom: (Layout.height * 40) / 100,
            right: 0,marginRight:50,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            elevation: 10,
          }}
          scrollEnabled={true}
        >
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text
              style={{marginTop:20,
                fontSize: FontSize.xLarge,
                color:Colors.primary,
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
              Response Sent successfully!
            </Text>   
            <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*5}/>
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
      )}
      {isVisible3 && (
        <ScrollView
          style={{
            height: Layout.height*87/100,
            position: "absolute",
            bottom: (Layout.height * 10) / 100,
            marginLeft:Layout.width*3/100,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            elevation: 10,
          }}
          scrollEnabled={true}
        >
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.medium,
                color:Colors.primary,
                
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
             Prescription details
            </Text>
            <Text style={{
                fontSize: FontSize.large,
                fontFamily: Font["poppins-bold"],
                
              }}>Sender Name: {SenderName2}</Text>
            <View style={{ height: Layout.height*65/100 }}>
              <Image  source={ {uri: preUri2 }} style={{ width: Layout.width*83/100, height: Layout.height*63/100 }} />
            </View>
            <View style={{ marginVertical: Spacing }}>
              <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.primary,
                  fontFamily: Font["poppins-bold"],
                  textAlign: "left",
                }}
              >
               Your response was
              </Text>
              <Text style={{fontSize:FontSize.large}}>Available at your pharmacy</Text>
              <View
              style={{
                marginBottom: 15,
                borderBottomWidth:1
              }}
            >
            </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure? You want to delete?", [
                    { text: "No" },
                    { text: "Yes",onPress:toggleFloatScreen4 },
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor: "red",
                  borderRadius: Spacing / 2,
                  alignSelf: "flex-end",
                  marginRight: 20,
                  marginLeft: Layout.width*35/100,
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
                  Delete this
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleFloatScreen3}
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
            </View>
          </View>
        </ScrollView>
      )}
      {isVisible4 && (
        <ScrollView
          style={{
            height: Layout.height*40/100,
            position: "absolute",
            bottom: (Layout.height * 40) / 100,
            right: 0,marginRight:50,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            elevation: 10,
          }}
          scrollEnabled={true}
        >
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text
              style={{marginTop:20,
                fontSize: FontSize.xLarge,
                color:Colors.primary,
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
              Prescription Deleted successfully!
            </Text>   
            <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*5}/>
              <TouchableOpacity
                onPress={toggleFloatScreen4}
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
      )}
      {isLoading &&(<Activity/>)}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      <TouchableOpacity onPress={()=>navigate('PharmacistHome')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('PharmacistDrugList')}  style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacyOrders')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Icon name="shopping-bag" color={Colors.primary}  size={Spacing*3}/>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmacistPrescription')}  style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.onPrimary} size={Spacing*3}/>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Prescription</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PharmacistPrescription