import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,Alert,
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
  import MapView from "react-native-maps";
  
const RegisterSearch = ({navigation:{navigate}}) => {
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
  return (
    <SafeAreaView >
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
            <TextInput style={{color:Colors.primary, marginLeft:Spacing*2,marginTop:Spacing*4, fontSize:FontSize.large}} placeholder="Search here . . . "></TextInput>
            
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
          Result
        </Text>
        <View style={{ borderRadius:5, borderColor:Colors.primary}}>
          <TouchableOpacity 
          onPress={toggleFloatScreen} 
          style={{
        height:40,
        margin:Spacing,
        marginTop:5,
        backgroundColor:Colors.primary,
        marginVertical:Spacing/4,
        borderRadius:Spacing/3
      }}>
          <Text style={{
          marginLeft:5,
          fontFamily:Font['poppins-semiBold'],
          fontSize:FontSize.large,
          color:Colors.onPrimary,
          // alignSelf:'left'
          }}>Ab pharmacy</Text>
          </TouchableOpacity>
          
          
          </View>
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
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Licence number:</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Name:</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Owner Name:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Phone Number:</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Email:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>Sub city:</Text>
                <Text style={{fontSize:FontSize.large, fontFamily:Font["poppins-regular"]}}>Kebele:</Text>
                <Text style={{fontSize:FontSize.large,fontFamily:Font["poppins-regular"]}}>House Number:</Text>
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
                    latitude: 12.6048,
                    longitude: 37.4689,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}> 
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
                    { text: "Yes" ,onPress:toggleFloatScreen2},
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
                onPress={toggleFloatScreen2}
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
        <View  style={{flexDirection:'row',}}>
            <TouchableOpacity onPress={()=>navigate('RegisterHome')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('RegisterPharmacy')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="key-outline" color={Colors.primary} size={Spacing*3}/>
             <Text>Pharmacy</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('RegisterRequests')} style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="person-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('RegisterFeedbacks')}  style={Layout.styles.LoggedTabTouch}>
            <Ionicons name="layers-outline" color={Colors.primary} size={Spacing*3}/>
              <Text>feedbacks</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  )
}

export default RegisterSearch