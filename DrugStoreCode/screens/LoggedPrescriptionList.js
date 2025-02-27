import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,Button,Image,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import Api from "../constants/Api";
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import Activity from "./Activity";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
const LoggedPrescriptionList = ({ navigation: { navigate } }) => {
const HandleAvailable=()=>{
 if(Ava){
  return (
    <View style={{marginLeft:5}}>
      <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.primary,
                  fontFamily: Font["poppins-bold"],
                  textAlign: "left",
                  marginTop:10
                }}
              >
                This drug is available at
              </Text>
              <TouchableOpacity
                
                style={Layout.styles.ListTouch}
              >
                <Text style={Layout.styles.ListTouchText}>{PharmacyName}</Text>
              </TouchableOpacity>
    </View>
  );
 }
 else{
  return (
    <View style={{marginLeft:5}}>
      <Text
                style={{
                  fontSize: FontSize.large,
                  fontFamily: Font["poppins-bold"],
                  textAlign: "left",
                  marginTop:10
                }}
              >
                Drug name: {DrugName}
              </Text>
   </View>
  );
 }
}


  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible4, setIsVisible4] = React.useState(false);
  const [isVisible5, setIsVisible5] = React.useState(false);
  const [h1,setH1]=useState(0)
  const [h2,setH2]=useState(Layout.height*65/100)
  const [isLoading, setIsLoading] = useState(false);
  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const toggleFloatScreen4 = () => {
    setIsVisible4(!isVisible4);
  };
  const toggleFloatScreen5= () => {
    
    setIsVisible5(!isVisible5);
    if (isVisible4){
      setIsVisible4(!isVisible4)
      fitchDrugs()
    }
  };
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [isVisible3, setIsVisible3] = React.useState(false);
  const toggleFloatScreen2 = () => {
    setIsVisible2(!isVisible2);
    
  };

  const toggleFloatScreen3 = () => {
    setIsVisible3(!isVisible3);
    if (!isVisible2){
      setIsVisible2(isVisible2)
    }else{
      setIsVisible2(!isVisible2)
    }
  };

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
  let curr=new Date()
  const currentDate= new Date().getFullYear()+'-'+(curr.getMonth()+1).toString().padStart(2,'0')+'-'+curr.getDate().toString().padStart(2,'0');
 
  /////////////////////----BACKEND CODES----/////////////////
  const handleUploadPhoto = async () => { 
    setIsLoading(true)
    
    const formData = new FormData();
    formData.append('prescriptionImage', {
      uri: imageUri,
      name: 'prescription.jpg', // Provide a name for the file
      type: 'image/jpeg', // Adjust the file type accordingly
    });
    formData.append('senderName', first+' '+last);
    formData.append('drugName', null);
    formData.append('getResponse', false);
    formData.append('user', userID);
    formData.append('pharmacy',`${DisplayRandomPharmacyId()}` );

    axios.post(`http://${Api}/drugs/prescriptionList/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
        },
      })
      .then((res) => {
        toggleFloatScreen3();
        setH2(Layout.height*65/100) 
        setH1(0)
        setIsLoading(false)
        fitchPrescriptions(),
        fitchPrescriptions2()
      })
      .catch((error) => {
        console.log(error);
        alert('No nearby pharmacy! please try again later.');
        setIsLoading(false)
      });
  }; 
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptions2, setPrescriptions2] = useState([]);
  const [DrugName, setDrugName] = useState('');
  const [P_ID, setP_ID] = useState([]);
  const [U_ID, setU_ID] = useState([]);
  const [SenderName,setSenderName]=useState('')
  const [preUri,setPreUri]=useState('')
  const [SenderName2,setSenderName2]=useState('')
  const [preUri2,setPreUri2]=useState('')
  const [PharmacyName,setPharmacyName]=useState('')
  const [Ava,setAva]=useState(false)
  const handleView=(pId,sName,preImage,user,phName)=>{
    setP_ID(pId)
    setU_ID(user)
    setSenderName(sName)
    setPreUri(preImage)
    setPharmacyName(phName)
    setIsVisible4(!isVisible4);
  }
  const [nearbyph, setNearbyph] = useState([]);
  const [nearbyphId, setNearbyphId] = useState('');
 
  const handleView2=(pId,sName2,dName,preImage2,uId,phName,available)=>{
    setP_ID(pId)
    setDrugName(dName)
    setSenderName2(sName2)
    setPreUri2(preImage2)
    setPharmacyName(phName)
    setAva(available)
    setIsVisible(!isVisible);
  }
  const fetchNearbyPharmacy=()=>{
    setIsLoading(true)
    try{ axios.get(`http://${Api}/drugs/nearby-Pharmacy/?latitude=${location.latitude}&longitude=${location.longitude}`)
    .then((r)=>{setNearbyph(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})}catch(err){alert(err)}finally{setIsLoading(false),DisplayRandomPharmacyId}
   
}
const DisplayRandomPharmacyId = () => {
  if (nearbyph.length === 0) {
    return null; // No data loaded yet
  }

  const randomIndex = Math.floor(Math.random() * nearbyph.length);
  const randomPharmacy = nearbyph[randomIndex];
  return (randomPharmacy.id)
  
};

  const fitchPrescriptions=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/prescriptionParameter/?getResponse=False&user=${userID}`)
    .then((r)=>{setPrescriptions(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}
const fitchPrescriptions2=()=>{
  setIsLoading(true)
  axios.get(`http://${Api}/drugs/prescriptionParameter/?getResponse=True&user=${userID}`)
  .then((r)=>{setPrescriptions2(r.data),setIsLoading(false)})
  .catch((err)=>{console.log(err),setIsLoading(false)})
}
const handleDelete=()=>{
  setIsLoading(true)
  axios.delete(`http://${Api}/drugs/prescriptionDetails/${P_ID}`)
  .then((r)=>alert('Deleted successfuly'),fitchPrescriptions(),
  fitchPrescriptions2(),setIsLoading(false))
  .catch((err)=>{console.log(err),setIsLoading(false)})
}
useEffect(() => {
  fitchPrescriptions();
  fitchPrescriptions2();
}, []);
////////////////////// GET USER'S CURRENT LOCATION CODE //////////////////////////////
useEffect(() => {
  // Fetch location when component mounts
  getLocationAsync();
}, []);

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
 /////////////////////////////////////////////////////////////////////////////////////
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
          onPress={() => navigate("LoggedHome")}
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
            Sent and get response  
          </Text>
          <View >
            <View style={{height:Layout.height*40/100, marginVertical: Spacing * 2 }}>
            <ScrollView horizontal={true}>
            {prescriptions2.length>0?prescriptions2.map((pre2)=>{return(
              
              <TouchableOpacity key={pre2.id}
              onPress={()=>handleView2(pre2.id,pre2.senderName,pre2.drugName,pre2.prescriptionImage,pre2.user,pre2.pharmacy['name'],pre2.available)}
              style={{backgroundColor:Colors.primary,marginBottom: Layout.height*2/100,marginHorizontal:5,paddingBottom:5}}
              >
                <Text style={{marginLeft:5, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,color:Colors.onPrimary, textAlign:'center'}}>{pre2.senderName}</Text> 
                <Image  source={ {uri: pre2.prescriptionImage }} style={{ width: Layout.width*80/100, height: Layout.height*30/100 }} />
                <Text style={{marginLeft:5, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,color:Colors.onPrimary, textAlign:'left'}}>You get response from: {pre2.pharmacy['name']}</Text> 
              </TouchableOpacity>
              )}):<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
                fontFamily:Font['poppins-semiBold'],
                fontSize:FontSize.large,
                color:'red',}}>No Prescriptions</Text></View></View>}
            </ScrollView>
            </View>
            <Text
              style={{
                fontSize: FontSize.large,
                color: Colors.primary,
                fontFamily: Font["poppins-bold"],
                textAlign: "left",
              }}
            >
              Sent and not get response
            </Text>
        <View style={{height:Layout.height*40/100, marginVertical: Spacing * 2 }}>
         <ScrollView horizontal={true}>
        
            
           {prescriptions.length>0?prescriptions.map((pre)=>{return(
              
              <TouchableOpacity key={pre.id}
              onPress={()=>handleView(pre.id,pre.senderName,pre.prescriptionImage,pre.user,pre.pharmacy['name'])}
              style={{alignItems:"center",backgroundColor:Colors.primary,marginBottom: Layout.height*2/100,marginHorizontal:5,paddingBottom:5}}
            >
              <Text style={Layout.styles.ListTouchText}>{pre.senderName}</Text> 
              <Image  source={ {uri: pre.prescriptionImage }} style={{ width: Layout.width*80/100, height: Layout.height*30/100 }} />
              <Text style={{marginLeft:5, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,color:Colors.onPrimary, textAlign:'left'}}>You will get response from: {pre.pharmacy['name']}</Text> 
            </TouchableOpacity>
            )}):<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:'red',}}>No Prescriptions</Text></View></View>}
         </ScrollView>
            </View>            
          </View>        
        </View>
      </ScrollView>
            <TouchableOpacity onPress={()=>{fetchNearbyPharmacy(),toggleFloatScreen2()}} style={{position: "absolute",
            marginTop:Layout.height*82/100,
            marginLeft:Layout.height*37/100,
            elevation: 20,height: Layout.height*10/100,backgroundColor: Colors.primary,borderWidth:2, borderColor:'white', borderRadius:50,
            alignItems:'center',
            padding: 10,
            width:Layout.height*10/100,}}>
            <Ionicons style={{marginVertical:7,}}
            name="camera-outline"
            color={Colors.onPrimary}
            size={Spacing * 3.5}
          />
            </TouchableOpacity>
           
      {isVisible && (
        <ScrollView
          style={{
            height: Layout.height*87/100,
            position: "absolute",
            bottom: (Layout.height * 10) / 100,
            right: 0,
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
            
            <View style={{ height: Layout.height*55/100 }}>
               <Image  source={ {uri: preUri2 }} style={{ width: Layout.width*85/100, height: Layout.height*58/100 }} />
            </View>
            <View style={{ marginVertical: Spacing }}>
            <HandleAvailable />
              
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
            height: Layout.height*80/100,
            position: "absolute",
            bottom: (Layout.height * 13) / 100,
            right: 10,
            left:10,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 20,
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
                color: Colors.primary,
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
              Send us your prescription
            </Text>
            <View style={{ height:h2}}>
              <View  style={{flexDirection:'row',marginTop:Layout.height*25/100}}>
                <TouchableOpacity onPress={handleTakePhoto} style={{marginLeft:Layout.height*8/100,marginRight:Layout.height*5/100}}>
                <Ionicons
            name="camera-outline"
            color={Colors.primary}
            size={Spacing * 7}
          /><Text style={{fontFamily:Font["poppins-semiBold"]}}>{DisplayRandomPharmacyId()}Take a picture</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleChoosePhoto}><Ionicons
            name="file-tray-full-outline"
            color={Colors.primary}
            size={Spacing * 7}
          /><Text style={{fontFamily:Font["poppins-semiBold"]}}>Choose from file</Text></TouchableOpacity></View>
            </View>
             {imageUri && ( 
        <Image style={{height:h1,flex:1,marginBottom:10}} source={{ uri: imageUri }} /> 
      )} 
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Cancel", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:toggleFloatScreen2},
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor: "black",
                  borderRadius: Spacing / 2,
                  marginRight:Layout.height*22/100
                  
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
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>{Alert.alert('Send','Are you sure?',[{text:'No'},{text:'Yes',onPress:()=>{handleUploadPhoto()}}])}}
                style={{
                  padding: Spacing,
                  paddingRight: 30,
                  alignSelf:'flex-end',
                  alignItems: "center",
                  backgroundColor: "green",
                  borderRadius: Spacing / 2,
                }}
              >
                <Text
                  style={{ fontFamily: Font["poppins-semiBold"],fontSize: FontSize.medium,color: Colors.onPrimary,alignSelf: "center", }}>
                 Send
                </Text>
              </TouchableOpacity>
              <View> 
      
      
      
    </View> 
            </View>
           
          </View>
        </ScrollView>
      )}
      {isVisible3 && (
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
              Sent successfully you will get response soon!
            </Text>   
            <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*5}/>
              <TouchableOpacity
                onPress={toggleFloatScreen3}
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
      {isVisible4 && (
        <ScrollView
          style={{
            height: Layout.height*90/100,
            position: "absolute",
            bottom: (Layout.height * 10) / 100,
            backgroundColor: "white",
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
            

            <View style={{ height: Layout.height*67/100 }}>
               <Image  source={ {uri: preUri }} style={{ width: Layout.width*94/100, height: Layout.height*70/100 }} />
            </View>
            <View style={{ marginVertical: Spacing }}>
              <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.primary,
                  fontFamily: Font["poppins-bold"],
                  textAlign: "left",
                  marginTop:10
                }}
              >
                Please wait you will get response soon!
              </Text>
              
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
                    { text: "Yes",onPress:handleDelete },
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
                onPress={toggleFloatScreen4}
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
      {isVisible5 && (
          <ScrollView
            style={{
              height: Layout.height*40/100,
              position: "absolute",
              bottom: (Layout.height * 40) / 100,
              marginRight:Layout.width*5/100,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              elevation: 10,
              marginLeft:Layout.width*5/100
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
                Your prescription deleted successfully!
              </Text>   
              <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
                <TouchableOpacity
                  onPress={toggleFloatScreen5}
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
        )}{isLoading &&(
          <Activity/>
        )}
      <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
          <TouchableOpacity onPress={()=>navigate('LoggedHome')} style={{alignItems:'center', marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('LoggedPharmacyList')} style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('LoggedPrescriptionList')}  style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Ionicons name="document-text-outline" color={Colors.onPrimary} size={Spacing*3}/>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Prescription</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
};

export default LoggedPrescriptionList;
