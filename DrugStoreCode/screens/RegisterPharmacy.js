import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Alert,
    TextInput,Image,
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
  import MapView,{Marker} from "react-native-maps";
  import axios from "axios";
  import Api from "../constants/Api";
  import { useState,useEffect } from "react";
  import Activity from "./Activity";
const RegisterPharmacy = ({navigation:{navigate}}) => {
  const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible]= React.useState(false)
    const [docName, setdocName]=React.useState([])
    const [docImage, setDocImage]=React.useState('')
    const [locLatitude, setLocLatitude]=React.useState('')
    const [locLongitude, setLocLongitude]=React.useState('')
    const [name, setName]=React.useState('')
    const [ownerFName, setOwnerFname]=React.useState([])
    const [ownerLName, setOwnerLname]=React.useState('')
    const [email, setEmail]=React.useState('')
    const [LicenceNo, setLienceNo]=React.useState('')
    const [phoneNo, setPhoneNo]=React.useState('')
    const [subCity, setSubCity]=React.useState('')
    const [Kebele, setKebele]=React.useState('')
    const [houseNo, setHouseNo]=React.useState('')
    const [ID, setID]=React.useState('')
    const handleView =(id,Name,Fname,Lname,DocName,DocImage,latit,longi,Email,Licence,phone,SubCity,kebele,House)=>{
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
     setSubCity(SubCity),
     setKebele(kebele)
     setPhoneNo(phone)
     setHouseNo(House)
     setIsVisible(!isVisible);
    }
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const [isVisible2, setIsVisible2] = React.useState(false);

  const toggleFloatScreen2 = () => {
    setIsVisible2(!isVisible2);
    if (!isVisible){
      setIsVisible(isVisible)
    }else{
      setIsVisible(!isVisible)
    }
  };const [pharmacy, setPharmacy] = useState([]);

  const fetchPharmacy = () => {
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/pharmacyParameter/?approved=True`)
      .then((response) => {
        // Fetch ratings for each pharmacy
        const pharmacyData = response.data;
        const fetchRatingsPromises = pharmacyData.map((req) =>
          axios.get(`http://${Api}/drugs/ratingList/?pharmacy=${req.id}`)
        );

        // Wait for all the ratings to be fetched
        Promise.all(fetchRatingsPromises)
          .then((ratingsResponses) => {
            // Combine pharmacy data with the corresponding ratings
            const updatedPharmacyData = pharmacyData.map((req, index) => ({
              ...req,
              ratings: ratingsResponses[index].data,
            }));
            setPharmacy(updatedPharmacyData);setIsLoading(false)
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false)
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPharmacy();
  }, []);

  // Function to calculate average rating for a pharmacy
  const RatingStars = ({ averageRating }) => {
    // Calculate the number of filled stars
    const filledStars = Math.floor(averageRating);
  
    return (
      <View style={{ flexDirection: 'row' }}>
        {/* Filled stars based on the average rating */}
        {Array.from({ length: filledStars }).map((_, index) => (
          <Ionicons key={`filled-star-${index}`} style={{marginLeft:3}} name="star" color="gold" size={Spacing * 2} />
        ))}
        {/* Empty stars based on the average rating */}
        {Array.from({ length: 5 - filledStars }).map((_, index) => (
          <Ionicons key={`empty-star-${index}`} style={{marginLeft:3}} name="star-outline" color="gold" size={Spacing * 2} />
        ))}
      </View>
    );
  };
  // Function to calculate average rating from an array of ratings
  const calculateAverageRating2 = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / ratings.length;
  };
const deletePharmacy=()=>{ 
  axios.delete(`http://${Api}/drugs/pharmacyDetails/${ID}`)
  .then((res)=>alert('Deleted successully'),fetchPharmacy(),toggleFloatScreen())
  .catch((err)=>console.log(err))
}
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Pharmacy Lists</Text>    
         </View>
         <View style={{
          paddingHorizontal:Spacing,
          backgroundColor:Colors.lightPrimary
        }}><Text style={{
          fontSize:FontSize.large, 
          color:Colors.primary,
          fontFamily:Font['poppins-bold'], 
          textAlign:'left'}}>
          pharmacy
        </Text></View>
      <ScrollView style={{height:Layout.height*79/100,backgroundColor:Colors.lightPrimary}}  scrollEnabled={true}>
      <View style={{
        paddingHorizontal:Spacing,
        paddingTop:Spacing,
      }}>
        
        
        {pharmacy.map((req) => {
  const averageRating = calculateAverageRating2(req.ratings);

  return (
    <View key={req.id} style={{ borderRadius: 5, borderColor: Colors.primary }}>
      <TouchableOpacity
         onPress={()=>handleView(req.id,req.name,req.OwnersFname,req.ownersLname,req.document.name,req.document.image,req.location.latitude,req.location.longitude,req.email,req.licenseNo,req.phoneNo,req.subCity,req.kebele,req.houseNo)} 
        style={{
          marginTop: 5,
          height: Layout.height * 12 / 100,
          backgroundColor: Colors.onPrimary,
          borderRadius: Spacing / 3,
          borderColor:Colors.primary,
          borderWidth:1
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={{
            width: '85%',
            marginLeft: 2,
            fontFamily: Font['poppins-semiBold'],
            fontSize: Layout.width * 7 / 100,
            color: Colors.primary,
            // alignSelf:'left'
          }}>{req.name} pharmacy</Text>
          <Ionicons name="checkmark-done-circle" color={Colors.primary} style={{ paddingTop: 15 }} size={Spacing * 3} />
        </View>
        <View style={{ flexDirection: 'row', marginTop:1 }}>
          <Text style={{
            width: '60%',
            marginLeft: 5,
            fontFamily: Font['poppins-semiBold'],
            fontSize: Layout.width * 5 / 100,
            color: Colors.primary,
          }}>tel:- {req.phoneNo}</Text>
          <RatingStars averageRating={averageRating} />
        </View>
      </TouchableOpacity>
    </View>
  );
})}
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
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{deletePharmacy()}},
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor: "red",
                  borderRadius: Spacing / 2,
                  marginRight:Layout.height*15/100
                  
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
                  Delete Pharmacy
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
      )}{isLoading &&(<Activity/>)}
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
              Pharmacy Deleted successfully!
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
      <View  style={{flexDirection:'row',alignItems:'flex-end',}}>
      <TouchableOpacity onPress={()=>navigate('RegisterHome')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('RegisterPharmacy')} style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding: Spacing}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterRequests')}  style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/document.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterFeedbacks')}  style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/feedback.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>feedbacks</Text>
            </TouchableOpacity> 
          </View>
</SafeAreaView>
  )
}

export default RegisterPharmacy