import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { AppContext } from "../context/ProductContext";

const { width } = Dimensions.get("window");
const Notifications = () => {
  const { errors, setErrors } = useContext(AppContext);

  const clearErrors = () => setErrors([]);

  return (
    <View style={styles.container}>
      {errors.length > 0 && (
        <View style={styles.notificationContainer}>
          {errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={clearErrors}
          >
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    width: width * 0.9,
  },
  notificationContainer: {
    backgroundColor: "#fff",
    borderRadius: 7.5,
    borderWidth: 0.5,
    borderColor: "#red",
    padding: 10,
    borderRadius: 5,
    width: "100%",

    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: { padding: 10, borderRadius: 5, backgroundColor: "red" },
  clearButton: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
  },
});

export default Notifications;
