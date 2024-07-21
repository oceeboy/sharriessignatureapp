import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CollectionCard = ({ image, title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onLongPress={() => onPress(title)}
    >
      <View style={styles.imageContainer}>
        <Image source={image} resizeMode="cover" style={styles.image} />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 166,
    marginHorizontal: 5,
    gap: 14,
  },
  imageContainer: {
    width: 166,
    height: 142,
    overflow: "hidden",
    borderRadius: 5,
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    lineHeight: 22,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
