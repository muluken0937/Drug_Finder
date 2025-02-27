import {
    SafeAreaView,
    ScrollView,
    StyleSheet,Image,
    Text,
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
  import MapView,{Marker} from "react-native-maps";
  import axios from "axios";
  import Api from "../constants/Api";
  import { useState,useEffect } from "react";
  import Activity from "./Activity";
  import Icon from 'react-native-vector-icons/FontAwesome';
const FreePharmacyList = ({navigation:{navigate} }) => {
  const [isVisible, setIsVisible]= React.useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
    
    const [locLatitude, setLocLatitude]=React.useState('')
    const [locLongitude, setLocLongitude]=React.useState('')
    const [name, setName]=React.useState('')
    const [email, setEmail]=React.useState('')
    const [phoneNo, setPhoneNo]=React.useState('')
    const [subCity, setSubCity]=React.useState('')
    const [Kebele, setKebele]=React.useState('')
    const [ID, setID]=React.useState('')
    const handleView =(id,Name,latit,longi,Email,phone,SubCity,kebele,)=>{
     setName(Name)
     setID(id)
     setEmail(Email),
     setLocLatitude(latit)
     setLocLongitude(longi)
     setSubCity(SubCity),
     setKebele(kebele)
     setPhoneNo(phone)
     setIsVisible(!isVisible);
    }
    const [pharmacy, setPharmacy] = useState([]);

  const fetchPharmacy = () => {
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/pharmacyParameter/?approved=True`)
      .then((response) => {
        // Fetch ratings for each pharmacy
        const pharmacyData = response.data;
        const fetchRatingsPromises = pharmacyData.map((pharma) =>
          axios.get(`http://${Api}/drugs/ratingList/?pharmacy=${pharma.id}`)
        );

        // Wait for all the ratings to be fetched
        Promise.all(fetchRatingsPromises)
          .then((ratingsResponses) => {
            // Combine pharmacy data with the corresponding ratings
            const updatedPharmacyData = pharmacyData.map((pharma, index) => ({
              ...pharma,
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
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('HomeFree')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
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
          pharmacies
        </Text>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{
            fontSize:FontSize.small, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            marginLeft:30}}>Pharmacy Name
             </Text>
             
             <Text style={{
            fontSize:FontSize.small, 
            color:Colors.primary,
            fontFamily:Font['poppins-bold'], 
            marginRight:10}}>
                     Approved?
             </Text>
      </View>
      {pharmacy.map((pharma) => {
  const averageRating = calculateAverageRating2(pharma.ratings);

  return (
    <View key={pharma.id} style={{ borderRadius: 5, borderColor: Colors.primary }}>
      <TouchableOpacity
        onPress={() =>
          handleView(
            pharma.id,
            pharma.name,
            pharma.location.latitude,
            pharma.location.longitude,
            pharma.email,
            pharma.phoneNo,
            pharma.subCity,
            pharma.kebele
          )
        }
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
            marginLeft: 10,
            fontFamily: Font['poppins-semiBold'],
            fontSize: Layout.width * 6 / 100,
            color: Colors.primary,
            // alignSelf:'left'
          }}>{pharma.name} pharmacy</Text>
          <Ionicons name="checkmark-done-circle" color={Colors.primary} style={{ paddingTop: 15 }} size={Spacing * 3} />
        </View>
        <View style={{ flexDirection: 'row', marginTop:1 }}>
          <Text style={{
            width: '60%',
            marginLeft: 5,
            fontFamily: Font['poppins-semiBold'],
            fontSize: Layout.width * 5 / 100,
            color: Colors.primary,
          }}>tel:- {pharma.phoneNo}</Text>
          <RatingStars averageRating={averageRating} />
        </View>
      </TouchableOpacity>
    </View>
  );
})} 
      </View>
      </ScrollView>
      {isVisible && (
        <View style={{
          height: Layout.height*85/100,
          position: "absolute",
          bottom: (Layout.height * 15) / 100,
          backgroundColor: "white",
          marginLeft:10,
          borderRadius: 10,
          width:Layout.width*95/100,
          elevation: 10,
        }}>
           <ScrollView
        style={{
          
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
            <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Pharmacy Name: {name}</Text>
                <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Phone Number: {phoneNo}</Text>
                <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Email: {email}</Text>
                <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Sub city: {subCity}</Text>
                <Text style={{marginLeft:10,fontSize:FontSize.medium,fontFamily:Font["poppins-regular"],color:Colors.primary}}>Kebele: {Kebele}</Text>
             </View>
            </View>
        <View style={{
            paddingHorizontal:Spacing,
            
          }}>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
             Pharmacy Location
            </Text>
            <View style={{height:Layout.height*50/100,borderWidth:1, borderRadius:5, borderColor:Colors.primary, marginBottom:10}}>
                <MapView mapType="hybrid" style={{flex:1}} showsCompass={true} showsUserLocation={true}
                  initialRegion={{
                    latitude:parseFloat(locLatitude) ,
                    longitude: parseFloat(locLongitude),
                    latitudeDelta: 0.0052,
                    longitudeDelta: 0.0051,
                  }}
                  > 
                  <Marker 
            coordinate={{
              latitude: parseFloat(locLatitude),
              longitude: parseFloat(locLongitude),
            }}
            title={name+' '+'Pharmacy'}
          />
                </MapView>
            </View>
            
         </View>
      </ScrollView>
      <TouchableOpacity
                onPress={toggleFloatScreen}
                style={{marginTop:10,
                  width:Layout.width*50/100,
                  marginBottom:10,
                  padding: Spacing,
                  alignSelf:'center',
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
        
      )}{isLoading &&(
        <Activity/>
      )}
      <View  style={{flexDirection:'row',alignItems:'flex-end', }}>
            <TouchableOpacity onPress={()=>navigate('HomeFree')} style={{alignItems:'center', marginLeft:Layout.width*1/100,width:Layout.width/5,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}} >Home</Text>
            </TouchableOpacity >
            
            <TouchableOpacity onPress={()=>navigate('FreePharmacyList')} style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width/5,width:Layout.width/4.5, padding: Spacing}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}} >Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('FreeDrugList')}  style={{alignItems:'center',marginLeft:Layout.width/7,width:Layout.width/5, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
          </View>
</SafeAreaView>
  )
}

export default FreePharmacyList