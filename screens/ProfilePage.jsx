import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { account } from "../services/appwrite";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setSubmitting(true);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      Alert.alert("Logout failed:", error.message);
    }
  };

  const myOrders = () => {
    navigation.navigate("historypage");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerMainText}>Profile</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyContent}>
          <Text style={styles.bodyText}>Name: {user.name}</Text>
          <Text style={styles.bodyText}>Email: {user.email}</Text>
          <TouchableOpacity onPress={myOrders}>
            <Text style={styles.bodyText}>My Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Are you sure you want to log out?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Logging out..." : "Log Out"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#408C2B",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
  headerMainText: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
  },
  headerContainer: { marginTop: 32, alignItems: "center", marginBottom: 30 },
  bodyText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  bodyContainer: {
    alignItems: "center",
  },
  bodyContent: {},
});

export default ProfilePage;
