import {
  Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
  import axios from "axios";
  import Api from "../constants/Api";
  
import { useSelector } from "react-redux";
const LoggedSendFeedback = ({navigation:{navigate}}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleFloatScreen = () => {
    setIsVisible(!isVisible);
  };
  const [sender, setSender]=React.useState('')
  const [comments, setComments]=React.useState('')
  const [commentOn, setCommentOn]= React.useState('')
  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const handleSubmit = () => {
    // Create an object with the input data
    const data = {

      senderName: first + ' '+ last,
      pharmacyName: commentOn,
      comment: comments,
    };
    
    // Make a POST request to the Django API endpoint with axios
    axios
      .post(`http://${Api}/drugs/feedbackList/`, data)
      .then(
        // Handle the successful response
        toggleFloatScreen(),setCommentOn(''),setComments('')
      )
      .catch((error) => {
        // Handle the error response
        console.log(error);
        alert("Something went wrong!");
      });
  };
  return (
    <SafeAreaView >
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:70, alignSelf:'center', fontSize:FontSize.large}}>Send Feedabck</Text>
        </View>
    <ScrollView style={{height:Layout.height*99/100,backgroundColor:'#F5DFF4'}}  scrollEnabled={true}>
    <View style={{
      paddingHorizontal:Spacing,
      paddingTop:Spacing,
    }}>
      <Text style={{
        fontSize:FontSize.large, 
        color:Colors.primary,
        fontFamily:Font['poppins-bold'], 
        textAlign:'left'}}>
       Fill the information below
      </Text>
     
      <View style={{
          marginVertical:Spacing*2,}}>
          
          <TextInput value={commentOn} onChangeText={setCommentOn} placeholder="Comment on" 
          placeholderTextColor={Colors.darkText} 
          style={{
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing
          }}/>
          <TextInput value={comments} onChangeText={setComments} placeholder="Your Comment" 
          placeholderTextColor={Colors.darkText}
          multiline={true}
          style={{
            height:200,
            fontFamily:Font['poppins-regular'],
            fontSize:FontSize.small,
            padding:Spacing*2,
            backgroundColor:Colors.lightPrimary,
            borderRadius:Spacing,
            marginVertical:Spacing
          }}/>
          
        </View>
        <TouchableOpacity onPress={()=>{Alert.alert('Send','Are you sure',[{text:'No'},{text:'Yes',onPress:()=>{handleSubmit()}}])}}
         style={{
           padding:Spacing,
           marginTop:Spacing,
           backgroundColor:Colors.primary,
           marginVertical:Spacing*3,
           borderRadius:Spacing
        }}>
            <Text style={{
            fontFamily:Font['poppins-semiBold'],
            fontSize:FontSize.large,
            color:Colors.onPrimary,
            alignSelf:'center'}}>Send</Text>
            </TouchableOpacity>
    </View>
    </ScrollView>
    {isVisible && (
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
              Thank you for the feedback!
            </Text>   
            <Ionicons name="checkmark-circle-outline" style={{alignSelf:'center'}} color={Colors.primary} size={Spacing*6}/>
              <TouchableOpacity
                onPress={toggleFloatScreen}
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
const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      elevation: 5,
    },
    text: {
      fontWeight: 'bold',
    },
  });

export default LoggedSendFeedback