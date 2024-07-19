import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import { CustomButton } from "../components";
import { useNavigation } from "@react-navigation/native";

const OrderSucess = () => {
  const navigation = useNavigation();
  const nextPage = () => {
    navigation.navigate("historypage");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={icons.success}
            style={{ width: 200, height: 200, tintColor: "#408C2B" }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.successText}>Order Placed Successfully</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.CustomButtonContainer}>
          <CustomButton title={"View Order"} handlePress={nextPage} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderSucess;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },

  CustomButtonContainer: {
    width: "100%",
    height: 50,
    marginTop: 20,
  },
  buttonContainer: {
    position: "static",
    marginTop: 50,
    paddingHorizontal: 32,
    height: 150,
    borderTopWidth: 0.5,
    borderStartWidth: 0.5,
    borderEndWidth: 0.5,
    borderStartStartRadius: 50,
    borderStartEndRadius: 50,
    borderColor: "#408C2B",
  },
  textContainer: {
    paddingVertical: 40,
  },
  successText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  imgContainer: {
    paddingVertical: 10,
  },
});
