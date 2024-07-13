import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import icons from "../constants/icons";

const TabIcon = ({ color, name, focused }) => {
  return (
    <View style={styles.tabIconBox}>
      <View style={styles.iconContainer}>
        <Image
          source={
            (name === "Home" && icons.home) ||
            (name === "Wishlist" && icons.wishlist) ||
            (name === "Profile" && icons.profile) ||
            (name === "Search" && icons.search)
          }
          resizeMode="contain"
          tintColor={color}
          style={styles.tabiconImageDefault}
        />
      </View>
      <Text
        style={
          focused === true
            ? styles.tabIconTextActive
            : styles.tabIconTextInActive
        }
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  tabIconBox: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    height: 37,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIconTextInActive: {
    color: "#CDCDCD",
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  tabiconImageDefault: {
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIconTextActive: {
    color: "#363939",
    fontSize: 10,
    fontFamily: "Poppins-Medium",
  },
});
