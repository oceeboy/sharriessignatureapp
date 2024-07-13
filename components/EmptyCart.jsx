import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { images } from "../constants";
import { useNavigation } from "@react-navigation/native";

const EmptyCart = () => {
  const navigation = useNavigation();

  const goHome = () => {
    navigation.navigate("Main");
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={images.shoppingemptycart}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textHeader}>Your cart is empty</Text>
        <Text style={styles.textDescription}>
          Explore our collections today and start your journey towards radiant
          beauty. Your skin will thank you
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={goHome}>
        <Text style={styles.buttonText}>Start shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 32,
  },
  imageContainer: {
    width: 64,
    height: 64,
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    marginVertical: 32,
    gap: 16,
    alignItems: "center",
  },
  textHeader: {
    fontSize: 18,
    fontFamily: "Lora-SemiBold",
    color: "#0A0B0A",
  },
  textDescription: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#818181",
    textAlign: "center",
  },
  button: {
    width: 160,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#408C2B",
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#ffffff",
  },
});
