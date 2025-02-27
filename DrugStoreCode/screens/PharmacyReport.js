import {
  SafeAreaView,
  ScrollView,
  StyleSheet,Animated,
  Text,Image,
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
import { useState,useEffect,useRef } from "react";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {PieChart,BarChart} from 'react-native-chart-kit'
export const ExpirePieChart = () => {
  const pharmacyId = useSelector((state) => state.pharmaID);
  const [drugs, setDrugs] = useState([]);
  const [drugs2, setDrugs2] = useState([]);
  const [drugs3, setDrugs3] = useState([]);
  const fetchDrugs = () => {
    axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}&ExpireDate=true`)
      .then((r) => { setDrugs(r.data); })
      .catch((err) => { console.log(err); });

    axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}&ExpireDate=false`)
      .then((r) => { setDrugs2(r.data); })
      .catch((err) => { console.log(err); });
      axios.get(`http://${Api}/drugs/drugsParameter/?Quantity=0&pharmacy=${pharmacyId}`)
      .then((r) => { setDrugs3(r.data); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const dummyPieData = [
    { name: 'Expired drugs', quantity: drugs.length,color:'red' },
    { name: 'Not expired', quantity: drugs2.length,color:Colors.primary },
    { name: 'Out of stock', quantity: drugs3.length,color:'yellow' },
  ];

  const pieChartData = dummyPieData.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    color: item.color,
    legendFontColor: Colors.active,
    legendFontSize: FontSize.small,
    
  }));

  // Conditionally render the PieChart only when data is available
  return (
    <View>
      {drugs.length > 0 && drugs2.length > 0 ? (
        <PieChart
          data={pieChartData}
          width={Layout.width * 0.9}
          height={200}
          chartConfig={{
            color: (opacity = 2) => `rgba(30, 255, 146, ${opacity})`,
          }}
          accessor="quantity"
          backgroundColor="transparent"
          absolute
          style={{ marginLeft: Layout.width * 0.05, borderWidth: 1, backgroundColor: Colors.onPrimary }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};
export const ExpireBarChart = () => {
  const pharmacyId = useSelector((state) => state.pharmaID);
  const [drugs, setDrugs] = useState([]);
  const [drugs2, setDrugs2] = useState([]);
  

  const fetchDrugs = () => {
    axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}&ExpireDate=true`)
      .then((r) => { setDrugs(r.data); })
      .catch((err) => { console.log(err); });

    axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}&ExpireDate=false`)
      .then((r) => { setDrugs2(r.data); })
      .catch((err) => { console.log(err); });
      
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const dummyBarData = [
    { name: 'Total drugs', quantity: drugs.length + drugs2.length },
    { name: 'Expired', quantity: drugs.length },
    { name: 'Not expired', quantity: drugs2.length },
    
  ];

  const barChartData = {
    labels: dummyBarData.map((item) => item.name),
    datasets: [
      {
        data: dummyBarData.map((item) => item.quantity),
      },
    
    ],
  };

  // Conditionally render the BarChart only when data is available
  return (
    <View>
      {drugs.length > 0 && drugs2.length > 0 ? (
        <BarChart
          data={barChartData}
          width={Layout.width * 95 / 100}
          height={Layout.height * 40 / 100}
          chartConfig={{
            backgroundGradientFrom: Colors.onPrimary,
            backgroundGradientTo: Colors.onPrimary,
            decimalPlaces: 0, // No decimal places in dataset values
            color: (opacity = 100) => `rgba(123, 45, 90, ${opacity})`,
            labelColor: (opacity = 1) => Colors.active,
            barPercentage: 1.5, // Adjust the width of the bars
            propsForLabels: {
              fontSize: FontSize.medium,
            },
            formatYLabel: (value) => Math.floor(value), // Format Y-axis labels to remove decimals
          }}
          style={{ borderWidth: 1, borderRadius: 16, marginLeft: 8 }}
          showBarTops
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export const SysAdminDashboard = ({navigation:{navigate}}) => {
  
  const [register, setRegister] = useState([]);
  const [pharmacist, setPharmacist] = useState([]);
  const [deliverer, setDeliverer] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pharmaManager, setPharmaManager] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  
  const fetchAccount = () => {
    axios.get(`http://${Api}/registerParameter/?role=2`)
      .then((r) => { setRegister(r.data); })
      .catch((err) => { console.log(err); });

    axios.get(`http://${Api}/registerParameter/?role=3`)
      .then((r) => { setPharmaManager(r.data); })
      .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/registerParameter/?role=4`)
    .then((r) => { setCustomers(r.data); })
    .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/registerParameter/?role=5`)
    .then((r) => { setPharmacist(r.data); })
    .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/registerParameter/?role=6`)
    .then((r) => { setDeliverer(r.data); })
    .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/registerParameter/`)
    .then((r) => { setTotalUsers(r.data); })
    .catch((err) => { console.log(err); });
    
  };

  useEffect(() => {
    fetchAccount();
  }, []);
  const dummyBarData = [
    { name: 'Total users', quantity: totalUsers.length },
    { name: 'Register officers', quantity: register.length },
    { name: 'Pharmacy managers', quantity: pharmaManager.length },
    { name: 'Customers', quantity: customers.length },
    { name: 'Pharmacists', quantity: pharmacist.length },
    { name: 'Deliverers', quantity: deliverer.length },
    
  ];

  const barChartData = {
    labels: dummyBarData.map((item) => item.name),
    datasets: [
      {
        data: dummyBarData.map((item) => item.quantity),
      },
    ],
  };
 // Conditionally render the PieChart only when data is available
  return (
    <View>
      {register.length > 0 && pharmacist.length > 0 && deliverer.length>0 && customers.length>0&&pharmaManager.length>0 &&totalUsers.length>0 ? (
        <View>
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>navigate('AdminAccount')} style={{margin:5,alignContent:'center',width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,backgroundColor:Colors.primary,alignItems:'center',borderRadius:10, color:Colors.primary}}>
               <Image style={{tintColor:Colors.onPrimary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/drugs.png")}></Image>
               <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{totalUsers.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>Total users</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('AdminAccount')} style={{margin:5,width:Layout.width*45/100,backgroundColor:Colors.onPrimary, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10, borderWidth:1,borderColor:Colors.primary,color:Colors.primary}}>
              <Image style={{tintColor:Colors.primary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/pharmacist.png")}></Image>
               <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{register.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Register officers</Text>
              </TouchableOpacity>
              
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigate('AdminAccount')} style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10,borderWidth:1,borderWidth:1,borderColor:Colors.primary, backgroundColor:Colors.onPrimary,color:Colors.primary}}>
                <Image style={{tintColor:Colors.primary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/shopping-cart.png")}></Image>
                <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{pharmaManager.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>Pharmacy managers</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('AdminAccount')} style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',backgroundColor:Colors.primary,borderRadius:10, color:Colors.primary}}>
              <Image style={{tintColor:Colors.onPrimary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/delivery.png")}></Image>
                <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{customers.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>Customers</Text>
              </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigate('AdminAccount')} style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10,borderWidth:1,borderColor:Colors.primary, backgroundColor:Colors.primary,color:Colors.primary}}>
                <Image style={{tintColor:Colors.onPrimary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/shopping-cart.png")}></Image>
                <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{pharmacist.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>Pharmacists</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('AdminAccount')} style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',backgroundColor:Colors.onPrimary,borderWidth:1,borderColor:Colors.primary,borderRadius:10, color:Colors.primary}}>
              <Image style={{tintColor:Colors.primary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/delivery.png")}></Image>
                <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{deliverer.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>Deliverers</Text>
              </TouchableOpacity>
              
              
              
              </View>
              <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'left'}}>
              System users Bar Chart
            </Text>
              <ScrollView horizontal><BarChart
          data={barChartData}
          width={Layout.width*250/100}
          height={Layout.height * 40 / 100}
          chartConfig={{
            backgroundGradientFrom: Colors.onPrimary,
            backgroundGradientTo: Colors.onPrimary,
            decimalPlaces: 0, // No decimal places in dataset values
            color: (opacity = 100) => `rgba(123, 45, 90, ${opacity})`,
            labelColor: (opacity = 1) => Colors.active,
            barPercentage: 1.5, // Adjust the width of the bars
            propsForLabels: {
              fontSize: FontSize.medium,
            },
            formatYLabel: (value) => Math.floor(value), // Format Y-axis labels to remove decimals
          }}
          style={{ borderWidth: 1, borderRadius: 16, marginLeft: 8 }}
          showBarTops
        /></ScrollView>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export const PharmacistDeliverer = ({navigation:{navigate}}) => {
  const pharmacyId = useSelector((state) => state.pharmaID);
  const [drugs, setDrugs] = useState([]);
  const [pharmacist, setPharmacist] = useState([]);
  const [deliverer, setDeliverer] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchDrugs = () => {
    axios.get(`http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}`)
      .then((r) => { setDrugs(r.data); })
      .catch((err) => { console.log(err); });

    axios.get(`http://${Api}/registerParameter/?role=6&pharmacy_id=${pharmacyId}`)
      .then((r) => { setDeliverer(r.data); })
      .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/registerParameter/?role=5&pharmacy_id=${pharmacyId}`)
    .then((r) => { setPharmacist(r.data); })
    .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/order/orderParameter/?pharmacy=1`)
    .then((r) => { setOrders(r.data); })
    .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    fetchDrugs();
  }, []);
 // Conditionally render the PieChart only when data is available
  return (
    <View>
      {drugs.length > 0 && pharmacist.length > 0 && deliverer.length>0 ? (
        <View>
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')} style={{margin:5,alignContent:'center',width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,backgroundColor:Colors.primary,alignItems:'center',borderRadius:10, color:Colors.primary}}>
               <Image style={{tintColor:Colors.onPrimary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/drugs.png")}></Image>
               <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{drugs.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>Drugs</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')} style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10, borderWidth:1,borderColor:Colors.primary,color:Colors.primary}}>
              <Image style={{tintColor:Colors.primary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/pharmacist.png")}></Image>
               <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{pharmacist.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Pharmacists</Text>
              </TouchableOpacity>
              
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity  style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10,borderWidth:1,borderWidth:1,borderColor:Colors.primary, color:Colors.primary}}>
                <Image style={{tintColor:Colors.primary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/shopping-cart.png")}></Image>
                <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{orders.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')} style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',backgroundColor:Colors.primary,borderRadius:10, color:Colors.primary}}>
              <Image style={{tintColor:Colors.onPrimary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/delivery.png")}></Image>
                <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{deliverer.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>Deliverers</Text>
              </TouchableOpacity>
              </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};


export const Pharmacis = ({navigation:{navigate}}) => {
  const pharmacyId = useSelector((state) => state.pharmaID);
  const [drugs, setDrugs] = useState([]);
  const [pharmacist, setPharmacist] = useState([]);
  const [requests, setRequests] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);

  const fetchDrugs = () => {
    axios.get(`http://${Api}/drugs/drugsParameter/?`)
      .then((r) => { setDrugs(r.data); })
      .catch((err) => { console.log(err); });

   
    axios.get(`http://${Api}/registerParameter/?role=5`)
    .then((r) => { setPharmacist(r.data); })
    .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/drugs/pharmacyParameter/?approved=True`)
    .then((r) => { setPharmacy(r.data); })
    .catch((err) => { console.log(err); });
    axios.get(`http://${Api}/drugs/pharmacyParameter/?approved=False`)
    .then((r) => { setRequests(r.data); })
    .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    fetchDrugs();
  }, []);
 // Conditionally render the PieChart only when data is available
  return (
    <View>
      {drugs.length > 0 && pharmacist.length > 0  ? (
        <View>
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity  style={{margin:5,alignContent:'center',width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,backgroundColor:Colors.primary,alignItems:'center',borderRadius:10, color:Colors.primary}}>
               <Image style={{tintColor:Colors.onPrimary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/drugs.png")}></Image>
               <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{drugs.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>DRUGS</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10, borderWidth:1,borderColor:Colors.primary,color:Colors.primary}}>
              <Image style={{tintColor:Colors.primary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/pharmacist.png")}></Image>
               <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{pharmacist.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.primary}}>PHARMACISTS</Text>
              </TouchableOpacity>
              
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigate('RegisterPharmacy')}  style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10,borderWidth:1,borderWidth:1,borderColor:Colors.primary, color:Colors.primary}}>
                <Image style={{tintColor:Colors.primary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/drugstore.png")}></Image>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{pharmacy.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>PHARMACIES</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('RegisterRequests')} style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',backgroundColor:Colors.primary,borderRadius:10, color:Colors.primary}}>
              <Image style={{tintColor:Colors.onPrimary,width:Layout.width*15/100,height:Layout.width*15/100}} source={require("../assets/images/document.png")}></Image>
              <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{requests.length}</Text>
                 <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>REQUESTS</Text>
              </TouchableOpacity>
              </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}; 

export const DelivererDashboard = ({navigation:{navigate}}) => { 
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [orders2, setOrders2] = useState([]);
  const userID=useSelector((state)=>state.User_ID)
  const first=useSelector((state)=>state.FName)
  const last=useSelector((state)=>state.LName)
  const fetchOrders = () => {
      axios.get(`http://${Api}/order/orderParameter/?&assignedDeliverer=${userID}&paid=true`)
      .then((r)=>{setOrders2(r.data),setIsLoading(false)})
      .catch((err)=>{console.log(err),setIsLoading(false)})
      setIsLoading(true)
      axios.get(`http://${Api}/order/orderParameter/?&assignedDeliverer=${userID}&paid=false`)
      .then((r)=>{setOrders(r.data),setIsLoading(false)})
      .catch((err)=>{console.log(err),setIsLoading(false)})
    
  };

  useEffect(() => {
    fetchOrders();
  }, []);
 // Conditionally render the PieChart only when data is available
  return (
    <View>
      {orders2.length > 0   ? (
        <View>
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity  style={{margin:5,alignContent:'center',width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,backgroundColor:Colors.primary,alignItems:'center',borderRadius:10, color:Colors.primary}}>
              <Icon name="shopping-bag" color={Colors.onPrimary}   size={Layout.width*15/100}/>
             <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>{orders.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.onPrimary}}>New Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={{margin:5,width:Layout.width*45/100, height:Layout.height*19/100,padding:Spacing/4,alignItems:'center',borderRadius:10, borderWidth:1,borderColor:Colors.primary,color:Colors.primary}}>
              <Ionicons name="cart" color={Colors.primary}   size={Layout.width*15/100}/>
            <Text style={{fontSize:FontSize.large , fontFamily:Font["poppins-bold"],color:Colors.primary}}>{orders2.length}</Text>
                 <Text style={{fontSize:FontSize.large ,fontFamily:Font["poppins-bold"],color:Colors.primary}}>Delivered</Text>
              </TouchableOpacity>
              
             </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export const SlidingImages = () => {
  const images = [
    { id: '1', source: require("../assets/images/online-drugstore-1.jpg"), tintColor: Colors.onPrimary },
    { id: '2', source: require("../assets/images/online-Drugstore.jpg"), tintColor: Colors.primary },
    { id: '3', source: require("../assets/images/global-pharmacy-com.jpg"), tintColor: Colors.primary },
    { id: '4', source: require("../assets/images/global-pharmacy-com.jpg"), tintColor: Colors.primary },
  ];

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeInterval = 3000; // Time interval in milliseconds for sliding

  useEffect(() => {
    // Function to automatically slide to the next image
    const slideToNextImage = () => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollViewRef.current.scrollTo({ x: nextIndex * Layout.width, animated: true });
      setCurrentIndex(nextIndex);
    };

    // Set up the interval to slide automatically
    const interval = setInterval(slideToNextImage, timeInterval);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderImages = images.map((item) => (
    <View key={item.id} style={styles.imageContainer}>
      <Image
       style={{width:Layout.width*95/100,height:Layout.height*20/100,borderRadius:20,margin:5}} source={item.source}
      />
    </View>
  ));

  const renderDots = images.map((item, index) => (
    <Animated.View
      key={item.id}
      style={[styles.dot, { opacity: currentIndex === index ? 1 : 0.3 }]}
    />
  ));

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffsetX / Layout.width);
          setCurrentIndex(index);
        }}
      >
        {renderImages}
      </ScrollView>
      <View style={styles.dotsContainer}>{renderDots}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: Layout.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginHorizontal: 4,
  },
});
