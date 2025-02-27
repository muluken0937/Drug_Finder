import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { Table, Row, Rows } from "react-native-table-component";
import PDFLib, { PDFDocument, PDFTable } from "react-native-pdf-lib";
import axios from "axios";
import Api from "../constants/Api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Print } from "expo";
import Font from "../constants/Font";
import { ExpirePieChart,ExpireBarChart } from "./PharmacyReport";
 
const InventoryScreen = ({ navigation: { navigate } }) => {
  const tableRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(2.5);
  const tableWidth = Dimensions.get("window").width * zoomLevel;
  const [drugs, setDrugs] = useState([]);
  const pharmacyId = useSelector((state) => state.pharmaID);

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    try {
      const response = await axios.get(
        `http://${Api}/drugs/drugsParameter/?pharmacy=${pharmacyId}`
      );
      setDrugs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = async () => {
    const pdfTable = new PDFTable();
  
    pdfTable.addHeaders([
      "DrugName",
      "BrandName",
      "GenericName",
      "BatchNo",
      "Dosage",
      "Manufacturer",
      "Price",
      "Strength",
      "ExpireDate",
      "ManufacturedDate",
      "Quantity",
    ]);
  
    drugs.map((drug) => {
      pdfTable.addRow([
        drug.DrugName,
        drug.BrandName,
        drug.GenericName,
        drug.BatchNo,
        drug.Dosage,
        drug.Manufacturer,
        drug.Price,
        drug.Strength,
        drug.ExpireDate,
        drug.ManufacturedDate,
        drug.Quantity,
      ]);
    });
  
    // Create an HTML template for the table
    const tableHtml = `
      <table border="1" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>DrugName</th>
            <th>BrandName</th>
            <th>GenericName</th>
            <th>BatchNo</th>
            <th>Dosage</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Strength</th>
            <th>ExpireDate</th>
            <th>ManufacturedDate</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${drugs
            .map(
              (drug) => `
                <tr>
                  <td>${drug.DrugName}</td>
                  <td>${drug.BrandName}</td>
                  <td>${drug.GenericName}</td>
                  <td>${drug.BatchNo}</td>
                  <td>${drug.Dosage}</td>
                  <td>${drug.Manufacturer}</td>
                  <td>${drug.Price}</td>
                  <td>${drug.Strength}</td>
                  <td>${drug.ExpireDate}</td>
                  <td>${drug.ManufacturedDate}</td>
                  <td>${drug.Quantity}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;
  
    // Prepare the HTML content with CSS styles for the PDF
    const htmlContent = `<html><body>${tableHtml}</body></html>`;
    
    try {
      // Print the HTML content as a PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF saved at:", uri);
    } catch (error) {
      console.error("Error generating or saving PDF:", error);
    }
  };
  
   
  

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigate("AdminPharma")}
          style={{
            padding: Spacing,
            marginHorizontal: Spacing,
            borderRadius: Spacing / 2,
            marginTop: Spacing * 4,
            marginRight: 5,
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            color={Colors.primary}
            size={Spacing * 3}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.primary,
            marginTop: Spacing * 4,
            marginLeft: 70,
            alignSelf: "center",
            fontSize: FontSize.large,
          }}
        >
          Inventory report
        </Text>
      </View>
      <ScrollView
        style={{ height: Layout.height*83/100, backgroundColor: Colors.lightPrimary }}
        
      >
        <View>
        <View>
        <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'center'}}>Drugs status Pie Chart</Text>
            <ExpirePieChart />
            
             
             </View>
             <View>
             <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'center'}}>Drugs status Bar Chart</Text>
            <ExpireBarChart />
            
             
             </View>
        </View>
        <ScrollView horizontal={true}>
        <View style={{ width: tableWidth,margin:10}}>
        <Text style={{
              fontSize:FontSize.large, 
              color:Colors.primary,
              fontFamily:Font['poppins-bold'], 
              textAlign:'center'}}>Drugs Table</Text>
          <Table borderStyle={{ borderWidth: 1, borderColor: "green" }}>
            <Row
              data={[
                "Drug Name",
                "Brand Name",
                "Generic Name",
                "Batch No",
                "Dosage",
                "Manufacturer",
                "Price",
                "Strength",
                "Expire Date",
                "Manufactured Date",
                "Quantity",
              ]}
              style={{ height: 60, backgroundColor: 'pink', }}
              
            />
            <Rows
              data={drugs.map((drug) => [
                drug.DrugName,
                drug.BrandName,
                drug.GenericName,
                drug.BatchNo,
                drug.Dosage,
                drug.Manufacturer,
                drug.Price,
                drug.Strength,
                drug.ExpireDate,
                drug.ManufacturedDate,
                drug.Quantity,
              ])}
            />
          </Table>
        </View>
        </ScrollView>
        <View style={{marginTop:10,margin:10,flexDirection:'row',alignItems:'center'}}>
        
      <TouchableOpacity
        onPress={() => setZoomLevel(Math.max(0.9, zoomLevel - 0.2))}
        style={{padding:Spacing,borderWidth:1,borderRadius:10,borderColor:Colors.primary,backgroundColor:Colors.onPrimary, marginLeft:Layout.width*25/100 }}
    
      >
        <Text style={{fontFamily:Font["poppins-regular"]}}>Zoom -</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.2))}
        style={{padding:Spacing,borderWidth:1,borderRadius:10,borderColor:Colors.primary,backgroundColor:Colors.onPrimary, marginLeft:Layout.width*10/100 }}
      >
        <Text style={{fontFamily:Font["poppins-regular"]}}>Zoom +</Text>
      </TouchableOpacity>
        </View>

        
      {/* <TouchableOpacity
        onPress={generatePDF}
        style={{ position: "absolute", bottom: 8, left: 8 }}
      >
        <Text>Print as PDF</Text>
      </TouchableOpacity> */}

      </ScrollView>
      <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={()=>navigate('AdminPharma')} style={{alignItems:'center', backgroundColor:Colors.onPrimary,marginLeft:Layout.width*0/100,width:Layout.width*20/100,padding:Spacing}}>
            <Ionicons name="home-outline" color={Colors.primary} size={Spacing*3}/>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Home</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={()=>navigate('Inventory')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.primary,width:Layout.width*24/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.onPrimary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/inventory.png")}></Image>
               <Text style={{color:Colors.onPrimary,fontSize:FontSize.small}}>Inventory</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminDrugList')}  style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.onPrimary,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/drugs.png")}></Image>
              <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Drugs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('PharmaAdminAccount')}   style={{alignItems:'center',marginLeft:Layout.width*4/100,backgroundColor:Colors.onPrimary,width:Layout.width*21/100, padding:Spacing,}}>
            <Image style={{tintColor:Colors.primary,width:Layout.width*9/100,height:Layout.width*9/100}} source={require("../assets/images/skills.png")}></Image>
             <Text style={{color:Colors.primary,fontSize:FontSize.small}}>Accounts</Text>
            </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

export default InventoryScreen;
