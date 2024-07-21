import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { useNavigation } from "@react-navigation/native";

const WelcomePage = () => {
  const navigation = useNavigation();
  const nextPage = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerBox}>
        <View style={styles.imagesContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={images.moisturize}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.imageContainerTwo}>
            <View style={styles.imageContainerSmall}>
              <Image
                source={images.poster}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.imageContainerSmaller}>
              <Image
                source={images.cleanse}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeTextContainer}>
              <View style={styles.row}>
                <Text style={styles.welcomeText}>Unveil</Text>
                <Text style={styles.welcomeTextExtra}>Your Natural</Text>
              </View>
              <Text style={styles.welcomeText}>Radiance</Text>
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.welcomeMessage}>
                Discover the secret to radiant, healthy skin with our exclusive
                range of skincare solutions.
              </Text>
            </View>
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={nextPage}>
              <Text style={styles.buttonText}>Let's Get started</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.rowText}>Already have an account?</Text>
              <TouchableOpacity style={styles.bttnLink} onPress={nextPage}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.circleOne}></View>
      <View style={styles.circleTwo}></View>
      <View style={styles.stashtag}></View>
    </SafeAreaView>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  containerBox: {
    flex: 1,
    gap: 50,
    justifyContent: "center",
    zIndex: 1,
  },
  buttonContainer: {
    width: 300,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#408C2B",
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  linkContainer: {
    gap: 10,
    marginTop: 30,
    alignItems: "center",
  },
  bttnLink: {},
  rowText: {
    fontSize: 14,
    color: "#1F2029",
    fontFamily: "Poppins-Medium",
  },
  linkText: {
    color: "#408C2B",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#1F2029",
  },
  welcomeTextExtra: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#408C2B",
  },
  textWrap: {
    width: 300,
    flexWrap: "wrap",
    flexBasis: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeMessage: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  imageContainer: {
    width: 170,
    height: 400,
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainerSmall: {
    width: 158,
    height: 230,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainerSmaller: {
    width: 158,
    height: 158,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainerTwo: {
    justifyContent: "space-between",
  },
  circleOne: {
    width: 400,
    height: 400,
    borderWidth: 2,
    borderRadius: 400,
    borderColor: "#408C2B",
    position: "absolute",
    left: -180,
    top: -100,
  },
  circleTwo: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 400,
    borderColor: "#408C2B",
    position: "absolute",
    right: -100,
    bottom: "50%",
    zIndex: 1,
  },
  stashtag: {
    width: 40,
    height: 40,
    position: "absolute",
    top: "50%",
    zIndex: 1,
    left: 50,
  },
});
