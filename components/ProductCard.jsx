import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

const ProductCard = ({ title, price, image, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.productDetails}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onPress()}>
          <Text style={styles.buttonText}> Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 166,
    marginHorizontal: 5,
    gap: 14,
  },
  container: {
    width: 166,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  button: {
    width: 60,
    height: 27,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#408C2B",
  },
  buttonText: {
    fontSize: 8,
    fontFamily: "Poppins-Regular",
    color: "#408C2B",
  },
  title: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#797A7B",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 100,
  },
  price: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  productDetails: {
    flexDirection: "column",
    flexWrap: "wrap",
    width: 100,
  },
  imageContainer: {
    width: 166,
    height: 166,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
