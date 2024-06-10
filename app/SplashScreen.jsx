import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
import { images } from "../constants";

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);
  return (
    <View className="items-center justify-center w-full h-full bg-primary" >
      <Animated.View
        style={[{ opacity: fadeAnimation }]}
      >
        <Image source={images.logo} className="w-60 h-20" resizeMode="contain" />
      </Animated.View>
    </View>
  );
}

