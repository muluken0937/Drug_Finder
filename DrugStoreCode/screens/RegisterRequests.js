import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Alert,
    TextInput,
    TouchableOpacity,Image,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Layout from "../constants/Layout";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import MapView  from "react-native-maps";
  import axios from "axios";
  import Api from "../constants/Api";
import { Marker } from "react-native-maps";
import Icon from 'react-native-vector-icons/FontAwesome';
const RegisterRequests = ({navigation:{navigate}}) => {
    const [isVisible, setIsVisible]= React.useState(false)
    const [docName, setdocName]=React.useState('')
    const [docId, setDocId]=React.useState('')
    const [docImage, setDocImage]=React.useState('')
    const [locLatitude, setLocLatitude]=React.useState('')
    const [locId, setLocId]=React.useState('')
    const [locLongitude, setLocLongitude]=React.useState('')
    const [name, setName]=React.useState('')
    const [ownerFName, setOwnerFname]=React.useState('')
    const [ownerLName, setOwnerLname]=React.useState('')
    const [email, setEmail]=React.useState('')
    const [LicenceNo, setLienceNo]=React.useState('')
    const [phoneNo, setPhoneNo]=React.useState('')
    const [subCity, setSubCity]=React.useState('')
    const [Kebele, setKebele]=React.useState('')
    const [houseNo, setHouseNo]=React.useState('')
    const [ID, setID]=React.useState('')
    const handleView =(id,Name,Fname,Lname,DocId,DocName,DocImage,LocId,latit,longi,Email,Licence,phone,SubCity,kebele,House)=>{
     setDocId(DocId)
     setLocId(LocId)
     setDocImage(DocImage)
     setName(Name)
     setID(id)
     setEmail(Email),
     setLocLatitude(latit)
     setLocLongitude(longi)
     setLienceNo(Licence)
     setOwnerFname(Fname)
     setOwnerLname(Lname)
     setdocName(DocName)
     setSubCity(SubCity)
     setKebele(kebele)
     setPhoneNo(phone)
     setHouseNo(House)
     setIsVisible(!isVisible);
    }

    const handleUpdate = async() => {
      const data = {
        name: name,
        OwnersFname: ownerFName,
        ownersLname: ownerLName,
        email: email,
        phoneNo: phoneNo,
        licenseNo: LicenceNo,
        subCity: subCity,
        kebele: Kebele,
        houseNo: houseNo,
        approved: true,
        document: docId,
        location: locId
    }
    // Make a POST request to the Django API endpoint with axios
    axios
    .put(`http://${Api}/drugs/pharmacyDetails2/${ID}`, data)
    .then(
      // Handle the successful response
      toggleFloatScreen2
    )
    .catch((error) => {
      // Handle the error response
      console.log(error);
      alert("Something went wrong!");
    });
   };
    
      
      

  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const [isVisible2, setIsVisible2] = React.useState(false);

  const toggleFloatScreen2 = () => {
    fitchPharmaRequest()
    setIsVisible2(!isVisible2);
    if (!isVisible){
      setIsVisible(isVisible)
    }else{
      setIsVisible(!isVisible)
    }
  };
  const [isVisible3, setIsVisible3] = React.useState(false);

  const toggleFloatScreen3 = () => {
    setIsVisible3(!isVisible3);
    if (!isVisible){
        setIsVisible(isVisible)
      }else{
        setIsVisible(!isVisible)
      }
  };
  const [phaRequest,setPharRequest]= useState([])
  const fitchPharmaRequest=()=>{
    axios.get(`http://${Api}/drugs/pharmacyParameter/?approved=False`)
    .then((r)=>setPharRequest(r.data))
    .catch((err)=>console.log(err))
}
React.useEffect(()=>{fitchPharmaRequest()},[])
const HumanReadableDateTime = ({ dateTimeString }) => {
  const formattedDateTime = new Date(dateTimeString).toLocaleString();

  return <Text>{formattedDateTime}</Text>;
};
  return (
    <SafeAreaView>
      <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('RegisterHome')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Requests</Text>    
         </View>
      <ScrollView style={{height:600,backgroundColor:Colors.lightPrimary}}  scrollEnabled={true}>
      <View style={{
        paddingHorizontal:Spacing,
        paddingTop:Spacing,
      }}>
        <Text style={{
          fontSize:FontSize.large, 
          color:Colors.primary,
          fontFamily:Font['poppins-bold'], 
          textAlign:'left'}}>
         Request Lists
        </Text>
       
        {phaRequest.length>0?phaRequest.map((req)=>{return(
          <View key={req.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*90/100,height:Layout.height*35/100,borderWidth:1}}>
          <TouchableOpacity  onPress={()=>handleView(req.id,req.name,req.OwnersFname,req.ownersLname,req.document.id,req.document.name,req.document.image,req.location.id,req.location.latitude,req.location.longitude,req.email,req.licenseNo,req.phoneNo,req.subCity,req.kebele,req.houseNo)} >
         <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
            <Icon name='hospital-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
          <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{req.name}</Text>
          </View> 
          <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
          <Icon name='user-o' size={Layout.width*10/100} style={{margin:5,color:Colors.primary}} />
            <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*50/100, marginLeft:Layout.width*1/100}}>{req.OwnersFname+' '+req.ownersLname}</Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:1,borderStyle:'dashed',alignItems:'center',}}>
          <Ionicons name='mail-outline' size={Layout.width*10/100} style={{margin:5,color:Colors.primary}} />
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{req.email}</Text>
          </View>
          <View style={{flexDirection:'row',borderBottomWidth:1,borderStyle:'dashed',alignItems:'center',}}>
          <Ionicons name='call-outline' size={Layout.width*10/100} style={{margin:5,color:Colors.primary}} /> 
           <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{req.phoneNo}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',}}>
          <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:5, }}>Requested at: <HumanReadableDateTime dateTimeString={req.created_at}/></Text>
      
          </View>
         
          </TouchableOpacity>
        </View>
        )}):(<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>No Requests</Text></View></View>)}
        
      </View>
      </ScrollView>
      {isVisible && (
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
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Licence number:{LicenceNo}</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Name:{name}</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Owner Name:{ownerFName+' '+ownerLName}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Phone Number:{phoneNo}</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Email:{email}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Sub city:{subCity}</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Kebele:{Kebele}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>House Number:{houseNo}</Text>
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
              Legal Documents
            </Text>
            <View style={{borderRadius:5, borderColor:Colors.primary}}>
             <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Doc Type:{docName}</Text>
             <View style={{ height: Layout.height*65/100 }}>
              <Image  source={ {uri: docImage }} style={{ width: Layout.width*83/100, height: Layout.height*63/100 }} />
            </View>
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
                    latitude:parseFloat(locLatitude) ,
                    longitude: parseFloat(locLongitude),
                    latitudeDelta: 0.0052,
                    longitudeDelta: 0.0051,
                  }}> 
                  <Marker 
            coordinate={{
              latitude:parseFloat(locLatitude) ,
                    longitude: parseFloat(locLongitude),
            }}
            title={name+' '+'Pharmacy'}
          />
                </MapView>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              {/* <TouchableOpacity
                onPress={() =>
                  Alert.alert("Block", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:toggleFloatScreen3},
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor: "red",
                  borderRadius: Spacing / 2,
                  marginRight:Layout.height*5/100
                  
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
                  Delete Request
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Approve", "Are you sure?Yow want to Register as legal pharmacy?", [
                    { text: "No" },
                    { text: "Yes" ,onPress:handleUpdate},
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.primary,
                  borderRadius: Spacing / 2,
                  marginRight:Layout.height*3/100
                  
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
                 Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleFloatScreen}
                style={{
                  padding: Spacing,
                  paddingRight: 20,
                  alignSelf:'flex-end',
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
                 OK
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
              Pharmacy Request Approved successfully!
            </Text>   
            <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
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
              Pharmacy Request Deleted successfully!
            </Text>   
            <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
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
      <View  style={{flexDirection:'row',alignItems:'flex-end',}}>
      <TouchableOpacity onPress={()=>navigate('RegisterHome')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('RegisterPharmacy')} style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterRequests')}  style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/document.png")}></Image>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterFeedbacks')}  style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/feedback.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>feedbacks</Text>
            </TouchableOpacity> 
          </View>
</SafeAreaView>
  )
}

export default RegisterRequests