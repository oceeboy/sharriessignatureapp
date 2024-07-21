import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import { signOut } from "../lib/appwrite";
import { icons } from "../constants";

const ProfilePage = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigation();

  const { user, setUser, setIsLogged } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
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
      <View style={styles.imageContainer}>
        <View style={styles.circleContainer}>
          <Image
            source={icons.username}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
            tintColor={"#fff"}
          />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyContent}>
          <View style={styles.orderButton}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                source={icons.username}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                tintColor={"#ffffff"}
              />
              <Text style={styles.bodyText}>{user ? user.name : "null"}</Text>
            </View>
          </View>
          <View style={styles.orderButton}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                source={icons.emailicon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                tintColor={"#ffffff"}
              />
              <Text style={styles.bodyText}>{user ? user.email : "null"}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.orderButton} onPress={myOrders}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                source={icons.ordericon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                tintColor={"#ffffff"}
              />

              <Text style={styles.orderText}>View Orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handleLogout}
            disabled={isSubmitting}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                source={icons.logout}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                tintColor={"#ffffff"}
              />
              <Text style={styles.orderText}>
                {isSubmitting ? "Logging out..." : "Log Out"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 20,
  },

  headerMainText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  headerContainer: { marginTop: 32, alignItems: "center", marginBottom: 30 },
  bodyText: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "Poppins-Medium",
    lineHeight: 20,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  bodyContent: {
    gap: 20,
  },
  circleContainer: {
    width: 150,
    height: 150,
    borderRadius: 500,
    borderWidth: 0.3,
    backgroundColor: "#408C2B",
    borderColor: "#408C2B",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  orderButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    backgroundColor: "#408C2B",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  orderText: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: "Poppins-Medium",
    lineHeight: 20,
  },
});

export default ProfilePage;
