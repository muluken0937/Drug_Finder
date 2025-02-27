import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Alert,Image,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Layout from "../constants/Layout";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import MapView from "react-native-maps";
  import { useState } from "react";
  import Api from "../constants/Api";
  import axios from "axios";
  import Icon from 'react-native-vector-icons/FontAwesome';
const AdminAccountScreen = ({navigation:{navigate}}) => {
  
  const [isVisible, setIsVisible] = React.useState(false);
  

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
  
  
 
  const [user,setUser]= React.useState([])

const fetchUser=()=>{
  axios.get(`http://${Api}/registerParameter/?role=2`)
      .then((r)=>setUser(r.data))
      .catch((err)=>console.log(err))
}
React.useEffect(()=>{fetchUser()},[])
  
  const deleteAccount=(ID)=>{
    axios.delete(`http://${Api}/accountDetails/${ID}`)
    .then((res)=>{alert('Deleted successully'),fetchUser()})
    .catch((err)=>console.log(err))
  }

  const [fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
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
  const handleSubmit = () => {
    if (
      isValidEmail &&
      isValidPassword &&
      passwordsMatch &&
      fname &&
      Lname &&
      email &&
      newPassword
    ) {
      // Create an object with the input data
      const data = {
       
        email: email,
        first_name: fname,
        last_name: Lname,
        role: 2,
        is_staff: true,
        is_superuser: false,
        password: confirmPassword,
      };

      // Make a POST request to the Django API endpoint with axios
      axios
        .post(`http://${Api}/register/`, data)
        .then(() => {
          // Handle the successful response
          alert("Success");fetchUser(),setIsVisible(!isVisible)
        })
        .catch((error) => {
          // Handle the error response
          console.log(error);
          alert('This email address is already exist!');
        });
    } else {
      // Show an error message when the form is not valid
      alert("Please fill in all the required fields correctly.");
    }
  };
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('SysAdmin')}
          style={{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5}}>
            <Ionicons name="chevron-back-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Manage account</Text>
            <TouchableOpacity 
          onPress={toggleFloatScreen}
          style={{
            marginLeft:Spacing*2,
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:2}}>
            <Ionicons name="add-outline" color={Colors.primary} size={Spacing*3}/>
            </TouchableOpacity>
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Manage account</Text>
    
            
         </View>
         <Text style={{backgroundColor:Colors.lightPrimary,
          fontSize:FontSize.large, 
          color:Colors.primary,marginLeft:10,
          fontFamily:Font['poppins-bold'], 
          textAlign:'left'}}>
          You created account for
        </Text>
      <ScrollView style={{height:Layout.height*79/100,backgroundColor:Colors.lightPrimary}}  scrollEnabled={true}>
      <View style={{
        paddingHorizontal:Spacing,
        paddingTop:Spacing,
      }}>
       
        {user.map((use) => {
  return (
    
     <View key={use.id} style={{margin:5,borderRadius:20,backgroundColor:Colors.onPrimary,width:Layout.width*93/100,borderWidth:1}}>
              <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
                <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{use.first_name} {use.last_name}</Text>
              </View>
              <View style={{ borderBottomWidth:1,borderStyle:'dashed'}}>
              <View style={{flexDirection:'column',}}>
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10, marginLeft:Layout.width*1/100}}>Email: <Text style={{color:Colors.text, fontFamily:Font["poppins-regular"],fontSize:FontSize.medium,width:Layout.width*90/100, marginLeft:Layout.width*10/100}}>{use.email}</Text></Text>
</View>
              </View>
              <View style={{flexDirection:'row'}}>
              {/* <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,},
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor:Colors.onPrimary,
                  borderRadius: Spacing / 2,
                  borderWidth:1,
                  borderColor:'blue',
                  width:Layout.width*20/100,
                  alignSelf:'flex-end',
                  marginTop:10,
                  marginRight:Layout.width*40/100,
                  marginLeft:Layout.width*5/100,
                  marginBottom:Layout.width*5/100}}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: 'blue',
                    alignSelf: "center",
                  }}
                >
                  Block
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{deleteAccount(use.id)}},
                  ])
                }
                style={{
                  padding: Spacing,
                  backgroundColor:Colors.onPrimary,
                  borderRadius: Spacing / 2,
                  borderWidth:1,
                  borderColor:'red',
                  width:Layout.width*20/100,
                  alignSelf:'flex-end',
                  marginTop:10,
                  marginLeft:Layout.width*70/100,
                  marginRight:Layout.width*10/100,
                  marginBottom:Layout.width*5/100}}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: 'red',
                    alignSelf: "center",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
              </View>
              
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
          <KeyboardAvoidingView>
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text style={{fontFamily:Font["poppins-bold"], fontSize:FontSize.large,color:Colors.primary}}>Create a new Account</Text>
            <View style={{  }}>
            <View >
            <TextInput
                value={fname}
                onChangeText={setFname}
                placeholder="First name"
                placeholderTextColor={Colors.darkText}
                style={styles.input}
              />
              {!fname.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

              <TextInput
                value={Lname}
                onChangeText={setLname}
                placeholder="Last name"
                placeholderTextColor={Colors.darkText}
                style={styles.input}
              />
              {!Lname.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Email"
                placeholderTextColor={Colors.darkText}
                keyboardType="email-address"
                style={styles.input}
              />
              {!email.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

              {!isValidEmail && (
                <Text style={{ color: "red" }}>
                  Please enter a valid email address
                </Text>
              )}
             
              <TextInput
                value={newPassword}
                onChangeText={handleNewPasswordChange}
                placeholder="New password"
                placeholderTextColor={Colors.darkText}
                secureTextEntry
                style={styles.input}
              />
              {!newPassword.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

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
              {!confirmPassword.trim() ? <Text style={{ color: 'red' }}>* Required!</Text> : null}

              {!passwordsMatch && confirmPassword.length > 0 && (
                <Text style={{ color: "red" }}>Passwords do not match</Text>
              )}
        </View>
        </View>
            <View
              style={{
                marginTop:20,
                flexDirection:"row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={toggleFloatScreen}
                style={{
                  padding: Spacing,
                  marginRight:Layout.width*50/100,
                  alignItems: "center",
                  backgroundColor: "brown",
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
                 Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Create", "Are you sure? You want to Create this account", [
                    { text: "No" },
                    { text: "Yes",onPress:handleSubmit },
                  ])
                }
                disabled={
                  !(
                    isValidEmail &&
                    isValidPassword &&
                    passwordsMatch &&
                    fname &&
                    Lname &&
                    email &&
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
                      fname &&
                      Lname &&
                      email &&
                      newPassword
                        ? 1
                        : 0.5,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.medium,
                    color: Colors.onPrimary,
                    alignSelf: "center",
                  }}
                >
                  Create
                </Text>
              </TouchableOpacity>
              

            </View>
          </View>
          </KeyboardAvoidingView>
          
          
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
              Account created successfully!
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
      
      <TouchableOpacity onPress={()=>navigate('SysAdmin')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('AdminAccount')}   style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width/6,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/skills.png")}></Image>
             <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Accounts</Text>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=>navigate('Database')}  style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width/8,width:Layout.width*28/100, padding:Spacing,}}>
            <Ionicons name="layers-outline" color={Colors.primary} size={Spacing*3}/>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Adminstration</Text>
            </TouchableOpacity>
          </View>
</SafeAreaView>
  )
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

export default AdminAccountScreen