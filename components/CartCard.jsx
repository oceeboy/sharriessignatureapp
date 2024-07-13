import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency, icons } from "../constants";
import { getImageUrl } from "../services/apiService";
import { AppContext } from "../context/ProductContext";

const CartCard = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(AppContext);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: getImageUrl(item.photos[0].url),
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.columnGap}>
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfo}>
            <Text style={styles.productIdText}>{item.unique_id}</Text>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.unitText}>Unit price</Text>
            <Text style={styles.price}>
              {formatCurrency(item.current_price[0].NGN[0])}
            </Text>
          </View>
        </View>
        <View style={styles.contextButton}>
          <View style={styles.rowGap}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (item.quantity > 1) {
                  addToCart(item, -1);
                } else {
                  removeFromCart(item.id);
                }
              }}
            >
              <Image
                source={icons.minus}
                style={styles.icons}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item, 1)}
            >
              <Image
                source={icons.plus}
                style={styles.icons}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromCart(item.id)}
          >
            <Image source={icons.trash} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 22,
    marginVertical: 32,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: "grey",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  productInfo: {
    flexDirection: "column",
    gap: 8,
    width: "50%",
  },
  productInfoContainer: {
    flexDirection: "row",
    gap: 50,
    width: "100%",
    alignItems: "flex-start",
  },
  columnGap: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 220,
  },
  productIdText: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
  },
  productName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#0A0B0A",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  unitText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#5A5A5A",
  },
  price: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#363939",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  icons: {
    width: 12,
    height: 12,
  },
  rowGap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.34,
    width: 70,
    borderColor: "#818181",
    borderRadius: 2,
  },
  button: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  contextButton: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  quantityContainer: {
    borderRightWidth: 0.34,
    borderLeftWidth: 0.34,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: "#818181",
    borderLeftColor: "#818181",
  },
  quantityText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
  removeButton: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CC474E",
  },
});
