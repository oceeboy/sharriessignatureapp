import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { icons } from "../constants";

const BankCard = ({ cardnumber, cardname, cardexpire }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.CardContent}>
        <View style={styles.cardTypeLogo}>
          <View style={styles.logoContainer}>
            <Image
              source={icons.visaicon}
              style={styles.visaicon}
              resizeMode="contain"
              tintColor={"#fff"}
            />
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>{cardnumber}</Text>
          </View>
          <View style={styles.cardInfoContainer}>
            <View style={styles.columnGap}>
              <Text style={styles.label}>Card holder name</Text>
              <Text style={styles.labelInfo}>{cardname}</Text>
            </View>
            <View style={styles.columnGap}>
              <Text style={styles.label}>Expiry date</Text>
              <Text style={styles.labelInfo}>{cardexpire}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.chipContainer}>
        <Image
          source={icons.chip}
          resizeMode="contain"
          style={styles.chipIcon}
        />
      </View>
      <View
        style={[
          styles.circle,
          { transform: [{ translateX: 250 }, { translateY: -10 }] },
        ]}
      />
      <View
        style={[
          styles.circle,
          { transform: [{ translateX: 200 }, { translateY: -40 }] },
        ]}
      />
    </View>
  );
};

export default BankCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 325,
    height: 207,
    backgroundColor: "#22371C",
    borderRadius: 16,
  },
  CardContent: {
    padding: 20,
  },

  cardTypeLogo: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
  },
  logoContainer: {
    width: 50,
    height: 30,
    overflow: "hidden",
  },
  visaicon: {
    width: "100%",
    height: "100%",
  },
  cardDetails: {
    flexDirection: "column",
    gap: 20,
  },
  cardNumberContainer: {
    paddingVertical: 10,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 18,
  },
  cardInfoContainer: {
    flexDirection: "row",
    gap: 45,
  },
  columnGap: {
    flexDirection: "column",
    gap: 5,
  },
  label: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  labelInfo: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },
 
  chipContainer: {
    width: 45,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 30,
  },
  chipIcon: {
    width: 40,
    height: 30,
    tintColor: "#fff",
  },
  circle: {
    width: 158,
    height: 158,
    borderRadius: 158,
    backgroundColor: "#FAFAFA10",
    position: "absolute",
  },
});
