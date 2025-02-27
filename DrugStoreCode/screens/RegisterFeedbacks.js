import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Alert,Image,
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
  import { useState } from "react";
  import MapView from "react-native-maps";
  import Activity from "./Activity";
  import axios from 'axios'
  import Api from "../constants/Api";
  import Icon from 'react-native-vector-icons/FontAwesome';
const RegisterFeedbacks = ({navigation:{navigate}}) => {
  const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible]= React.useState(false)
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
  const [feedback, setFeedback]=React.useState([])
  const [senderName, setSenderName]=React.useState('')
  const [commentOn, setCommentOn]=React.useState('')
  const [sentDate, setSentdate]=React.useState('')
  const [comment, setComments]=React.useState('')
  const [ID, setID]=React.useState('')
  const HumanReadableDateTime = ({ dateTimeString }) => {
    const formattedDateTime = new Date(dateTimeString).toLocaleString();
  
    return <Text>{formattedDateTime}</Text>;
  };
  
  const fitchFeedback=()=>{
    setIsLoading(true)
    axios.get(`http://${Api}/drugs/feedbackList/`)
    .then((r)=>{setFeedback(r.data),setIsLoading(false)})
    .catch((err)=>{console.log(err),setIsLoading(false)})
}

const deleteFeedback=(ID)=>{
  axios.delete(`http://${Api}/drugs/feedbackDetails/${ID}`)
  .then((res)=>{alert('Deleted successully'),fitchFeedback()})
  .catch((err)=>console.log(err))
}
    React.useEffect(()=>{fitchFeedback()},[])
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
            <Text style={{color:Colors.primary,marginTop:Spacing*4,marginLeft:35, alignSelf:'center', fontSize:FontSize.large}}>Feedbacks</Text>    
         </View>
         <View style={{
          paddingHorizontal:Spacing,
          backgroundColor:Colors.lightPrimary
        }}><Text style={{
          fontSize:FontSize.large, 
          color:Colors.primary,
          fontFamily:Font['poppins-bold'], 
          textAlign:'left'}}>
          Feedbacks
        </Text></View>
      <ScrollView style={{height:Layout.height*79/100,backgroundColor:Colors.lightPrimary}}  scrollEnabled={true}>
      
      
      {feedback.map((feed)=>{return(
            <View key={feed.id} style={{margin:5,marginRight:20,borderRadius:20,borderBottomLeftRadius:1,backgroundColor:Colors.onPrimary,width:Layout.width*97/100,borderWidth:1}}>
              <View style={{flexDirection:'row',alignItems:'center', borderBottomWidth:1,borderStyle:'dashed'}}>
                <Icon name='user-o' size={Layout.width*10/100} style={{margin:10,color:Colors.primary}} />
              <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,margin:10,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>{feed.senderName}</Text>
              </View>
              <View style={{ borderBottomWidth:1,borderStyle:'dashed'}}>
              <View style={{flexDirection:'column',}}>
                <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>Comment on</Text>
                <Text style={{color:Colors.text, fontFamily:Font["poppins-regular"],fontSize:FontSize.medium,width:Layout.width*90/100, marginLeft:Layout.width*10/100}}>{feed.pharmacyName}</Text>
             </View>
              </View>
              <View style={{ borderBottomWidth:1,borderStyle:'dashed'}}>
              <View style={{flexDirection:'column',}}>
                <Text style={{color:Colors.primary, fontFamily:Font["poppins-bold"],fontSize:FontSize.medium,width:Layout.width*40/100, marginLeft:Layout.width*1/100}}>Comment</Text>
                <Text style={{color:Colors.text, fontFamily:Font["poppins-regular"],fontSize:FontSize.medium,width:Layout.width*90/100, marginLeft:Layout.width*10/100}}>{feed.comment}</Text>
             </View>
              </View>
              <View style={{}}>
              <Text style={{margin:10,color:Colors.primary, textAlign:'left',fontFamily:Font["poppins-bold"],fontSize:FontSize.medium}}>Sent on: <HumanReadableDateTime dateTimeString={feed.created_at}/></Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Delete", "Are you sure", [
                    { text: "No" },
                    { text: "Yes" ,onPress:()=>{deleteFeedback(feed.id)}},
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
                  marginRight:Layout.width*10/100,
                  marginBottom:Layout.width*5/100

                  
                }}
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
        
        
        )})}
      
      </ScrollView>
      {isLoading &&(<Activity/>)}
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
              textAlign:'center'}}>
              Feedback details
            </Text>
            <View style={{borderRadius:5, borderColor:Colors.primary}}>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Sender Name: {senderName}</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Sent date: {sentDate}</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Comment on: {commentOn}</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Comment: {comment}</Text>
            </View>
            </View>
            
        <View style={{
            paddingHorizontal:Spacing,
            paddingTop:Spacing,
          }}>
            
            <View style={{height:400,borderWidth:1, borderRadius:5, borderColor:Colors.primary, marginBottom:Spacing*2}}>
                
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              
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
            marginRight:20,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            elevation: 10,
            marginLeft:Layout.height*4/100
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
              Feedback is Deleted successfully!
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
            <TouchableOpacity onPress={()=>navigate('RegisterPharmacy')} style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding: Spacing}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugstore.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Pharmacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterRequests')}  style={{alignItems:'center',backgroundColor:Colors.onPrimary,marginLeft:Layout.width*4/100,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/document.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterFeedbacks')}  style={{alignItems:'center',backgroundColor:Colors.primary,marginLeft:Layout.width*4/100,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/feedback.png")}></Image>
             <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>feedbacks</Text>
            </TouchableOpacity> 
          </View>
</SafeAreaView>
  )
}

export default RegisterFeedbacks