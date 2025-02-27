import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,ActivityIndicator, ScrollView
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import { useEffect } from "react";
import Layout from '../constants/Layout'
import axios from "axios";
import Api from "../constants/Api";
import { pharmacyId,ID,Fname,Lname,isChanged,Uemail } from "../store/action/action";
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
//import NetInfo from '@react-native-community/netinfo --save'
//type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const LoginScreen = ({ navigation: { navigate } }) => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    
    setIsLoading(true);
  
    try {
      // API call to check if the entered data is correct
      const response = await axios.post(`http://${Api}/login/`, { email:Email, password:password });
  
      const { id, first_name, last_name, role,email, pharmacy_id,is_PasswordChanged, } = response.data;
  
      // Save the session and user information
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userData', JSON.stringify({
        id,
        first_name,
        last_name,
        role,
        email,
        pharmacy_id,
        
        is_PasswordChanged
      }));
  
      // Dispatch the setUser action to store the user data in Redux
      dispatch(pharmacyId(pharmacy_id));
      dispatch(ID(id));
      dispatch(Fname(first_name));
      dispatch(Lname(last_name));
      dispatch(isChanged( is_PasswordChanged))
      dispatch(Uemail( email))
  
      if (role === '4') {
        navigate('LoggedHome');
      } else if (role === '1') {
        navigate('SysAdmin');
      } else if (role === '2') {
        navigate('RegisterHome');
      } else if (role === '3') {
        navigate('AdminPharma');
      } else if (role === '5') {
        navigate('PharmacistHome');
      } else if (role === '6') {
        navigate('DelivererHome');
      }
    } catch (error) {
      console.log(error.responses);
      alert('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  


  const checkLoggedIn = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  
    if (isLoggedIn) {
      const userData = await AsyncStorage.getItem('userData');
  
      if (userData) {
        const { id, first_name, last_name, role, pharmacy_id } = JSON.parse(userData);
  
        // Dispatch actions to store user data in Redux
        dispatch(pharmacyId(pharmacy_id));
        dispatch(ID(id));
        dispatch(Fname(first_name));
        dispatch(Lname(last_name));
  
        // Navigate based on the user's role
        if (role === '4') {
          navigate('LoggedHome');
        } else if (role === '1') {
          navigate('SysAdmin');
        } else if (role === '2') {
          navigate('RegisterHome');
        } else if (role === '3') {
          navigate('AdminPharma');
        } else if (role === '5') {
          navigate('PharmacistHome');
        } else if (role === '6') {
          navigate('DelivererHome');
        }
      }
    }
  };
  

  // ... (rest of the code)

  
  // Call the checkLoggedIn function when the component mounts
  useEffect(() => {
    checkLoggedIn();
  }, []);
  
  
//Email Validation
  

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1}}>
        <View style={{alignItems:'center',flex:1,padding:Spacing}}>
          <Text style={{
            fontSize:FontSize.xLarge,
            color:Colors.primary,
            fontFamily:Font['poppins-bold'],
            marginVertical:Spacing*3
            }}>Welcome</Text>
          <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            maxWidth:"60%",
            textAlign:'center'
          }}>Log in here</Text>
        </View>
        <View style={{
         padding:Spacing}}>
          <TextInput 
          value={Email}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Enter email address" 
          placeholderTextColor={Colors.darkText} 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing
          }}/>
          
          <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholder="Enter password"
          placeholderTextColor="#777"
          style={styles.input}
        />
          <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity style={{flexDirection:'row'}}  onPress={() => setShowPassword(!showPassword)}>
            <Text style={{fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.xxLarge/2,
            color:Colors.primary,
            alignSelf:'flex-end'}}>Show Password 
            </Text>
            {!showPassword?<Ionicons name="eye-outline" color={Colors.primary} style={{alignSelf:"center",paddingLeft:Layout.width*2/100}} size={Spacing*3}/>:<Ionicons name="eye-off-outline" style={{alignSelf:"center",paddingLeft:Layout.width*2/100}} color={Colors.primary} size={Spacing*3}/>}
          </TouchableOpacity>
        </View>
        </View>
        <View style={{padding:Spacing*2}}>
        <TouchableOpacity 
        onPress={handleLogin}
        style={{
           padding:Spacing,
           backgroundColor:Colors.primary,
           marginVertical:Spacing/3,
           borderRadius:Spacing,
           shadowColor:Colors.primary,shadowOffset:{width:2,height:Spacing},shadowOpacity:0.6,shadowRadius:Spacing
        }}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            color:Colors.onPrimary,
            alignSelf:'center'}}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
        onPress={()=>navigate('HomeFree')}
        style={{
           padding:Spacing,
           backgroundColor:'#FFB570',
           marginVertical:Spacing,
           borderRadius:Spacing,
           shadowColor:Colors.primary,shadowOffset:{width:2,height:Spacing},shadowOpacity:0.6,shadowRadius:Spacing
        }}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            color:Colors.onPrimary,
            alignSelf:'center'}}>Continue without login</Text>
            </TouchableOpacity>
        </View>
       
            
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{alert('Not available at this time!')}}>
          <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.small,
            color:Colors.primary,
            alignSelf:'center'}}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('Register')}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.small,
            color:Colors.primary,
            alignSelf:'center'}}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
            
        </View>
        
        
      </ScrollView>
      {isLoading && (
        <View style={{backgroundColor: 'rgba(256, 256, 256,1)',borderRadius:10,marginTop:Layout.height*35/100,...StyleSheet.absoluteFillObject,height:Layout.height*20/100, alignItems:'center', width:Layout.width*60/100, marginLeft:Layout.width*20/100}}>
            <ActivityIndicator color="#0000ff"size={35} style={{marginTop:Layout.width*10/100,marginBottom:Layout.width*3/100}}/>
            <Text>Loading...</Text>
       </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing
  },
  progressBar: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
