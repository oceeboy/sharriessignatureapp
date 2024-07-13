import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import icons from "../constants/icons";
import { AppContext } from "../context/ProductContext";
import { useNavigation } from "@react-navigation/native";

const CartIcon = () => {
  const navigation = useNavigation();
  const checkOut = () => {
    navigation.navigate("CheckOut");
  };

  const { cart, getItemCount } = useContext(AppContext);
  return (
    <TouchableOpacity style={styles.cartIconContainer} onPress={checkOut}>
      <View style={{ position: "relative", zIndex: 2 }}>
        <Image
          source={icons.shoppingcart}
          style={styles.cartIcon}
          resizeMode="contain"
        />
      </View>
      <View
        style={
          cart.length === 0
            ? styles.cartBtnContainerNotactive
            : styles.cartBtnTextContainer
        }
      >
        <Text style={styles.cartBtnText}>{getItemCount()}</Text>
      </View>
      <View
        style={
          cart.length === 0
            ? styles.cartBtnContainerNotactive
            : styles.cartCoverContainer
        }
      >
        <Image
          source={icons.cartcover}
          style={styles.cartCover}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  cartIconContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBtnTextContainer: {
    position: "absolute",
    top: 8,
    right: 9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    zIndex: 1,
    bottom: 10,
  },
  cartIcon: { width: 20, height: 20 },
  cartCover: { width: 16, height: 9.6 },
  cartCoverContainer: {
    position: "absolute",
    left: 8,
  },
  cartBtnText: {
    fontSize: 8,
    color: "#FAFAFA",
    fontFamily: "Poppins-Bold",
  },
  cartBtnContainerNotactive: {
    display: "none",
  },
});
