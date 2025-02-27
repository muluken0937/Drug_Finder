import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,Alert,Image,
  TextInput,
  TouchableOpacity,ActivityIndicator,
  View,
  Button,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import Api from "../constants/Api";
import { useSelector } from "react-redux";
// import Geolocation from "@react-native-community/geolocation";
import {height} from '../constants/Layout'
const AddPharmacyScreen = ({navigation:{navigate}}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [isVisible3,setIsVisible3]= React.useState(false)
  const [h1,setH1]=useState(0)
  const [h2,setH2]=useState(Layout.height*65/100)
  const [isLoading, setIsLoading] = useState(false);

  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)


  const toggleFloatScreen2 = () => {
    setIsVisible2(!isVisible2);
    if (!isVisible){
      setIsVisible(isVisible)
    }else{
      setIsVisible(!isVisible)
    }
  };
  const handleAnother=()=>{
    setImageUri(null)
    setH1(0)
    setH2(Layout.height*65/100)
  }
  const toggleFloatScreen3 = () => {
    setIsVisible3(!isVisible3);
  };
  //Email validation
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (value) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };
  const h = Layout.height;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    } 
  
  }

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
  
  const handleUploadPhoto = async () => { 
    try { 
      const formData = new FormData(); 
      formData.append('image', { 
        uri: imageUri, 
        type: 'image/jpeg', 
        name: 'photo.jpg', 
      }); 
      const response = await axios.post( 
        'http://your-django-backend.com/upload-photo', 
        formData, 
        { 
          headers: { 
            'Content-Type': 'multipart/form-data', 
          }, 
        } 
      ); 
      console.log(response.data); 
    } catch (error) { 
      console.error(error); 
      toggleFloatScreen2()
    } 
  }; 

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
  }; 
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
  
  // Call the function to retrieve the user's location
  useEffect(() => {
    getLocationAsync();
  }, []);

  const handleSubmit=()=>{
    setIsLoading(true);
    try{
      const formData = new FormData();
      formData.append('document.name', 'Pharmacy Licence');
      formData.append('document.image', {
        uri: imageUri,
        name: 'PharmacyLicence.jpg',
        type: 'image/jpeg',
      });
      formData.append('location.latitude', location.latitude);
      formData.append('location.longitude',location.longitude,);
      formData.append('name', name);
      formData.append('OwnersFname', ownerFName);
      formData.append('ownersLname', ownerLName);
      formData.append('email', email);
      formData.append('phoneNo', phoneNo);
      formData.append('licenseNo', LicenceNo);
      formData.append('subCity', subCity);
      formData.append('kebele', Kebele);
      formData.append('houseNo', houseNo);
      formData.append('approved', false);
      axios.post(`http://${Api}/drugs/pharmacyList/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
          },
        }).then((res) => {
          const pharmacyID = res.data.id;
  
      // Update the Account model
      axios.put(`http://${Api}/registerDetails/${userID}`, {
        first_name:first,
        last_name:last, 
        role: 3,
        pharmacy_id: pharmacyID,
        
      }).then((r)=>toggleFloatScreen3()).catch((err)=>console.log(err))
          
          // setH2(Layout.height*65/100) 
          // setH1(0)
        })
        .catch((error) => {
          console.log(error);
          alert('Something went wrong!');
        });
    }catch (err){
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  }
 //////////////////////--BACKEND CODE--///////////////////
    
    const [name, setName]=React.useState('')
    const [ownerFName, setOwnerFname]=React.useState('')
    const [ownerLName, setOwnerLname]=React.useState('')
    const [LicenceNo, setLienceNo]=React.useState('')
    const [phoneNo, setPhoneNo]=React.useState('')
    const [subCity, setSubCity]=React.useState('')
    const [Kebele, setKebele]=React.useState('')
    const [houseNo, setHouseNo]=React.useState('')
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{flexDirection:'row', shadowColor:'gray',shadowOffset:{width:0,height:Spacing},shadowOpacity:0.3,shadowRadius:Spacing}}>
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Add new pharmacy</Text>
        </View>
    <ScrollView style={{height:Layout.height*95/100,flex:1, backgroundColor:'#F5DFF4'}}  scrollEnabled={true}>
    <View style={{
      paddingHorizontal:Spacing,
      paddingTop:Spacing/2,
    }}>
      <Text style={{
        fontSize:FontSize.large, 
        color:Colors.primary,
        fontFamily:Font['poppins-bold'], 
        textAlign:'left'}}>
       Fill the information below
      </Text>
     
      <View  style={{
          }}>
          <TextInput value={name} onChangeText={setName} placeholder="Pharmacy name" 
          placeholderTextColor={Colors.darkText} 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            
          }}/> 
          {!name.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput value={ownerFName} onChangeText={setOwnerFname}
            placeholder="Owner First name" 
            autoCapitalize="characters"
            placeholderTextColor={Colors.darkText}
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
              marginVertical:Spacing
          }}/>
          {!ownerFName.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput value={ownerLName} onChangeText={setOwnerLname}
            placeholder="Owner Last name" 
            autoCapitalize="characters"
            placeholderTextColor={Colors.darkText}
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
              marginVertical:Spacing
          }}/>
          {!ownerLName.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput value={LicenceNo} onChangeText={setLienceNo}
            placeholder="Pharmacy licence number" 
            autoCapitalize="characters"
            placeholderTextColor={Colors.darkText}
            style={{
              fontFamily:Font['poppins-regular'],
              fontSize:FontSize.small,
              padding:Spacing*2,
              backgroundColor:Colors.lightPrimary,
              borderRadius:Spacing,
              marginVertical:Spacing
          }}/>
          {!LicenceNo.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput value={phoneNo} onChangeText={setPhoneNo}
          placeholder="Owner phone number" 
          placeholderTextColor={Colors.darkText}
          keyboardType='phone-pad'
          maxLength={10}
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing/2
          }}/>
          {!phoneNo.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput 
           value={email}
           onChangeText={handleEmailChange}
            placeholder="Owner Email Address" 
            placeholderTextColor={Colors.darkText}
            keyboardType='email-address'
            style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing/2
          }}/>
          {!isValidEmail && (
             <Text style={{color: 'red' }}>Please enter a valid email address</Text>)}
          {!email.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput value={subCity} onChangeText={setSubCity} placeholder="Sub city" 
          placeholderTextColor={Colors.darkText} 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing
          }}/>
          {!subCity.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput value={Kebele} onChangeText={setKebele} placeholder="Kebele" 
          placeholderTextColor={Colors.darkText} 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            marginBottom:20,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
          }}/>
          {!Kebele.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <TextInput value={houseNo} onChangeText={setHouseNo} placeholder="House number" 
          placeholderTextColor={Colors.darkText} 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            marginBottom:20,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
          }}/>
          {!houseNo.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

          <View style={{borderTopWidth:3,borderTopColor:Colors.active}}>
            <Text style={{
              marginTop:Layout.height*5/100,
          fontSize:FontSize.large, 
          color:Colors.primary,
          fontFamily:Font['poppins-bold'], 
          textAlign:'left'}}>
           pharmacy Location
        </Text> 
            <View style={{height:Layout.height*70/100,borderWidth:1, borderRadius:5, }}>
            <View style={{ flex: 1 }}>
      {location ? (
        <MapView onPress={handleMapPress} mapType="hybrid" showsCompass={true} showsUserLocation={true}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0052,
            longitudeDelta: 0.0051,
          }}
        >
          <Marker 
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Current Location"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
            </View>
          </View>
          <View style={{borderBottomColor:Colors.active,borderBottomWidth:3,borderRadius:1, marginBottom:10}}>
          <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.medium,
            color:Colors.active,
            alignSelf:'center'}}>Place the marker on the eaxct your location</Text>
        <TouchableOpacity onPress={()=>getLocationAsync()} style={{
           padding:Spacing,
           marginTop:Spacing,
           backgroundColor:'brown',
           borderRadius:Spacing/2,
           marginRight:Spacing,
           marginBottom:Layout.height*5/100
        }}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.medium,
            color:Colors.onPrimary,
            alignSelf:'center'}}>Show current loc..</Text>
            </TouchableOpacity>
            </View>
        </View>
            <View
          style={{
            paddingHorizontal: Spacing,
            paddingTop: Spacing,
          }}
        >
          <Text style={{
          fontSize:FontSize.large, 
          color:Colors.primary,
          fontFamily:Font['poppins-bold'], 
          textAlign:'left'}}>
           Upload Document here
        </Text> 
          <View style={{borderRadius:1,borderWidth:1,marginBottom:Layout.height*3/100, height:h2}}>
            <View  style={{flexDirection:'row',marginTop:Layout.height*25/100}}>
              <TouchableOpacity onPress={handleTakePhoto} style={{marginLeft:Layout.height*8/100,marginRight:Layout.height*5/100}}>
              <Ionicons
          name="camera-outline"
          color={Colors.primary}
          size={Spacing * 7}
        /><Text style={{fontFamily:Font["poppins-semiBold"]}}>Take a picture</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleChoosePhoto}><Ionicons
          name="file-tray-full-outline"
          color={Colors.primary}
          size={Spacing * 7}
        /><Text style={{fontFamily:Font["poppins-semiBold"]}}>Choose from file</Text></TouchableOpacity></View>
         {imageUri==null ? <Text style={{ color: 'red',marginLeft:10,marginTop:Layout.height*20/100,fontSize:FontSize.large}}>* Required!</Text> : null}

          </View>
           {imageUri && ( 
      <Image style={{height:h1,flex:1,marginBottom:10, }} source={{ uri: imageUri }} /> 
    )} 
   
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={handleAnother}
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
                style={{
                  fontFamily: Font["poppins-semiBold"],
                  fontSize: FontSize.medium,
                  color: Colors.onPrimary,
                  alignSelf: "center",
                }}
              >
               Try another picture
              </Text>
            </TouchableOpacity>
            <View>
  </View> 
          </View>
         
        </View>
            <TouchableOpacity
            onPress={() =>
              Alert.alert("Approve", "Are you sure?", [
                { text: "No" },
                { text: "Yes" ,onPress:handleSubmit},
              ])
            }
            disabled={
              !(
                phoneNo&&
                  ownerFName&&
                  ownerLName&&
                  name&&
                  email &&
                  imageUri&&
                  LicenceNo&&
                  subCity&&
                  Kebele&&
                  houseNo
              )
            }
            style={[
              styles.button,
              {
                opacity:
                phoneNo&&
                ownerFName&&
                ownerLName&&
                name&&
                email &&
                imageUri&&
                LicenceNo&&
                subCity&&
                Kebele&&
                houseNo
                    ? 1
                    : 0.5,
              },
            ]}
            >
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            color:Colors.onPrimary,
            alignSelf:'center'}}>Send Register Request {isLoading && (
              <View style={styles.progressBar}>
                <ActivityIndicator size={70} color="#0000ff" />
              </View>
            )}</Text>
            </TouchableOpacity>
            
    </View>
    </ScrollView>
      {isVisible3 && (
        <ScrollView
          style={{
            height: Layout.height*70/100,
            position: "absolute",
            bottom: (Layout.height * 30) / 100,
            backgroundColor: "white",
            padding: 5,
            borderRadius: 10,
            elevation: 15,
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
               Dear {first} {last}, Your Request have been sent successfully! yo will get response soon. we would like to inform you that
              after the aproval of your pharmacy. you will be a pharmacy manager of yours pharmacy!  
            </Text>   
            <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
              <TouchableOpacity
                onPress={()=>navigate('LoggedHome')}
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
   
        
</SafeAreaView>
  )
}

export default AddPharmacyScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    padding:Spacing,
           marginTop:Spacing,
           backgroundColor:Colors.primary,
           marginVertical:Spacing*3,
           borderRadius:Spacing
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
