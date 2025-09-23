import React, { useEffect } from "react";
import { View, ActivityIndicator, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={StyleSheet.splashContainer}>
      <Image
        source={{
          uri: "https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/4057/e416561e5a8bc2f64884cc2402682f50.jpg",
        }}
        style={StyleSheet.splashImage}
      />
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={StyleSheet.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  splashImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
