import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Api from "../constants/Api";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
const RegisterScreen = ({ navigation: { navigate } }) => {
 
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

  // Validate the entire form and submit the data if valid
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
        role: 4,
        is_staff: true,
        is_superuser: false,
        password: confirmPassword,
      };

      // Make a POST request to the Django API endpoint with axios
      axios
        .post(`http://${Api}/register/`, data)
        .then(() => {
          // Handle the successful response
          alert("Success");
          navigate('Login')
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
      <ScrollView style={{padding:Spacing}}>
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    > 
        <View style={{alignItems:'center'}}>
          <Text style={{
            fontSize:FontSize.xLarge,
            color:Colors.primary,
            fontFamily:Font['poppins-bold'],
           
            marginTop:Spacing*2,
            }}>Welcome</Text>
          <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            maxWidth:"60%",
            textAlign:'center'
          }}>Register here</Text>
        </View>
        <View  style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10,
         }}>
             <TextInput
                value={fname}
                onChangeText={setFname}
                placeholder="First name"
                placeholderTextColor={Colors.darkText}
                style={styles.input}
              />
              <TextInput
                value={Lname}
                onChangeText={setLname}
                placeholder="Last name"
                placeholderTextColor={Colors.darkText}
                style={styles.input}
              />
              
              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Email"
                placeholderTextColor={Colors.darkText}
                keyboardType="email-address"
                style={styles.input}
              />
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
            </View>
          </KeyboardAvoidingView>
        
        <TouchableOpacity
          onPress={handleSubmit}
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
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity style={{marginTop:2}} onPress={()=>navigate('Login')}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.small,
            color:Colors.primary,
            alignSelf:'center'}}>Have an account? Login</Text>
            </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};
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

export default RegisterScreen;