import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

const CustomButton = ({ handlePress, title, isLoading }) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={isLoading ? styles.CustomButtonLoading : styles.CustomButton}
        onPress={handlePress}
      >
        <Text style={styles.customText}>{title}</Text>
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            style={styles.activityIndicator}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  CustomButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#408C2B",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "98%",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10f899",
    borderRadius: 10,
  },
  customText: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "white",
  },
  activityIndicator: {
    marginLeft: 5,
  },
  CustomButtonLoading: {
    width: "100%",
    height: "100%",
    backgroundColor: "#67A057",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
});
