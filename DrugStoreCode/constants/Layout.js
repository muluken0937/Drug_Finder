import { Dimensions ,StyleSheet} from "react-native";
import Colors from "./Colors";
import Font from "./Font";
import Spacing from "./Spacing";
import FontSize from "./FontSize";

const window = Dimensions.get('window');
const width = window.width;
const height = window.height;

// Define a custom screen width threshold to determine small and large devices
const smallDeviceMaxWidth = 375; // You can adjust this threshold as needed

const isSmallDevice = width < smallDeviceMaxWidth;

const styles = StyleSheet.create({
  scrollContainer:{
    height:height*83/100,
    backgroundColor:Colors.lightPrimary
  },
  headingTouch:{
            padding:Spacing,
            marginHorizontal:Spacing,
            borderRadius:Spacing/2,
            marginTop:Spacing*4,
            marginRight:5
  },
  headingTouchText:{
    color:Colors.primary,
    marginTop:Spacing*4,
    marginLeft:70, 
    alignSelf:'center', 
    fontSize:FontSize.large
},
ListTouch:{
    height:40,
    margin:Spacing,
    marginTop:5,
    backgroundColor:Colors.primary,
    marginVertical:Spacing/4,
    borderRadius:Spacing/3

},
ListTouchText:{
  marginLeft:5,
  fontFamily:Font['poppins-semiBold'],
  fontSize:FontSize.large,
  color:Colors.onPrimary,

},
LoggedTabTouch:{
  alignItems:'center',
  marginLeft:width/14, 
  padding: Spacing

}

})
export default {
  width,
  height,
  isSmallDevice,
  styles

};