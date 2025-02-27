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
import { Pharmacis, SlidingImages } from "./PharmacyReport";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";
const RegisterHome = ({navigation,navigation:{navigate}}) => {
  const userID=useSelector((state)=>state.User_ID)
    const first=useSelector((state)=>state.FName)
    const Email=useSelector((state)=>state.userEmail)
    const last=useSelector((state)=>state.LName)
    const changed=useSelector((state)=>state.isChangedPassword)
    const pharmacyId=useSelector((state)=>state.pharmaID)
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
  };
  const [pharmacy, setPharmacy] = useState([]);

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
        role: 2,
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
}else{
  
    

  return (
    <SafeAreaView>
        <View style={{flexDirection:'row'}}>
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
          <TouchableOpacity 
          onPress={()=>navigate('RegisterSearch')}
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
          <ScrollView style={Layout.styles.scrollContainer}>
            <View>
              <SlidingImages />
            </View>
            <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,}}>
            <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Dashboard
            </Text>
            <View style={{ height:Layout.height*42/100,width:Layout.width*96/100, borderRadius:5, borderColor:Colors.primary,backgroundColor:Colors.onPrimary}}>
            <Pharmacis navigation={navigation}/>
            </View>   
          </View>
          <Text style={{marginLeft:10,
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              Pharmacies
            </Text>
          <ScrollView horizontal>
          {pharmacy.map((req) => {
  const averageRating = calculateAverageRating2(req.ratings);

  return (
    <View key={req.id} style={{ borderRadius: 5, borderColor: Colors.primary }}>
      <TouchableOpacity
         onPress={()=>handleView(req.id,req.name,req.OwnersFname,req.ownersLname,req.document.name,req.document.image,req.location.latitude,req.location.longitude,req.email,req.licenseNo,req.phoneNo,req.subCity,req.kebele,req.houseNo)} 
        style={{
          
          height: Layout.height * 12 / 100,
          backgroundColor: Colors.onPrimary,
          borderRadius: Spacing / 3,
          borderColor:Colors.primary,
          marginLeft:5,
          width:Layout.width*90/100,
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
          </ScrollView>
          <Text style={{marginLeft:10,
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              New requests
            </Text>
          <ScrollView horizontal>
          {phaRequest.length>0?phaRequest.map((req)=>{return(
          <View key={req.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*90/100,height:Layout.height*35/100,borderWidth:1}}>
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
         
          
        </View>
        )}):(<View><View style={{alignItems:"center"}}><Text style={{marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:'red',}}>No Requests</Text></View></View>)}
          </ScrollView>
        
          </ScrollView>{isLoading &&(<Activity/>)}{isVisible && (
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
      )}
          <View  style={{flexDirection:'row',}}>
          <TouchableOpacity onPress={()=>navigate('RegisterHome')} style={{alignItems:'center', backgroundColor:Colors.primary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.onPrimary} size={Spacing*3}/>
              <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('RegisterPharmacy')} style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterRequests')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/document.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterFeedbacks')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/feedback.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>feedbacks</Text>
            </TouchableOpacity> 
          </View>
    </SafeAreaView>
  )
}
}
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
export default RegisterHome