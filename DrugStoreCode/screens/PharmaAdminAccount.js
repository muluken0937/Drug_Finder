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
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import Layout from "../constants/Layout";
  import { useState } from "react";
  import axios from "axios";
  import Api from "../constants/Api";
  import { useSelector } from "react-redux";

const PharmaAdminAccount = ({navigation:{navigate}}) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selected, setSelected] = useState('');
  const [AId, setAid] = useState('');

  const handleOptionChange1 = () => {
    setSelectedOption(5);
    setSelected('Pharmacist')
  };
  const handleOptionChange2 = () => {
    setSelectedOption(6);
    setSelected('Deliverer')
  };
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
  const [isVisible, setIsVisible] = React.useState(false);
  

  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const [isVisible2, setIsVisible2] = React.useState(false);

  const toggleFloatScreen2 = () => {
    setIsVisible2(!isVisible2);
    fetchAccount()
    if (!isVisible){
      setIsVisible(isVisible)
    }else{
      setIsVisible(!isVisible)
    }
  };
  const [isVisible3, setIsVisible3] = React.useState(false);

  const toggleFloatScreen3 = () => {
    setIsVisible3(!isVisible3);
  };
  const pharmacyId=useSelector((state)=>state.pharmaID)
   
  const [user,setUser]= React.useState([])
   
  // const userData = useSelector((state) => state.user);
  // const { role,pharmacy_id } = userData;
  // const pharmacyId=pharmacy_id
  const fetchAccount=()=>{
    axios.get(`http://${Api}/registerParameter/?pharmacy_id=${pharmacyId}`)
    .then((r)=>setUser(r.data))
    .catch((err)=>console.log(err))
}
React.useEffect(()=>{fetchAccount()},[])
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
      role: selectedOption,
      is_staff: true,
      is_superuser: false,
      password: confirmPassword,
      pharmacy_id:pharmacyId,
      is_PasswordChanged:false
      
    };

    // Make a POST request to the Django API endpoint with axios
    axios
      .post(`http://${Api}/register/`, data)
      .then(() => {
        // Handle the successful response
        toggleFloatScreen2()
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
const handleView=(aId,fname,lname,aRole,email,aStatus,)=>{
setEmail(email)
setFname(fname)
setLname(lname)
setAid(aId)
setSelectedOption(aRole)
setIsVisible3(!isVisible3)
}
const handleDelete=()=>{
  axios.delete(`http://${Api}/registerDetails/${AId}`).then(()=>{alert('Account deleted successfully!'),toggleFloatScreen3(),fetchAccount()}).catch(()=>{alert('Account deletion failed!'),toggleFloatScreen3()})
}
  return (
    <SafeAreaView>
      <View style={{flexDirection:'row'}}>
          <TouchableOpacity 
          onPress={()=>navigate('AdminPharma')}
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
      <ScrollView style={Layout.styles.scrollContainer}  scrollEnabled={true}>
      <View style={{
        paddingHorizontal:Spacing,
        paddingTop:Spacing,
      }}>
        <Text style={{
          fontSize:FontSize.large, 
          color:Colors.primary,
          fontFamily:Font['poppins-bold'], 
          textAlign:'left'}}>
          You created account for
        </Text>
       {user.map((use)=>{return(
              <View key={use.id} style={{ borderRadius:5, borderColor:Colors.primary}}>
              <TouchableOpacity 
               onPress={()=>{handleView(use.id,use.first_name,use.last_name,use.role,use.email)}}
              style={{
            height:40,
            margin:Spacing,
            marginTop:5,
            backgroundColor:Colors.primary,
            marginVertical:Spacing/4,
            borderRadius:Spacing/3
          }}>
              <Text key={use.id} style={{
              marginLeft:5,
              fontFamily:Font['poppins-semiBold'],
              fontSize:FontSize.large,
              color:Colors.onPrimary,
              // alignSelf:'left'
              }}>{use.first_name+' '+use.last_name}</Text>
              </TouchableOpacity>
              
              
              </View>

       )})}
        
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
          <View
            style={{
              paddingHorizontal: Spacing,
              paddingTop: Spacing,
            }}
          >
            <Text style={{fontFamily:Font["poppins-bold"], fontSize:FontSize.large,color:Colors.primary}}>Create a new Account</Text>
            <View style={{  }}>
            <Text style={{fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,color:'green'}}>For which actor you want to create?</Text>
            <View style={{flexDirection:'row',marginTop:Layout.height*2/100}}>
            <TouchableOpacity
                onPress={handleOptionChange1}
                style={{
                  padding: Spacing,
                  marginRight:Layout.width*20/100,
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
                 Pharmacist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOptionChange2}
                style={{
                  padding: Spacing,
                  marginRight:Layout.width*20/100,
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
                 Deliverer
                </Text>
              </TouchableOpacity>
              
            </View>
            <Text style={{fontFamily:Font["poppins-bold"],fontSize:FontSize.medium}}>Please Make sure, You are creating account for <Text style={{color:'red'}}>{selected}</Text></Text>
            <View>
            
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
        <Text style={{fontFamily:Font["poppins-bold"],fontSize:FontSize.medium}}>Please Make sure, You are creating account for <Text style={{color:'red'}}>{selected}</Text></Text>
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
      {isVisible3 && (
        <ScrollView
          style={{
            height: Layout.height*50/100,
            position: "absolute",
            bottom: (Layout.height * 20) / 100,
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
              Account details
            </Text>
            <View style={{ height: Layout.height*35/100 }}>
            <View style={{borderRadius:5, borderColor:Colors.primary}}>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>First name: {fname}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Last name: {Lname}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Email: {email}</Text>
            </View>
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
                  backgroundColor: "black",
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
                  Block
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{handleDelete()}},
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
                  Delete Account
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleFloatScreen3}
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
                 OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <View  style={{flexDirection:'row',alignItems:'flex-end',}}>
      <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Inventory')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.onPrimary,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/inventory.png")}></Image>
               <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Inventory</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.onPrimary,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')}   style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.primary,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/skills.png")}></Image>
             <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Accounts</Text>
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
export default PharmaAdminAccount