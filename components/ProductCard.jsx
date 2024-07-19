import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { AppContext } from "../context/ProductContext";
import { icons } from "../constants";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

const ProductCard = ({ title, price, image, onPress, productId, name }) => {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(AppContext);
  const isInWishlist = wishlist.some((item) => item.id === productId);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.wishlistContainer}>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() =>
              isInWishlist
                ? removeFromWishlist(productId)
                : addToWishlist({ id: productId, title, price, image })
            }
          >
            <Image
              source={isInWishlist ? icons.wishchecked : icons.wishuncheck}
              style={{ width: 20, height: 20, tintColor: "#408C2B" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.productDetails}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
        </View>
        <TouchableOpacity
          style={name === "wishlist" ? styles.buttonExtra : styles.button}
          onPress={() => onPress()}
        >
          <Text
            style={
              name === "wishlist" ? styles.buttonTextExtra : styles.buttonText
            }
          >
            {name === "wishlist" ? "Remove" : "Add to Cart"}
          </Text>
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
  buttonExtra: {
    width: 60,
    height: 27,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E74C3C",
    backgroundColor: "#E74C3C",
  },
  buttonText: {
    fontSize: 8,
    fontFamily: "Poppins-Regular",
    color: "#408C2B",
  },
  buttonTextExtra: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#ffffff",
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
  wishlistContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  wishlistButton: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FAFAFA40",
  },
});
