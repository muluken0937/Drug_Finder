import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import Navigation from "./navigation";
import store from "./store/store";
import { Provider } from "react-redux";
export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  return !fontsLoaded ? null : (

    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
