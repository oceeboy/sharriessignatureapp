import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { account } from "../services/appwrite";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

  const { logout } = useAuth();

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

  return (
    <SafeAreaView style={styles.safeArea}>
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
    flex: 1,
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
});

export default ProfilePage;
