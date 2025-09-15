import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Animated, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // for fade-in

  // Keep Expo splash screen visible until we hide it manually
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Load token and animate custom splash
  useEffect(() => {
    const timer = setTimeout(() => {
      AsyncStorage.getItem("userToken").then((t) => {
        setToken(t);
        // Fade out animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          setLoading(false);
          SplashScreen.hideAsync(); // hide Expo’s native splash
        });
      });
    }, 1500); // show splash at least 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Animated.View
        className="flex-1 justify-center items-center bg-white"
        style={{ opacity: fadeAnim }}
      >
        <Image
          source={require("../assets/images/shuttlemain.png")}
          style={{ width: width * 0.6, height: height * 0.3 }}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  return token ? <Redirect href="/home" /> : <Redirect href="/request" />;
}
